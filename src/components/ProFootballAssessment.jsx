import React, { useState, useEffect } from 'react'
import { AdaptiveAssessment, assessmentConfig, getUnlockedTiers, canAccessTier, getTierProgress } from '../data/assessmentTest'
import { useApp } from '../context/AppContext'
import { getCurrentUser, updateUserProgress } from '../utils/userAccountSystem'

export default function ProFootballAssessment({ onComplete }) {
  // Context with error handling
  let contextData
  try {
    contextData = useApp()
  } catch (error) {
    console.error('Context error:', error)
    contextData = { state: null, actions: {} } // Fallback
  }
  
  const { state, actions } = contextData
  const [assessment, setAssessment] = useState(null)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [isStarted, setIsStarted] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [results, setResults] = useState(null)
  const [questionStartTime, setQuestionStartTime] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(null)
  const [user, setUser] = useState(null)
  const [selectedMode, setSelectedMode] = useState('beginner')
  const [showModeSelection, setShowModeSelection] = useState(true)
  const [unlockedTiers, setUnlockedTiers] = useState(['beginner']) // Always include beginner
  const [tierProgress, setTierProgress] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackData, setFeedbackData] = useState(null)
  const [currentStreak, setCurrentStreak] = useState(0)
  const [showUnicornCelebration, setShowUnicornCelebration] = useState(false)

  useEffect(() => {
    try {
      setLoading(true)
      setError(null)

      // Get current user (may be null for first-time users)
      const currentUser = getCurrentUser()
      setUser(currentUser)

      // Unlock all tiers - allow users to take any test
      setUnlockedTiers(['beginner', 'intermediate', 'advanced', 'expert'])
      setTierProgress(null) // Remove progress tracking
    } catch (error) {
      console.error('Error initializing assessment:', error)
      setError('Failed to initialize assessment. Please refresh the page.')
      // Still allow all tiers as fallback
      setUnlockedTiers(['beginner', 'intermediate', 'advanced', 'expert'])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let interval
    if (timeRemaining > 0 && isStarted && !isComplete) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTimeUp()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timeRemaining, isStarted, isComplete])

  const startAssessment = (mode = selectedMode) => {
    try {
      console.log('Starting assessment with mode:', mode)
      
      const userProgress = user ? user.progress : {}
      const newAssessment = new AdaptiveAssessment(userProgress, mode)
      
      console.log('Assessment instance created:', newAssessment)
      
      setAssessment(newAssessment)
      setIsStarted(true)
      setShowModeSelection(false)
      
      // Start the assessment and get the first question
      const questions = newAssessment.startAssessment()
      console.log('Questions generated:', questions?.length || 0)
      
      const firstQuestion = newAssessment.getCurrentQuestion()
      console.log('First question:', firstQuestion?.question)
      
      if (firstQuestion) {
        setCurrentQuestion(firstQuestion)
        setSelectedAnswer('')
        setQuestionStartTime(Date.now())
        setTimeRemaining(firstQuestion.timeLimit || 30)
        setShowFeedback(false) // Clear any existing feedback
        setFeedbackData(null)
        setCurrentStreak(0) // Reset streak for new assessment
        setShowUnicornCelebration(false)
      } else {
        console.error('No first question available')
        setError('Failed to load assessment questions. Please try again.')
        setIsStarted(false)
        setShowModeSelection(true)
      }
    } catch (error) {
      console.error('Error starting assessment:', error)
      setError(`Failed to start assessment: ${error.message}`)
      setIsStarted(false)
      setShowModeSelection(true)
    }
  }

  const loadNextQuestion = (assessmentInstance = assessment) => {
    const question = assessmentInstance.getCurrentQuestion()
    if (question) {
      setCurrentQuestion(question)
      setSelectedAnswer('')
      setQuestionStartTime(Date.now())
      setTimeRemaining(question.timeLimit || 30)
      setShowFeedback(false) // Clear feedback for new question
      setFeedbackData(null)
    } else {
      completeAssessment(assessmentInstance)
    }
    setIsSubmitting(false) // Reset submitting state after loading next question
  }

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer)
  }

  const getCelebrationMessage = (streak) => {
    if (streak >= 5) return { emoji: '🦄', message: 'UNICORN STREAK! You\'re magical!' }
    if (streak >= 3) return { emoji: '🔥', message: 'ON FIRE! Keep it up!' }
    if (streak >= 2) return { emoji: '⭐', message: 'Great streak!' }
    return null
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !assessment || isSubmitting) return

    setIsSubmitting(true)
    
    const responseTime = Date.now() - questionStartTime
    const selectedAnswerIndex = currentQuestion.options.indexOf(selectedAnswer)
    const isCorrect = selectedAnswerIndex === currentQuestion.correct
    
    // Update streak
    const newStreak = isCorrect ? currentStreak + 1 : 0
    setCurrentStreak(newStreak)
    
    // Check for celebration
    const celebration = isCorrect ? getCelebrationMessage(newStreak) : null
    const shouldShowUnicorn = celebration && celebration.emoji === '🦄'
    
    if (shouldShowUnicorn) {
      setShowUnicornCelebration(true)
      // Hide unicorn celebration after 2 seconds
      setTimeout(() => setShowUnicornCelebration(false), 2000)
    }
    
    // Show feedback first
    setFeedbackData({
      isCorrect,
      selectedAnswer,
      correctAnswer: currentQuestion.options[currentQuestion.correct],
      explanation: currentQuestion.explanation,
      celebration: celebration,
      streak: newStreak
    })
    setShowFeedback(true)
    
    // Record the response
    assessment.recordResponse(currentQuestion.id, selectedAnswerIndex, responseTime)

    // Show feedback for 2.5 seconds, then proceed
    const feedbackDelay = 2500
    setTimeout(() => {
      setShowFeedback(false)
      setFeedbackData(null)
      
      const nextQuestion = assessment.getCurrentQuestion()
      if (!nextQuestion) {
        completeAssessment()
      } else {
        loadNextQuestion()
      }
    }, feedbackDelay)
  }

  const handleTimeUp = () => {
    if (!assessment || !currentQuestion) return

    const responseTime = Date.now() - questionStartTime
    assessment.recordResponse(currentQuestion.id, -1, responseTime)

    const nextQuestion = assessment.getCurrentQuestion()
    if (!nextQuestion) {
      completeAssessment()
    } else {
      loadNextQuestion()
    }
  }

  const completeAssessment = async (assessmentInstance = assessment) => {
    const finalResults = assessmentInstance.calculateResults()
    setResults(finalResults)
    setIsComplete(true)
    setShowResults(true)
    setIsSubmitting(false) // Reset submitting state when assessment completes

    // Update user progress
    if (user) {
      await updateUserProgress({
        assessments: {
          ...user.progress.assessments,
          [Date.now()]: {
            results: finalResults,
            completedAt: new Date().toISOString(),
            timeSpent: finalResults.timeElapsed,
            mode: selectedMode
          }
        },
        stats: {
          ...user.progress.stats,
          totalPoints: user.progress.stats.totalPoints + finalResults.totalPoints
        }
      })

      // Refresh user state and update unlocked tiers
      const updatedUser = getCurrentUser()
      setUser(updatedUser)

      if (finalResults.unlocksNext && updatedUser) {
        const newUnlockedTiers = getUnlockedTiers(updatedUser.progress)
        setUnlockedTiers(newUnlockedTiers)
        setTierProgress(getTierProgress(updatedUser.progress))
      }
    }

    if (onComplete) {
      onComplete(finalResults)
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getSkillLevelColor = (level) => {
    const colors = {
      'Pro Football Newcomer': 'bg-gray-100 text-gray-800',
      'Casual Fan': 'bg-blue-100 text-blue-800', 
      'Knowledgeable Fan': 'bg-green-100 text-green-800',
      'Football Enthusiast': 'bg-orange-100 text-orange-800',
      'Pro Football Expert': 'bg-purple-100 text-purple-800'
    }
    return colors[level] || 'bg-gray-100 text-gray-800'
  }

  // Loading state
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center py-12">
          <div className="animate-spin text-6xl mb-4">🏈</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Loading Assessment...</h2>
          <p className="text-gray-600">Preparing your pro football knowledge test</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Assessment Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    )
  }

  if (!isStarted && showModeSelection) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-secondary-100 mb-4">
            ✨ How Much Do You Already Know?
          </h2>
          <p className="text-lg text-secondary-200 mb-6">
            No wrong answers here - just helping you find the perfect starting point!
          </p>
          <div className="inline-block bg-accent-50 border border-accent-200 rounded-lg px-4 py-2 text-sm text-accent-700">
            💡 Tip: We recommend starting with Beginner and working your way up!
          </div>
        </div>

        {/* Assessment Tier Selection - Friendlier Design */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          {Object.entries(assessmentConfig.modes).map(([mode, config]) => {
            const isUnlocked = unlockedTiers.includes(mode)
            const levelEmojis = {
              beginner: '🌸',
              intermediate: '🌺', 
              advanced: '🌹',
              expert: '💎'
            }
            const levelColors = {
              beginner: 'from-blush-100 to-sage-100 border-blush-300',
              intermediate: 'from-sage-100 to-primary-100 border-sage-300',
              advanced: 'from-primary-100 to-accent-100 border-primary-300', 
              expert: 'from-accent-100 to-rose-100 border-accent-300'
            }
            
            return (
              <button
                key={mode}
                onClick={() => {
                  setSelectedMode(mode)
                  startAssessment(mode)
                }}
                className={`p-6 rounded-2xl border-2 text-center transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-br ${levelColors[mode]} hover:shadow-xl cursor-pointer`}
              >
                <div className="mb-4">
                  <div className="text-4xl mb-3">
                    {levelEmojis[mode]}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-secondary-100">
                    {config.name.replace(' Assessment', '')}
                  </h3>
                  <div className="text-sm mb-3 text-secondary-200">
                    {config.totalQuestions} questions • {Math.round(config.timeLimit / 60)} minutes
                  </div>
                </div>

                <div className="text-sm mb-4 px-3 py-2 rounded-lg bg-white/60 text-secondary-200">
                  {mode === 'beginner' ? 'Perfect starting point!' :
                   mode === 'intermediate' ? 'Ready for more challenge?' :
                   mode === 'advanced' ? 'Test your knowledge!' :
                   'Prove your expertise!'}
                </div>

                <div className="text-xs space-y-1 text-secondary-300">
                  <div>Need {config.passingScore || 70}% to pass</div>
                </div>

                {mode !== 'beginner' && (
                  <div className="mt-3 text-xs text-accent-600 font-medium bg-accent-50 px-2 py-1 rounded-full">
                    {mode === 'intermediate' ? 'Try Beginner first' :
                     mode === 'advanced' ? 'Recommended: Complete Intermediate' :
                     'Recommended: Complete Advanced'}
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Simplified Assessment Info */}
        <div className="bg-gradient-to-r from-sage-50 to-blush-50 rounded-2xl p-6 mb-8 border border-sage-200">
          <h3 className="text-xl font-semibold text-secondary-100 mb-4 text-center">✨ What to Expect</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">⏱️</div>
              <h4 className="font-semibold text-secondary-100 mb-2">Quick & Easy</h4>
              <p className="text-sm text-secondary-200">Just 30 seconds per question - go with your gut!</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💜</div>
              <h4 className="font-semibold text-secondary-100 mb-2">No Pressure</h4>
              <p className="text-sm text-secondary-200">This helps us find the perfect lessons for you</p>
            </div>
          </div>
        </div>

        <div className="bg-blush-50 border border-blush-200 rounded-xl p-6 mb-8">
          <div className="text-center">
            <div className="text-4xl mb-3">🤗</div>
            <h4 className="font-semibold text-secondary-100 mb-3">Remember: This is Just for Fun!</h4>
            <p className="text-sm text-secondary-200 max-w-md mx-auto">
              Don't stress about getting everything right. We're just figuring out what you already know so we can help you learn what you don't! No wrong answers here.
            </p>
          </div>
        </div>

      </div>
    )
  }

  if (showResults && results) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Assessment Complete!
          </h2>
          <p className="text-lg text-gray-600">
            Here are your personalized results
          </p>
        </div>

        {/* Overall Score */}
        <div className="bg-gradient-to-r from-sage-50 to-blush-50 rounded-xl p-8 mb-8 text-center">
          <div className="mb-4 flex items-center justify-center space-x-3">
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              results.tier === 1 ? 'bg-gray-100 text-gray-800' :
              results.tier === 2 ? 'bg-blue-100 text-blue-800' :
              results.tier === 3 ? 'bg-purple-100 text-purple-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              Tier {results.tier} • {assessmentConfig.modes[selectedMode]?.name}
            </span>
          </div>
          
          <div className="text-5xl font-bold text-sage-600 mb-2">
            {Math.round(results.percentage)}%
          </div>
          
          <div className={`inline-block px-6 py-3 rounded-full text-lg font-semibold mb-4 ${getSkillLevelColor(results.skillLevel.level)}`}>
            {results.skillLevel.name}
          </div>
          
          {/* Pass/Fail Status */}
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${
            results.passed 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {results.passed ? '✅ PASSED' : '❌ FAILED'} 
            <span className="ml-2">({results.percentage}% / {results.passingScore}% required)</span>
          </div>
          
          {/* Unlock Status */}
          {results.passed && results.unlocksNext && !results.isMaxLevel && (
            <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 mt-4">
              <div className="text-xl mb-2">🔓</div>
              <h4 className="font-bold text-yellow-800 mb-1">Tier Unlocked!</h4>
              <p className="text-yellow-700 text-sm">
                You've unlocked <strong>{assessmentConfig.modes[results.nextTier]?.name}</strong>
              </p>
            </div>
          )}
          
          {results.passed && results.isMaxLevel && (
            <div className="bg-purple-100 border border-purple-300 rounded-lg p-4 mt-4">
              <div className="text-xl mb-2">🏆</div>
              <h4 className="font-bold text-purple-800 mb-1">Pro Football Expert!</h4>
              <p className="text-purple-700 text-sm">
                Congratulations! You've mastered all assessment tiers.
              </p>
            </div>
          )}
          
          {!results.passed && (
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 mt-4">
              <div className="text-xl mb-2">🎯</div>
              <h4 className="font-bold text-blue-800 mb-1">Keep Learning!</h4>
              <p className="text-blue-700 text-sm">
                You need {results.passingScore}% to pass this tier. Try again after reviewing the recommended lessons.
              </p>
            </div>
          )}
          
          <p className="text-gray-600 mt-4 text-lg">
            {results.skillLevel.description}
          </p>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">📊 Performance Breakdown</h3>
            <div className="space-y-4">
              {Object.entries(results.categoryResults || {}).map(([category, data]) => {
                const percentage = Math.round((data.correct / data.total) * 100)
                return (
                  <div key={category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700 capitalize">
                        {category.replace('-', ' ')}
                      </span>
                      <span className="text-sm text-gray-600">
                        {data.correct}/{data.total} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-sage-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">⚡ Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Questions Answered</span>
                <span className="font-semibold text-gray-900">{results.totalQuestions}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Correct Answers</span>
                <span className="font-semibold text-green-600">{results.correctAnswers}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Time Taken</span>
                <span className="font-semibold text-gray-900">
                  {Math.round(results.timeElapsed / 60000)} min
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Points Earned</span>
                <span className="font-semibold text-sage-600">
                  +{results.totalPoints}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🎯 Personalized Recommendations
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Focus Areas:</h4>
              <ul className="space-y-2">
                {results.recommendations.focus?.map((area, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span className="text-gray-700">{area.suggestion}</span>
                  </li>
                )) || <li className="text-gray-600">Great job! Keep up the good work.</li>}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-3">Suggested Next Steps:</h4>
              <ul className="space-y-2">
                {results.recommendations.immediate?.map((lesson, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-700">{lesson}</span>
                  </li>
                )) || results.skillLevel.nextGoals?.map((goal, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span className="text-gray-700">{goal}</span>
                  </li>
                )) || <li className="text-gray-600">Continue learning and exploring!</li>}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          {/* Show next tier button if unlocked */}
          {results.passed && results.unlocksNext && !results.isMaxLevel && (
            <button
              onClick={() => {
                setIsStarted(false)
                setIsComplete(false)
                setShowResults(false)
                setShowModeSelection(true)
                setResults(null)
                setAssessment(null)
                setSelectedMode(results.nextTier)
              }}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
            >
              🚀 Try {assessmentConfig.modes[results.nextTier]?.name}
            </button>
          )}
          
          <button
            onClick={() => {
              setIsStarted(false)
              setIsComplete(false)
              setShowResults(false)
              setShowModeSelection(true)
              setResults(null)
              setAssessment(null)
            }}
            className="px-6 py-3 bg-sage-500 text-white rounded-lg hover:bg-sage-600 transition-colors"
          >
            🔄 Take Another Assessment
          </button>
          
          {!results.passed && (
            <button
              onClick={() => {
                setIsStarted(false)
                setIsComplete(false)
                setShowResults(false)
                setShowModeSelection(true)
                setResults(null)
                setAssessment(null)
              }}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              🎯 Retry This Tier
            </button>
          )}
          
          <button
            onClick={() => window.location.href = '/lessons'}
            className="px-6 py-3 bg-blush-500 text-white rounded-lg hover:bg-blush-600 transition-colors"
          >
            📚 View Lessons
          </button>
          {user && (
            <button
              onClick={() => window.location.href = '/progress'}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              📊 View Progress
            </button>
          )}
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <div className="animate-spin text-4xl mb-4">⚽</div>
        <p className="text-gray-600">Loading next question...</p>
      </div>
    )
  }

  const progress = assessment ? Math.round((assessment.responses.length / assessment.totalQuestions) * 100) : 0

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blush-50 to-sage-50 rounded-2xl shadow-sm border border-blush-200 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-secondary-100">✨ Football Knowledge Check</h2>
            <p className="text-secondary-200">
              Question {assessment.responses.length + 1} of {assessment.totalQuestions} • Almost there!
            </p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold mb-1 ${timeRemaining <= 10 ? 'text-rose-500' : 'text-sage-600'}`}>
              {formatTime(timeRemaining)}
            </div>
            <div className="text-sm text-secondary-300">No rush! 💜</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/60 rounded-full h-3 mb-2">
          <div
            className="bg-gradient-to-r from-blush-400 to-sage-400 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-secondary-200">
          <span>{progress}% Complete 🎉</span>
          <div className="flex items-center gap-4">
            {currentStreak > 0 && (
              <span className="text-accent-600 font-medium bg-white/60 px-2 py-1 rounded-full">
                {currentStreak >= 5 ? '🦄' : currentStreak >= 3 ? '🔥' : '⭐'} {currentStreak} streak!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6">
        <div className="mb-8">
          <div className="text-center mb-6">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blush-100 to-sage-100 text-secondary-100 rounded-full text-sm font-medium capitalize">
              {currentQuestion.category.replace('-', ' ')} question
            </span>
          </div>
          <h3 className="text-xl font-semibold text-secondary-100 leading-relaxed text-center">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Answer Options */}
        <div className="space-y-4">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-[1.01] ${
                selectedAnswer === option
                  ? 'bg-gradient-to-r from-blush-50 to-sage-50 border-blush-400 text-secondary-100 shadow-md'
                  : 'bg-gray-50 border-gray-200 hover:border-blush-300 hover:bg-blush-50/50 text-secondary-200'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-4 ${
                  selectedAnswer === option
                    ? 'bg-blush-400 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="flex-1">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Feedback Display */}
        {showFeedback && feedbackData && (
          <div className={`mt-6 p-6 rounded-xl border-2 ${
            feedbackData.isCorrect 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-start">
              <div className="text-2xl mr-3">
                {feedbackData.celebration ? feedbackData.celebration.emoji : (feedbackData.isCorrect ? '✅' : '❌')}
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg mb-2">
                  {feedbackData.celebration ? feedbackData.celebration.message : (feedbackData.isCorrect ? 'Correct!' : 'Incorrect')}
                </div>
                {feedbackData.isCorrect && feedbackData.streak > 1 && !feedbackData.celebration && (
                  <div className="mb-2 text-sm font-medium">
                    🎯 {feedbackData.streak} in a row!
                  </div>
                )}
                {!feedbackData.isCorrect && (
                  <div className="mb-2">
                    <span className="font-medium">Correct answer: </span>
                    {feedbackData.correctAnswer}
                  </div>
                )}
                {feedbackData.explanation && (
                  <div className="text-sm">
                    <span className="font-medium">Explanation: </span>
                    {feedbackData.explanation}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleSubmitAnswer}
            disabled={(!selectedAnswer || isSubmitting)}
            className="px-8 py-4 bg-gradient-to-r from-blush-500 to-sage-500 text-white rounded-xl font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:from-blush-600 hover:to-sage-600 transition-all duration-200 transform hover:scale-105 disabled:transform-none text-lg"
          >
            {showFeedback ? '✨ Loading next...' : (isSubmitting ? '⏳ Thinking...' : (assessment && assessment.responses.length === assessment.totalQuestions - 1 ? '🎉 See My Results!' : '💜 Next Question'))}
          </button>
          {selectedAnswer && !showFeedback && !isSubmitting && (
            <p className="text-sm text-secondary-300 mt-3">Nice choice! Ready when you are ✨</p>
          )}
          {!selectedAnswer && !showFeedback && (
            <p className="text-sm text-secondary-300 mt-3">Pick the answer that feels right to you 💕</p>
          )}
        </div>
      </div>

      {/* Encouraging Message */}
      <div className="bg-gradient-to-r from-blush-50 to-sage-50 rounded-xl p-4 border border-blush-200">
        <div className="text-center">
          <span className="text-2xl mr-2">🤗</span>
          <span className="text-sm text-secondary-200">
            <strong>Remember:</strong> You're doing great! This is just helping us figure out what to teach you next. No pressure! 💜
          </span>
        </div>
      </div>

      {/* Unicorn Celebration - Subtle Top Banner */}
      {showUnicornCelebration && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none animate-fade-in">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl px-6 py-3 shadow-lg border-2 border-purple-300">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🦄</div>
              <div>
                <div className="text-sm font-bold text-purple-800">Magical Streak!</div>
                <div className="text-xs text-purple-600">{currentStreak} in a row ✨</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}