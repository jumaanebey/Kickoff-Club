import React, { useState, useEffect } from 'react'
import { getProgressData } from '../utils/progressTracker'

const PracticeMode = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [difficulty, setDifficulty] = useState('all')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [practiceStats, setPracticeStats] = useState({
    correct: 0,
    incorrect: 0,
    streak: 0,
    bestStreak: 0
  })
  
  // Practice questions pool
  const questionPool = [
    // Basic Rules
    {
      id: 'q1',
      category: 'basic-rules',
      difficulty: 'easy',
      question: 'How many downs does a team get to advance 10 yards?',
      options: ['2', '3', '4', '5'],
      correctIndex: 2,
      explanation: 'Teams get 4 downs (attempts) to advance the ball 10 yards and earn a new set of downs.',
      hint: 'Think about why it\'s called "4th down"'
    },
    {
      id: 'q2',
      category: 'basic-rules',
      difficulty: 'medium',
      question: 'What happens if a team doesn\'t gain 10 yards in 4 downs?',
      options: [
        'They get 4 more downs',
        'The other team gets the ball where they are',
        'They must kick a field goal',
        'The quarter ends'
      ],
      correctIndex: 1,
      explanation: 'If a team fails to gain 10 yards in 4 downs, it\'s a "turnover on downs" and the opposing team gets the ball at that spot.',
      hint: 'This is why teams usually punt on 4th down'
    },
    // Scoring
    {
      id: 'q3',
      category: 'scoring',
      difficulty: 'easy',
      question: 'How many points is a touchdown worth?',
      options: ['3', '6', '7', '10'],
      correctIndex: 1,
      explanation: 'A touchdown is worth 6 points. The extra point attempt (worth 1) or 2-point conversion comes after.',
      hint: 'The "7th point" is separate'
    },
    {
      id: 'q4',
      category: 'scoring',
      difficulty: 'medium',
      question: 'From where is the extra point kicked after a touchdown?',
      options: ['5-yard line', '10-yard line', '15-yard line', '20-yard line'],
      correctIndex: 2,
      explanation: 'Extra points are kicked from the 15-yard line, making it a 33-yard kick attempt.',
      hint: 'It was moved back to make it less automatic'
    },
    // Positions
    {
      id: 'q5',
      category: 'positions',
      difficulty: 'easy',
      question: 'Which position touches the ball on every offensive play?',
      options: ['Running back', 'Wide receiver', 'Quarterback', 'Tight end'],
      correctIndex: 2,
      explanation: 'The quarterback receives the snap from the center on every offensive play, then decides to hand off, pass, or run.',
      hint: 'They\'re called the "field general"'
    },
    {
      id: 'q6',
      category: 'positions',
      difficulty: 'hard',
      question: 'What is an audible?',
      options: [
        'A loud crowd noise',
        'When the QB changes the play at the line',
        'A penalty call',
        'A type of defensive formation'
      ],
      correctIndex: 1,
      explanation: 'An audible is when the quarterback changes the play at the line of scrimmage based on what they see from the defense.',
      hint: 'QBs yell out new signals'
    },
    // Strategy
    {
      id: 'q7',
      category: 'strategy',
      difficulty: 'medium',
      question: 'When does the clock stop in football?',
      options: [
        'Only at the end of quarters',
        'On every play',
        'Incomplete passes, out of bounds, timeouts, penalties',
        'Never - it always runs'
      ],
      correctIndex: 2,
      explanation: 'The clock stops for incomplete passes, when players go out of bounds, timeouts, scoring plays, and certain penalties.',
      hint: 'There are multiple situations'
    },
    {
      id: 'q8',
      category: 'strategy',
      difficulty: 'hard',
      question: 'What is the two-minute warning?',
      options: [
        'A penalty warning',
        'Automatic timeout at 2:00 in each half',
        'Time to warm up',
        'Coach\'s challenge deadline'
      ],
      correctIndex: 1,
      explanation: 'The two-minute warning is an automatic timeout when exactly 2:00 remains in each half, giving teams time to strategize.',
      hint: 'It\'s like a free timeout'
    },
    // Advanced Rules
    {
      id: 'q9',
      category: 'advanced-rules',
      difficulty: 'hard',
      question: 'What is pass interference?',
      options: [
        'Blocking before the snap',
        'Illegally preventing a receiver from catching the ball',
        'Too many players on the field',
        'Throwing two passes on one play'
      ],
      correctIndex: 1,
      explanation: 'Pass interference occurs when a defender illegally prevents a receiver from catching a catchable ball, usually by early contact.',
      hint: 'It\'s about preventing the catch unfairly'
    },
    {
      id: 'q10',
      category: 'advanced-rules',
      difficulty: 'medium',
      question: 'Can the defense score points?',
      options: [
        'No, only offense scores',
        'Yes, through interceptions, fumbles, and safeties',
        'Only on field goals',
        'Only in overtime'
      ],
      correctIndex: 1,
      explanation: 'The defense can score by returning interceptions or fumbles for touchdowns (6 points) or tackling the offense in their own end zone for a safety (2 points).',
      hint: 'Think about turnovers'
    }
  ]
  
  // Filter questions based on settings
  const getFilteredQuestions = () => {
    let filtered = [...questionPool]
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(q => q.category === selectedCategory)
    }
    
    if (difficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === difficulty)
    }
    
    // Shuffle array
    return filtered.sort(() => Math.random() - 0.5)
  }
  
  const [questions, setQuestions] = useState(getFilteredQuestions())
  const [showHint, setShowHint] = useState(false)
  
  useEffect(() => {
    setQuestions(getFilteredQuestions())
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }, [selectedCategory, difficulty])
  
  const handleAnswer = (index) => {
    if (showFeedback) return // Prevent changing answer after feedback
    
    setSelectedAnswer(index)
    setShowFeedback(true)
    setAttempts(attempts + 1)
    
    const isCorrect = index === questions[currentQuestion].correctIndex
    
    if (isCorrect) {
      setScore(score + (showHint ? 5 : 10)) // Less points if hint was used
      setPracticeStats(prev => ({
        ...prev,
        correct: prev.correct + 1,
        streak: prev.streak + 1,
        bestStreak: Math.max(prev.bestStreak, prev.streak + 1)
      }))
    } else {
      setPracticeStats(prev => ({
        ...prev,
        incorrect: prev.incorrect + 1,
        streak: 0
      }))
    }
  }
  
  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowFeedback(false)
      setShowHint(false)
    }
  }
  
  const tryAgain = () => {
    setSelectedAnswer(null)
    setShowFeedback(false)
    // Don't reset hint - they can still use it
  }
  
  const resetPractice = () => {
    setQuestions(getFilteredQuestions())
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setShowHint(false)
    setScore(0)
    setAttempts(0)
    setPracticeStats({
      correct: 0,
      incorrect: 0,
      streak: 0,
      bestStreak: 0
    })
  }
  
  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-lg border border-sage-200 text-center">
        <div className="text-4xl mb-4">📚</div>
        <h3 className="text-xl font-bold text-secondary-100 mb-2">No Questions Available</h3>
        <p className="text-secondary-300 mb-4">Try selecting different filters</p>
        <button 
          onClick={() => {
            setSelectedCategory('all')
            setDifficulty('all')
          }}
          className="bg-sage-500 hover:bg-sage-600 text-white px-4 py-2 rounded-lg"
        >
          Reset Filters
        </button>
      </div>
    )
  }
  
  const question = questions[currentQuestion]
  const progress = ((currentQuestion + (showFeedback ? 1 : 0)) / questions.length) * 100
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-sage-200">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-secondary-100 mb-2">
          🎯 Practice Mode
        </h3>
        <p className="text-secondary-300">
          Unlimited practice with instant feedback - no pressure!
        </p>
      </div>
      
      {/* Settings */}
      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-sage-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
        >
          <option value="all">All Categories</option>
          <option value="basic-rules">Basic Rules</option>
          <option value="scoring">Scoring</option>
          <option value="positions">Positions</option>
          <option value="strategy">Strategy</option>
          <option value="advanced-rules">Advanced Rules</option>
        </select>
        
        <select 
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border border-sage-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
        >
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        
        <button 
          onClick={resetPractice}
          className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-lg text-sm transition-colors"
        >
          🔄 New Session
        </button>
      </div>
      
      {/* Stats Bar */}
      <div className="grid grid-cols-4 gap-2 mb-6 text-center">
        <div className="bg-green-50 rounded-lg p-2">
          <div className="text-lg font-bold text-green-600">{practiceStats.correct}</div>
          <div className="text-xs text-gray-600">Correct</div>
        </div>
        <div className="bg-red-50 rounded-lg p-2">
          <div className="text-lg font-bold text-red-600">{practiceStats.incorrect}</div>
          <div className="text-xs text-gray-600">Incorrect</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-2">
          <div className="text-lg font-bold text-blue-600">{practiceStats.streak}</div>
          <div className="text-xs text-gray-600">Streak</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-2">
          <div className="text-lg font-bold text-yellow-600">{score}</div>
          <div className="text-xs text-gray-600">Score</div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-sage-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      
      {/* Question */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs px-2 py-1 rounded ${
                question.difficulty === 'easy' ? 'bg-green-100 text-green-600' :
                question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                'bg-red-100 text-red-600'
              }`}>
                {question.difficulty}
              </span>
              <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600">
                {question.category.replace('-', ' ')}
              </span>
            </div>
            <h4 className="text-lg font-medium text-navy">
              {question.question}
            </h4>
          </div>
          
          {!showFeedback && (
            <button 
              onClick={() => setShowHint(!showHint)}
              className="text-sm text-sage-600 hover:text-sage-700 ml-4"
            >
              💡 {showHint ? 'Hide' : 'Show'} Hint
            </button>
          )}
        </div>
        
        {showHint && !showFeedback && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-700">
              <strong>Hint:</strong> {question.hint}
            </p>
            <p className="text-xs text-gray-500 mt-1">Using hints reduces points from 10 to 5</p>
          </div>
        )}
        
        {/* Answer Options */}
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrect = index === question.correctIndex
            const showCorrect = showFeedback && isCorrect
            const showIncorrect = showFeedback && isSelected && !isCorrect
            
            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={showFeedback}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  showCorrect ? 'bg-green-50 border-green-400' :
                  showIncorrect ? 'bg-red-50 border-red-400' :
                  isSelected ? 'bg-sage-100 border-sage-400' :
                  'bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-sage-300'
                } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold ${
                    showCorrect ? 'bg-green-500 text-white' :
                    showIncorrect ? 'bg-red-500 text-white' :
                    isSelected ? 'bg-sage-500 text-white' :
                    'bg-gray-300 text-gray-600'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="font-medium">{option}</span>
                  {showCorrect && <span className="ml-auto text-green-600">✓</span>}
                  {showIncorrect && <span className="ml-auto text-red-600">✗</span>}
                </div>
              </button>
            )
          })}
        </div>
        
        {/* Feedback */}
        {showFeedback && (
          <div className={`mt-6 p-4 rounded-lg ${
            selectedAnswer === question.correctIndex 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <h5 className={`font-bold mb-2 ${
              selectedAnswer === question.correctIndex ? 'text-green-800' : 'text-red-800'
            }`}>
              {selectedAnswer === question.correctIndex ? '✅ Correct!' : '❌ Not quite right'}
            </h5>
            <p className="text-sm text-gray-700">{question.explanation}</p>
            
            <div className="flex gap-3 mt-4">
              {selectedAnswer !== question.correctIndex && (
                <button 
                  onClick={tryAgain}
                  className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50"
                >
                  Try Again
                </button>
              )}
              {currentQuestion < questions.length - 1 ? (
                <button 
                  onClick={nextQuestion}
                  className="bg-sage-500 hover:bg-sage-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Next Question →
                </button>
              ) : (
                <button 
                  onClick={resetPractice}
                  className="bg-warmGold hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  🎉 Complete! Start New Session
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Best Streak Indicator */}
      {practiceStats.bestStreak >= 3 && (
        <div className="text-center mt-6 p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-300">
          <span className="text-2xl mr-2">🔥</span>
          <span className="font-bold text-yellow-700">
            Best Streak: {practiceStats.bestStreak} correct answers!
          </span>
        </div>
      )}
    </div>
  )
}

export default PracticeMode