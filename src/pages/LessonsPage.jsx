import React, { useState, useEffect } from 'react'
import { allLessons, getLessonsByCategory, checkPrerequisites } from '../data/lessonsIndex'
import { loadProgress, isLessonUnlocked } from '../utils/progressTracker'
import { useSimpleRouter } from '../App'

export default function LessonsPage() {
  const [progress, setProgress] = useState(loadProgress())
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { navigate } = useSimpleRouter()

  const categories = [
    { id: 'all', name: 'All Lessons', icon: '✨' },
    { id: 'basic-rules', name: 'The Basics', icon: '🌱' },
    { id: 'positions', name: 'Players', icon: '👯‍♀️' },
    { id: 'strategy', name: 'Game Plans', icon: '💡' },
    { id: 'advanced', name: 'Next Level', icon: '🌟' }
  ]

  const categoryFiltered = selectedCategory === 'all' 
    ? allLessons 
    : getLessonsByCategory(selectedCategory)
  
  const filteredLessons = categoryFiltered.filter(lesson => 
    lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lesson.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getLessonProgress = (lessonId) => {
    const isCompleted = progress.lessons.completed.includes(lessonId)
    const isUnlocked = isLessonUnlocked(progress, lessonId)
    const quizScore = progress.quizzes.attempted[`${lessonId}-quiz`]?.bestScore || 0
    
    return { isCompleted, isUnlocked, quizScore }
  }

  const handleLessonClick = (lessonId) => {
    navigate(`/lesson/${lessonId}`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-50 to-white">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-md border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-secondary-100 mb-4">
              ✨ Your Football Learning Journey
            </h1>
            <p className="text-xl text-secondary-200 max-w-2xl mx-auto">
              Learn football at your own pace with fun, bite-sized lessons. No judgment, no pressure - just simple explanations that actually make sense! 💜
            </p>
          </div>

          {/* User Progress Stats - Prettier Design */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blush-50 to-white p-4 rounded-2xl border border-blush-200">
              <div className="text-center">
                <div className="text-2xl mb-1">🌸</div>
                <p className="text-2xl font-bold text-blush-600">{progress.lessons.completed.length}</p>
                <p className="text-xs text-secondary-300">Lessons Done!</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-sage-50 to-white p-4 rounded-2xl border border-sage-200">
              <div className="text-center">
                <div className="text-2xl mb-1">🏆</div>
                <p className="text-2xl font-bold text-sage-600">{progress.badges.earned.length}</p>
                <p className="text-xs text-secondary-300">Badges Won!</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-accent-50 to-white p-4 rounded-2xl border border-accent-200">
              <div className="text-center">
                <div className="text-2xl mb-1">🔥</div>
                <p className="text-2xl font-bold text-accent-600">{progress.stats.currentStreak}</p>
                <p className="text-xs text-secondary-300">Day Streak!</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary-50 to-white p-4 rounded-2xl border border-primary-200">
              <div className="text-center">
                <div className="text-2xl mb-1">⭐</div>
                <p className="text-2xl font-bold text-primary-600">{Math.floor(progress.stats.totalPoints / 100) + 1}</p>
                <p className="text-xs text-secondary-300">Your Level!</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search Bar - Prettier */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Find a topic you're curious about..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-4 pl-12 pr-4 text-secondary-200 bg-white border-2 border-blush-200 rounded-2xl focus:outline-none focus:border-blush-400 focus:ring-4 focus:ring-blush-100 transition-all placeholder-secondary-300 shadow-sm"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

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
        <div className="grid grid-cols-1 gap-6 max-w-3xl mx-auto">
          {filteredLessons.map((lesson) => {
            const lessonProgress = getLessonProgress(lesson.id)
            
            return (
              <div
                key={lesson.id}
                className={`bg-white rounded-2xl p-6 border-2 cursor-pointer transition-all duration-300 transform ${
                  lessonProgress.isUnlocked
                    ? 'border-blush-200 hover:border-blush-400 hover:shadow-2xl hover:scale-105'
                    : 'border-gray-200 opacity-60 cursor-not-allowed'
                }`}
                onClick={() => lessonProgress.isUnlocked && handleLessonClick(lesson.id)}
              >
                {/* Lesson Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-3 text-lg font-bold ${
                      lessonProgress.isCompleted 
                        ? 'bg-gradient-to-r from-blush-400 to-sage-400 text-white' 
                        : lessonProgress.isUnlocked
                          ? 'bg-gradient-to-r from-blush-100 to-sage-100 text-blush-600'
                          : 'bg-gray-100 text-gray-400'
                    }`}>
                      {lessonProgress.isCompleted ? '✨' : lesson.order}
                    </div>
                    
                    <div>
                      <div className="flex items-center">
                        <span className={`inline-block px-3 py-1 text-xs rounded-full mr-2 font-medium ${
                          lesson.difficulty === 'beginner' ? 'bg-gradient-to-r from-sage-50 to-blush-50 text-sage-600 border border-sage-200' : 'bg-gradient-to-r from-rose-50 to-accent-50 text-rose-600 border border-rose-200'
                        }`}>
                          {lesson.difficulty === 'beginner' ? '🌱 Easy' : '🌟 Challenge'}
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

                {/* Progress Bar - Prettier */}
                {lessonProgress.isUnlocked && (
                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-secondary-300">Your Progress</span>
                      <span className="text-xs font-medium text-blush-600">
                        {lessonProgress.isCompleted ? '✨ Complete!' : 'Ready to start'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blush-400 to-sage-400 h-3 rounded-full transition-all duration-500"
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

                {/* Action - More Encouraging */}
                <div className="mt-4 pt-4 border-t border-blush-100">
                  {lessonProgress.isCompleted ? (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-sage-600 font-medium">
                        ✨ You nailed this one!
                      </span>
                      <span className="text-xs text-secondary-300">Review →</span>
                    </div>
                  ) : lessonProgress.isUnlocked ? (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blush-600 font-medium">
                        Ready to learn! 💜
                      </span>
                      <span className="text-sm text-blush-500 font-bold">Start →</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <span className="text-sm text-gray-400">
                        🔒 Coming soon after lesson {lesson.order - 1}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State - Friendlier */}
        {filteredLessons.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🤔</div>
            <h3 className="text-xl font-semibold text-secondary-100 mb-2">
              Hmm, nothing here yet!
            </h3>
            <p className="text-secondary-200 mb-6 max-w-md mx-auto">
              We're cooking up some amazing lessons for this category. In the meantime, check out our other lessons! 💜
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="px-6 py-3 bg-gradient-to-r from-blush-500 to-sage-500 text-white rounded-xl font-medium hover:from-blush-600 hover:to-sage-600 transition-all duration-200 transform hover:scale-105"
            >
              ✨ See All Lessons
            </button>
          </div>
        )}
      </div>
    </div>
  )
}