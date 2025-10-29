import React, { useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { usePerformanceMonitor } from '../hooks/usePerformance'
import { useSimpleRouter } from '../App'
import Hero from '../components/Hero'
import { trackEvent } from '../analytics'

export default function Home({ adaptiveSettings }) {
  const { state, actions } = useApp()
  const { recordInteraction } = usePerformanceMonitor()
  const { navigate } = useSimpleRouter()
  const isReturningUser = state.user.progress && state.user.progress.lessons.completed.length > 0

  function start() {
    const startTime = performance.now()

    trackEvent('navigation', {
      destination: 'platform',
      userType: isReturningUser ? 'returning' : 'new',
      source: 'home_hero_cta'
    })

    recordInteraction('lessons_navigation', performance.now() - startTime)
    navigate('/platform')
  }

  function goToLessons() {
    const startTime = performance.now()
    trackEvent('navigation', { destination: 'platform', source: 'home_cta' })
    recordInteraction('lessons_navigation', performance.now() - startTime)
    navigate('/platform')
  }
  
  // Track page view with user context
  useEffect(() => {
    trackEvent('page_view', {
      page: 'home',
      userType: isReturningUser ? 'returning' : 'new',
      lessonsCompleted: state.user.progress?.lessons.completed.length || 0,
      level: state.user.progress?.stats.currentLevel || 'new'
    })
  }, [isReturningUser, state.user.progress])

  return (
    <div>
      <Hero onStart={start} navigate={navigate}/>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Dynamic personalized content based on user type */}
        <div className="text-center mb-12">
          {isReturningUser ? (
            <>
              <h2 className="text-3xl font-bold text-secondary-100 mb-4">
                Welcome back! 🎉
              </h2>
              <p className="text-xl text-secondary-200 mb-4">
                You've completed {state.user.progress.lessons.completed.length} lessons. 
                {state.user.progress.stats.currentStreak > 0 && (
                  <span className="text-accent-600 font-semibold">
                    Keep your {state.user.progress.stats.currentStreak}-day streak going!
                  </span>
                )}
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-accent-100 rounded-full text-accent-700 font-medium mb-6">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Level: {state.user.progress.stats.currentLevel?.replace('-level', '') || 'Rookie'}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl font-bold text-secondary-100 mb-4">
                Welcome to Kickoff Club ⚡
              </h2>
              <p className="text-xl text-secondary-200 mb-8">
                Join Kickoff Club — where casual fans become football insiders
              </p>
            </>
          )}
          <button 
            onClick={goToLessons} 
            className="btn-primary text-lg px-8 py-4 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            {isReturningUser ? 'Continue Learning' : 'View All Lessons'} →
          </button>
        </div>


        {/* Dynamic CTA Section - only show for new users */}
        {!isReturningUser && (
          <div className="text-center p-8 rounded-2xl transition-all duration-500 bg-gradient-to-r from-primary-50 to-accent-50">
            <div className="flex items-center justify-center mb-4">
              <h3 className="text-2xl font-bold text-secondary-100">
                Ready to join the Kickoff Club elite?
              </h3>
            </div>

            <p className="text-secondary-200 mb-6">
              Start with 3 free lessons • Unlock all 10 for $24 lifetime access
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={start}
                className="btn-primary transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Start Learning Now
              </button>

              <button
                onClick={() => {
                  trackEvent('navigation', { destination: 'profile', source: 'home_cta' })
                  navigate('/profile')
                }}
                className="btn-secondary transform hover:scale-105 transition-all duration-200 flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Track Your Progress
              </button>
            </div>

            {/* Performance optimization notice for low-end devices */}
            {adaptiveSettings && !adaptiveSettings.animations && (
              <div className="mt-6 flex items-center justify-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Optimized experience active for your device
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
