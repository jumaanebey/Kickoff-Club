import React, { useState, useEffect, createContext, useContext } from 'react'
import { AppProvider } from './context/AppContext'
import Nav from './components/Nav'
import Footer from './components/Footer'
import AdminPanel from './components/AdminPanel'
import ErrorBoundary from './components/ErrorBoundary'
import { initializeStorageProtection } from './utils/storageProtection'

// Import pages directly
import Home from './pages/Home'
import LessonsPage from './pages/LessonsPage'
import LearningTracksPage from './pages/LearningTracksPage'
import InteractiveDemo from './pages/InteractiveDemo'
import AssessmentPage from './pages/AssessmentPage'
import CommunityPage from './pages/CommunityPage'
import ProfilePage from './pages/ProfilePage'
import SimpleLessonPage from './pages/SimpleLessonPage'
import PlatformPage from './pages/PlatformPage'
import VideoCreatorPage from './pages/VideoCreatorPage'
import NotFound from './pages/NotFound'

// Create router context
const RouterContext = createContext()

// Router provider component
const RouterProvider = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  
  const navigate = (path) => {
    console.log('Navigate called:', path)
    window.history.pushState({}, '', path)
    setCurrentPath(path)
    // Scroll to top on navigation
    window.scrollTo(0, 0)
  }
  
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
      // Scroll to top when using back/forward buttons
      window.scrollTo(0, 0)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
  
  return (
    <RouterContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

// Simple router hook
export const useSimpleRouter = () => {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useSimpleRouter must be used within RouterProvider')
  }
  return context
}

function SimpleRouter() {
  const { currentPath } = useSimpleRouter()

  // Scroll to top whenever route changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPath])

  // Route to component mapping
  const getComponent = () => {
    const path = currentPath
    
    if (path === '/') return <Home />
    if (path === '/platform') return <PlatformPage />
    if (path === '/lessons') return <LessonsPage />
    if (path === '/tracks') return <LearningTracksPage />
    if (path === '/demo') return <InteractiveDemo />
    if (path === '/assessment') return <AssessmentPage />
    if (path === '/community') return <CommunityPage />
    if (path === '/profile') return <ProfilePage />
    if (path === '/video-creator') return <VideoCreatorPage />
    if (path.startsWith('/lesson/')) {
      const lessonId = path.split('/lesson/')[1]
      return <SimpleLessonPage params={{ id: lessonId }} />
    }

    // 404 - Page not found
    return <NotFound />
  }
  
  return (
    <ErrorBoundary>
      {getComponent()}
    </ErrorBoundary>
  )
}

export default function App() {
  // Initialize storage protection on app startup
  useEffect(() => {
    initializeStorageProtection()
  }, [])

  return (
    <ErrorBoundary>
      <RouterProvider>
        <AppProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Nav />
            <main className="flex-grow">
              <SimpleRouter />
            </main>
            <Footer />
            <AdminPanel />
          </div>
        </AppProvider>
      </RouterProvider>
    </ErrorBoundary>
  )
}