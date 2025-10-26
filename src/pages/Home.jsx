import React, { useEffect, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { usePerformanceMonitor } from '../hooks/usePerformance'
import { useSimpleRouter } from '../App'
import Hero from '../components/Hero'
import LessonCard from '../components/LessonCard'
import AdaptiveRecommendations from '../components/AdaptiveRecommendations'
import { allLessons } from '../data/lessonsIndex'
import { trackEvent } from '../analytics'

export default function Home({ adaptiveSettings }) {
  const { state, actions } = useApp()
  const { recordInteraction } = usePerformanceMonitor()
  const { navigate } = useSimpleRouter()
  const isReturningUser = state.user.progress && state.user.progress.lessons.completed.length > 0
  
  // Personalized lesson recommendations
  const recommendedLessons = useMemo(() => {
    if (!isReturningUser) {
      return allLessons.slice(0, 3) // First 3 lessons for new users
    }
    
    // For returning users, show unCompleted lessons from their learning path
    const completed = state.user.progress.lessons.completed
    const available = allLessons.filter(lesson => !completed.includes(lesson.id))
    
    return available.slice(0, 3)
  }, [isReturningUser, state.user.progress])

  function start() {
    const startTime = performance.now()
    const targetLesson = isReturningUser ? recommendedLessons[0] : allLessons[0]
    
    trackEvent('lesson_started', { 
      lesson: targetLesson.id,
      userType: isReturningUser ? 'returning' : 'new',
      source: 'home_cta'
    })
    
    recordInteraction('lesson_start_click', performance.now() - startTime)
    navigate(`/lesson/${targetLesson.id}`)
  }

  function goToLessons() {
    const startTime = performance.now()
    trackEvent('navigation', { destination: 'lessons', source: 'home_cta' })
    recordInteraction('lessons_navigation', performance.now() - startTime)
    navigate('/lessons')
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
                Join the Kickoff Club community — thousands of fans mastering professional football fundamentals through our video lessons
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

        {/* Intelligent lesson recommendations */}
        {isReturningUser ? (
          <div className="mb-12">
            <AdaptiveRecommendations maxRecommendations={3} showReasoning={false} />
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-semibold text-secondary-100 mb-6 flex items-center">
              <svg className="w-7 h-7 text-accent-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
              </svg>
              Start Here - Perfect for Beginners
            </h3>
            <div className="grid grid-cols-1 gap-6 mb-8 max-w-3xl mx-auto">
              {recommendedLessons.map((lesson, index) => (
                <div key={lesson.id} className="relative">
                  {index === 0 && (
                    <div className="absolute -top-3 -right-3 z-10">
                      <div className="bg-accent-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                        👑 START HERE
                      </div>
                    </div>
                  )}
                  <LessonCard 
                    lesson={lesson}
                    onClick={() => {
                      const startTime = performance.now()
                      trackEvent('lesson_card_click', { 
                        lesson: lesson.id, 
                        position: index,
                        source: 'home_featured'
                      })
                      recordInteraction('lesson_card_click', performance.now() - startTime)
                      navigate(`/lesson/${lesson.id}`)
                    }}
                    className={index === 0 ? 'ring-2 ring-accent-300 shadow-lg scale-105' : ''}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Dynamic CTA Section with smart messaging */}
        <div className={`text-center p-8 rounded-2xl transition-all duration-500 ${
          isReturningUser 
            ? 'bg-gradient-to-r from-accent-50 via-primary-50 to-blush-50 border-2 border-accent-200' 
            : 'bg-gradient-to-r from-primary-50 to-accent-50'
        }`}>
          <div className="flex items-center justify-center mb-4">
            {isReturningUser && (
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mr-3 animate-bounce">
                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3l14 9-14 9V3z" />
                </svg>
              </div>
            )}
            <h3 className="text-2xl font-bold text-secondary-100">
              {isReturningUser 
                ? `Continue your Kickoff Club mastery journey!` 
                : `Ready to join the Kickoff Club elite?`
              }
            </h3>
          </div>
          
          <p className="text-secondary-200 mb-6">
            {isReturningUser 
              ? `You're on ${state.user.progress.stats.currentLevel?.replace('-level', '') || 'rookie'} level with ${state.user.progress.stats.totalPoints || 0} points. Keep your Kickoff Club momentum going!`
              : `Join thousands of Kickoff Club members who've gone from confused to confident`
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={start}
              className="btn-primary transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              {isReturningUser ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Continue Your Next Lesson
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Start Learning Now
                </>
              )}
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
              {isReturningUser ? 'View Your Profile' : 'Track Your Progress'}
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
      </div>
    </div>
  )
}
