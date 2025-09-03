// Intelligent adaptive quiz system with ML-powered difficulty adjustment
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useApp } from '../context/AppContext'

// Question difficulty estimator using multiple factors
class QuestionDifficultyEngine {
  constructor() {
    this.difficultyFactors = {
      conceptComplexity: 0.3,
      wordCount: 0.1,
      multipleChoiceCount: 0.1,
      conceptPrerequisites: 0.2,
      averageResponseTime: 0.2,
      successRate: 0.1
    }
  }

  calculateDifficulty(question, userProgress, historicalData = {}) {
    let difficulty = 0.5 // Base difficulty
    
    // Concept complexity (based on lesson difficulty)
    const lessonDifficulty = question.lessonDifficulty || 'medium'
    const complexityMap = { easy: 0.2, medium: 0.5, hard: 0.8, expert: 1.0 }
    difficulty += (complexityMap[lessonDifficulty] - 0.5) * this.difficultyFactors.conceptComplexity
    
    // Word count factor (longer questions tend to be harder)
    const wordCount = question.question?.split(' ').length || 10
    const wordComplexity = Math.min(1, wordCount / 30) // Normalize to 30 words max
    difficulty += (wordComplexity - 0.5) * this.difficultyFactors.wordCount
    
    // Number of choices (more choices = potentially harder)
    const choiceCount = question.options?.length || 4
    const choiceComplexity = Math.min(1, (choiceCount - 2) / 4) // Normalize 2-6 choices
    difficulty += (choiceComplexity - 0.5) * this.difficultyFactors.multipleChoiceCount
    
    // Prerequisites (how much related knowledge user has)
    const prerequisitesMet = this.calculatePrerequisitesMet(question, userProgress)
    difficulty += (0.5 - prerequisitesMet) * this.difficultyFactors.conceptPrerequisites
    
    // Historical performance
    if (historicalData.averageResponseTime) {
      const timeComplexity = Math.min(1, historicalData.averageResponseTime / 30000) // 30s max
      difficulty += (timeComplexity - 0.5) * this.difficultyFactors.averageResponseTime
    }
    
    if (historicalData.successRate !== undefined) {
      difficulty += (0.5 - historicalData.successRate) * this.difficultyFactors.successRate
    }
    
    return Math.max(0.1, Math.min(0.9, difficulty))
  }
  
  calculatePrerequisitesMet(question, userProgress) {
    const requiredConcepts = question.concepts || []
    const userKnownConcepts = userProgress?.lessons?.completed || []
    
    if (requiredConcepts.length === 0) return 0.5 // No prerequisites
    
    const metPrerequisites = requiredConcepts.filter(concept => 
      userKnownConcepts.some(lesson => lesson.includes(concept))
    ).length
    
    return metPrerequisites / requiredConcepts.length
  }
}

// Adaptive difficulty adjuster using Item Response Theory principles
class DifficultyAdjuster {
  constructor() {
    this.targetAccuracy = 0.75 // Target 75% success rate for optimal learning
    this.adjustmentRate = 0.1
    this.minDifficulty = 0.1
    this.maxDifficulty = 0.9
  }
  
  adjustDifficulty(currentDifficulty, recentPerformance) {
    if (recentPerformance.length === 0) return currentDifficulty
    
    const recentAccuracy = recentPerformance.reduce((sum, p) => sum + (p.correct ? 1 : 0), 0) / recentPerformance.length
    const accuracyDelta = recentAccuracy - this.targetAccuracy
    
    // Adjust difficulty inversely to accuracy
    let newDifficulty = currentDifficulty - (accuracyDelta * this.adjustmentRate)
    
    // Apply constraints
    newDifficulty = Math.max(this.minDifficulty, Math.min(this.maxDifficulty, newDifficulty))
    
    return newDifficulty
  }
  
  recommendNextQuestionDifficulty(userAbility, questionPool) {
    // Find question closest to user ability for optimal challenge
    return questionPool
      .map(q => ({ ...q, difficultyMatch: Math.abs(q.difficulty - userAbility) }))
      .sort((a, b) => a.difficultyMatch - b.difficultyMatch)[0]
  }
}

