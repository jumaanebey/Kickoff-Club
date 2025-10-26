import React, { useState } from 'react'

const InteractiveFieldDiagram = () => {
  const [ballPosition, setBallPosition] = useState(75) // Start at 25 yard line (75 yards from goal)
  const [down, setDown] = useState(1)
  const [yardsToGo, setYardsToGo] = useState(10)
  const [showCelebration, setShowCelebration] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  const getSimpleExplanation = () => {
    if (gameOver) return "Game over! The other team gets the ball now."
    
    if (down === 1) {
      return "1st Down - You have 4 chances to go 10 yards! 💪"
    } else if (down === 2) {
      return `2nd Down - ${4-down+1} more chances to get ${yardsToGo} yards 📊`
    } else if (down === 3) {
      return `3rd Down - Only ${4-down+1} more chance! Need ${yardsToGo} yards 😰`
    } else {
      return "4th Down - This is your LAST chance! ⚡"
    }
  }

  const getOrdinalSuffix = (num) => {
    if (num === 1) return 'st'
    if (num === 2) return 'nd'
    if (num === 3) return 'rd'
    return 'th'
  }

  const moveForward = (yards) => {
    if (gameOver) return
    
    const newPosition = ballPosition - yards
    
    // Touchdown!
    if (newPosition <= 0) {
      setBallPosition(0)
      setShowCelebration(true)
      setTimeout(() => {
        resetGame()
        setShowCelebration(false)
      }, 3000)
      return
    }
    
    setBallPosition(newPosition)
    
    // Did we get a first down?
    if (yards >= yardsToGo) {
      setDown(1)
      setYardsToGo(10)
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 2000)
    } else {
      const newDown = down + 1
      if (newDown > 4) {
        // Turnover!
        setGameOver(true)
        setTimeout(() => {
          resetGame()
          setGameOver(false)
        }, 3000)
      } else {
        setDown(newDown)
        setYardsToGo(yardsToGo - yards)
      }
    }
  }

  const resetGame = () => {
    setBallPosition(75) // Start at 25 yard line
    setDown(1)
    setYardsToGo(10)
    setShowCelebration(false)
    setGameOver(false)
  }

  return (
    <div className="bg-gradient-to-br from-blush-50 to-sage-50 rounded-2xl p-8 shadow-lg border-2 border-blush-200">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-secondary-100 mb-3">
          ⚡ Learn the 4-Down System
        </h3>
        <p className="text-lg text-secondary-200 max-w-md mx-auto">
          Move the ball forward and see how football's "4 chances" system works! 💜
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Simple Field Visualization */}
        <div className="space-y-6">
          <div className="relative bg-gradient-to-r from-green-400 to-green-500 rounded-2xl p-6 overflow-hidden">
            <div className="relative h-20 bg-green-600/20 rounded-lg">
              {/* Simple goal line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400"></div>
              <div className="absolute left-0 -top-8 text-yellow-400 font-bold text-sm">GOAL!</div>
              
              {/* Ball */}
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-500"
                style={{ left: `${(100-ballPosition)}%` }}
              >
                <div className="relative">
                  <div className="bg-orange-500 rounded-full w-6 h-6 border-3 border-white shadow-lg animate-bounce"></div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-white font-bold text-sm whitespace-nowrap">
                    {ballPosition} yards to go!
                  </div>
                </div>
              </div>
              
              {/* First down line */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-blush-400 opacity-80"
                style={{ left: `${Math.max(0, (100-ballPosition) + (yardsToGo/100*100))}%` }}
              >
                <div className="absolute -top-8 -ml-8 text-blush-400 font-bold text-sm">Need to reach!</div>
              </div>
            </div>
          </div>

          {/* Simple Status Display */}
          <div className={`rounded-2xl p-6 text-center transition-all duration-300 ${
            showCelebration ? 'bg-gradient-to-r from-green-400 to-emerald-500' :
            gameOver ? 'bg-gradient-to-r from-red-400 to-rose-500' :
            'bg-gradient-to-r from-blush-400 to-sage-400'
          } text-white shadow-lg`}>
            {showCelebration ? (
              <div className="animate-pulse">
                <div className="text-4xl mb-2">🎉</div>
                <div className="text-xl font-bold">Way to go!</div>
              </div>
            ) : gameOver ? (
              <div>
                <div className="text-4xl mb-2">😅</div>
                <div className="text-xl font-bold">Oops! Other team's turn</div>
              </div>
            ) : (
              <div>
                <div className="text-3xl font-bold mb-2">
                  Try #{down} of 4
                </div>
                <div className="text-lg">Need {yardsToGo} more yards</div>
              </div>
            )}
          </div>
        </div>

        {/* Simple Controls */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => moveForward(3)}
              disabled={gameOver}
              className="bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 disabled:opacity-50 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-lg"
            >
              🏃‍♀️ Run +3 yards
            </button>
            <button 
              onClick={() => moveForward(8)}
              disabled={gameOver}
              className="bg-gradient-to-r from-blush-500 to-blush-600 hover:from-blush-600 hover:to-blush-700 disabled:opacity-50 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:transform-none shadow-lg"
            >
              🏈 Pass +8 yards
            </button>
          </div>
          
          <div className="text-center">
            <button 
              onClick={resetGame}
              className="bg-white border-2 border-blush-300 text-blush-600 px-6 py-3 rounded-xl font-medium hover:bg-blush-50 transition-colors"
            >
              🔄 Start Over
            </button>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-blush-200">
            <h4 className="text-lg font-bold text-secondary-100 mb-3 text-center">What's Happening?</h4>
            <div className="text-center p-4 bg-blush-50 rounded-xl">
              <p className="text-secondary-200 font-medium">
                {getSimpleExplanation()}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-sage-50 to-blush-50 rounded-2xl p-6 border border-sage-200">
            <h4 className="text-lg font-bold text-secondary-100 mb-3 text-center">💡 How It Works</h4>
            <div className="space-y-2 text-sm text-secondary-200">
              <p>🏃‍♀️ <strong>Running plays</strong> usually gain fewer yards but are safer</p>
              <p>🏈 <strong>Passing plays</strong> can gain more yards but are riskier</p>
              <p>✨ <strong>Get 10+ yards</strong> in 4 tries to keep the ball!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveFieldDiagram