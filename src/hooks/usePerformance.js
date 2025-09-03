// Advanced performance monitoring and optimization hooks
import { useEffect, useRef, useState, useCallback } from 'react'

// Performance metrics tracking
export const usePerformanceMonitor = () => {
  const metricsRef = useRef({
    renderTimes: [],
    interactionTimes: [],
    memoryUsage: [],
    lastMeasurement: Date.now()
  })

  const recordRenderTime = useCallback((componentName, startTime) => {
    const endTime = performance.now()
    const renderTime = endTime - startTime
    
    metricsRef.current.renderTimes.push({
      component: componentName,
      duration: renderTime,
      timestamp: Date.now()
    })

    // Keep only last 100 measurements
    if (metricsRef.current.renderTimes.length > 100) {
      metricsRef.current.renderTimes = metricsRef.current.renderTimes.slice(-100)
    }

    // Warn about slow renders
    if (renderTime > 16.67) { // 60fps threshold
      console.warn(`Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`)
    }
  }, [])

  const recordInteraction = useCallback((action, duration) => {
    metricsRef.current.interactionTimes.push({
      action,
      duration,
      timestamp: Date.now()
    })
  }, [])

  // Memory usage tracking
  useEffect(() => {
    const interval = setInterval(() => {
      if (performance.memory) {
        metricsRef.current.memoryUsage.push({
          used: performance.memory.usedJSHeapSize,
          total: performance.memory.totalJSHeapSize,
          timestamp: Date.now()
        })

        // Keep only last 50 measurements
        if (metricsRef.current.memoryUsage.length > 50) {
          metricsRef.current.memoryUsage = metricsRef.current.memoryUsage.slice(-50)
        }
      }
    }, 10000) // Every 10 seconds

    return () => clearInterval(interval)
  }, [])

  const getMetrics = useCallback(() => ({
    averageRenderTime: metricsRef.current.renderTimes.reduce((acc, curr) => acc + curr.duration, 0) / metricsRef.current.renderTimes.length || 0,
    slowRenders: metricsRef.current.renderTimes.filter(r => r.duration > 16.67).length,
    memoryTrend: metricsRef.current.memoryUsage.slice(-10),
    interactionLatency: metricsRef.current.interactionTimes.slice(-20)
  }), [])

  return {
    recordRenderTime,
    recordInteraction,
    getMetrics
  }
}

// Intelligent prefetching hook
export const usePrefetch = () => {
  const [prefetchQueue, setPrefetchQueue] = useState([])
  const [prefetchedData, setPrefetchedData] = useState(new Map())
  
  const addToPrefetchQueue = useCallback((key, fetchFn, priority = 'normal') => {
    setPrefetchQueue(prev => [
      ...prev.filter(item => item.key !== key), // Remove duplicates
      { key, fetchFn, priority, addedAt: Date.now() }
    ].sort((a, b) => {
      // Sort by priority: high -> normal -> low
      const priorityOrder = { high: 0, normal: 1, low: 2 }
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }))
  }, [])

  // Process prefetch queue
  useEffect(() => {
    if (prefetchQueue.length === 0) return

    const processingItem = prefetchQueue[0]
    
    // Check if already prefetched or currently processing
    if (prefetchedData.has(processingItem.key)) {
      setPrefetchQueue(prev => prev.slice(1))
      return
    }

    // Prefetch with idle callback for better performance
    const prefetchWithIdle = () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(async () => {
          try {
            const data = await processingItem.fetchFn()
            setPrefetchedData(prev => new Map(prev).set(processingItem.key, {
              data,
              fetchedAt: Date.now(),
              priority: processingItem.priority
            }))
          } catch (error) {
            console.warn(`Prefetch failed for ${processingItem.key}:`, error)
          }
          setPrefetchQueue(prev => prev.slice(1))
        })
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(async () => {
          try {
            const data = await processingItem.fetchFn()
            setPrefetchedData(prev => new Map(prev).set(processingItem.key, data))
          } catch (error) {
            console.warn(`Prefetch failed for ${processingItem.key}:`, error)
          }
          setPrefetchQueue(prev => prev.slice(1))
        }, 0)
      }
    }

    prefetchWithIdle()
  }, [prefetchQueue, prefetchedData])

  const getPrefetchedData = useCallback((key) => {
    const data = prefetchedData.get(key)
    if (!data) return null

    // Check if data is stale (older than 5 minutes)
    const isStale = Date.now() - data.fetchedAt > 5 * 60 * 1000
    return isStale ? null : data.data
  }, [prefetchedData])

  return {
    addToPrefetchQueue,
    getPrefetchedData,
    prefetchQueueLength: prefetchQueue.length
  }
}

