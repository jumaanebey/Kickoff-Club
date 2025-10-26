import React, { useState } from 'react'

const FootballScenarioGame = () => {
  const [attempt, setAttempt] = useState(1)
  const [totalYards, setTotalYards] = useState(0)
  const [gameState, setGameState] = useState('ready') // 'ready', 'flipping', 'result', 'fourth-down-decision'
  const [lastCard, setLastCard] = useState(null)
  const [driveOutcome, setDriveOutcome] = useState(null) // 'first-down', 'touchdown', 'punt'
  const [showPuntOption, setShowPuntOption] = useState(false)
  const [touchdowns, setTouchdowns] = useState(0)
  const [firstDowns, setFirstDowns] = useState(0)
  const [punts, setPunts] = useState(0)
  const [driveHistory, setDriveHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [currentDrive, setCurrentDrive] = useState([])

  const scenarios = [
    { 
      yards: 0, 
      emoji: '😅', 
      title: 'Oops!',
      situation: 'The quarterback threw the ball over everyone\'s head!',
      result: 'No gain - but that\'s okay, you have more chances!'
    },
    { 
      yards: 2, 
      emoji: '🏃‍♀️', 
      title: 'Little Steps',
      situation: 'The running back squeezed through a tiny gap!',
      result: 'Small gain, but every yard counts!'
    },
    { 
      yards: 4, 
      emoji: '✨', 
      title: 'Nice Catch!',
      situation: 'Perfect pass to the receiver on the sideline!',
      result: 'Solid gain - getting closer!'
    },
    { 
      yards: 6, 
      emoji: '🎯', 
      title: 'Great Play!',
      situation: 'The quarterback found an open receiver!',
      result: 'Excellent! More than halfway there!'
    },
    { 
      yards: 8, 
      emoji: '🔥', 
      title: 'Big Gain!',
      situation: 'Broke through the defense for a long run!',
      result: 'Wow! Almost got the first down!'
    },
    { 
      yards: 12, 
      emoji: '🚀', 
      title: 'Amazing!',
      situation: 'Deep pass caught in perfect stride!',
      result: 'Incredible play - way more than needed!'
    }
  ]

  const drawCard = () => {
    if (gameState !== 'ready') return

    setGameState('flipping')
    
    setTimeout(() => {
      // Weighted random for realistic outcomes
      const weights = [8, 12, 15, 12, 6, 3] // More likely to get moderate gains
      const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)
      let random = Math.random() * totalWeight
      
      let selectedScenario = scenarios[0]
      for (let i = 0; i < scenarios.length; i++) {
        random -= weights[i]
        if (random <= 0) {
          selectedScenario = scenarios[i]
          break
        }
      }
      
      setLastCard(selectedScenario)
      setCurrentDrive([...currentDrive, { ...selectedScenario, attempt }])
      setGameState('result')
      
      // Don't automatically apply result - keep card visible
      // setTimeout(() => {
      //   applyResult(selectedScenario.yards)
      // }, 2500)
    }, 1500)
  }

  const applyResult = (yards) => {
    const newTotal = totalYards + yards
    setTotalYards(newTotal)
    
    // Check if we got enough for first down or touchdown
    if (newTotal >= 20) {
      // Touchdown scenario! (if you get 20+ yards total)
      setDriveOutcome('touchdown')
      setTouchdowns(touchdowns + 1)
      saveDriveToHistory('touchdown', newTotal)
      
      setTimeout(() => {
        resetDrive()
      }, 3000)
      return
    }
    
    if (newTotal >= 10) {
      // First down!
      setDriveOutcome('first-down')
      setFirstDowns(firstDowns + 1)
      saveDriveToHistory('first-down', newTotal)
      
      setTimeout(() => {
        resetDrive()
      }, 3000)
      return
    }
    
    // Continue to next down
    const nextAttempt = attempt + 1
    if (nextAttempt > 4) {
      // Show punt decision
      setShowPuntOption(true)
      setGameState('fourth-down-decision')
      return
    }
    
    setAttempt(nextAttempt)
    setGameState('ready')
    setLastCard(null)
  }

  const saveDriveToHistory = (outcome, yards) => {
    setDriveHistory([...driveHistory, {
      id: driveHistory.length + 1,
      outcome,
      totalYards: yards,
      cards: currentDrive,
      timestamp: new Date().toLocaleTimeString()
    }])
  }

  const choosePunt = () => {
    setDriveOutcome('punt')
    setPunts(punts + 1)
    saveDriveToHistory('punt', totalYards)
    setShowPuntOption(false)
    
    setTimeout(() => {
      resetDrive()
    }, 3000)
  }

  const goForIt = () => {
    setShowPuntOption(false)
    setAttempt(4)
    setGameState('ready')
    setLastCard(null)
  }

  const continueAfterResult = () => {
    if (lastCard) {
      applyResult(lastCard.yards)
    }
  }

  const resetDrive = () => {
    setAttempt(1)
    setTotalYards(0)
    setGameState('ready')
    setLastCard(null)
    setDriveOutcome(null)
    setCurrentDrive([])
    setShowPuntOption(false)
  }

  const resetGame = () => {
    resetDrive()
    setTouchdowns(0)
    setFirstDowns(0)
    setPunts(0)
    setDriveHistory([])
    setShowHistory(false)
    setShowPuntOption(false)
  }

  const getScenarioForOutcome = (outcome) => {
    switch(outcome) {
      case 'touchdown':
        return {
          emoji: '🏆',
          title: 'TOUCHDOWN!',
          message: `Your team's incredible journey paid off! ${totalYards} yards and 6 points - the crowd goes wild!`,
          color: 'from-yellow-100 to-orange-100 border-yellow-400',
          textColor: 'text-orange-800'
        }
      case 'first-down':
        return {
          emoji: '🎉',
          title: 'First Down!',
          message: `Great job! You got ${totalYards} yards and earned 4 new downs!`,
          color: 'from-green-100 to-emerald-100 border-green-400',
          textColor: 'text-green-800'
        }
      case 'punt':
        return {
          emoji: '🦶',
          title: 'Time to Punt',
          message: `You gained ${totalYards} yards but need to give the ball to the other team.`,
          color: 'from-blue-100 to-indigo-100 border-blue-400',
          textColor: 'text-blue-800'
        }
      default:
        return null
    }
  }

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl p-8 shadow-xl border-2 border-pink-200">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-secondary-100 mb-3">
          💜 Love the vibe. Learn the game.
        </h3>
        <p className="text-lg text-secondary-200 max-w-lg mx-auto leading-relaxed">
          Experience what happens on each down! Can you get 10+ yards in 4 tries? 💜
        </p>
      </div>

      {/* Story Context */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8 border border-purple-200">
        <div className="text-center">
          <div className="text-2xl mb-3">
            {attempt === 1 ? "🌟" : attempt === 2 ? "💪" : attempt === 3 ? "🔥" : "⚡"}
          </div>
          <div className="text-xl font-bold text-secondary-100 mb-2">
            {attempt === 1 ? "Fresh Start!" : 
             attempt === 2 ? "Building Momentum!" : 
             attempt === 3 ? "Pressure's On!" : 
             "Make or Break Time!"}
          </div>
          <div className="text-secondary-200 text-lg mb-3">
            {attempt === 1 ? "Your team has the ball and 4 chances to move forward!" :
             attempt === 2 ? `Nice! You moved ${totalYards} yards. Keep the drive alive!` :
             attempt === 3 ? `${totalYards} yards so far. One more good play could do it!` :
             `${totalYards} yards gained. This is it - do or die time!`}
          </div>
          <div className="bg-white/60 rounded-xl p-3">
            <div className="text-sm text-secondary-200">
              <strong>The Goal:</strong> Get to 10 yards total to keep your drive going!
            </div>
            <div className="text-sm text-purple-600 font-medium mt-1">
              {10 - totalYards} more yards needed
            </div>
          </div>
        </div>
      </div>

      {/* Card Display with Previous Cards */}
      {!driveOutcome && (
        <div className="mb-8">
          <div className="flex items-center justify-center max-w-6xl mx-auto">
            {/* Left Side - Previous Cards */}
            <div className="flex-1 flex justify-end items-center space-x-3 pr-8">
              {currentDrive.slice(0, -1).map((card, index) => (
                <div key={index} className="flex-shrink-0">
                  <div className="w-16 h-20 bg-gradient-to-br from-gray-300 to-gray-400 rounded-xl flex items-center justify-center text-white shadow-md border-2 border-white">
                    <div className="text-center">
                      <div className="text-lg">{card.emoji}</div>
                      <div className="text-xs font-bold">+{card.yards}</div>
                    </div>
                  </div>
                  <div className="text-center text-xs text-gray-500 mt-1">
                    Down {card.attempt}
                  </div>
                </div>
              ))}
            </div>

            {/* Center - Main Card */}
            <div className="flex-shrink-0">
              {gameState === 'ready' && (
                <div className="text-center">
                  <div className="w-40 h-52 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl mx-auto flex items-center justify-center text-white text-5xl shadow-xl cursor-pointer hover:scale-105 transition-transform duration-200 border-4 border-white"
                       onClick={drawCard}>
                    🎲
                  </div>
                  <div className="mt-6 text-secondary-200 font-medium text-lg">
                    Click to see what happens next in your story! ✨
                  </div>
                </div>
              )}

              {gameState === 'flipping' && (
                <div className="text-center">
                  <div className="w-40 h-52 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-3xl mx-auto flex items-center justify-center text-white text-5xl shadow-xl border-4 border-white">
                    🌟
                  </div>
                  <div className="mt-6 text-secondary-200 font-medium text-lg">
                    Your team is making their move... 🏈
                  </div>
                </div>
              )}

              {gameState === 'result' && lastCard && (
                <div className="text-center">
                  <div className="w-40 h-52 bg-gradient-to-br from-green-400 to-emerald-400 rounded-3xl mx-auto flex items-center justify-center text-white shadow-xl border-4 border-white">
                    <div className="text-center">
                      <div className="text-4xl mb-3">{lastCard.emoji}</div>
                      <div className="text-xl font-bold">+{lastCard.yards}</div>
                    </div>
                  </div>
                  <div className="mt-6 max-w-md mx-auto">
                    <div className="text-2xl font-bold text-secondary-100 mb-2">{lastCard.title}</div>
                    <div className="text-secondary-200 mb-3">{lastCard.situation}</div>
                    <div className="text-sage-600 font-medium mb-4">{lastCard.result}</div>
                    <button 
                      onClick={continueAfterResult}
                      className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-bold text-lg"
                    >
                      {(() => {
                        const newTotal = totalYards + lastCard.yards
                        const nextAttempt = attempt + 1
                        const yardsRemaining = 10 - newTotal
                        
                        if (newTotal >= 20) return "🏆 Touchdown!"
                        if (newTotal >= 10) return "🎉 First Down!"
                        if (nextAttempt > 4) return "⚠️ 4th Down Decision"
                        
                        const downNames = {
                          2: "2nd Down",
                          3: "3rd Down", 
                          4: "4th Down"
                        }
                        
                        return (
                          <div className="text-center">
                            <div>▶️ {downNames[nextAttempt]} Play</div>
                            <div className="text-sm font-normal opacity-90">
                              {yardsRemaining} yards to go
                            </div>
                          </div>
                        )
                      })()}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Placeholder for balance */}
            <div className="flex-1 flex justify-start items-center pl-8">
              <div className="text-center text-gray-400">
                {attempt <= 4 && (
                  <div className="text-sm">
                    {4 - attempt > 0 ? `${4 - attempt} more chances` : 'Final chance!'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fourth Down Decision */}
      {gameState === 'fourth-down-decision' && (
        <div className="mb-8">
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-3xl p-8 text-center border-4 border-yellow-400">
            <div className="text-5xl mb-4">⚠️</div>
            <div className="text-2xl font-bold text-orange-800 mb-3">4th Down Decision!</div>
            <div className="text-orange-700 text-lg mb-6">
              You've used 3 of your 4 downs and gained {totalYards} yards. 
              What's your next move, coach?
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <button 
                onClick={choosePunt}
                className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-6 py-4 rounded-2xl font-bold text-lg"
              >
                🦶 Punt It
                <div className="text-sm font-normal mt-1">Give the ball to the other team safely</div>
              </button>
              
              <button 
                onClick={goForIt}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-4 rounded-2xl font-bold text-lg"
              >
                🎯 Go For It!
                <div className="text-sm font-normal mt-1">Risk it all - one last chance!</div>
              </button>
            </div>
            
            <div className="mt-4 text-sm text-orange-600">
              💡 Most teams punt on 4th down to play it safe, but going for it can be exciting!
            </div>
          </div>
        </div>
      )}

      {/* Drive Outcome */}
      {driveOutcome && (
        <div className="mb-8">
          {(() => {
            const scenario = getScenarioForOutcome(driveOutcome)
            return (
              <div className={`bg-gradient-to-r ${scenario.color} rounded-3xl p-8 text-center`}>
                <div className="text-6xl mb-4">{scenario.emoji}</div>
                <div className={`text-3xl font-bold ${scenario.textColor} mb-3`}>{scenario.title}</div>
                <div className={`${scenario.textColor} text-lg`}>{scenario.message}</div>
              </div>
            )
          })()}
        </div>
      )}

      {/* Stats & History */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="bg-white/60 rounded-2xl p-3 text-center border border-yellow-200">
          <div className="text-xl font-bold text-yellow-600">{touchdowns}</div>
          <div className="text-xs text-yellow-500">Touchdowns</div>
        </div>
        <div className="bg-white/60 rounded-2xl p-3 text-center border border-green-200">
          <div className="text-xl font-bold text-green-600">{firstDowns}</div>
          <div className="text-xs text-green-500">First Downs</div>
        </div>
        <div className="bg-white/60 rounded-2xl p-3 text-center border border-blue-200">
          <div className="text-xl font-bold text-blue-600">{punts}</div>
          <div className="text-xs text-blue-500">Punts</div>
        </div>
        <div className="text-center flex items-center justify-center">
          <button 
            onClick={() => setShowHistory(!showHistory)}
            disabled={driveHistory.length === 0}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 disabled:opacity-50 text-white px-3 py-2 rounded-xl text-sm font-medium"
          >
            {showHistory ? '🏈 Play' : '📊 History'}
          </button>
        </div>
      </div>

      <div className="text-center mb-8">
        <button 
          onClick={resetGame}
          className="bg-white border-2 border-purple-300 text-purple-600 px-6 py-2 rounded-xl hover:bg-purple-50 transition-colors"
        >
          🔄 Reset Game
        </button>
      </div>

      {/* Simple Instructions */}
      <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200">
        <h4 className="text-lg font-bold text-secondary-100 mb-3 text-center">🏈 What You're Learning</h4>
        <div className="space-y-2 text-sm text-secondary-200">
          <p>🎯 <strong>The Goal:</strong> Get 10+ yards in 4 tries (downs)</p>
          <p>🎉 <strong>First Down:</strong> Success! You get 4 new downs</p>
          <p>🏆 <strong>Touchdown:</strong> 20+ yards = You scored!</p>
          <p>🦶 <strong>Punt:</strong> Failed to get 10 yards = Other team gets the ball</p>
        </div>
      </div>
    </div>
  )
}

export default FootballScenarioGame