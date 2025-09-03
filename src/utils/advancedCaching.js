// Advanced caching system with offline capabilities and intelligent prefetching
export class AdvancedCacheManager {
  constructor() {
    this.cacheName = 'kickoff-club-cache-v1'
    this.offlineQueue = 'offline-queue'
    this.cacheStrategies = {
      'static': 'cache-first',
      'dynamic': 'network-first', 
      'lesson': 'stale-while-revalidate',
      'user-data': 'network-only'
    }
    this.maxCacheSize = 50 * 1024 * 1024 // 50MB
    this.maxEntries = 1000
    this.ttlDefaults = {
      static: 24 * 60 * 60 * 1000, // 24 hours
      dynamic: 5 * 60 * 1000,      // 5 minutes
      lesson: 60 * 60 * 1000,      // 1 hour
      userData: 0                   // No cache
    }
    
    this.initializeServiceWorker()
    this.setupBackgroundSync()
  }

  async initializeServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js')
        console.log('SW registered:', registration)
        
        // Listen for messages from SW
        navigator.serviceWorker.addEventListener('message', this.handleSWMessage.bind(this))
        
        // Handle offline/online events
        window.addEventListener('online', this.handleOnline.bind(this))
        window.addEventListener('offline', this.handleOffline.bind(this))
        
      } catch (error) {
        console.error('SW registration failed:', error)
      }
    }
  }

  handleSWMessage(event) {
    const { type, payload } = event.data
    
    switch (type) {
      case 'CACHE_UPDATED':
        this.broadcastCacheUpdate(payload)
        break
      case 'OFFLINE_FALLBACK':
        this.handleOfflineFallback(payload)
        break
      case 'BACKGROUND_SYNC':
        this.processBackgroundSync(payload)
        break
    }
  }

  handleOnline() {
    console.log('Back online - processing queued requests')
    this.processOfflineQueue()
    this.broadcastNetworkStatus(true)
  }

  handleOffline() {
    console.log('Gone offline - enabling offline mode')
    this.broadcastNetworkStatus(false)
  }

  // Intelligent caching with strategy selection
  async cache(key, data, options = {}) {
    const {
      strategy = 'dynamic',
      ttl = this.ttlDefaults[strategy],
      priority = 'normal',
      tags = [],
      compress = false
    } = options

    try {
      const cache = await caches.open(this.cacheName)
      
      // Prepare cache entry with metadata
      const cacheEntry = {
        data: compress ? await this.compress(data) : data,
        metadata: {
          timestamp: Date.now(),
          ttl,
          strategy,
          priority,
          tags,
          compressed: compress,
          size: JSON.stringify(data).length,
          accessCount: 0,
          lastAccessed: Date.now()
        }
      }

      // Create Response object for cache API
      const response = new Response(JSON.stringify(cacheEntry), {
        headers: {
          'Content-Type': 'application/json',
          'X-Cache-Strategy': strategy,
          'X-Cache-TTL': ttl.toString(),
          'X-Cache-Priority': priority
        }
      })

      await cache.put(key, response)
      
      // Enforce cache size limits
      await this.enforceCacheLimits()
      
      return true
    } catch (error) {
      console.error('Cache write failed:', error)
      return false
    }
  }

  async get(key, options = {}) {
    const {
      fallbackToNetwork = true,
      updateAccessStats = true
    } = options

    try {
      const cache = await caches.open(this.cacheName)
      const cachedResponse = await cache.match(key)
      
      if (cachedResponse) {
        const cacheEntry = await cachedResponse.json()
        const { data, metadata } = cacheEntry
        
        // Check TTL
        const isExpired = metadata.ttl > 0 && 
          (Date.now() - metadata.timestamp) > metadata.ttl
        
        if (isExpired && fallbackToNetwork) {
          // Try network first for expired data
          return await this.getFromNetworkWithFallback(key, data)
        }
        
        // Update access statistics
        if (updateAccessStats) {
          metadata.accessCount++
          metadata.lastAccessed = Date.now()
          await this.updateCacheMetadata(key, metadata)
        }
        
        // Decompress if needed
        return metadata.compressed ? await this.decompress(data) : data
      }
      
      // Not in cache - try network if allowed
      if (fallbackToNetwork) {
        return await this.getFromNetwork(key)
      }
      
      return null
    } catch (error) {
      console.error('Cache read failed:', error)
      return null
    }
  }

  async getFromNetworkWithFallback(key, fallbackData) {
    try {
      const networkData = await this.getFromNetwork(key)
      if (networkData) {
        // Cache the fresh data
        await this.cache(key, networkData)
        return networkData
      }
    } catch (error) {
      console.warn('Network request failed, using cached data:', error)
    }
    
    return fallbackData
  }

  async getFromNetwork(key) {
    // This would implement actual network requests
    // For now, return null to indicate network unavailable
    return null
  }

  // Intelligent prefetching based on user behavior
  async prefetchContent(predictions) {
    const prefetchPromises = predictions.map(async (prediction) => {
      const { key, data, priority, probability } = prediction
      
      // Only prefetch high-probability content
      if (probability > 0.7) {
        return this.cache(key, data, {
          strategy: 'lesson',
          priority: priority === 'high' ? 'high' : 'low',
          tags: ['prefetched']
        })
      }
    })
    
    await Promise.allSettled(prefetchPromises)
  }

  // Advanced cache invalidation by tags
  async invalidateByTag(tag) {
    try {
      const cache = await caches.open(this.cacheName)
      const requests = await cache.keys()
      
      const invalidationPromises = requests.map(async (request) => {
        const response = await cache.match(request)
        const cacheEntry = await response.json()
        
        if (cacheEntry.metadata.tags.includes(tag)) {
          return cache.delete(request)
        }
      })
      
      await Promise.all(invalidationPromises)
      console.log(`Invalidated cache entries with tag: ${tag}`)
    } catch (error) {
      console.error('Cache invalidation failed:', error)
    }
  }

  // Cache size management with LRU eviction
  async enforceCacheLimits() {
    try {
      const cache = await caches.open(this.cacheName)
      const requests = await cache.keys()
      
      if (requests.length <= this.maxEntries) {
        return // Within limits
      }
      
      // Get all cache entries with metadata
      const entries = await Promise.all(
        requests.map(async (request) => {
          const response = await cache.match(request)
          const cacheEntry = await response.json()
          return {
            request,
            metadata: cacheEntry.metadata
          }
        })
      )
      
      // Sort by priority and access patterns (LRU with priority)
      entries.sort((a, b) => {
        // High priority items are kept longer
        const priorityWeight = {
          high: 3,
          normal: 2,
          low: 1
        }
        
        const scoreA = (priorityWeight[a.metadata.priority] || 2) * a.metadata.accessCount
        const scoreB = (priorityWeight[b.metadata.priority] || 2) * b.metadata.accessCount
        
        // Secondary sort by last accessed time
        if (scoreA === scoreB) {
          return a.metadata.lastAccessed - b.metadata.lastAccessed
        }
        
        return scoreA - scoreB
      })
      
      // Remove oldest/lowest priority entries
      const entriesToRemove = entries.slice(0, requests.length - this.maxEntries)
      const deletionPromises = entriesToRemove.map(entry => cache.delete(entry.request))
      
      await Promise.all(deletionPromises)
      console.log(`Evicted ${entriesToRemove.length} cache entries`)
    } catch (error) {
      console.error('Cache limit enforcement failed:', error)
    }
  }

  // Background sync for offline actions
  async queueOfflineAction(action) {
    if (!('serviceWorker' in navigator) || !('sync' in window.ServiceWorkerRegistration.prototype)) {
      console.warn('Background sync not supported')
      return false
    }
    
    try {
      // Store action in IndexedDB queue
      await this.storeInOfflineQueue(action)
      
      // Register for background sync
      const registration = await navigator.serviceWorker.ready
      await registration.sync.register('offline-actions')
      
      return true
    } catch (error) {
      console.error('Failed to queue offline action:', error)
      return false
    }
  }

  async storeInOfflineQueue(action) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.offlineQueue, 1)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const db = request.result
        const transaction = db.transaction(['actions'], 'readwrite')
        const store = transaction.objectStore('actions')
        
        const actionWithId = {
          id: Date.now() + Math.random(),
          ...action,
          timestamp: Date.now()
        }
        
        store.add(actionWithId)
        transaction.oncomplete = () => resolve(actionWithId.id)
        transaction.onerror = () => reject(transaction.error)
      }
      
      request.onupgradeneeded = () => {
        const db = request.result
        if (!db.objectStoreNames.contains('actions')) {
          db.createObjectStore('actions', { keyPath: 'id' })
        }
      }
    })
  }

  async processOfflineQueue() {
    try {
      const actions = await this.getOfflineActions()
      
      for (const action of actions) {
        try {
          await this.executeOfflineAction(action)
          await this.removeFromOfflineQueue(action.id)
        } catch (error) {
          console.error('Failed to process offline action:', action, error)
          // Leave in queue for retry
        }
      }
    } catch (error) {
      console.error('Failed to process offline queue:', error)
    }
  }

  async getOfflineActions() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.offlineQueue, 1)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const db = request.result
        const transaction = db.transaction(['actions'], 'readonly')
        const store = transaction.objectStore('actions')
        const getAllRequest = store.getAll()
        
        getAllRequest.onsuccess = () => resolve(getAllRequest.result)
        getAllRequest.onerror = () => reject(getAllRequest.error)
      }
    })
  }

  async removeFromOfflineQueue(actionId) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.offlineQueue, 1)
      
      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        const db = request.result
        const transaction = db.transaction(['actions'], 'readwrite')
        const store = transaction.objectStore('actions')
        
        store.delete(actionId)
        transaction.oncomplete = () => resolve()
        transaction.onerror = () => reject(transaction.error)
      }
    })
  }

  async executeOfflineAction(action) {
    // Implementation would depend on action type
    // For example: API calls, data sync, etc.
    console.log('Executing offline action:', action)
  }

  // Compression utilities for large data
  async compress(data) {
    const jsonString = JSON.stringify(data)
    const encoder = new TextEncoder()
    const stream = new CompressionStream('gzip')
    const writer = stream.writable.getWriter()
    const reader = stream.readable.getReader()
    
    writer.write(encoder.encode(jsonString))
    writer.close()
    
    const chunks = []
    let done = false
    
    while (!done) {
      const { value, done: readerDone } = await reader.read()
      done = readerDone
      if (value) chunks.push(value)
    }
    
    return new Uint8Array(chunks.reduce((acc, chunk) => [...acc, ...chunk], []))
  }

  async decompress(compressedData) {
    const stream = new DecompressionStream('gzip')
    const writer = stream.writable.getWriter()
    const reader = stream.readable.getReader()
    
    writer.write(compressedData)
    writer.close()
    
    const chunks = []
    let done = false
    
    while (!done) {
      const { value, done: readerDone } = await reader.read()
      done = readerDone
      if (value) chunks.push(value)
    }
    
    const decoder = new TextDecoder()
    const decompressed = decoder.decode(
      new Uint8Array(chunks.reduce((acc, chunk) => [...acc, ...chunk], []))
    )
    
    return JSON.parse(decompressed)
  }

  // Cache analytics and optimization
  async getCacheAnalytics() {
    try {
      const cache = await caches.open(this.cacheName)
      const requests = await cache.keys()
      
      const analytics = {
        totalEntries: requests.length,
        totalSize: 0,
        hitRate: 0,
        strategies: {},
        priorities: {},
        tags: {}
      }
      
      for (const request of requests) {
        const response = await cache.match(request)
        const cacheEntry = await response.json()
        const { metadata } = cacheEntry
        
        analytics.totalSize += metadata.size
        
        // Strategy distribution
        analytics.strategies[metadata.strategy] = 
          (analytics.strategies[metadata.strategy] || 0) + 1
        
        // Priority distribution  
        analytics.priorities[metadata.priority] = 
          (analytics.priorities[metadata.priority] || 0) + 1
        
        // Tag distribution
        metadata.tags.forEach(tag => {
          analytics.tags[tag] = (analytics.tags[tag] || 0) + 1
        })
      }
      
      return analytics
    } catch (error) {
      console.error('Failed to get cache analytics:', error)
      return null
    }
  }

  // Event broadcasting for UI updates
  broadcastCacheUpdate(data) {
    window.dispatchEvent(new CustomEvent('cache-updated', { detail: data }))
  }

  broadcastNetworkStatus(isOnline) {
    window.dispatchEvent(new CustomEvent('network-status-changed', { 
      detail: { isOnline } 
    }))
  }

  setupBackgroundSync() {
    // Additional background sync setup if needed
  }

  async updateCacheMetadata(key, metadata) {
    try {
      const cache = await caches.open(this.cacheName)
      const cachedResponse = await cache.match(key)
      
      if (cachedResponse) {
        const cacheEntry = await cachedResponse.json()
        cacheEntry.metadata = metadata
        
        const updatedResponse = new Response(JSON.stringify(cacheEntry), {
          headers: cachedResponse.headers
        })
        
        await cache.put(key, updatedResponse)
      }
    } catch (error) {
      console.error('Failed to update cache metadata:', error)
    }
  }

  // Clear all caches
  async clearAll() {
    try {
      await caches.delete(this.cacheName)
      console.log('All caches cleared')
    } catch (error) {
      console.error('Failed to clear caches:', error)
    }
  }
}

