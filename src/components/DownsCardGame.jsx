import React, { useState } from 'react'

const DownsCardGame = () => {
  const [attempt, setAttempt] = useState(1)
  const [yardsToFirstDown, setYardsToFirstDown] = useState(10)
  const [fieldPosition, setFieldPosition] = useState(80) // Start at own 20 yard line (80 yards from end zone)
  const [gameState, setGameState] = useState('ready') // 'ready', 'flipping', 'result'
  const [lastCard, setLastCard] = useState(null)
  const [touchdowns, setTouchdowns] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [currentDrive, setCurrentDrive] = useState([])
  const [driveHistory, setDriveHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [totalFirstDowns, setTotalFirstDowns] = useState(0)

  const cards = [
    { yards: 0, emoji: '💨', name: 'Incomplete Pass', message: 'The quarterback missed the receiver!' },
    { yards: 1, emoji: '🏃‍♀️', name: 'Stuffed Run', message: 'Tackled immediately, but got a yard!' },
    { yards: 2, emoji: '🤲', name: 'Screen Pass', message: 'Quick pass to the running back!' },
    { yards: 4, emoji: '⚡', name: 'Quick Slant', message: 'Perfect timing on the pass route!' },
    { yards: 6, emoji: '🏈', name: 'Solid Run', message: 'Great blocking opened up a hole!' },
    { yards: 8, emoji: '🎯', name: 'Out Route', message: 'Beautiful pass to the sideline!' },
    { yards: 12, emoji: '🚀', name: 'Deep Pass', message: 'The receiver beat the defender!' },
    { yards: 18, emoji: '💫', name: 'Breakaway Run', message: 'Broke through for a huge gain!' }
  ]

  const drawCard = () => {
    if (gameState !== 'ready') return

    setGameState('flipping')
    
    setTimeout(() => {
      // Weighted random - more likely to get reasonable gains
      const weights = [5, 8, 12, 15, 12, 8, 4, 2] // matches cards array
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
      let random = Math.random() * totalWeight
      
      let selectedCard = cards[0]
      for (let i = 0; i < cards.length; i++) {
        random -= weights[i]
        if (random <= 0) {
          selectedCard = cards[i]
          break
        }
      }
      
      setLastCard(selectedCard)
      setCurrentDrive([...currentDrive, { ...selectedCard, attempt }])
      setGameState('result')
      
      // Apply the result after showing the card
      setTimeout(() => {
        applyResult(selectedCard.yards)
      }, 1500)
    }, 1500)
  }

  const applyResult = (yards) => {
    const newFieldPosition = Math.max(0, fieldPosition - yards)
    setFieldPosition(newFieldPosition)
    
    // TOUCHDOWN! 
    if (newFieldPosition === 0) {
      setShowCelebration(true)
      setTouchdowns(touchdowns + 1)
      
      // Save touchdown drive to history
      setDriveHistory([...driveHistory, {
        id: driveHistory.length + 1,
        outcome: 'touchdown',
        finalPosition: newFieldPosition,
        yardsGained: fieldPosition,
        cards: currentDrive,
        timestamp: new Date().toLocaleTimeString()
      }])
      
      setTimeout(() => {
        resetDrive()
        setShowCelebration(false)
      }, 3000)
      return
    }
    
    // First Down! Got 10+ yards
    if (yards >= yardsToFirstDown) {
      setTotalFirstDowns(totalFirstDowns + 1)
      setAttempt(1)
      setYardsToFirstDown(10)
      setGameState('ready')
      setLastCard(null)
      
      // Brief first down celebration
      setTimeout(() => {
        // Continue the drive
      }, 1000)
      return
    }
    
    // Next attempt
    const nextAttempt = attempt + 1
    if (nextAttempt > 4) {
      // Punt! - used all 4 attempts without first down
      setDriveHistory([...driveHistory, {
        id: driveHistory.length + 1,
        outcome: 'punt',
        finalPosition: newFieldPosition,
        yardsGained: fieldPosition - newFieldPosition,
        cards: currentDrive,
        timestamp: new Date().toLocaleTimeString()
      }])
      
      setTimeout(() => {
        resetDrive()
      }, 2000)
      return
    }
    
    setAttempt(nextAttempt)
    setYardsToFirstDown(yardsToFirstDown - yards)
    setGameState('ready')
    setLastCard(null)
  }

  const resetDrive = () => {
    setAttempt(1)
    setYardsToFirstDown(10)
    setFieldPosition(80) // Back to own 20 yard line
    setGameState('ready')
    setLastCard(null)
    setCurrentDrive([])
  }

  const resetGame = () => {
    resetDrive()
    setTouchdowns(0)
    setTotalFirstDowns(0)
    setShowCelebration(false)
    setDriveHistory([])
    setShowHistory(false)
  }

  const getYardLine = () => {
    if (fieldPosition > 50) {
      return `Own ${100 - fieldPosition}`
    } else {
      return `Opp ${fieldPosition}`
    }
  }

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 shadow-xl border-2 border-pink-200">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-secondary-100 mb-3">
          🏈 Drive to the End Zone
        </h3>
        <p className="text-lg text-secondary-200 max-w-lg mx-auto leading-relaxed">
          Use your plays to march down the field and score touchdowns! Get first downs to keep your drive alive! 💜
        </p>
      </div>

      {/* Football Field */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-pink-200">
        <div className="flex justify-between items-center mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">#{attempt}</div>
            <div className="text-sm text-pink-500">Down</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{getYardLine()}</div>
            <div className="text-sm text-purple-500">Field Position</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-sage-600">{yardsToFirstDown}</div>
            <div className="text-sm text-sage-500">Yards to Go</div>
          </div>
        </div>
        
        {/* Field Visualization */}
        <div className="bg-green-500 h-12 rounded-xl relative overflow-hidden mb-4">
          {/* End zone */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-yellow-400 flex items-center justify-center">
            <span className="text-xs font-bold text-green-800">TD</span>
          </div>
          
          {/* Ball position */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000"
            style={{ left: `${(100 - fieldPosition)}%` }}
          >
            <div className="bg-orange-500 w-4 h-4 rounded-full border-2 border-white"></div>
          </div>
          
          {/* First down marker */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-yellow-300"
            style={{ left: `${Math.min(100, (100 - fieldPosition) + (yardsToFirstDown / 100 * 100))}%` }}
          ></div>
        </div>
        
        <div className="text-center text-sm text-gray-600">
          {fieldPosition} yards from touchdown • Need {yardsToFirstDown} yards for first down
        </div>
      </div>

      {/* Card Area */}
      <div className="mb-8">
        {gameState === 'ready' && (
          <div className="text-center">
            <div className="mb-6">
              <div className="w-32 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl mx-auto flex items-center justify-center text-white text-4xl shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200 border-4 border-white"
                   onClick={drawCard}>
                🎴
              </div>
              <div className="mt-4 text-secondary-200 font-medium">
                Click the card to flip it! ✨
              </div>
            </div>
          </div>
        )}

        {gameState === 'flipping' && (
          <div className="text-center">
            <div className="w-32 h-40 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl mx-auto flex items-center justify-center text-white text-4xl shadow-lg border-4 border-white">
              🌟
            </div>
            <div className="mt-4 text-secondary-200 font-medium">
              Flipping your card... 🎲
            </div>
          </div>
        )}

        {gameState === 'result' && lastCard && (
          <div className="text-center">
            <div className="w-32 h-40 bg-gradient-to-br from-green-400 to-emerald-400 rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg border-4 border-white">
              <div className="text-center">
                <div className="text-3xl mb-2">{lastCard.emoji}</div>
                <div className="text-lg font-bold">+{lastCard.yards}</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-xl font-bold text-secondary-100 mb-1">{lastCard.name}</div>
              <div className="text-secondary-200">{lastCard.message}</div>
            </div>
          </div>
        )}
      </div>

      {/* Game State Messages */}
      {showCelebration && (
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-400 rounded-3xl p-8 mb-8 text-center">
          <div className="text-6xl mb-3">🏆</div>
          <div className="text-3xl font-bold text-orange-800 mb-2">TOUCHDOWN!</div>
          <div className="text-orange-700">You drove {80 - fieldPosition} yards down the field for 6 points! 🔥</div>
        </div>
      )}

      {attempt > 4 && !showCelebration && (
        <div className="bg-gradient-to-r from-blue-100 to-indigo-100 border-2 border-blue-300 rounded-3xl p-6 mb-8 text-center">
          <div className="text-4xl mb-3">🦶</div>
          <div className="text-xl font-bold text-blue-800 mb-2">Time to Punt!</div>
          <div className="text-blue-700">You advanced {80 - fieldPosition} yards but couldn't get the first down. The other team gets the ball.</div>
        </div>
      )}

      {/* Drive History View */}
      {showHistory && driveHistory.length > 0 && (
        <div className="mb-8">
          <div className="text-center mb-6">
            <h4 className="text-2xl font-bold text-secondary-100 mb-2">📜 Your Drive History</h4>
            <p className="text-secondary-200">Review all the cards from your previous drives</p>
          </div>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {driveHistory.slice().reverse().map((drive) => (
              <div key={drive.id} className={`bg-white/80 rounded-2xl p-6 border-2 ${
                drive.outcome === 'touchdown' ? 'border-yellow-400' : 'border-blue-300'
              }`}>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                      drive.outcome === 'touchdown' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {drive.outcome === 'touchdown' ? '🏆 TOUCHDOWN' : '🦶 PUNT'}
                    </span>
                    <span className="ml-3 text-sm text-gray-600">{drive.timestamp}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-600">{drive.yardsGained} yards gained</div>
                    <div className="text-sm text-gray-500">Ended at {drive.outcome === 'touchdown' ? 'End Zone' : `${drive.finalPosition} yard line`}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                  {drive.cards.map((card, index) => (
                    <div key={index} className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-3 text-center border border-purple-200">
                      <div className="text-2xl mb-1">{card.emoji}</div>
                      <div className="text-sm font-bold text-purple-700">+{card.yards}</div>
                      <div className="text-xs text-purple-600">{card.name}</div>
                      <div className="text-xs text-gray-500 mt-1">Card #{card.attempt}</div>
                    </div>
                  ))}
                  {/* Fill empty slots if drive ended early */}
                  {Array.from({ length: 4 - drive.cards.length }).map((_, index) => (
                    <div key={`empty-${index}`} className="bg-gray-100 rounded-xl p-3 text-center border border-gray-200">
                      <div className="text-2xl mb-1">🔒</div>
                      <div className="text-xs text-gray-500">Unused</div>
                    </div>
                  ))}
                </div>
                
                {drive.outcome === 'touchdown' && (
                  <div className="mt-4 text-center text-yellow-700 font-medium">
                    🏆 Touchdown! 6 points scored!
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Football Stats & History */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white/60 rounded-2xl p-3 text-center border border-yellow-200">
          <div className="text-xl font-bold text-yellow-600">{touchdowns}</div>
          <div className="text-xs text-yellow-500">Touchdowns</div>
        </div>
        
        <div className="bg-white/60 rounded-2xl p-3 text-center border border-green-200">
          <div className="text-xl font-bold text-green-600">{totalFirstDowns}</div>
          <div className="text-xs text-green-500">First Downs</div>
        </div>
        
        <div className="bg-white/60 rounded-2xl p-3 text-center border border-blue-200">
          <div className="text-xl font-bold text-blue-600">{driveHistory.length}</div>
          <div className="text-xs text-blue-500">Total Drives</div>
        </div>
        
        <div className="text-center flex items-center justify-center">
          <button 
            onClick={() => setShowHistory(!showHistory)}
            disabled={driveHistory.length === 0}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
          >
            {showHistory ? '🏈 Play' : '📊 Stats'}
          </button>
        </div>
      </div>
      
      <div className="text-center mt-4">
        <button 
          onClick={resetGame}
          className="bg-white border-2 border-purple-300 text-purple-600 px-6 py-2 rounded-xl hover:bg-purple-50 transition-colors"
        >
          🔄 Reset Game
        </button>
      </div>

      {/* Football Instructions */}
      <div className="mt-8 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200">
        <h4 className="text-lg font-bold text-secondary-100 mb-3 text-center">🏈 How Football Drives Work</h4>
        <div className="space-y-2 text-sm text-secondary-200">
          <p>🎴 <strong>Flip play cards</strong> to see what happens on each down</p>
          <p>📍 <strong>Start at your 20 yard line</strong> - you need to reach the end zone!</p>
          <p>⚡ <strong>Get first downs</strong> by gaining 10+ yards in 4 tries to keep driving</p>
          <p>🏆 <strong>Touchdown!</strong> Reach the end zone for 6 points</p>
          <p>🦶 <strong>Punt</strong> if you can't get 10 yards in 4 downs - other team gets the ball</p>
          <p>💜 <strong>It's all luck</strong> - just like real football, anything can happen!</p>
        </div>
      </div>
    </div>
  )
}

export default DownsCardGame