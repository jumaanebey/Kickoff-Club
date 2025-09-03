// Advanced router hook with navigation state, prefetching, and transitions
import { useState, useEffect, useCallback, useMemo } from 'react'

const ROUTES = {
  home: { path: '/', component: 'Home', preload: ['lessons'] },
  lesson: { path: '/lesson/:id', component: 'SimpleLessonPage', preload: ['progress'] },
  lessons: { path: '/lessons', component: 'LessonsPage', preload: ['progress'] },
  tracks: { path: '/tracks', component: 'LearningTracksPage', preload: ['progress'] },
  demo: { path: '/demo', component: 'InteractiveDemo', preload: [] },
  profile: { path: '/profile', component: 'ProfilePage', preload: ['progress', 'badges'] },
  assessment: { path: '/assessment', component: 'AssessmentPage', preload: ['progress'] },
  community: { path: '/community', component: 'CommunityPage', preload: [] }
}

export const useRouter = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [prefetchedData, setPrefetchedData] = useState({})

  // Parse path parameters
  const parseParams = useCallback((path, template) => {
    const templateParts = template.split('/')
    const pathParts = path.split('/')
    const params = {}

    templateParts.forEach((part, index) => {
      if (part.startsWith(':')) {
        params[part.slice(1)] = pathParts[index]
      }
    })

    return params
  }, [])

  // Match current route
  const currentRoute = useMemo(() => {
    for (const [key, route] of Object.entries(ROUTES)) {
      if (route.path === currentPath) {
        return { key, ...route, params: {} }
      }
      
      if (route.path.includes(':')) {
        const regex = new RegExp('^' + route.path.replace(/:([^/]+)/g, '([^/]+)') + '$')
        if (regex.test(currentPath)) {
          return {
            key,
            ...route,
            params: parseParams(currentPath, route.path)
          }
        }
      }
    }
    
    return { key: 'home', ...ROUTES.home, params: {} }
  }, [currentPath, parseParams])

  // Navigation with smooth transitions
  const navigate = useCallback(async (path, options = {}) => {
    if (path === currentPath && !options.force) return

    setIsTransitioning(true)
    
    // Optional transition delay for smooth UX
    if (options.transition) {
      await new Promise(resolve => setTimeout(resolve, 150))
    }

    window.history.pushState({}, '', path)
    setCurrentPath(path)
    
    setTimeout(() => setIsTransitioning(false), 300)
  }, [currentPath])

  // Prefetch route data
  const prefetchRoute = useCallback(async (routeKey) => {
    const route = ROUTES[routeKey]
    if (!route || prefetchedData[routeKey]) return

    // Prefetch logic here - lessons, progress, etc.
    // This would integrate with your data layer
    setPrefetchedData(prev => ({ ...prev, [routeKey]: true }))
  }, [prefetchedData])

  // Listen to browser navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Preload current route data
  useEffect(() => {
    currentRoute.preload?.forEach(prefetchRoute)
  }, [currentRoute, prefetchRoute])

  return {
    currentRoute,
    navigate,
    prefetchRoute,
    isTransitioning,
    params: currentRoute.params
  }
}