const AdaptiveQuiz = ({ 
  lessonId, 
  questions = [], 
  onComplete, 
  onProgress,
  maxQuestions = 10,
  showExplanations = true,
  enableSpacedRepetition = true
}) => {
  const { state, actions } = useApp()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)
  const [userResponses, setUserResponses] = useState([])
  const [adaptiveDifficulty, setAdaptiveDifficulty] = useState(0.5)
  const [startTime, setStartTime] = useState(Date.now())
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [confidenceLevel, setConfidenceLevel] = useState(null)
  const [hintUsed, setHintUsed] = useState(false)
  const [showHint, setShowHint] = useState(false)
  
  // Initialize engines
  const difficultyEngine = useMemo(() => new QuestionDifficultyEngine(), [])
  const difficultyAdjuster = useMemo(() => new DifficultyAdjuster(), [])
  
  // Process and rank questions by difficulty
  const processedQuestions = useMemo(() => {
    return questions.map(question => ({
      ...question,
      difficulty: difficultyEngine.calculateDifficulty(
        question, 
        state.user.progress,
        {} // Historical data would be passed here
      )
    })).sort((a, b) => a.difficulty - b.difficulty)
  }, [questions, difficultyEngine, state.user.progress])
  
  // Select next question based on adaptive difficulty
  const selectNextQuestion = useCallback(() => {
    const remainingQuestions = processedQuestions.filter((_, index) => 
      !userResponses.some(response => response.questionIndex === index)
    )
    
    if (remainingQuestions.length === 0) return null
    
    const recommended = difficultyAdjuster.recommendNextQuestionDifficulty(
      adaptiveDifficulty,
      remainingQuestions
    )
    
    return processedQuestions.findIndex(q => q.id === recommended.id)
  }, [processedQuestions, userResponses, adaptiveDifficulty, difficultyAdjuster])
  
  // Handle answer selection
  const handleAnswerSelect = useCallback((answerIndex) => {
    setSelectedAnswer(answerIndex)
  }, [])
  
  // Handle confidence rating
  const handleConfidenceSelect = useCallback((confidence) => {
    setConfidenceLevel(confidence)
  }, [])
  
  // Submit answer and process response
  const handleSubmitAnswer = useCallback(() => {
    const question = processedQuestions[currentQuestion]
    const responseTime = Date.now() - questionStartTime
    const isCorrect = selectedAnswer === question.correctAnswer
    
    const response = {
      questionIndex: currentQuestion,
      questionId: question.id,
      selectedAnswer,
      correctAnswer: question.correctAnswer,
      correct: isCorrect,
      responseTime,
      confidence: confidenceLevel,
      hintUsed,
      timestamp: Date.now()
    }
    
    // Update responses
    setUserResponses(prev => [...prev, response])
    
    // Adjust difficulty based on recent performance
    const recentResponses = [...userResponses, response].slice(-5) // Last 5 responses
    const newDifficulty = difficultyAdjuster.adjustDifficulty(adaptiveDifficulty, recentResponses)
    setAdaptiveDifficulty(newDifficulty)
    
    setShowResult(true)
    
    // Progress callback
    if (onProgress) {
      onProgress({
        currentQuestion: currentQuestion + 1,
        totalQuestions: Math.min(maxQuestions, processedQuestions.length),
        score: (userResponses.filter(r => r.correct).length + (isCorrect ? 1 : 0)) / (userResponses.length + 1),
        adaptiveDifficulty: newDifficulty
      })
    }
  }, [currentQuestion, selectedAnswer, questionStartTime, confidenceLevel, hintUsed, processedQuestions, userResponses, adaptiveDifficulty, difficultyAdjuster, maxQuestions, onProgress])
  
  // Move to next question
  const handleNextQuestion = useCallback(() => {
    const nextIndex = selectNextQuestion()
    
    if (nextIndex === null || userResponses.length >= maxQuestions) {
      // Quiz complete
      setQuizComplete(true)
      
      const totalScore = userResponses.filter(r => r.correct).length / userResponses.length
      const totalTime = Date.now() - startTime
      
      if (onComplete) {
        onComplete({
          responses: userResponses,
          score: totalScore,
          totalTime,
          adaptiveDifficulty,
          recommendations: generateRecommendations()
        })
      }
      
      return
    }
    
    setCurrentQuestion(nextIndex)
    setSelectedAnswer(null)
    setConfidenceLevel(null)
    setHintUsed(false)
    setShowHint(false)
    setShowResult(false)
    setQuestionStartTime(Date.now())
  }, [selectNextQuestion, userResponses, maxQuestions, startTime, adaptiveDifficulty, onComplete])
  
  const generateRecommendations = useCallback(() => {
    const accuracy = userResponses.filter(r => r.correct).length / userResponses.length
    const avgResponseTime = userResponses.reduce((sum, r) => sum + r.responseTime, 0) / userResponses.length
    const avgConfidence = userResponses.reduce((sum, r) => sum + (r.confidence || 3), 0) / userResponses.length
    
    const recommendations = []
    
    if (accuracy < 0.6) {
      recommendations.push({
        type: 'review',
        message: 'Consider reviewing the lesson material before retaking the quiz.',
        priority: 'high'
      })
    }
    
    if (avgResponseTime > 20000) { // 20 seconds
      recommendations.push({
        type: 'pace',
        message: 'Try to answer more quickly to build confidence and fluency.',
        priority: 'medium'
      })
    }
    
    if (avgConfidence < 2.5) {
      recommendations.push({
        type: 'confidence',
        message: 'Focus on building confidence through additional practice.',
        priority: 'medium'
      })
    }
    
    if (accuracy > 0.9 && avgResponseTime < 10000) {
      recommendations.push({
        type: 'advancement',
        message: 'Great performance! You\'re ready for more challenging material.',
        priority: 'low'
      })
    }
    
    return recommendations
  }, [userResponses])
  
  const toggleHint = useCallback(() => {
    if (!showHint && !hintUsed) {
      setHintUsed(true)
    }
    setShowHint(!showHint)
  }, [showHint, hintUsed])
  
  if (processedQuestions.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">No questions available for this quiz.</div>
      </div>
    )
  }
  
  if (quizComplete) {
    const score = userResponses.filter(r => r.correct).length / userResponses.length
    const recommendations = generateRecommendations()
    
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-accent-400 to-primary-400 flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
          <p className="text-xl text-gray-600">
            You scored {Math.round(score * 100)}% ({userResponses.filter(r => r.correct).length}/{userResponses.length} correct)
          </p>
        </div>
        
        {recommendations.length > 0 && (
          <div className="card mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Personalized Recommendations</h3>
            <div className="space-y-3">
              {recommendations.map((rec, index) => (
                <div key={index} className="flex items-start">
                  <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                    rec.priority === 'high' ? 'bg-error-500' :
                    rec.priority === 'medium' ? 'bg-warning-500' :
                    'bg-success-500'
                  }`} />
                  <p className="text-gray-700">{rec.message}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="text-center">
          <button
            onClick={() => onComplete && onComplete({ responses: userResponses, score, recommendations })}
            className="btn-primary mr-4"
          >
            Continue
          </button>
          <button
            onClick={() => {
              setCurrentQuestion(0)
              setUserResponses([])
              setQuizComplete(false)
              setStartTime(Date.now())
              setQuestionStartTime(Date.now())
            }}
            className="btn-secondary"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    )
  }
  
  const question = processedQuestions[currentQuestion]
  if (!question) return null
  
  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {userResponses.length + 1} of {Math.min(maxQuestions, processedQuestions.length)}
          </span>
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-3 h-3 rounded-full mr-2" style={{
              backgroundColor: `hsl(${Math.round((1 - question.difficulty) * 120)}, 70%, 50%)`
            }} />
            Difficulty: {Math.round(question.difficulty * 100)}%
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-accent-500 to-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((userResponses.length + 1) / Math.min(maxQuestions, processedQuestions.length)) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Question Card */}
      <div className="card mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {question.question}
        </h2>
        
        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedAnswer === index
                  ? showResult
                    ? index === question.correctAnswer
                      ? 'border-success-500 bg-success-50 text-success-700'
                      : 'border-error-500 bg-error-50 text-error-700'
                    : 'border-accent-500 bg-accent-50 text-accent-700'
                  : showResult && index === question.correctAnswer
                    ? 'border-success-500 bg-success-50 text-success-700'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                  selectedAnswer === index
                    ? showResult
                      ? index === question.correctAnswer
                        ? 'border-success-500 bg-success-500'
                        : 'border-error-500 bg-error-500'
                      : 'border-accent-500 bg-accent-500'
                    : showResult && index === question.correctAnswer
                      ? 'border-success-500 bg-success-500'
                      : 'border-gray-300'
                }`}>
                  {(selectedAnswer === index && showResult) || (showResult && index === question.correctAnswer) ? (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : selectedAnswer === index ? (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="3" />
                    </svg>
                  ) : null}
                </div>
                <span className="font-medium">{String.fromCharCode(65 + index)}.</span>
                <span className="ml-2">{option}</span>
              </div>
            </button>
          ))}
        </div>
        
        {/* Hint */}
        {question.hint && (
          <div className="mb-6">
            <button
              onClick={toggleHint}
              className="flex items-center text-accent-600 hover:text-accent-700 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
            {showHint && (
              <div className="mt-3 p-4 bg-accent-50 border border-accent-200 rounded-lg">
                <p className="text-accent-800">{question.hint}</p>
              </div>
            )}
          </div>
        )}
        
        {/* Confidence Rating */}
        {!showResult && selectedAnswer !== null && (
          <div className="mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">How confident are you in this answer?</p>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map(level => (
                <button
                  key={level}
                  onClick={() => handleConfidenceSelect(level)}
                  className={`px-3 py-2 rounded-lg border transition-colors ${
                    confidenceLevel === level
                      ? 'border-accent-500 bg-accent-100 text-accent-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Not confident</span>
              <span>Very confident</span>
            </div>
          </div>
        )}
        
        {/* Explanation */}
        {showResult && showExplanations && question.explanation && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-2">Explanation:</h4>
            <p className="text-gray-700">{question.explanation}</p>
          </div>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-between">
        <div className="text-sm text-gray-500">
          Score: {userResponses.filter(r => r.correct).length}/{userResponses.length} correct
        </div>
        <div>
          {showResult ? (
            <button
              onClick={handleNextQuestion}
              className="btn-primary"
            >
              {userResponses.length >= maxQuestions - 1 ? 'Complete Quiz' : 'Next Question'}
            </button>
          ) : (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null || confidenceLevel === null}
              className="btn-primary"
            >
              Submit Answer
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdaptiveQuiz