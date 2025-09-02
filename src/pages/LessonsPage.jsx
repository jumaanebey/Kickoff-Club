import React, { useState, useEffect } from 'react'
import { allLessons, getLessonsByCategory, checkPrerequisites } from '../data/lessonsIndex'
import { loadProgress, isLessonUnlocked } from '../utils/progressTracker'

export default function LessonsPage() {
  const [progress, setProgress] = useState(loadProgress())
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', name: 'All Lessons', icon: '📚' },
    { id: 'basic-rules', name: 'Basic Rules', icon: '📖' },
    { id: 'positions', name: 'Positions', icon: '👥' },
    { id: 'strategy', name: 'Strategy', icon: '🧠' },
    { id: 'advanced', name: 'Advanced', icon: '🏆' }
  ]

  const filteredLessons = selectedCategory === 'all' 
    ? allLessons 
    : getLessonsByCategory(selectedCategory)

  const getLessonProgress = (lessonId) => {
    const isCompleted = progress.lessons.completed.includes(lessonId)
    const isUnlocked = isLessonUnlocked(progress, lessonId)
    const quizScore = progress.quizzes.attempted[`${lessonId}-quiz`]?.bestScore || 0
    
    return { isCompleted, isUnlocked, quizScore }
  }

  const handleLessonClick = (lessonId) => {
    window.location.href = `/lesson/${lessonId}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-50 to-white">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-secondary-100 mb-4">
              Your Learning Journey
            </h1>
            <p className="text-xl text-secondary-200 max-w-2xl mx-auto">
              Master NFL fundamentals with bite-sized lessons designed for complete beginners
            </p>
          </div>

          {/* User Progress Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-accent-600 font-bold">{progress.lessons.completed.length}</span>
              </div>
              <p className="text-sm text-secondary-300">Lessons Complete</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-rose-600 font-bold">{progress.badges.earned.length}</span>
              </div>
              <p className="text-sm text-secondary-300">Badges Earned</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-primary-600 font-bold">{progress.stats.currentStreak}</span>
              </div>
              <p className="text-sm text-secondary-300">Day Streak</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <span className="text-white font-bold">{Math.floor(progress.stats.totalPoints / 100) + 1}</span>
              </div>
              <p className="text-sm text-secondary-300">Level</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.id
                  ? 'bg-accent-500 text-white shadow-md'
                  : 'bg-white text-secondary-200 border border-primary-200 hover:border-accent-300 hover:text-accent-600'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => {
            const lessonProgress = getLessonProgress(lesson.id)
            
            return (
              <div
                key={lesson.id}
                className={`card cursor-pointer transition-all duration-300 ${
                  lessonProgress.isUnlocked
                    ? 'hover:shadow-xl hover:-translate-y-2'
                    : 'opacity-60 cursor-not-allowed'
                }`}
                onClick={() => lessonProgress.isUnlocked && handleLessonClick(lesson.id)}
              >
                {/* Lesson Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3 ${
                      lessonProgress.isCompleted 
                        ? 'bg-accent-500 text-white' 
                        : lessonProgress.isUnlocked
                          ? 'bg-primary-100 text-primary-600'
                          : 'bg-gray-100 text-gray-400'
                    }`}>
                      {lessonProgress.isCompleted ? '✓' : lesson.order}
                    </div>
                    
                    <div>
                      <div className="flex items-center">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full mr-2 ${
                          lesson.difficulty === 'beginner' ? 'bg-primary-100 text-primary-600' : 'bg-rose-100 text-rose-600'
                        }`}>
                          {lesson.difficulty}
                        </span>
                        <span className="text-xs text-secondary-300">{lesson.duration}s</span>
                      </div>
                    </div>
                  </div>

                  {!lessonProgress.isUnlocked && (
                    <div className="text-gray-400">
                      🔒
                    </div>
                  )}
                </div>

                {/* Lesson Content */}
                <h3 className="font-semibold text-lg text-secondary-100 mb-2">
                  {lesson.title}
                </h3>
                <p className="text-secondary-200 text-sm mb-4 line-clamp-2">
                  {lesson.subtitle}
                </p>

                {/* Learning Points */}
                {lesson.preview && (
                  <div className="mb-4">
                    <p className="text-xs font-medium text-secondary-300 mb-2">You'll learn:</p>
                    <ul className="space-y-1">
                      {lesson.preview["What you'll learn"].slice(0, 2).map((point, index) => (
                        <li key={index} className="flex items-start text-xs text-secondary-200">
                          <span className="text-accent-500 mr-2 mt-0.5">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Progress Bar */}
                {lessonProgress.isUnlocked && (
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-secondary-300">Progress</span>
                      <span className="text-xs text-secondary-300">
                        {lessonProgress.isCompleted ? '100%' : '0%'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-accent-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: lessonProgress.isCompleted ? '100%' : '0%' }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Quiz Score */}
                {lessonProgress.quizScore > 0 && (
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-secondary-300">Quiz Score:</span>
                    <div className="flex items-center">
                      <span className={`text-xs font-medium ${
                        lessonProgress.quizScore >= 70 ? 'text-accent-600' : 'text-rose-600'
                      }`}>
                        {lessonProgress.quizScore}%
                      </span>
                      {lessonProgress.quizScore === 100 && (
                        <span className="ml-1 text-accent-500">⭐</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Action */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  {lessonProgress.isCompleted ? (
                    <span className="text-sm text-accent-600 font-medium">
                      ✓ Completed • Review anytime
                    </span>
                  ) : lessonProgress.isUnlocked ? (
                    <span className="text-sm text-primary-600 font-medium">
                      Start Lesson →
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">
                      Complete prerequisites to unlock
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-lg font-semibold text-secondary-100 mb-2">
              No lessons in this category yet
            </h3>
            <p className="text-secondary-200 mb-4">
              We're working on adding more content. Check back soon!
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="btn-primary"
            >
              View All Lessons
            </button>
          </div>
        )}
      </div>
    </div>
  )
}