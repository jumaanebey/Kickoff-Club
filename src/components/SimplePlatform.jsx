import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useSimpleRouter } from '../App'
import { allLessons } from '../data/lessonsIndex'

const SimplePlatform = () => {
  const { state, actions } = useApp()
  const { navigate } = useSimpleRouter()
  const [selectedLesson, setSelectedLesson] = useState(null)

  // Use actual lesson data from lessonsIndex
  const lessons = allLessons.map(lesson => ({
    id: lesson.id,
    title: lesson.title,
    completed: state.user?.progress?.lessons?.completed?.includes(lesson.id) || false,
    hasVideo: true,
    difficulty: lesson.difficulty,
    duration: lesson.duration
  }))

  const completedCount = lessons.filter(l => l.completed).length
  const progressPercent = Math.round((completedCount / lessons.length) * 100)

  // Simple lesson content
  const getLessonContent = (id) => {
    const content = {
      'welcome': {
        title: 'Welcome to Kickoff Club',
        content: `
          <h2>Welcome to the Kickoff Club! 🏈</h2>
          <p>You've just joined thousands of football fans on their journey from confused to confident.</p>
          
          <h3>What You'll Learn</h3>
          <ul>
            <li>Core football concepts in simple lessons</li>
            <li>How to follow games with confidence</li>
            <li>The strategy behind plays</li>
            <li>Player positions and their roles</li>
          </ul>

          <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>💡 Pro Tip</h4>
            <p>Take your time with each lesson. Understanding beats memorizing!</p>
          </div>
        `
      },
      'what-is-football': {
        title: 'What is Professional Football?',
        content: `
          <h2>Professional Football: The Beautiful Game 🏈</h2>
          <p>Football is a strategic battle between two teams fighting for territory.</p>
          
          <h3>The Basic Concept</h3>
          <p>Two teams take turns trying to advance a ball down a 100-yard field to score points. Think of it as "controlled chaos" - while it looks frantic, every player has a specific job.</p>

          <div style="background: #ecfdf5; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>🎯 Key Insight</h4>
            <p>Every play is like a mini chess match with 22 pieces moving at once.</p>
          </div>

          <h3>Why It's Compelling</h3>
          <ul>
            <li><strong>Strategy Meets Athletics</strong> - Brain and brawn combined</li>
            <li><strong>Every Play Matters</strong> - One play can change everything</li>
            <li><strong>Team Chemistry</strong> - 11 players moving as one</li>
          </ul>
        `
      },
      'game-basics': {
        title: 'Game Basics: Field & Equipment',
        content: `
          <h2>The Football Field & Equipment 🏟️</h2>
          <p>Let's start with the basics - where the game is played and what equipment is used.</p>
          
          <h3>The Field</h3>
          <ul>
            <li><strong>100 yards long</strong> - Plus 10-yard end zones on each side</li>
            <li><strong>53 yards wide</strong> - Marked with yard lines every 5 yards</li>
            <li><strong>Goal posts</strong> - For kicking field goals and extra points</li>
          </ul>

          <div style="background: #fef3c7; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>📏 Quick Fact</h4>
            <p>The field is exactly 120 yards total (100 + 10 + 10 end zones)</p>
          </div>

          <h3>Essential Equipment</h3>
          <ul>
            <li><strong>Helmet</strong> - Protection and communication</li>
            <li><strong>Pads</strong> - Shoulder, thigh, and knee protection</li>
            <li><strong>The Ball</strong> - Oval-shaped, easier to throw spirals</li>
          </ul>
        `
      }
    }

    return content[id] || {
      title: 'Coming Soon',
      content: '<p>This lesson is being developed. Check back soon!</p>'
    }
  }

  if (selectedLesson) {
    const lesson = getLessonContent(selectedLesson)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blush-50 to-sage-50">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-blush-200 p-10">
            <button 
              onClick={() => setSelectedLesson(null)}
              className="flex items-center text-blush-600 hover:text-blush-700 mb-8 font-medium transition-colors duration-200"
            >
              ← Back to Library
            </button>
            
            <div className="prose prose-lg max-w-none prose-headings:text-secondary-100 prose-p:text-secondary-200 prose-li:text-secondary-200 prose-strong:text-secondary-100" dangerouslySetInnerHTML={{ __html: lesson.content }} />
            
            <div className="border-t border-blush-100 mt-10 pt-8 text-center">
              <p className="text-secondary-200 mb-4">Nice work reading through this! 🎉</p>
              <button 
                onClick={() => setSelectedLesson(null)}
                className="px-8 py-3 bg-gradient-to-r from-blush-500 to-sage-500 text-white rounded-xl font-semibold hover:from-blush-600 hover:to-sage-600 transition-all duration-200 transform hover:scale-105"
              >
                ✨ Continue Your Journey
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-50 to-sage-50">
      <div className="max-w-4xl mx-auto p-6">
        {/* Beautiful Progress Header */}
        <div className="bg-gradient-to-r from-white to-blush-50/50 rounded-2xl shadow-lg border border-blush-200 p-8 mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-secondary-100 mb-4">✨ Your Reading Journey</h1>
            <p className="text-lg text-secondary-200">Take your time and dive deep into each topic at your own pace 💜</p>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blush-500 to-sage-500 bg-clip-text text-transparent">{progressPercent}%</div>
              <div className="text-sm text-secondary-300">Complete!</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-1">🌸</div>
              <div className="text-sm text-secondary-300">Keep blooming!</div>
            </div>
          </div>
          
          <div className="w-full bg-white/60 rounded-full h-4 mb-3">
            <div 
              className="bg-gradient-to-r from-blush-400 to-sage-400 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-secondary-200 text-center">
            You've mastered {completedCount} of {lessons.length} lessons - amazing work! 🎉
          </p>
        </div>

        {/* Beautiful Lesson List */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-blush-200">
          <div className="p-8 border-b border-blush-100">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-secondary-100 mb-2">📚 Football Knowledge Library</h2>
              <p className="text-secondary-200">Read at your own pace, no pressure! Each article is crafted to make complex topics simple 💕</p>
            </div>
          </div>
        
          <div className="divide-y divide-blush-100">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="p-8 hover:bg-blush-50/30 transition-colors duration-200">
                <div className="flex items-center">
                  <div className="mr-6">
                    {lesson.completed ? (
                      <div className="w-14 h-14 bg-gradient-to-r from-sage-400 to-blush-400 text-white rounded-full flex items-center justify-center text-lg shadow-lg">
                        ✨
                      </div>
                    ) : (
                      <div className="w-14 h-14 bg-gradient-to-r from-blush-100 to-sage-100 text-blush-600 rounded-full flex items-center justify-center text-lg font-bold border-2 border-blush-200">
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-secondary-100 mb-2">{lesson.title}</h3>
                    <p className="text-secondary-200 mb-4">
                      {lesson.completed ? '✨ You nailed this one!' : '🌱 Ready when you are'} • Perfect for a cozy read
                    </p>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setSelectedLesson(lesson.id)}
                        className="px-6 py-2 bg-gradient-to-r from-blush-500 to-sage-500 text-white rounded-xl hover:from-blush-600 hover:to-sage-600 transition-all duration-200 transform hover:scale-105 font-medium"
                      >
                        📖 Read Article
                      </button>
                      {lesson.hasVideo && (
                        <button
                          onClick={() => navigate(`/lesson/${lesson.id}`)}
                          className="px-6 py-2 bg-white border-2 border-blush-300 text-blush-600 rounded-xl hover:bg-blush-50 hover:border-blush-400 transition-all duration-200 font-medium"
                        >
                          🎥 Watch Instead
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Beautiful Stats */}
        <div className="mt-8 grid grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blush-50 to-white rounded-2xl shadow-lg border border-blush-200 p-6 text-center transform hover:scale-105 transition-transform duration-200">
            <div className="text-3xl mb-2">🌸</div>
            <div className="text-3xl font-bold text-blush-600">{completedCount}</div>
            <div className="text-sm text-secondary-300">Articles Read!</div>
          </div>
          <div className="bg-gradient-to-br from-sage-50 to-white rounded-2xl shadow-lg border border-sage-200 p-6 text-center transform hover:scale-105 transition-transform duration-200">
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-3xl font-bold text-sage-600">7</div>
            <div className="text-sm text-secondary-300">Day Streak!</div>
          </div>
          <div className="bg-gradient-to-br from-accent-50 to-white rounded-2xl shadow-lg border border-accent-200 p-6 text-center transform hover:scale-105 transition-transform duration-200">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-2xl font-bold text-accent-600">
              {progressPercent < 30 ? '🌱 Learning' : progressPercent < 70 ? '🌸 Growing' : '🌺 Blooming'}
            </div>
            <div className="text-sm text-secondary-300">Your Journey!</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimplePlatform