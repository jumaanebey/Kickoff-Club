import React, { Suspense, lazy, useEffect } from 'react'
import { AppProvider } from './context/AppContext'
import { useRouter } from './hooks/useRouter'
import { usePerformanceMonitor, useAdaptiveQuality } from './hooks/usePerformance'
import { useAccessibility, useSEO } from './hooks/useAccessibility'
import Nav from './components/Nav'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'
import LoadingSpinner from './components/LoadingSpinner'
import AccessibilityToolbar from './components/AccessibilityToolbar'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const SimpleLessonPage = lazy(() => import('./pages/SimpleLessonPage'))
const LessonsPage = lazy(() => import('./pages/LessonsPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const LearningTracksPage = lazy(() => import('./pages/LearningTracksPage'))
const InteractiveDemo = lazy(() => import('./pages/InteractiveDemo'))
const AssessmentPage = lazy(() => import('./pages/AssessmentPage'))
const CommunityPage = lazy(() => import('./pages/CommunityPage'))

const COMPONENT_MAP = {
  'Home': Home,
  'SimpleLessonPage': SimpleLessonPage,
  'LessonsPage': LessonsPage,
  'ProfilePage': ProfilePage,
  'LearningTracksPage': LearningTracksPage,
  'InteractiveDemo': InteractiveDemo,
  'AssessmentPage': AssessmentPage,
  'CommunityPage': CommunityPage
}

function AppRouter() {
  const { currentRoute, isTransitioning } = useRouter()
  const { recordRenderTime } = usePerformanceMonitor()
  const { getOptimalSettings } = useAdaptiveQuality()
  const { addSkipLink, announce } = useAccessibility()
  const { updateMeta } = useSEO()
  
  const PageComponent = COMPONENT_MAP[currentRoute.component] || Home
  const settings = getOptimalSettings()

  // Initialize accessibility features
  useEffect(() => {
    addSkipLink('main-content', 'Skip to main content')
  }, [])

  // Update SEO for route changes
  useEffect(() => {
    const routeMeta = {
      Home: {
        title: 'Learn football Football - From Beginner to Fan',
        description: 'Master football football with bite-sized lessons, interactive quizzes, and personalized learning. Perfect for complete beginners.',
        keywords: ['football', 'football', 'learn', 'beginner', 'tutorial', 'sports']
      },
      SimpleLessonPage: {
        title: 'football Lesson',
        description: 'Interactive football football lesson with quizzes and progress tracking.'
      },
      LessonsPage: {
        title: 'All football Lessons',
        description: 'Browse our complete collection of football football lessons for all skill levels.'
      },
      ProfilePage: {
        title: 'Your Progress',
        description: 'Track your football learning progress, badges, and achievements.'
      },
      AssessmentPage: {
        title: 'football Knowledge Assessment',
        description: 'Test your football knowledge with our adaptive assessment and discover your skill level.'
      },
      CommunityPage: {
        title: 'Community Hub',
        description: 'Connect with fellow football learners, join groups, and compete in challenges.'
      }
    }

    const meta = routeMeta[currentRoute.component] || routeMeta.Home
    updateMeta({
      ...meta,
      canonicalUrl: `${window.location.origin}${window.location.pathname}`
    })
    
    // Announce route changes to screen readers
    if (currentRoute.component !== 'Home') {
      announce(`Navigated to ${currentRoute.component.replace('Page', '')} page`)
    }
  }, [currentRoute.component, updateMeta, announce])

  useEffect(() => {
    const startTime = performance.now()
    return () => recordRenderTime(currentRoute.component, startTime)
  }, [currentRoute.component, recordRenderTime])

  return (
    <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-75' : 'opacity-100'}`}>
      <Suspense fallback={<LoadingSpinner />}>
        <ErrorBoundary>
          <PageComponent 
            params={currentRoute.params} 
            adaptiveSettings={settings}
          />
        </ErrorBoundary>
      </Suspense>
    </div>
  )
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Nav />
          <main id="main-content" className="flex-grow" role="main" tabIndex="-1">
            <AppRouter />
          </main>
          <Footer />
          <AccessibilityToolbar />
        </div>
      </AppProvider>
    </ErrorBoundary>
  )
}