// Adaptive quality hook based on device capabilities
export const useAdaptiveQuality = () => {
  const [deviceCapabilities, setDeviceCapabilities] = useState({
    ram: null,
    cores: null,
    connection: null,
    quality: 'high' // default
  })

  useEffect(() => {
    const assessDeviceCapabilities = () => {
      const capabilities = {
        ram: navigator.deviceMemory || null,
        cores: navigator.hardwareConcurrency || null,
        connection: navigator.connection ? {
          effectiveType: navigator.connection.effectiveType,
          downlink: navigator.connection.downlink,
          saveData: navigator.connection.saveData
        } : null
      }

      // Determine quality level based on capabilities
      let quality = 'high'
      
      if (capabilities.ram && capabilities.ram < 4) quality = 'medium'
      if (capabilities.cores && capabilities.cores < 4) quality = 'medium'
      if (capabilities.connection?.saveData) quality = 'low'
      if (capabilities.connection?.effectiveType === 'slow-2g' || capabilities.connection?.effectiveType === '2g') {
        quality = 'low'
      }

      setDeviceCapabilities({ ...capabilities, quality })
    }

    assessDeviceCapabilities()

    // Listen for connection changes
    if (navigator.connection) {
      navigator.connection.addEventListener('change', assessDeviceCapabilities)
      return () => navigator.connection.removeEventListener('change', assessDeviceCapabilities)
    }
  }, [])

  const getOptimalSettings = useCallback(() => {
    const { quality } = deviceCapabilities

    switch (quality) {
      case 'low':
        return {
          animations: false,
          imageQuality: 'low',
          prefetchAmount: 1,
          renderOptimizations: true
        }
      case 'medium':
        return {
          animations: 'reduced',
          imageQuality: 'medium',
          prefetchAmount: 3,
          renderOptimizations: true
        }
      default:
        return {
          animations: true,
          imageQuality: 'high',
          prefetchAmount: 5,
          renderOptimizations: false
        }
    }
  }, [deviceCapabilities])

  return {
    deviceCapabilities,
    getOptimalSettings
  }
}

// Smart caching with LRU eviction
export const useSmartCache = (maxSize = 50) => {
  const cacheRef = useRef(new Map())
  const accessOrderRef = useRef([])

  const set = useCallback((key, value, ttl = 300000) => { // 5 min default TTL
    const now = Date.now()
    
    // Remove from access order if exists
    const existingIndex = accessOrderRef.current.indexOf(key)
    if (existingIndex !== -1) {
      accessOrderRef.current.splice(existingIndex, 1)
    }

    // Add to front (most recently used)
    accessOrderRef.current.unshift(key)

    // Store with metadata
    cacheRef.current.set(key, {
      value,
      createdAt: now,
      expiresAt: now + ttl,
      accessCount: 1
    })

    // Evict if over max size
    if (cacheRef.current.size > maxSize) {
      const lruKey = accessOrderRef.current.pop()
      cacheRef.current.delete(lruKey)
    }
  }, [maxSize])

  const get = useCallback((key) => {
    const item = cacheRef.current.get(key)
    if (!item) return null

    const now = Date.now()
    
    // Check if expired
    if (now > item.expiresAt) {
      cacheRef.current.delete(key)
      const index = accessOrderRef.current.indexOf(key)
      if (index !== -1) accessOrderRef.current.splice(index, 1)
      return null
    }

    // Update access order
    const index = accessOrderRef.current.indexOf(key)
    if (index !== -1) {
      accessOrderRef.current.splice(index, 1)
    }
    accessOrderRef.current.unshift(key)

    // Update access count
    item.accessCount++

    return item.value
  }, [])

  const clear = useCallback(() => {
    cacheRef.current.clear()
    accessOrderRef.current = []
  }, [])

  const getCacheStats = useCallback(() => ({
    size: cacheRef.current.size,
    hitRate: Array.from(cacheRef.current.values()).reduce((acc, item) => acc + item.accessCount, 0) / cacheRef.current.size || 0,
    oldestEntry: Math.min(...Array.from(cacheRef.current.values()).map(item => item.createdAt))
  }), [])

  return {
    set,
    get,
    clear,
    getCacheStats
  }
}