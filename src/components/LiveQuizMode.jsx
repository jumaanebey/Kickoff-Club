import React, { useState, useEffect } from 'react'

const LiveQuizMode = ({ lesson, currentTime, onQuizComplete, isActive }) => {
  const [activeQuizzes, setActiveQuizzes] = useState([])
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState({})
  const [quizHistory, setQuizHistory] = useState([])

  // Define quiz points throughout the lesson
  const quizPoints = [
    {
      timestamp: 15,
      question: "What does a 'down' represent?",
      options: [
        "The end of a play",
        "One attempt to advance the ball",
        "A type of penalty",
        "The game clock stopping"
      ],
      correctIndex: 1,
      explanation: "A down is one of the 4 attempts a team gets to advance the ball 10 yards.",
      points: 10
    },
    {
      timestamp: 45,
      question: "If it's 3rd & 7, what does this mean?",
      options: [
        "3rd quarter, 7 minutes left",
        "3rd down, need 7 more yards for a first down",
        "3rd penalty, 7 yard loss",
        "3rd timeout, 7 players on field"
      ],
      correctIndex: 1,
      explanation: "3rd & 7 means it's third down and the team needs 7 yards to get a new set of downs.",
      points: 15
    },
    {
      timestamp: 75,
      question: "What usually happens on 4th down?",
      options: [
        "Teams always go for it",
        "Automatic turnover",
        "Teams punt, kick field goal, or go for it",
        "The quarter ends"
      ],
      correctIndex: 2,
      explanation: "On 4th down, teams decide whether to punt (most common), attempt a field goal (if close enough), or 'go for it' and try to convert.",
      points: 20
    }
  ]

  useEffect(() => {
    if (!isActive) return

    // Check if we should trigger any quizzes
    const newQuizzes = quizPoints.filter(quiz => {
      const shouldTrigger = currentTime >= quiz.timestamp && 
                           currentTime < quiz.timestamp + 0.5 && // Small window
                           !quizHistory.includes(quiz.timestamp)
      return shouldTrigger
    })

    if (newQuizzes.length > 0) {
      setActiveQuizzes(prev => [...prev, ...newQuizzes])
      setQuizHistory(prev => [...prev, ...newQuizzes.map(q => q.timestamp)])
    }
  }, [currentTime, isActive, quizHistory])

  const handleAnswer = (quizTimestamp, selectedIndex) => {
    setAnswers(prev => ({
      ...prev,
      [quizTimestamp]: selectedIndex
    }))

    // Show result after a short delay
    setTimeout(() => {
      setShowResults(prev => ({
        ...prev,
        [quizTimestamp]: true
      }))
    }, 500)

    // Remove quiz after showing result
    setTimeout(() => {
      setActiveQuizzes(prev => prev.filter(q => q.timestamp !== quizTimestamp))
      
      // Call completion callback with score info
      const quiz = quizPoints.find(q => q.timestamp === quizTimestamp)
      const isCorrect = selectedIndex === quiz.correctIndex
      onQuizComplete?.({
        timestamp: quizTimestamp,
        correct: isCorrect,
        points: isCorrect ? quiz.points : 0
      })
    }, 3000)
  }

  const dismissQuiz = (quizTimestamp) => {
    setActiveQuizzes(prev => prev.filter(q => q.timestamp !== quizTimestamp))
  }

  if (!isActive || activeQuizzes.length === 0) return null

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {activeQuizzes.map(quiz => {
        const userAnswer = answers[quiz.timestamp]
        const showResult = showResults[quiz.timestamp]
        const isCorrect = userAnswer === quiz.correctIndex

        return (
          <div key={quiz.timestamp} className="bg-white rounded-lg p-6 m-4 max-w-lg shadow-xl">
            {/* Quiz Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-2">🤔</span>
                <h3 className="text-lg font-bold text-navy">Live Quiz!</h3>
              </div>
              <div className="text-sm text-gray-500">
                +{quiz.points} pts
              </div>
            </div>

            {/* Question */}
            <div className="mb-4">
              <p className="text-gray-800 font-medium">{quiz.question}</p>
            </div>

            {/* Options */}
            {!showResult ? (
              <div className="space-y-2 mb-4">
                {quiz.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(quiz.timestamp, index)}
                    disabled={userAnswer !== undefined}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      userAnswer === index
                        ? 'bg-sage-100 border-sage-300'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    } ${userAnswer !== undefined ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
                  >
                    <span className="font-medium text-sm text-gray-600 mr-2">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="mb-4">
                {/* Show result */}
                <div className={`p-4 rounded-lg mb-3 ${
                  isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <div className={`font-bold mb-2 ${
                    isCorrect ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {isCorrect ? '✅ Correct!' : '❌ Not quite right'}
                  </div>
                  <p className="text-sm text-gray-700">
                    {quiz.explanation}
                  </p>
                  {isCorrect && (
                    <div className="mt-2 text-sm font-medium text-green-700">
                      +{quiz.points} points earned!
                    </div>
                  )}
                </div>

                {/* Show correct answer if wrong */}
                {!isCorrect && (
                  <div className="text-sm text-gray-600">
                    <strong>Correct answer:</strong> {quiz.options[quiz.correctIndex]}
                  </div>
                )}
              </div>
            )}

            {/* Controls */}
            <div className="flex justify-between items-center text-sm">
              {!showResult ? (
                <>
                  <button 
                    onClick={() => dismissQuiz(quiz.timestamp)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    Skip Quiz
                  </button>
                  <div className="text-gray-500">
                    {userAnswer !== undefined ? 'Checking answer...' : 'Select your answer'}
                  </div>
                </>
              ) : (
                <div className="w-full text-center text-gray-500">
                  Quiz will close in 2 seconds...
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default LiveQuizMode