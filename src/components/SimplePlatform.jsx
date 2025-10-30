import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { useSimpleRouter } from '../App'
import { allLessons } from '../data/lessonsIndex'
import { isPremiumLesson } from '../config/whop'
import LessonQuiz from './LessonQuiz'
import PremiumPaywall from './PremiumPaywall'

// Lesson icons mapping
const lessonIcons = {
  'how-downs-work': '🏈',
  'scoring-touchdowns': '🎯',
  'field-layout-basics': '📏',
  'nfl-seasons-playoffs': '🏆',
  'quarterback-101': '🎯',
  'offensive-positions': '⚡',
  'defensive-positions': '🛡️',
  'special-teams-basics': '👟',
  'timeouts-and-clock': '⏱️',
  'understanding-penalties': '🚩'
}

const SimplePlatform = () => {
  const { state, actions } = useApp()
  const { navigate } = useSimpleRouter()
  const [selectedLesson, setSelectedLesson] = useState(null)
  const [quizLessonId, setQuizLessonId] = useState(null)
  const [showStickyBar, setShowStickyBar] = useState(false)

  // Use actual lesson data from lessonsIndex
  const lessons = allLessons.map((lesson, index) => ({
    id: lesson.id,
    title: lesson.title,
    subtitle: lesson.subtitle,
    preview: lesson.preview,
    completed: state.user?.progress?.lessons?.completed?.includes(lesson.id) || false,
    viewed: state.user?.progress?.lessons?.viewed?.includes(lesson.id) || false,
    read: state.user?.progress?.lessons?.read?.includes(lesson.id) || false,
    hasVideo: true,
    difficulty: lesson.difficulty,
    duration: lesson.duration,
    isPremium: isPremiumLesson(lesson.id),
    lessonNumber: index + 1
  }))

  const completedCount = lessons.filter(l => l.completed).length
  const progressPercent = Math.round((completedCount / lessons.length) * 100)
  const freeLessons = lessons.filter(l => !l.isPremium)
  const premiumLessons = lessons.filter(l => l.isPremium)

  // Show sticky bar after scrolling past lesson 3
  useEffect(() => {
    const handleScroll = () => {
      if (!state.user.hasPurchased && window.scrollY > 800) {
        setShowStickyBar(true)
      } else {
        setShowStickyBar(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [state.user.hasPurchased])

  // Simple lesson content
  const getLessonContent = (id) => {
    const content = {
      'how-downs-work': {
        title: 'How Downs Work',
        content: `
          <h2>Start Here: Understanding Football's Core System 🏈</h2>

          <div style="background: #fef3c7; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>⚡ First, The Big Picture</h4>
            <p><strong>The goal of football is simple:</strong> Get the ball into the opponent's end zone to score points. That's it!</p>
            <p>Everything in football - every rule, every play - exists to help one team move the ball <strong>down the field towards that end zone</strong>, while the other team tries to stop them.</p>
          </div>

          <h3>The Down System: Football's Genius Design</h3>
          <p>Here's how the game makes this happen. The team with the ball (the offense) gets <strong>4 attempts to move the ball 10 yards</strong> closer to the end zone. Each attempt is called a "down."</p>

          <p><strong>Why is it called a "down"?</strong> Because it's the moment when the ball touches <em>down</em> on the field during a play. Each play = one down.</p>

          <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>💡 The Golden Rule</h4>
            <p><strong>4 downs to gain 10 yards.</strong></p>
            <ul style="margin: 8px 0;">
              <li>✅ <strong>Succeed?</strong> You get 4 more downs to go another 10 yards.</li>
              <li>❌ <strong>Fail?</strong> The other team gets the ball right where you left off.</li>
            </ul>
            <p>Think of the field as divided into 10-yard chunks. Each time you conquer a chunk, you unlock the next one. You get 4 attempts per chunk.</p>
          </div>

          <h3>How It Actually Works: A Real Example</h3>
          <p>Let's watch a drive unfold:</p>

          <ul>
            <li><strong>1st & 10:</strong> First down, 10 yards to go towards the end zone. The team runs the ball and gains 3 yards. Progress!</li>
            <li><strong>2nd & 7:</strong> Second down, now they need 7 more yards (10 - 3 = 7). They throw a short pass and get 4 yards.</li>
            <li><strong>3rd & 3:</strong> Third down, 3 yards left to get that first down. <strong>This is crunch time!</strong> One more play before the big 4th down decision.</li>
            <li><strong>The Result:</strong> They throw a pass and get 5 yards - more than enough! The chains reset to <strong>1st & 10</strong> again, and the journey continues.</li>
          </ul>

          <div style="background: #ecfdf5; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>🎯 Why This Creates Drama</h4>
            <p>The down system builds natural tension:</p>
            <ul>
              <li><strong>"3rd and long"</strong> (needing 7+ yards) = Pressure is on, must make something happen</li>
              <li><strong>"4th and inches"</strong> (needing less than a yard) = Huge decision time</li>
              <li><strong>"3rd and manageable"</strong> (2-4 yards) = Very doable, but still must execute</li>
            </ul>
            <p>Every down matters. Every yard counts. That's what makes football so compelling!</p>
          </div>

          <h3>Fourth Down: The Big Decision</h3>
          <p>When you reach 4th down and haven't made your 10 yards yet, teams face a critical choice...</p>
        `
      },
      // Add other lessons here...
    }
    return content[id] || { title: 'Lesson', content: '<p>Content coming soon...</p>' }
  }

  // Quiz view
  if (quizLessonId) {
    return (
      <LessonQuiz
        lessonId={quizLessonId}
        onClose={() => setQuizLessonId(null)}
      />
    )
  }

  // Lesson reading view
  if (selectedLesson) {
    const lesson = getLessonContent(selectedLesson)
    const isLessonPremium = isPremiumLesson(selectedLesson)
    const hasPurchased = state.user.hasPurchased

    // Show paywall if lesson is premium and user hasn't purchased
    if (isLessonPremium && !hasPurchased) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blush-50 to-sage-50">
          <div className="max-w-4xl mx-auto p-6">
            <button
              onClick={() => setSelectedLesson(null)}
              className="flex items-center text-blush-600 hover:text-blush-700 mb-8 font-medium transition-colors duration-200"
            >
              ← Back to Library
            </button>
            <PremiumPaywall lessonTitle={lesson.title} />
          </div>
        </div>
      )
    }

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
                onClick={() => {
                  actions.readLesson(selectedLesson)
                  setSelectedLesson(null)
                }}
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

  // Main platform view
  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-50 to-sage-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6">

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-8 sm:p-12 mb-8 border border-purple-200">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent-100 to-primary-100 px-4 py-2 rounded-full text-sm font-semibold text-accent-700 mb-4">
              <span>⚡</span>
              <span>3 Free Lessons • 7 Premium</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Love the vibe.
              </span>
              <br />
              <span className="text-secondary-900">Learn the game.</span>
            </h1>
            <p className="text-lg sm:text-xl text-secondary-600 max-w-2xl mx-auto mb-6">
              Master football fundamentals in 10 bite-sized video lessons. No judgment, no gatekeeping—just simple, clear explanations.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-secondary-600">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                $24 one-time
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Lifetime access
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                No subscription
              </span>
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        {completedCount > 0 && (
          <div className="bg-white rounded-2xl p-6 mb-6 border border-primary-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-secondary-900">Your Progress</h3>
                <p className="text-sm text-secondary-600">
                  {completedCount} of {lessons.length} lessons completed
                </p>
              </div>
              <div className="text-3xl">{completedCount >= 5 ? '🔥' : '🎯'}</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="text-sm font-semibold text-purple-600">
              {progressPercent === 100 ? "🎉 All done! You're a football pro!" : `You're ${progressPercent}% done! Keep going!`}
            </p>
          </div>
        )}

        {/* Lesson Library */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-blush-200">
          <div className="p-6 sm:p-8 border-b border-blush-100">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-secondary-100 mb-3">🎥 Football Video Lessons</h2>
              <p className="text-base sm:text-lg text-secondary-200">Watch bite-sized videos to master football fundamentals. Read the article if you prefer!</p>
            </div>
          </div>

          {/* Free Lessons Section */}
          <div className="p-6 sm:p-8 bg-green-50/30">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="text-xl font-bold text-secondary-900">Free Fundamentals</h3>
                <p className="text-sm text-secondary-600">Start here - no payment required</p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-blush-100">
            {freeLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                state={state}
                navigate={navigate}
                setSelectedLesson={setSelectedLesson}
                setQuizLessonId={setQuizLessonId}
              />
            ))}
          </div>

          {/* Premium Lessons Section */}
          <div className="p-6 sm:p-8 bg-purple-50/30 border-t-4 border-purple-200">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🔒</span>
              <div>
                <h3 className="text-xl font-bold text-secondary-900">Premium Deep Dives - $24</h3>
                <p className="text-sm text-secondary-600">
                  {state.user.hasPurchased ? 'Unlocked! Continue learning' : 'Unlock to master positions, strategy, and game flow'}
                </p>
              </div>
            </div>
          </div>

          <div className="divide-y divide-blush-100">
            {premiumLessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                state={state}
                navigate={navigate}
                setSelectedLesson={setSelectedLesson}
                setQuizLessonId={setQuizLessonId}
              />
            ))}
          </div>

          {/* Social Proof / Testimonial */}
          {!state.user.hasPurchased && (
            <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-t border-purple-200">
              <div className="max-w-2xl mx-auto text-center">
                <div className="flex justify-center mb-4">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-white"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 border-2 border-white"></div>
                  </div>
                </div>
                <p className="text-lg italic text-secondary-700 mb-3">
                  "Finally understand what's happening on screen! These lessons made football click for me."
                </p>
                <p className="text-sm font-semibold text-secondary-600">— Sarah M., New Fan</p>
                <div className="flex justify-center gap-1 text-yellow-500 mt-2">
                  <span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span><span>⭐</span>
                </div>
              </div>
            </div>
          )}

          {/* Email Capture (only show after free lessons viewed) */}
          {!state.user.hasPurchased && completedCount >= 2 && (
            <div className="p-6 sm:p-8 border-t border-blush-200">
              <div className="max-w-md mx-auto text-center">
                <h3 className="text-xl font-bold text-secondary-900 mb-2">🏈 Want More?</h3>
                <p className="text-sm text-secondary-600 mb-4">
                  Unlock all 10 lessons for just $24. One-time payment, lifetime access.
                </p>
                <button
                  onClick={() => window.open('https://whop.com/kickoff-club-master-football/', '_blank')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Get Lifetime Access - $24
                </button>
                <p className="text-xs text-secondary-500 mt-3">
                  📺 Netflix costs more per month • ☕ Less than 4 Starbucks drinks
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Purchase CTA Bar */}
      {showStickyBar && (
        <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 shadow-2xl z-50 animate-slideUp">
          <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
            <div className="flex-1">
              <p className="font-bold text-sm sm:text-base">Want to continue learning?</p>
              <p className="text-xs sm:text-sm opacity-90">Unlock all 10 lessons for $24</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.open('https://whop.com/kickoff-club-master-football/', '_blank')}
                className="bg-white text-purple-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors text-sm sm:text-base whitespace-nowrap"
              >
                Unlock Now
              </button>
              <button
                onClick={() => setShowStickyBar(false)}
                className="text-white hover:text-gray-200 text-xl"
                aria-label="Close banner"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Lesson Card Component (extracted for cleanliness)
const LessonCard = ({ lesson, state, navigate, setSelectedLesson, setQuizLessonId }) => {
  const hasQuizScore = state.user?.progress?.quizScores?.[lesson.id]
  const quizScore = hasQuizScore ? Math.round((hasQuizScore.score / hasQuizScore.total) * 100) : null

  return (
    <div className="p-6 sm:p-8 hover:bg-blush-50/30 transition-colors duration-200 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-y-0 right-0 w-24 opacity-5 pointer-events-none">
        <div className="h-full flex flex-col justify-evenly">
          <div className="h-px bg-secondary-300"></div>
          <div className="h-px bg-secondary-300"></div>
          <div className="h-px bg-secondary-300"></div>
          <div className="h-px bg-secondary-300"></div>
          <div className="h-px bg-secondary-300"></div>
        </div>
      </div>

      <div className="relative">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1">
            {/* Status icon */}
            {lesson.completed ? (
              <div className="w-10 h-10 bg-gradient-to-r from-sage-400 to-blush-400 text-white rounded-full flex items-center justify-center text-base shadow-lg flex-shrink-0">
                ✅
              </div>
            ) : (
              <div className="w-10 h-10 bg-gradient-to-r from-blush-100 to-sage-100 text-blush-600 rounded-full flex items-center justify-center text-sm font-bold border-2 border-blush-200 flex-shrink-0">
                {lesson.lessonNumber}
              </div>
            )}

            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-semibold text-secondary-100">{lesson.title}</h3>
                {!lesson.isPremium && (
                  <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700 rounded border border-green-200">
                    FREE
                  </span>
                )}
                {lesson.isPremium && !state.user.hasPurchased && (
                  <span className="inline-block px-2 py-1 text-xs font-bold bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded border border-purple-300">
                    🔒 PREMIUM
                  </span>
                )}
              </div>
              <p className="text-sm text-secondary-200 mt-1">
                {lesson.completed && '✨ Completed • '}
                {!lesson.completed && lesson.viewed && '📺 Video watched • '}
                {!lesson.completed && lesson.read && '📖 Article read • '}
                {lesson.subtitle}
              </p>
            </div>
          </div>

          {/* Large emoji icon on desktop */}
          <div className="hidden sm:block text-6xl opacity-20 ml-4">
            {lessonIcons[lesson.id] || '🏈'}
          </div>
        </div>

        {/* What you'll learn */}
        {lesson.preview && lesson.preview["What you'll learn"] && (
          <div className="mb-4 ml-0 sm:ml-13 p-4 bg-primary-50/50 rounded-lg border border-primary-100">
            <p className="text-xs font-semibold text-accent-600 mb-3">What you'll learn:</p>
            <ul className="space-y-2">
              {lesson.preview["What you'll learn"].map((item, idx) => (
                <li key={idx} className="text-sm text-secondary-200 flex items-start leading-relaxed">
                  <span className="text-accent-500 mr-2 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 ml-0 sm:ml-13">
          {/* Video button */}
          {lesson.hasVideo && (
            <button
              onClick={() => {
                if (lesson.isPremium && !state.user.hasPurchased) {
                  window.open('https://whop.com/kickoff-club-master-football/', '_blank')
                } else {
                  navigate(`/lesson/${lesson.id}`)
                }
              }}
              className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-sm ${
                lesson.isPremium && !state.user.hasPurchased
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-blush-500 text-white hover:bg-blush-600'
              }`}
            >
              🎥 {lesson.isPremium && !state.user.hasPurchased ? 'Unlock to Watch' : 'Watch Video'}
            </button>
          )}

          {/* Read button */}
          <button
            onClick={() => setSelectedLesson(lesson.id)}
            className="flex-1 sm:flex-none px-6 py-3 bg-white border-2 border-blush-300 text-blush-600 rounded-xl hover:bg-blush-50 hover:border-blush-400 transition-all duration-200 font-semibold"
          >
            📖 Read Article
          </button>

          {/* Quiz button */}
          {lesson.isPremium && !state.user.hasPurchased ? (
            <button
              onClick={() => window.open('https://whop.com/kickoff-club-master-football/', '_blank')}
              className="flex-1 sm:flex-none px-6 py-3 bg-white border-2 border-purple-300 text-purple-600 rounded-xl hover:bg-purple-50 hover:border-purple-400 transition-all duration-200 font-semibold"
            >
              🔒 Unlock Quiz
            </button>
          ) : quizScore ? (
            <button
              onClick={() => setQuizLessonId(lesson.id)}
              className="flex-1 sm:flex-none px-6 py-3 bg-green-50 border-2 border-green-300 text-green-700 rounded-xl hover:bg-green-100 transition-all duration-200 font-semibold"
            >
              ✅ Retake ({quizScore}%)
            </button>
          ) : (
            <button
              onClick={() => setQuizLessonId(lesson.id)}
              className="flex-1 sm:flex-none px-6 py-3 bg-white border-2 border-accent-300 text-accent-600 rounded-xl hover:bg-accent-50 hover:border-accent-400 transition-all duration-200 font-semibold"
            >
              📝 Take Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SimplePlatform
