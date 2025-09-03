// Advanced Service Worker with intelligent caching strategies
const CACHE_NAME = 'kickoff-club-cache-v1'
const STATIC_CACHE = 'kickoff-club-static-v1'
const DYNAMIC_CACHE = 'kickoff-club-dynamic-v1'

// Define cache strategies for different resource types
const CACHE_STRATEGIES = {
  static: {
    pattern: /\\.(js|css|woff2?|png|jpg|jpeg|svg|ico)$/,
    strategy: 'cache-first',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    maxEntries: 100
  },
  api: {
    pattern: /\\/api\\//,
    strategy: 'network-first',
    maxAge: 5 * 60 * 1000, // 5 minutes
    maxEntries: 50
  },
  lessons: {
    pattern: /\\/lessons?\\//,
    strategy: 'stale-while-revalidate',
    maxAge: 60 * 60 * 1000, // 1 hour
    maxEntries: 200
  },
  pages: {
    pattern: /\\/(lesson|profile|tracks|demo)/,
    strategy: 'network-first',
    maxAge: 10 * 60 * 1000, // 10 minutes
    maxEntries: 30
  }
}

// Resources to precache on install
const PRECACHE_RESOURCES = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json'
]

// Install event - precache essential resources
self.addEventListener('install', event => {
  console.log('SW: Installing service worker')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('SW: Precaching static resources')
        return cache.addAll(PRECACHE_RESOURCES)
      })
      .then(() => {
        console.log('SW: Skip waiting to activate immediately')
        return self.skipWaiting()
      })
      .catch(error => {
        console.error('SW: Precaching failed:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('SW: Activating service worker')
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        const deletePromises = cacheNames
          .filter(name => {
            return name !== CACHE_NAME && 
                   name !== STATIC_CACHE && 
                   name !== DYNAMIC_CACHE
          })
          .map(name => {
            console.log('SW: Deleting old cache:', name)
            return caches.delete(name)
          })
        
        return Promise.all(deletePromises)
      })
      .then(() => {
        console.log('SW: Claiming all clients')
        return self.clients.claim()
      })
  )
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests and chrome-extension requests
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return
  }
  
  // Determine cache strategy based on URL pattern
  const strategy = determineStrategy(request.url)
  
  event.respondWith(
    handleRequest(request, strategy)
      .catch(error => {
        console.error('SW: Request handling failed:', error)
        return handleOfflineFallback(request)
      })
  )
})

// Background sync for offline actions
self.addEventListener('sync', event => {
  console.log('SW: Background sync triggered:', event.tag)
  
  if (event.tag === 'offline-actions') {
    event.waitUntil(
      processOfflineActions()
        .catch(error => {
          console.error('SW: Background sync failed:', error)
        })
    )
  }
})

// Message handling from main thread
self.addEventListener('message', event => {
  const { type, payload } = event.data
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting()
      break
    case 'GET_CACHE_STATS':
      getCacheStats().then(stats => {
        event.ports[0]?.postMessage({ type: 'CACHE_STATS', payload: stats })
      })
      break
    case 'CLEAR_CACHE':
      clearSpecificCache(payload.cacheName).then(() => {
        event.ports[0]?.postMessage({ type: 'CACHE_CLEARED', payload })
      })
      break
    case 'PREFETCH_CONTENT':
      prefetchContent(payload.urls)
      break
  }
})

// Determine appropriate caching strategy
function determineStrategy(url) {
  for (const [name, config] of Object.entries(CACHE_STRATEGIES)) {
    if (config.pattern.test(url)) {
      return { name, ...config }
    }
  }
  
  // Default strategy for unmatched URLs
  return {
    name: 'default',
    strategy: 'network-first',
    maxAge: 5 * 60 * 1000,
    maxEntries: 20
  }
}

// Handle requests based on strategy
async function handleRequest(request, strategy) {
  const { strategy: strategyName } = strategy
  
  switch (strategyName) {
    case 'cache-first':
      return handleCacheFirst(request, strategy)
    case 'network-first':
      return handleNetworkFirst(request, strategy)
    case 'stale-while-revalidate':
      return handleStaleWhileRevalidate(request, strategy)
    case 'network-only':
      return fetch(request)
    case 'cache-only':
      return handleCacheOnly(request)
    default:
      return handleNetworkFirst(request, strategy)
  }
}

// Cache-first strategy
async function handleCacheFirst(request, strategy) {
  const cachedResponse = await getCachedResponse(request, strategy)
  
  if (cachedResponse && !isExpired(cachedResponse, strategy.maxAge)) {
    // Update access statistics
    updateCacheStats(request.url, 'hit')
    return cachedResponse
  }
  
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      await cacheResponse(request, networkResponse.clone(), strategy)
      updateCacheStats(request.url, 'miss')
    }
    
    return networkResponse
  } catch (error) {
    updateCacheStats(request.url, 'miss')
    
    // Return stale cache if available, even if expired
    if (cachedResponse) {
      return cachedResponse
    }
    
    throw error
  }
}

// Network-first strategy
async function handleNetworkFirst(request, strategy) {
  try {
    const networkResponse = await fetch(request)
    
    if (networkResponse.ok) {
      await cacheResponse(request, networkResponse.clone(), strategy)
      updateCacheStats(request.url, 'network')
    }
    
    return networkResponse
  } catch (error) {
    const cachedResponse = await getCachedResponse(request, strategy)
    
    if (cachedResponse) {
      updateCacheStats(request.url, 'cache-fallback')
      return cachedResponse
    }
    
    throw error
  }
}

// Stale-while-revalidate strategy
async function handleStaleWhileRevalidate(request, strategy) {
  const cachedResponse = await getCachedResponse(request, strategy)
  
  // Always try to revalidate in background
  const networkPromise = fetch(request)
    .then(networkResponse => {
      if (networkResponse.ok) {
        cacheResponse(request, networkResponse.clone(), strategy)
      }
      return networkResponse
    })
    .catch(error => {
      console.warn('SW: Background revalidation failed:', error)
    })
  
  if (cachedResponse && !isExpired(cachedResponse, strategy.maxAge)) {
    updateCacheStats(request.url, 'stale-hit')
    // Don't await network promise - let it run in background
    networkPromise
    return cachedResponse
  }
  
  // Wait for network if no cache or expired
  try {
    const networkResponse = await networkPromise
    updateCacheStats(request.url, 'network')
    return networkResponse
  } catch (error) {
    if (cachedResponse) {
      updateCacheStats(request.url, 'stale-fallback')
      return cachedResponse
    }
    throw error
  }
}

// Cache-only strategy
async function handleCacheOnly(request) {
  const cachedResponse = await caches.match(request)
  
  if (cachedResponse) {
    return cachedResponse
  }
  
  throw new Error('No cached response available')
}

// Get cached response with metadata
async function getCachedResponse(request, strategy) {
  const cacheName = getCacheNameForStrategy(strategy.name)
  const cache = await caches.open(cacheName)
  return cache.match(request)
}

// Cache response with metadata
async function cacheResponse(request, response, strategy) {
  const cacheName = getCacheNameForStrategy(strategy.name)
  const cache = await caches.open(cacheName)
  
  // Add metadata to response headers
  const responseToCache = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: {
      ...response.headers,
      'sw-cached-at': Date.now().toString(),
      'sw-strategy': strategy.name,
      'sw-max-age': strategy.maxAge.toString()
    }
  })
  
  await cache.put(request, responseToCache)
  
  // Enforce cache size limits
  await enforceMaxEntries(cache, strategy.maxEntries)
}

// Check if cached response is expired
function isExpired(response, maxAge) {
  const cachedAt = response.headers.get('sw-cached-at')
  
  if (!cachedAt || maxAge <= 0) {
    return false
  }
  
  const age = Date.now() - parseInt(cachedAt, 10)
  return age > maxAge
}

// Get cache name for strategy
function getCacheNameForStrategy(strategy) {
  switch (strategy) {
    case 'static':
      return STATIC_CACHE
    case 'api':
    case 'lessons':
    case 'pages':
      return DYNAMIC_CACHE
    default:
      return CACHE_NAME
  }
}

