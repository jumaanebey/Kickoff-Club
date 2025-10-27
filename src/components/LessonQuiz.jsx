import React, { useState } from 'react'
import { allLessons } from '../data/lessonsIndex'
import { useApp } from '../context/AppContext'

export default function LessonQuiz({ lessonId, onClose }) {
  const { actions } = useApp()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizComplete, setQuizComplete] = useState(false)
  const [score, setScore] = useState(0)

  // Find the lesson data
  const lesson = allLessons.find(l => l.id === lessonId)

  if (!lesson || !lesson.quiz) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
          <h2 className="text-2xl font-bold text-secondary-100 mb-4">Quiz Not Available</h2>
          <p className="text-secondary-200 mb-6">This lesson doesn't have a quiz yet.</p>
          <button onClick={onClose} className="btn-primary">
            Back to Lessons
          </button>
        </div>
      </div>
    )
  }

  // Handle both single question and multiple questions format
  const quizData = lesson.quiz
  const questions = quizData.questions ? quizData.questions : [{
    question: quizData.question,
    options: quizData.options,
    correct: quizData.correctIndex,
    explanation: quizData.explanation,
    encouragement: quizData.encouragement
  }]

  const totalQuestions = questions.length
  const currentQ = questions[currentQuestion]

  const handleAnswerSelect = (index) => {
    if (showExplanation) return // Already answered

    setSelectedAnswer(index)
    setShowExplanation(true)

    // Check if correct
    if (index === currentQ.correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      // Move to next question
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      // Quiz complete
      setQuizComplete(true)

      // Mark lesson as completed if they got at least 50% correct
      if (score / totalQuestions >= 0.5) {
        actions.completeLesson(lessonId)
      }
    }
  }

  const handleRetry = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setQuizComplete(false)
    setScore(0)
  }

  // Quiz complete screen
  if (quizComplete) {
    const percentage = Math.round((score / totalQuestions) * 100)
    const passed = percentage >= 50

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
          <div className="text-center">
            <div className="text-6xl mb-4">
              {passed ? '🎉' : '💪'}
            </div>
            <h2 className="text-3xl font-bold text-secondary-100 mb-4">
              {passed ? 'Great Job!' : 'Keep Learning!'}
            </h2>
            <p className="text-xl text-secondary-200 mb-6">
              You got <span className="font-bold text-primary-600">{score} out of {totalQuestions}</span> correct ({percentage}%)
            </p>

            {passed ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                <p className="text-green-800">
                  ✨ Lesson completed! You're making great progress.
                </p>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-blue-800">
                  Try reviewing the lesson and taking the quiz again. You've got this!
                </p>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button onClick={handleRetry} className="btn-secondary px-8 py-3">
                Try Again
              </button>
              <button onClick={onClose} className="btn-primary px-8 py-3">
                Back to Lessons
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Quiz question screen
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-100 to-accent-100 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-secondary-100">{lesson.title} Quiz</h2>
            <button
              onClick={onClose}
              className="text-secondary-300 hover:text-secondary-100 text-2xl font-bold"
              aria-label="Close"
            >
              ×
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 bg-white/50 rounded-full h-2">
              <div
                className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-secondary-100">
              {currentQuestion + 1}/{totalQuestions}
            </span>
          </div>
        </div>

        {/* Question */}
        <div className="p-8">
          <h3 className="text-xl font-semibold text-secondary-100 mb-6">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {currentQ.options.map((option, index) => {
              const isSelected = selectedAnswer === index
              const isCorrect = index === currentQ.correct
              const showResult = showExplanation

              let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 "

              if (!showResult) {
                buttonClass += "border-gray-200 hover:border-primary-300 hover:bg-primary-50 cursor-pointer"
              } else if (isCorrect) {
                buttonClass += "border-green-500 bg-green-50 text-green-900"
              } else if (isSelected && !isCorrect) {
                buttonClass += "border-red-500 bg-red-50 text-red-900"
              } else {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-500"
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showExplanation}
                  className={buttonClass}
                >
                  <div className="flex items-center">
                    <span className="font-semibold mr-3">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <span>{option}</span>
                    {showResult && isCorrect && (
                      <span className="ml-auto text-green-600">✓</span>
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <span className="ml-auto text-red-600">✗</span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`p-4 rounded-xl border-2 mb-6 ${
              selectedAnswer === currentQ.correct
                ? 'bg-green-50 border-green-200'
                : 'bg-blue-50 border-blue-200'
            }`}>
              <p className={`font-medium mb-2 ${
                selectedAnswer === currentQ.correct ? 'text-green-900' : 'text-blue-900'
              }`}>
                {selectedAnswer === currentQ.correct ? '✓ Correct!' : 'Not quite right'}
              </p>
              <p className={
                selectedAnswer === currentQ.correct ? 'text-green-800' : 'text-blue-800'
              }>
                {currentQ.explanation}
              </p>
              {currentQ.encouragement && selectedAnswer === currentQ.correct && (
                <p className="text-green-700 mt-2 italic">
                  {currentQ.encouragement}
                </p>
              )}
            </div>
          )}

          {/* Next Button */}
          {showExplanation && (
            <button
              onClick={handleNext}
              className="btn-primary w-full py-3 text-lg"
            >
              {currentQuestion < totalQuestions - 1 ? 'Next Question →' : 'See Results'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
