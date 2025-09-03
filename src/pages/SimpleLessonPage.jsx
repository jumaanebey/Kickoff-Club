import React, { useState, useEffect } from 'react'
import { getLessonById } from '../data/lessonsIndex'
import DownsCounterSimple from '../components/DownsCounterSimple'
import ScoringSimulatorSimple from '../components/ScoringSimulatorSimple'
import GameScenario from '../components/GameScenario'
import AdaptiveQuiz from '../components/AdaptiveQuiz'
import PerformanceMonitoringDashboard from '../components/PerformanceMonitoringDashboard'

export default function SimpleLessonPage() {
  const lessonId = window.location.pathname.split('/').pop()
  const [lesson, setLesson] = useState(null)
  const [showPerformanceDashboard, setShowPerformanceDashboard] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  useEffect(() => {
    const lessonData = getLessonById(lessonId)
    setLesson(lessonData)
  }, [lessonId])

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blush-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-2xl">📚</span>
          </div>
          <p className="text-secondary-200">
            {lessonId ? `Looking for lesson: ${lessonId}` : 'Loading lesson...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card mb-6">
          <h1 className="text-3xl font-bold text-secondary-100 mb-4">{lesson.title}</h1>
          <p className="text-xl text-secondary-200 mb-6">{lesson.subtitle}</p>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-secondary-100 mb-4">Lesson Script</h2>
            <div className="space-y-4">
              <div className="p-4 bg-accent-50 rounded-xl border border-accent-200">
                <h3 className="font-semibold text-accent-800 mb-2">Hook</h3>
                <p className="text-secondary-200">{lesson.script.hook}</p>
              </div>
              
              {lesson.script.sections.map((section, index) => (
                <div key={index} className="p-4 bg-primary-50 rounded-xl border border-primary-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-secondary-100">{section.title}</h3>
                    <span className="text-sm text-secondary-300">{section.timestamp}</span>
                  </div>
                  <p className="text-secondary-200 mb-2">{section.content}</p>
                  {section.onScreen && (
                    <div className="mt-3 p-3 bg-white rounded-lg">
                      <p className="text-xs text-secondary-300 mb-1">On Screen:</p>
                      <p className="text-sm text-secondary-200 italic">{section.onScreen}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Components */}
          {lessonId === 'how-downs-work' && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-secondary-100 mb-4">🎮 Try It Yourself</h2>
              <DownsCounterSimple />
            </div>
          )}
          
          {lessonId === 'scoring-touchdowns' && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-secondary-100 mb-4">🎮 Try It Yourself</h2>
              <ScoringSimulatorSimple />
            </div>
          )}
          
          {lessonId === 'quarterback-101' && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-secondary-100 mb-4">🧠 Strategic Challenge</h2>
              <GameScenario />
            </div>
          )}

          {/* Advanced Adaptive Quiz System */}
          {lesson.quiz && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-secondary-100 mb-4">
                🧠 Intelligent Quiz System
              </h2>
              <AdaptiveQuiz 
                lessonId={lessonId}
                questions={[
                  {
                    id: 1,
                    question: lesson.quiz.question,
                    options: lesson.quiz.options,
                    correctAnswer: lesson.quiz.correctIndex,
                    difficulty: 1,
                    category: 'basic-rules',
                    explanation: lesson.quiz.explanation,
                    hints: [
                      "Think about the basic concept we just covered",
                      "Review the lesson content above for clues"
                    ]
                  }
                ]}
                onComplete={(results) => {
                  setQuizCompleted(true)
                  console.log('Adaptive Quiz Results:', results)
                }}
                maxQuestions={3}
              />
            </div>
          )}

          {/* Interactive Elements Coming Soon */}
          <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Interactive Features Active
            </h3>
            <p className="text-blue-700 text-sm">
              This lesson now includes advanced interactive elements, adaptive quizzing, and real-time performance monitoring. The genius-level enhancements are active!
            </p>
          </div>
          {/* Achievement Preview */}
          <div className="p-6 bg-gradient-to-r from-warmGold bg-opacity-20 to-blush-50 rounded-xl border border-warmGold border-opacity-30">
            <h2 className="text-xl font-semibold text-secondary-100 mb-4">🏆 Enhanced Features Available</h2>
            <p className="text-gray-700 mb-4">
              This lesson now includes enhanced features! The platform has been upgraded with:
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="bg-white p-3 rounded-lg text-center">
                <div className="text-2xl mb-1">🎮</div>
                <div className="text-sm font-semibold">Interactive Elements</div>
                <div className="text-xs text-gray-600">Simulators & challenges</div>
              </div>
              <div className="bg-white p-3 rounded-lg text-center">
                <div className="text-2xl mb-1">🎯</div>
                <div className="text-sm font-semibold">Learning Tracks</div>
                <div className="text-xs text-gray-600">Structured pathways</div>
              </div>
              <div className="bg-white p-3 rounded-lg text-center">
                <div className="text-2xl mb-1">🏆</div>
                <div className="text-sm font-semibold">Advanced Badges</div>
                <div className="text-xs text-gray-600">25+ new achievements</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 justify-center">
              <a 
                href="/tracks" 
                className="bg-sage-500 hover:bg-sage-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
              >
                📚 View Learning Tracks
              </a>
              <a 
                href="/profile" 
                className="bg-warmGold hover:bg-yellow-600 text-navy font-bold py-2 px-4 rounded-lg transition-colors text-sm"
              >
                🏆 View Achievements
              </a>
              <button
                onClick={() => setShowPerformanceDashboard(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-colors text-sm"
              >
                📊 Performance Dashboard
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button 
            onClick={() => window.location.href = '/'}
            className="btn-primary"
          >
            Back to Home
          </button>
        </div>
      </div>

      {/* Performance Monitoring Dashboard */}
      <PerformanceMonitoringDashboard 
        isVisible={showPerformanceDashboard}
        onClose={() => setShowPerformanceDashboard(false)}
      />
    </div>
  )
}