// Enforce maximum entries in cache
async function enforceMaxEntries(cache, maxEntries) {
  const requests = await cache.keys()
  
  if (requests.length <= maxEntries) {
    return
  }
  
  // Sort by cache date (oldest first)
  const requestsWithDates = await Promise.all(
    requests.map(async request => {
      const response = await cache.match(request)
      const cachedAt = response?.headers.get('sw-cached-at') || 0
      return { request, cachedAt: parseInt(cachedAt, 10) }
    })
  )
  
  requestsWithDates.sort((a, b) => a.cachedAt - b.cachedAt)
  
  // Delete oldest entries
  const entriesToDelete = requestsWithDates.slice(0, requests.length - maxEntries)
  await Promise.all(
    entriesToDelete.map(entry => cache.delete(entry.request))
  )
  
  console.log(`SW: Evicted ${entriesToDelete.length} old cache entries`)
}

// Handle offline fallbacks
async function handleOfflineFallback(request) {
  const url = new URL(request.url)
  
  // Return offline page for navigation requests
  if (request.destination === 'document') {
    const offlineResponse = await caches.match('/offline.html')
    if (offlineResponse) {
      return offlineResponse
    }
  }
  
  // Return generic offline response
  return new Response(
    JSON.stringify({ 
      error: 'Network unavailable', 
      offline: true,
      timestamp: Date.now() 
    }),
    {
      status: 503,
      statusText: 'Service Unavailable',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    }
  )
}

// Update cache statistics
let cacheStats = {
  hits: 0,
  misses: 0,
  networkRequests: 0,
  fallbacks: 0
}

function updateCacheStats(url, type) {
  switch (type) {
    case 'hit':
    case 'stale-hit':
      cacheStats.hits++
      break
    case 'miss':
      cacheStats.misses++
      break
    case 'network':
      cacheStats.networkRequests++
      break
    case 'cache-fallback':
    case 'stale-fallback':
      cacheStats.fallbacks++
      break
  }
  
  // Broadcast cache statistics update
  broadcastToClients({ 
    type: 'CACHE_STATS_UPDATE', 
    payload: { ...cacheStats, url, type } 
  })
}

// Get comprehensive cache statistics
async function getCacheStats() {
  const cacheNames = await caches.keys()
  const stats = { ...cacheStats }
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName)
    const requests = await cache.keys()
    
    stats[cacheName] = {
      entries: requests.length,
      urls: requests.map(req => req.url)
    }
  }
  
  return stats
}

// Clear specific cache
async function clearSpecificCache(cacheName) {
  const deleted = await caches.delete(cacheName)
  console.log(`SW: Cache ${cacheName} deleted:`, deleted)
  return deleted
}

// Prefetch content
async function prefetchContent(urls) {
  console.log('SW: Prefetching content:', urls)
  
  const prefetchPromises = urls.map(async url => {
    try {
      const response = await fetch(url)
      if (response.ok) {
        const cache = await caches.open(DYNAMIC_CACHE)
        await cache.put(url, response)
        console.log('SW: Prefetched:', url)
      }
    } catch (error) {
      console.warn('SW: Prefetch failed for:', url, error)
    }
  })
  
  await Promise.allSettled(prefetchPromises)
}

// Process offline actions (background sync)
async function processOfflineActions() {
  console.log('SW: Processing offline actions')
  
  // This would integrate with IndexedDB to process queued actions
  // Implementation depends on specific offline action requirements
  
  broadcastToClients({ 
    type: 'OFFLINE_ACTIONS_PROCESSED', 
    payload: { timestamp: Date.now() } 
  })
}

// Broadcast message to all clients
function broadcastToClients(message) {
  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage(message)
    })
  })
}

// Periodic cache cleanup
setInterval(() => {
  cleanupExpiredCache()
}, 60 * 60 * 1000) // Every hour

async function cleanupExpiredCache() {
  console.log('SW: Running periodic cache cleanup')
  
  const cacheNames = await caches.keys()
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName)
    const requests = await cache.keys()
    
    const deletePromises = requests.map(async request => {
      const response = await cache.match(request)
      const strategy = response?.headers.get('sw-strategy')
      const maxAge = parseInt(response?.headers.get('sw-max-age') || '0', 10)
      
      if (maxAge > 0 && isExpired(response, maxAge)) {
        console.log('SW: Deleting expired cache entry:', request.url)
        return cache.delete(request)
      }
    })
    
    await Promise.all(deletePromises.filter(Boolean))
  }
}"