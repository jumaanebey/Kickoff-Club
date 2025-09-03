import React, { useState, useEffect } from 'react'
import { trackInteractiveUsage, getProgressData, awardPoints } from '../utils/progressTracker'

const MiniGames = () => {
  const [selectedGame, setSelectedGame] = useState('downs-sprint')
  const [gameState, setGameState] = useState('menu')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [progress, setProgress] = useState(getProgressData())
  
  // Downs Sprint Game State
  const [downsSprint, setDownsSprint] = useState({
    currentQuestion: 0,
    questions: [
      { situation: '1st & 10', answer: 'first-down', options: ['first-down', 'second-down', 'third-down'] },
      { situation: '3rd & 2', answer: 'third-down', options: ['first-down', 'second-down', 'third-down'] },
      { situation: '4th & Goal', answer: 'fourth-down', options: ['third-down', 'fourth-down', 'touchdown'] },
      { situation: '2nd & 8', answer: 'second-down', options: ['first-down', 'second-down', 'third-down'] }
    ],
    streak: 0
  })
  
  // Field Position Game State
  const [fieldPosition, setFieldPosition] = useState({
    ballPosition: 50,
    target: 25,
    attempts: 3,
    score: 0
  })
  
  // Memory Match Game State
  const [memoryMatch, setMemoryMatch] = useState({
    cards: [],
    flipped: [],
    matched: [],
    moves: 0
  })
  
  const games = {
    'downs-sprint': {
      title: '⚡ Downs Sprint',
      description: 'Quick-fire down and distance recognition',
      difficulty: 'Easy',
      timeLimit: 30,
      color: 'bg-green-500'
    },
    'field-position': {
      title: '🎯 Field Goal Kicker',
      description: 'Calculate field goal distances',
      difficulty: 'Medium',
      timeLimit: 60,
      color: 'bg-blue-500'
    },
    'memory-match': {
      title: '🧠 Pro Football Memory Match',
      description: 'Match pro football terms with definitions',
      difficulty: 'Hard',
      timeLimit: 90,
      color: 'bg-purple-500'
    },
    'penalty-flags': {
      title: '🚩 Penalty Flag Rush',
      description: 'Identify penalties and their yardage',
      difficulty: 'Medium',
      timeLimit: 45,
      color: 'bg-red-500'
    }
  }
  
  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      endGame()
    }
  }, [gameState, timeLeft])
  
  const startGame = (gameId) => {
    setSelectedGame(gameId)
    setGameState('playing')
    setScore(0)
    setTimeLeft(games[gameId].timeLimit)
    
    // Initialize game-specific state
    switch (gameId) {
      case 'downs-sprint':
        setDownsSprint(prev => ({ ...prev, currentQuestion: 0, streak: 0 }))
        break
      case 'field-position':
        setFieldPosition({
          ballPosition: Math.floor(Math.random() * 80) + 10,
          target: Math.floor(Math.random() * 30) + 10,
          attempts: 3,
          score: 0
        })
        break
      case 'memory-match':
        initializeMemoryGame()
        break
    }
    
    // Track usage
    trackInteractiveUsage(progress, 'miniGames')
  }
  
  const endGame = () => {
    setGameState('results')
    
    // Award points based on performance
    const bonusPoints = Math.floor(score / 10) * 5
    const updatedProgress = awardPoints(progress, bonusPoints, 'miniGameCompleted')
    setProgress(updatedProgress)
  }
  
  const resetGame = () => {
    setGameState('menu')
    setScore(0)
    setTimeLeft(30)
  }
  
  // Downs Sprint Game Logic
  const handleDownsAnswer = (answer) => {
    const currentQ = downsSprint.questions[downsSprint.currentQuestion]
    const isCorrect = answer === currentQ.answer
    
    if (isCorrect) {
      setScore(prev => prev + 10 + (downsSprint.streak * 2))
      setDownsSprint(prev => ({ 
        ...prev, 
        streak: prev.streak + 1,
        currentQuestion: (prev.currentQuestion + 1) % prev.questions.length
      }))
    } else {
      setDownsSprint(prev => ({ ...prev, streak: 0 }))
    }
    
    // Add time bonus for correct answers
    if (isCorrect && timeLeft < games[selectedGame].timeLimit - 5) {
      setTimeLeft(prev => prev + 2)
    }
  }
  
  // Field Position Game Logic
  const calculateFieldGoalDistance = () => {
    const { ballPosition } = fieldPosition
    // Field goal distance = 100 - ball position + 17 (10 yard end zone + 7 yard snap)
    const distance = 100 - ballPosition + 17
    return distance
  }
  
  const handleFieldGoalGuess = (guess) => {
    const actualDistance = calculateFieldGoalDistance()
    const difference = Math.abs(guess - actualDistance)
    
    let points = 0
    if (difference === 0) points = 20 // Perfect!
    else if (difference <= 2) points = 15 // Very close
    else if (difference <= 5) points = 10 // Close
    else if (difference <= 10) points = 5 // Okay
    
    setScore(prev => prev + points)
    
    // Generate new scenario
    setFieldPosition(prev => ({
      ...prev,
      ballPosition: Math.floor(Math.random() * 80) + 10,
      attempts: prev.attempts - 1,
      score: prev.score + points
    }))
  }
  
  // Memory Match Game Logic
  const initializeMemoryGame = () => {
    const terms = [
      { id: 1, text: 'Touchdown', match: '6 Points' },
      { id: 2, text: 'Field Goal', match: '3 Points' },
      { id: 3, text: 'Safety', match: '2 Points' },
      { id: 4, text: 'Down', match: 'One Attempt' },
      { id: 5, text: 'Interception', match: 'Turnover' },
      { id: 6, text: 'Fumble', match: 'Lost Ball' }
    ]
    
    const cards = []
    terms.forEach(term => {
      cards.push({ id: term.id * 2 - 1, text: term.text, matchId: term.id })
      cards.push({ id: term.id * 2, text: term.match, matchId: term.id })
    })
    
    // Shuffle cards
    const shuffled = cards.sort(() => Math.random() - 0.5)
    
    setMemoryMatch({
      cards: shuffled,
      flipped: [],
      matched: [],
      moves: 0
    })
  }
  
  const handleCardFlip = (cardIndex) => {
    if (memoryMatch.flipped.length === 2 || 
        memoryMatch.flipped.includes(cardIndex) || 
        memoryMatch.matched.includes(cardIndex)) {
      return
    }
    
    const newFlipped = [...memoryMatch.flipped, cardIndex]
    setMemoryMatch(prev => ({ ...prev, flipped: newFlipped }))
    
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped
      const firstCard = memoryMatch.cards[first]
      const secondCard = memoryMatch.cards[second]
      
      setTimeout(() => {
        if (firstCard.matchId === secondCard.matchId) {
          // Match found!
          setMemoryMatch(prev => ({
            ...prev,
            matched: [...prev.matched, first, second],
            flipped: [],
            moves: prev.moves + 1
          }))
          setScore(prev => prev + 20)
        } else {
          // No match
          setMemoryMatch(prev => ({
            ...prev,
            flipped: [],
            moves: prev.moves + 1
          }))
        }
      }, 1000)
    }
  }
  
  // Render game content
  const renderGameContent = () => {
    switch (selectedGame) {
      case 'downs-sprint':
        const currentQ = downsSprint.questions[downsSprint.currentQuestion]
        return (
          <div className="text-center">
            <div className="mb-6">
              <div className="text-4xl font-bold text-navy mb-2">{currentQ.situation}</div>
              <div className="text-lg text-gray-600">What down is this?</div>
              {downsSprint.streak > 0 && (
                <div className="text-sm text-green-600 mt-2">
                  🔥 {downsSprint.streak} streak! (+{downsSprint.streak * 2} bonus)
                </div>
              )}
            </div>
            <div className="space-y-3">
              {currentQ.options.map(option => (
                <button
                  key={option}
                  onClick={() => handleDownsAnswer(option)}
                  className="w-full p-4 bg-sage-100 hover:bg-sage-200 rounded-lg font-medium transition-colors"
                >
                  {option.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>
        )
        
      case 'field-position':
        const fgDistance = calculateFieldGoalDistance()
        return (
          <div className="text-center">
            <div className="mb-6">
              <div className="text-2xl font-bold text-navy mb-2">
                Ball at the {fieldPosition.ballPosition} yard line
              </div>
              <div className="text-lg text-gray-600">How long is the field goal?</div>
              <div className="text-sm text-gray-500 mt-2">
                Attempts left: {fieldPosition.attempts}
              </div>
            </div>
            
            {/* Visual field representation */}
            <div className="bg-green-500 rounded-lg p-4 mb-6 relative overflow-hidden">
              <div className="text-white text-center">
                <div 
                  className="absolute bg-yellow-400 w-2 h-full top-0"
                  style={{ left: `${fieldPosition.ballPosition}%` }}
                ></div>
                <div className="text-xs">🏈 Ball Position</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {[25, 35, 45, 55, 65].map(distance => (
                <button
                  key={distance}
                  onClick={() => handleFieldGoalGuess(distance)}
                  className="p-3 bg-blue-100 hover:bg-blue-200 rounded-lg font-medium"
                >
                  {distance} yds
                </button>
              ))}
            </div>
          </div>
        )
        
      case 'memory-match':
        return (
          <div>
            <div className="text-center mb-4">
              <div className="text-lg text-gray-600">Moves: {memoryMatch.moves}</div>
              <div className="text-sm text-gray-500">
                Matched: {memoryMatch.matched.length / 2} / {memoryMatch.cards.length / 2}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {memoryMatch.cards.map((card, index) => {
                const isFlipped = memoryMatch.flipped.includes(index)
                const isMatched = memoryMatch.matched.includes(index)
                
                return (
                  <button
                    key={card.id}
                    onClick={() => handleCardFlip(index)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      isFlipped || isMatched
                        ? isMatched 
                          ? 'bg-green-200 text-green-800'
                          : 'bg-blue-200 text-blue-800'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    disabled={isMatched}
                  >
                    {isFlipped || isMatched ? card.text : '?'}
                  </button>
                )
              })}
            </div>
          </div>
        )
        
      default:
        return <div>Game not implemented yet!</div>
    }
  }
  
  if (gameState === 'menu') {
    return (
      <div className="bg-white rounded-lg p-6 shadow-lg border border-sage-200">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-secondary-100 mb-2">
            🎮 Learning Mini-Games
          </h3>
          <p className="text-secondary-300">
            Master pro football concepts through fun, interactive games
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(games).map(([gameId, game]) => (
            <div
              key={gameId}
              className="border border-sage-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-navy">{game.title}</h4>
                <span className={`text-xs px-2 py-1 rounded text-white ${game.color}`}>
                  {game.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{game.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">⏱️ {game.timeLimit}s</span>
                <button
                  onClick={() => startGame(gameId)}
                  className="bg-sage-500 hover:bg-sage-600 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Play Now
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* High Scores */}
        <div className="mt-6 p-4 bg-gradient-to-r from-sage-50 to-blush-50 rounded-lg border border-sage-200">
          <h4 className="font-bold text-navy mb-3">🏆 Your Best Scores</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            <div className="bg-white rounded p-2">
              <div className="text-lg font-bold text-green-600">850</div>
              <div className="text-xs text-gray-600">Downs Sprint</div>
            </div>
            <div className="bg-white rounded p-2">
              <div className="text-lg font-bold text-blue-600">1200</div>
              <div className="text-xs text-gray-600">Field Goal</div>
            </div>
            <div className="bg-white rounded p-2">
              <div className="text-lg font-bold text-purple-600">2400</div>
              <div className="text-xs text-gray-600">Memory Match</div>
            </div>
            <div className="bg-white rounded p-2">
              <div className="text-lg font-bold text-red-600">650</div>
              <div className="text-xs text-gray-600">Penalty Rush</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  if (gameState === 'playing') {
    return (
      <div className="bg-white rounded-lg p-6 shadow-lg border border-sage-200">
        {/* Game Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-secondary-100">
            {games[selectedGame].title}
          </h3>
          <button
            onClick={resetGame}
            className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded"
          >
            ✕ Exit
          </button>
        </div>
        
        {/* Game Stats */}
        <div className="flex justify-between items-center mb-6 p-3 bg-sage-50 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-sage-600">{score}</div>
            <div className="text-xs text-gray-600">Score</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-600' : 'text-blush-600'}`}>
              {timeLeft}
            </div>
            <div className="text-xs text-gray-600">Seconds</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-navy">
              {selectedGame === 'downs-sprint' ? downsSprint.streak : 
               selectedGame === 'memory-match' ? memoryMatch.matched.length / 2 : 
               fieldPosition.attempts}
            </div>
            <div className="text-xs text-gray-600">
              {selectedGame === 'downs-sprint' ? 'Streak' :
               selectedGame === 'memory-match' ? 'Matched' : 'Attempts'}
            </div>
          </div>
        </div>
        
        {/* Game Content */}
        {renderGameContent()}
      </div>
    )
  }
  
  if (gameState === 'results') {
    const game = games[selectedGame]
    return (
      <div className="bg-white rounded-lg p-6 shadow-lg border border-sage-200 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-secondary-100 mb-2">Game Over!</h3>
        <p className="text-secondary-300 mb-6">Great job on {game.title}</p>
        
        <div className="bg-gradient-to-r from-sage-50 to-blush-50 rounded-lg p-6 mb-6">
          <div className="text-4xl font-bold text-warmGold mb-2">{score}</div>
          <div className="text-lg text-gray-700">Final Score</div>
          <div className="text-sm text-gray-600 mt-2">
            +{Math.floor(score / 10) * 5} bonus points earned!
          </div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => startGame(selectedGame)}
            className="bg-sage-500 hover:bg-sage-600 text-white px-6 py-3 rounded-lg"
          >
            Play Again
          </button>
          <button
            onClick={resetGame}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-lg"
          >
            Back to Menu
          </button>
        </div>
      </div>
    )
  }
}

export default MiniGames