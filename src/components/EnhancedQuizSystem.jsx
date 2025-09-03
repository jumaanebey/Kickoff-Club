import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

export default function EnhancedQuizSystem({ lesson, onComplete }) {
  const { actions } = useApp()
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [answers, setAnswers] = useState([])
  const [quizStartTime] = useState(Date.now())
  const [questionStartTime, setQuestionStartTime] = useState(Date.now())
  const [showResults, setShowResults] = useState(false)
  const [achievements, setAchievements] = useState([])

  const currentQuestion = lesson.quiz.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === lesson.quiz.questions.length - 1

  useEffect(() => {
    setQuestionStartTime(Date.now())
  }, [currentQuestionIndex])

  const handleAnswerSelect = (answerIndex) => {
    if (showFeedback) return
    setSelectedAnswer(answerIndex)
  }

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === currentQuestion.correct
    const timeSpent = Date.now() - questionStartTime
    
    const answerData = {
      questionId: currentQuestion.id,
      selectedAnswer,
      correct: isCorrect,
      timeSpent,
      points: calculatePoints(isCorrect, timeSpent)
    }

    setAnswers([...answers, answerData])
    setShowFeedback(true)

    // Add points to user progress
    if (isCorrect) {
      actions.updateUserProgress({
        stats: {
          totalPoints: answerData.points
        }
      })
    }
  }

  const calculatePoints = (isCorrect, timeSpent) => {
    if (!isCorrect) return 0
    
    const basePoints = 10
    const speedBonus = Math.max(0, Math.floor((15000 - timeSpent) / 1000)) // Bonus for answering quickly
    return basePoints + speedBonus
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      completeQuiz()
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
    }
  }

  const completeQuiz = () => {
    const totalQuestions = lesson.quiz.questions.length
    const correctAnswers = answers.filter(a => a.correct).length + (selectedAnswer === currentQuestion.correct ? 1 : 0)
    const totalPoints = answers.reduce((sum, a) => sum + a.points, 0) + 
      calculatePoints(selectedAnswer === currentQuestion.correct, Date.now() - questionStartTime)
    const completionTime = Date.now() - quizStartTime
    const accuracy = (correctAnswers / totalQuestions) * 100

    // Check for achievements
    const newAchievements = []
    if (accuracy === 100) {
      newAchievements.push({
        id: 'perfect-score',
        name: 'Perfect Score!',
        description: `Got 100% on ${lesson.title}`,
        icon: '🏆',
        points: 50
      })
    }
    if (completionTime < 60000) { // Under 1 minute
      newAchievements.push({
        id: 'speed-demon',
        name: 'Speed Demon',
        description: 'Completed quiz in under 1 minute',
        icon: '⚡',
        points: 25
      })
    }
    if (correctAnswers >= Math.ceil(totalQuestions * 0.8)) { // 80% or better
      newAchievements.push({
        id: 'quiz-master',
        name: 'Quiz Master',
        description: 'Scored 80% or better',
        icon: '🎯',
        points: 30
      })
    }

    setAchievements(newAchievements)

    // Update user progress
    actions.updateQuizResult(lesson.id, {
      score: accuracy,
      totalPoints,
      completionTime,
      achievements: newAchievements,
      timestamp: Date.now()
    })

    setShowResults(true)
    onComplete?.({
      score: accuracy,
      totalPoints,
      achievements: newAchievements
    })
  }

  if (showResults) {
    return <QuizResults lesson={lesson} answers={answers} achievements={achievements} />
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Question {currentQuestionIndex + 1} of {lesson.quiz.questions.length}</span>
          <span>{Math.round(((currentQuestionIndex + 1) / lesson.quiz.questions.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-sage-500 to-blush-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestionIndex + 1) / lesson.quiz.questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-sage-500 to-blush-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
            {currentQuestionIndex + 1}
          </div>
          <h2 className="text-2xl font-bold text-navy">{currentQuestion.question}</h2>
        </div>
      </div>

      {/* Answer Options */}
      <div className="space-y-3 mb-8">
        {currentQuestion.options.map((option, index) => {
          let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 "
          
          if (showFeedback) {
            if (index === currentQuestion.correct) {
              buttonClass += "bg-green-100 border-green-400 text-green-800"
            } else if (index === selectedAnswer) {
              buttonClass += "bg-red-100 border-red-400 text-red-800"
            } else {
              buttonClass += "bg-gray-100 border-gray-300 text-gray-600"
            }
          } else {
            if (selectedAnswer === index) {
              buttonClass += "bg-sage-100 border-sage-400 text-sage-800 transform scale-[1.02]"
            } else {
              buttonClass += "bg-gray-50 border-gray-200 hover:bg-sage-50 hover:border-sage-300 hover:transform hover:scale-[1.01]"
            }
          }

          return (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={buttonClass}
              disabled={showFeedback}
            >
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center text-sm font-bold ${
                  selectedAnswer === index ? 'border-sage-500 bg-sage-500 text-white' : 'border-gray-400'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                {option}
              </div>
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className={`p-4 rounded-lg mb-6 ${
          selectedAnswer === currentQuestion.correct 
            ? 'bg-green-50 border border-green-200' 
            : 'bg-red-50 border border-red-200'
        }`}>
          <div className="flex items-center mb-2">
            <span className="text-2xl mr-2">
              {selectedAnswer === currentQuestion.correct ? '✅' : '❌'}
            </span>
            <span className={`font-bold ${
              selectedAnswer === currentQuestion.correct ? 'text-green-800' : 'text-red-800'
            }`}>
              {selectedAnswer === currentQuestion.correct ? 'Correct!' : 'Incorrect'}
            </span>
          </div>
          <p className="text-gray-700">{currentQuestion.explanation}</p>
          {selectedAnswer === currentQuestion.correct && (
            <div className="mt-2 text-sm text-green-700">
              +{calculatePoints(true, Date.now() - questionStartTime)} points earned!
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        {currentQuestionIndex > 0 && !showFeedback && (
          <button
            onClick={() => {
              setCurrentQuestionIndex(currentQuestionIndex - 1)
              setSelectedAnswer(null)
            }}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Previous
          </button>
        )}
        
        <div className="flex-1" />

        {!showFeedback ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedAnswer === null}
            className={`px-8 py-3 rounded-lg font-semibold transition-all ${
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-sage-500 to-blush-500 text-white hover:shadow-lg hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="px-8 py-3 bg-gradient-to-r from-sage-500 to-blush-500 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
          >
            {isLastQuestion ? 'See Results' : 'Next Question'} →
          </button>
        )}
      </div>
    </div>
  )
}

function QuizResults({ lesson, answers, achievements }) {
  const totalQuestions = lesson.quiz.questions.length
  const correctAnswers = answers.filter(a => a.correct).length
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100)
  const totalPoints = answers.reduce((sum, a) => sum + a.points, 0)

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
      {/* Results Header */}
      <div className="mb-8">
        <div className="text-6xl mb-4">
          {accuracy >= 90 ? '🏆' : accuracy >= 70 ? '🎯' : accuracy >= 50 ? '👍' : '📚'}
        </div>
        <h2 className="text-3xl font-bold text-navy mb-2">Quiz Complete!</h2>
        <div className="text-5xl font-bold text-sage-600 mb-2">{accuracy}%</div>
        <p className="text-gray-600">
          You got {correctAnswers} out of {totalQuestions} questions correct
        </p>
      </div>

      {/* Points */}
      <div className="bg-gradient-to-r from-sage-50 to-blush-50 rounded-lg p-6 mb-8">
        <div className="text-2xl font-bold text-sage-700 mb-2">Points Earned</div>
        <div className="text-4xl font-bold text-sage-600">{totalPoints}</div>
      </div>

      {/* Achievements */}
      {achievements.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-navy mb-4">New Achievements!</h3>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.id}
                className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 animate-bounce"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center justify-center">
                  <span className="text-3xl mr-3">{achievement.icon}</span>
                  <div>
                    <div className="font-bold text-yellow-800">{achievement.name}</div>
                    <div className="text-sm text-yellow-700">{achievement.description}</div>
                    <div className="text-xs text-yellow-600">+{achievement.points} bonus points</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Performance Breakdown */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-bold text-navy mb-4">Performance Breakdown</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-600">Accuracy</div>
            <div className="font-bold">{accuracy}%</div>
          </div>
          <div>
            <div className="text-gray-600">Total Points</div>
            <div className="font-bold">{totalPoints}</div>
          </div>
          <div>
            <div className="text-gray-600">Correct Answers</div>
            <div className="font-bold">{correctAnswers}/{totalQuestions}</div>
          </div>
          <div>
            <div className="text-gray-600">Average Time</div>
            <div className="font-bold">{Math.round(answers.reduce((sum, a) => sum + a.timeSpent, 0) / answers.length / 1000)}s</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => window.location.href = '/lessons'}
          className="px-8 py-3 bg-gradient-to-r from-sage-500 to-blush-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
        >
          Continue Learning
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all"
        >
          Retake Quiz
        </button>
      </div>

      {/* Motivational Message */}
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-800">
          {accuracy >= 90 ? "Outstanding! You're becoming an football expert!" :
           accuracy >= 70 ? "Great job! You're really getting the hang of this!" :
           accuracy >= 50 ? "Good effort! Keep practicing and you'll improve!" :
           "Don't give up! Review the lesson and try again when you're ready."}
        </p>
      </div>
    </div>
  )
}