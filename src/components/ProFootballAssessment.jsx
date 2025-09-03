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
      
      if (currentUser && currentUser.progress) {
        try {
          const unlockedTiersList = getUnlockedTiers(currentUser.progress)
          const tierProgressData = getTierProgress(currentUser.progress)
          
          // Ensure beginner is always available
          const finalUnlockedTiers = unlockedTiersList.includes('beginner') 
            ? unlockedTiersList 
            : ['beginner', ...unlockedTiersList]
          
          setUnlockedTiers(finalUnlockedTiers)
          setTierProgress(tierProgressData)
        } catch (progressError) {
          console.warn('Error loading user progress:', progressError)
          // Fallback to beginner only
          setUnlockedTiers(['beginner'])
          setTierProgress({ unlockedCount: 1, totalCount: 4, unlockedTiers: ['beginner'] })
        }
      } else {
        // No user or no progress - default to beginner available
        setUnlockedTiers(['beginner'])
        setTierProgress({ unlockedCount: 1, totalCount: 4, unlockedTiers: ['beginner'] })
      }
    } catch (error) {
      console.error('Error initializing assessment:', error)
      setError('Failed to initialize assessment. Please refresh the page.')
      // Still allow beginner tier as fallback
      setUnlockedTiers(['beginner'])
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
      // Hide unicorn celebration after 3 seconds
      setTimeout(() => setShowUnicornCelebration(false), 3000)
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

    // Show feedback for 2.5 seconds (longer if unicorn), then proceed
    const feedbackDelay = shouldShowUnicorn ? 3500 : 2500
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
      
      // Update unlocked tiers if new tier was unlocked
      if (finalResults.unlocksNext) {
        const updatedUser = getCurrentUser()
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            🏈 Professional Football Knowledge Assessment
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Choose your assessment type to get started
          </p>
        </div>

        {/* Tier Progress Display */}
        {tierProgress && (
          <div className="mb-6 bg-gradient-to-r from-sage-50 to-blush-50 rounded-lg p-6 border border-sage-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🏆 Assessment Progress</h3>
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-700">Tiers Unlocked</span>
              <span className="font-bold text-sage-600">
                {tierProgress.unlockedCount} / {tierProgress.totalCount}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
              <div
                className="bg-sage-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(tierProgress.unlockedCount / tierProgress.totalCount) * 100}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Assessment Tier Selection */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {Object.entries(assessmentConfig.modes).map(([mode, config]) => {
            const isUnlocked = unlockedTiers.includes(mode)
            const tierIcon = ['🥉', '🥈', '🥇', '💎'][config.tier - 1] || '🎯'
            
            return (
              <button
                key={mode}
                onClick={() => {
                  if (isUnlocked) {
                    setSelectedMode(mode)
                    startAssessment(mode)
                  }
                }}
                disabled={!isUnlocked}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  isUnlocked
                    ? 'hover:shadow-lg border-gray-200 hover:border-sage-300 cursor-pointer'
                    : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
                }`}
              >
                <div className="mb-3">
                  <div className="text-3xl mb-2">
                    {isUnlocked ? tierIcon : '🔒'}
                  </div>
                  <h3 className={`text-lg font-bold mb-1 ${isUnlocked ? 'text-gray-900' : 'text-gray-500'}`}>
                    {config.name}
                  </h3>
                  <div className="text-xs text-gray-500 mb-2">
                    Tier {config.tier} • {config.totalQuestions} Questions
                  </div>
                </div>
                
                <div className={`text-xs mb-3 ${isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                  {config.description}
                </div>
                
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Difficulty:</span>
                    <span className="font-semibold capitalize">
                      {config.difficulty?.join(', ') || 'Mixed'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pass Score:</span>
                    <span className="font-semibold">{config.passingScore || 70}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span className="font-semibold">{Math.round(config.timeLimit / 60)} min</span>
                  </div>
                </div>
                
                {!isUnlocked && config.requiresUnlock && (
                  <div className="mt-3 text-xs text-red-600 font-medium">
                    🔒 Complete previous tier to unlock
                  </div>
                )}
              </button>
            )
          })}
        </div>

        {/* Assessment Info */}

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="bg-sage-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">📊 How It Works</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-sage-500 mr-2">•</span>
                <span>Adaptive difficulty based on your performance</span>
              </li>
              <li className="flex items-start">
                <span className="text-sage-500 mr-2">•</span>
                <span>Questions across all pro football topics</span>
              </li>
              <li className="flex items-start">
                <span className="text-sage-500 mr-2">•</span>
                <span>30 seconds per question</span>
              </li>
              <li className="flex items-start">
                <span className="text-sage-500 mr-2">•</span>
                <span>Personalized learning recommendations</span>
              </li>
            </ul>
          </div>

          <div className="bg-blush-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">🎯 Assessment Areas</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { name: 'Basic Rules', icon: '📜' },
                { name: 'Positions', icon: '👥' },
                { name: 'Strategy', icon: '🧠' },
                { name: 'Advanced', icon: '⚡' }
              ].map(area => (
                <div key={area.name} className="flex items-center p-3 bg-white rounded-lg">
                  <span className="text-xl mr-2">{area.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{area.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <span className="text-yellow-500 text-xl mr-3">💡</span>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">Tips for Success</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Read each question carefully</li>
                <li>• Don't overthink - go with your first instinct</li>
                <li>• The test adapts to your skill level as you progress</li>
                <li>• There's no penalty for wrong answers</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
          <div className="flex items-start">
            <span className="text-yellow-500 text-xl mr-3">💡</span>
            <div>
              <h4 className="font-semibold text-yellow-800 mb-2">How Tiered Assessment Works:</h4>
              <ul className="text-sm text-yellow-700 space-y-1 text-left">
                <li>• <strong>Start with Beginner:</strong> Everyone begins here to establish baseline</li>
                <li>• <strong>Pass to Unlock:</strong> Score {assessmentConfig.modes.beginner.passingScore}%+ to unlock the next tier</li>
                <li>• <strong>Progressive Challenge:</strong> Each tier gets harder with more questions</li>
                <li>• <strong>Prove Your Expertise:</strong> Reach Expert tier to show true pro football mastery</li>
              </ul>
            </div>
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
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Pro Football Assessment</h2>
            <p className="text-gray-600">
              Question {assessment.responses.length + 1} of {assessment.totalQuestions}
            </p>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold mb-1 ${timeRemaining <= 10 ? 'text-red-600' : 'text-gray-900'}`}>
              {formatTime(timeRemaining)}
            </div>
            <div className="text-sm text-gray-500">Time left</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-sage-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>{progress}% Complete</span>
          <div className="flex items-center gap-4">
            {currentStreak > 0 && (
              <span className="text-green-600 font-medium">
                {currentStreak >= 5 ? '🦄' : currentStreak >= 3 ? '🔥' : '⭐'} {currentStreak} streak
              </span>
            )}
            <span className="capitalize">{assessment.currentDifficulty} Level</span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-6">
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <span className="inline-block px-3 py-1 bg-sage-100 text-sage-800 rounded-full text-sm font-medium capitalize mr-3">
              {currentQuestion.category.replace('-', ' ')}
            </span>
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium capitalize">
              {currentQuestion.difficulty}
            </span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 leading-relaxed">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswer === option
                  ? 'bg-sage-50 border-sage-400 text-sage-900'
                  : 'bg-gray-50 border-gray-200 hover:border-sage-300 text-gray-700'
              }`}
            >
              <span className="font-medium mr-3">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
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
        <div className="mt-8 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {showFeedback ? 'Loading next question...' : (isSubmitting ? 'Processing...' : (selectedAnswer ? `Selected: ${selectedAnswer}` : 'Select an answer to continue'))}
          </div>
          <button
            onClick={handleSubmitAnswer}
            disabled={(!selectedAnswer || isSubmitting)}
            className="px-8 py-3 bg-sage-500 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-sage-600 transition-colors"
          >
            {showFeedback ? 'Loading Next Question...' : (isSubmitting ? 'Processing...' : (assessment && assessment.responses.length === assessment.totalQuestions - 1 ? 'Finish Assessment' : 'Next Question'))} →
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
        <div className="flex items-start">
          <span className="text-yellow-500 text-lg mr-2">💡</span>
          <div className="text-sm text-yellow-700">
            <strong>Tip:</strong> The assessment adapts to your performance. Don't worry about getting everything right - focus on doing your best!
          </div>
        </div>
      </div>

      {/* Unicorn Celebration Overlay */}
      {showUnicornCelebration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 text-center shadow-2xl animate-bounce">
            <div className="text-6xl mb-4 animate-pulse">🦄</div>
            <div className="text-2xl font-bold text-purple-800 mb-2">MAGICAL STREAK!</div>
            <div className="text-lg text-purple-600">You're on a {currentStreak} question winning streak!</div>
            <div className="text-sm text-purple-500 mt-2">✨ Keep the magic alive! ✨</div>
          </div>
        </div>
      )}
    </div>
  )
}