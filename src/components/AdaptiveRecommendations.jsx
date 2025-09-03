// Intelligent recommendation component with real-time adaptation
import React, { useMemo, useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { createAdaptiveLearningEngine } from '../algorithms/adaptiveLearning'
import { lessons } from '../data/lessonsIndex'

const AdaptiveRecommendations = ({ maxRecommendations = 3, showReasoning = false }) => {
  const { state } = useApp()
  const [recommendations, setRecommendations] = useState([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Create learning engine instance
  const learningEngine = useMemo(() => {
    if (!state.user.progress) return null
    return createAdaptiveLearningEngine(state.user.progress)
  }, [state.user.progress])

  // Generate recommendations
  useEffect(() => {
    if (!learningEngine) return

    setIsAnalyzing(true)
    
    // Simulate AI processing time for better UX
    const timer = setTimeout(() => {
      const availableLessons = Object.values(lessons).filter(lesson => 
        !state.user.progress.lessons.completed.includes(lesson.id)
      )

      const optimalLessons = learningEngine
        .getOptimalNextLesson(availableLessons)
        .slice(0, maxRecommendations)
        .map(lesson => ({
          ...lesson,
          reasoning: generateRecommendationReasoning(lesson, state.user.progress)
        }))

      setRecommendations(optimalLessons)
      setIsAnalyzing(false)
    }, 800) // Simulate processing time

    return () => clearTimeout(timer)
  }, [learningEngine, maxRecommendations, state.user.progress])

  const generateRecommendationReasoning = (lesson, progress) => {
    const reasons = []
    
    // Check difficulty alignment
    const userLevel = progress.stats.currentLevel
    
    if (lesson.difficulty === 'easy' && userLevel === 'rookie-level') {
      reasons.push('Perfect for your current level')
    } else if (lesson.difficulty === 'medium' && ['fan-level', 'enthusiast-level'].includes(userLevel)) {
      reasons.push('Optimal challenge for growth')
    }
    
    // Check prerequisites
    const prerequisites = lesson.prerequisites || []
    const completedPrereqs = prerequisites.filter(prereq => 
      progress.lessons.completed.includes(prereq)
    )
    
    if (prerequisites.length > 0 && completedPrereqs.length === prerequisites.length) {
      reasons.push('You have all prerequisites')
    }
    
    // Check topic relevance
    const recentLessons = progress.lessons.completed.slice(-5)
    const hasRelatedTopic = lesson.topics?.some(topic => {
      return recentLessons.some(recentId => {
        const recentLesson = lessons[recentId]
        return recentLesson?.topics?.includes(topic)
      })
    })
    
    if (hasRelatedTopic) {
      reasons.push('Builds on recent learning')
    }
    
    // Check streak potential
    if (progress.stats.currentStreak > 0) {
      reasons.push(`Keep your ${progress.stats.currentStreak}-day streak going`)
    }
    
    // Default reasons if none found
    if (reasons.length === 0) {
      reasons.push('Recommended for your learning path')
    }
    
    return reasons.slice(0, 2) // Max 2 reasons for clean UI
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'bg-success-100 text-success-800',
      medium: 'bg-accent-100 text-accent-800', 
      hard: 'bg-warning-100 text-warning-800',
      expert: 'bg-error-100 text-error-800'
    }
    return colors[difficulty] || colors.medium
  }

  const getScoreColor = (score) => {
    if (score >= 0.8) return 'text-success-600'
    if (score >= 0.6) return 'text-accent-600'
    if (score >= 0.4) return 'text-warning-600'
    return 'text-gray-600'
  }

  if (!learningEngine || !state.user.progress) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-100 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-primary-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          <svg className="w-6 h-6 text-accent-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          AI-Powered Recommendations
        </h3>
        
        {isAnalyzing && (
          <div className="flex items-center text-sm text-accent-600">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-accent-600 border-t-transparent mr-2"></div>
            Analyzing...
          </div>
        )}
      </div>

      {isAnalyzing ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : recommendations.length > 0 ? (
        <div className="space-y-4">
          {recommendations.map((lesson, index) => (
            <div 
              key={lesson.id} 
              className="group border border-primary-100 rounded-xl p-4 hover:border-accent-300 hover:shadow-sm transition-all duration-200 cursor-pointer"
              onClick={() => window.location.href = `/lesson/${lesson.id}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-800 mr-2">
                      #{index + 1} Recommended
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-accent-700 transition-colors">
                    {lesson.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {lesson.description}
                  </p>
                </div>
                
                {showReasoning && (
                  <div className={`text-2xl font-bold ${getScoreColor(lesson.score)} ml-4`}>
                    {Math.round(lesson.score * 100)}%
                  </div>
                )}
              </div>
              
              {lesson.reasoning && lesson.reasoning.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {lesson.reasoning.map((reason, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-50 text-primary-700 border border-primary-200"
                    >
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {reason}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {lesson.estimatedTime ? `${Math.round(lesson.estimatedTime / 60)}min` : '5min'}
                </div>
                
                <div className="flex items-center text-accent-600 text-sm font-medium group-hover:text-accent-700">
                  Start Learning
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h4 className="text-lg font-semibold text-gray-700 mb-2">All Caught Up!</h4>
          <p className="text-gray-500">
            You've completed all available lessons. New content coming soon!
          </p>
        </div>
      )}
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <p className="text-xs text-gray-500 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Recommendations update based on your progress and learning patterns
        </p>
      </div>
    </div>
  )
}

export default AdaptiveRecommendations