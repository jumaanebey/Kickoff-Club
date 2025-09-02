import React, { useState, useEffect } from 'react'
import LessonPlayer from '../components/LessonPlayer'
import Quiz from '../components/Quiz'
import BadgeModal from '../components/BadgeModal'
import { getLessonById, getNextLesson } from '../data/lessonsIndex'
import { loadProgress, saveProgress, completeLesson, completeQuiz } from '../utils/progressTracker'
import { trackEvent } from '../analytics'

export default function LessonPage() {
  const lessonId = window.location.pathname.split('/').pop()
  const navigate = (path) => { window.location.href = path }
  const [lesson, setLesson] = useState(null)
  const [progress, setProgress] = useState(loadProgress())
  const [lessonCompleted, setLessonCompleted] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [showBadgeModal, setShowBadgeModal] = useState(false)
  const [earnedBadge, setEarnedBadge] = useState(null)

  useEffect(() => {
    const lessonData = getLessonById(lessonId)
    if (!lessonData) {
      navigate('/lessons')
      return
    }
    
    setLesson(lessonData)
    setLessonCompleted(progress.lessons.completed.includes(lessonId))
    setQuizCompleted(progress.quizzes.attempted[lessonData.quiz?.id]?.bestScore >= 70)
    
    trackEvent('lesson_viewed', { lesson_id: lessonId })
  }, [lessonId, navigate, progress])

  const handleLessonComplete = () => {
    if (!lessonCompleted) {
      const updatedProgress = completeLesson(progress, lessonId, 90) // 90 seconds
      setProgress(updatedProgress)
      setLessonCompleted(true)
      
      // Check if badge should be awarded (simplified - full logic would be in progressTracker)
      if (lesson.badges && lesson.badges.length > 0) {
        setEarnedBadge(lesson.badges[0])
        setShowBadgeModal(true)
      }
    }
  }

  const handleQuizPass = () => {
    if (lesson.quiz && !quizCompleted) {
      const updatedProgress = completeQuiz(progress, lesson.quiz.id, 100)
      setProgress(updatedProgress)
      setQuizCompleted(true)
    }
  }

  const handleNextLesson = () => {
    const nextLesson = getNextLesson(lessonId)
    if (nextLesson) {
      navigate(`/lesson/${nextLesson.id}`)
    } else {
      navigate('/lessons')
    }
  }

  const handleCloseBadgeModal = () => {
    setShowBadgeModal(false)
    setEarnedBadge(null)
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blush-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-2xl">📚</span>
          </div>
          <p className="text-secondary-200">Loading lesson...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-50 to-white">
      {/* Navigation Header */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-primary-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate('/lessons')}
              className="flex items-center text-secondary-200 hover:text-secondary-100 transition-colors"
            >
              <span className="mr-2">←</span>
              <span className="font-medium">Back to Lessons</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-secondary-300">
                {progress.stats.totalPoints} points
              </div>
              <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                {Math.floor(progress.stats.totalPoints / 100) + 1}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Lesson Metadata */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-secondary-100 text-sm font-medium mr-4">
              <span className="mr-1">📚</span>
              {lesson.category.replace('-', ' ')} • {lesson.difficulty}
            </div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-sm font-medium">
              <span className="mr-1">⏱️</span>
              {lesson.duration}s
            </div>
          </div>
          
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-secondary-100 mb-2">
              {lesson.title}
            </h1>
            <p className="text-xl text-secondary-200 mb-4">{lesson.subtitle}</p>
            
            {lesson.preview && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="card">
                  <h3 className="font-semibold text-secondary-100 mb-3">What you'll learn</h3>
                  <ul className="space-y-2">
                    {lesson.preview["What you'll learn"].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-accent-500 mr-2">✓</span>
                        <span className="text-secondary-200">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="card">
                  <h3 className="font-semibold text-secondary-100 mb-3">Key concepts</h3>
                  <div className="flex flex-wrap gap-2">
                    {lesson.preview["Key concepts"].map((concept, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-100 text-secondary-200 rounded-full text-sm"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lesson Player */}
        <div className="mb-8">
          <LessonPlayer lesson={lesson} onComplete={handleLessonComplete} />
        </div>

        {/* Quiz Section */}
        {lesson.quiz && lessonCompleted && (
          <div className="mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-secondary-100 mb-2">
                Quick Knowledge Check
              </h2>
              <p className="text-secondary-200">
                Let's see how well you understood the lesson!
              </p>
            </div>
            
            <Quiz quiz={lesson.quiz} onPass={handleQuizPass} />
          </div>
        )}

        {/* Key Terms */}
        {lesson.keyTerms && (
          <div className="card mb-8">
            <h3 className="text-xl font-bold text-secondary-100 mb-4">Key Terms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.keyTerms.map((term, index) => (
                <div key={index} className="p-4 bg-primary-50 rounded-xl">
                  <h4 className="font-semibold text-secondary-100 mb-2">{term.term}</h4>
                  <p className="text-secondary-200 text-sm">{term.definition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Steps */}
        {lessonCompleted && quizCompleted && (
          <div className="card text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="text-xl font-bold text-secondary-100 mb-2">
                Lesson Complete!
              </h3>
              <p className="text-secondary-200">
                You've earned {lesson.quiz ? '25' : '10'} points and unlocked new content.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleNextLesson}
                className="btn-primary"
              >
                Continue Learning →
              </button>
              <button
                onClick={() => navigate('/lessons')}
                className="btn-secondary"
              >
                Choose Next Lesson
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Badge Modal */}
      {showBadgeModal && earnedBadge && (
        <BadgeModal
          isOpen={showBadgeModal}
          onClose={handleCloseBadgeModal}
          badgeTitle={earnedBadge}
        />
      )}
    </div>
  )
}