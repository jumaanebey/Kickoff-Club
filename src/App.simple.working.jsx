import React, { useState, useEffect } from 'react'
import { AppProvider } from './context/AppContext'
import Nav from './components/Nav'
import ErrorBoundary from './components/ErrorBoundary'

// Import pages directly
import Home from './pages/Home'
import LessonsPage from './pages/LessonsPage'
import LearningTracksPage from './pages/LearningTracksPage'
import InteractiveDemo from './pages/InteractiveDemo'
import AssessmentPage from './pages/AssessmentPage'
import CommunityPage from './pages/CommunityPage'
import ProfilePage from './pages/ProfilePage'
import SimpleLessonPage from './pages/SimpleLessonPage'

// Simple router hook
export const useSimpleRouter = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  
  const navigate = (path) => {
    window.history.pushState({}, '', path)
    setCurrentPath(path)
  }
  
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }
    
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
  
  return { currentPath, navigate }
}

function SimpleRouter() {
  const { currentPath } = useSimpleRouter()
  
  // Route to component mapping
  const getComponent = () => {
    const path = currentPath
    
    if (path === '/') return <Home />
    if (path === '/lessons') return <LessonsPage />
    if (path === '/tracks') return <LearningTracksPage />
    if (path === '/demo') return <InteractiveDemo />
    if (path === '/assessment') return <AssessmentPage />
    if (path === '/community') return <CommunityPage />
    if (path === '/profile') return <ProfilePage />
    if (path.startsWith('/lesson/')) {
      const lessonId = path.split('/lesson/')[1]
      return <SimpleLessonPage params={{ id: lessonId }} />
    }
    
    // Default to home
    return <Home />
  }
  
  return (
    <ErrorBoundary>
      {getComponent()}
    </ErrorBoundary>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Nav />
          <main className="flex-grow">
            <SimpleRouter />
          </main>
        </div>
      </AppProvider>
    </ErrorBoundary>
  )
}