// Singleton instance
export const cacheManager = new AdvancedCacheManager()

// Hook for React components
export const useAdvancedCache = () => {
  const [cacheStats, setCacheStats] = useState(null)
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  
  useEffect(() => {
    const updateStats = async () => {
      const stats = await cacheManager.getCacheAnalytics()
      setCacheStats(stats)
    }
    
    const handleNetworkStatus = (event) => {
      setIsOnline(event.detail.isOnline)
    }
    
    const handleCacheUpdate = () => {
      updateStats()
    }
    
    // Initial stats
    updateStats()
    
    // Event listeners
    window.addEventListener('network-status-changed', handleNetworkStatus)
    window.addEventListener('cache-updated', handleCacheUpdate)
    
    return () => {
      window.removeEventListener('network-status-changed', handleNetworkStatus)
      window.removeEventListener('cache-updated', handleCacheUpdate)
    }
  }, [])
  
  const cacheData = useCallback(async (key, data, options) => {
    return cacheManager.cache(key, data, options)
  }, [])
  
  const getCachedData = useCallback(async (key, options) => {
    return cacheManager.get(key, options)
  }, [])
  
  const queueOfflineAction = useCallback(async (action) => {
    return cacheManager.queueOfflineAction(action)
  }, [])
  
  return {
    cacheStats,
    isOnline,
    cacheData,
    getCachedData,
    queueOfflineAction,
    clearCache: cacheManager.clearAll.bind(cacheManager)
  }
}

// Export utility functions
export const prefetchLessonData = async (lessonId) => {
  // Implementation for prefetching lesson data
  console.log(`Prefetching lesson: ${lessonId}`)
}

export const cacheUserProgress = async (progressData) => {
  return cacheManager.cache(`user-progress-${Date.now()}`, progressData, {
    strategy: 'network-first',
    priority: 'high',
    tags: ['user-data']
  })
}"