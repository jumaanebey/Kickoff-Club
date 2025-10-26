import React, { useState, useEffect } from 'react'

const TecmoDownsGame = () => {
  const [down, setDown] = useState(1)
  const [yardsToGo, setYardsToGo] = useState(10)
  const [ballPosition, setBallPosition] = useState(75)
  const [selectedPlay, setSelectedPlay] = useState(null)
  const [defensePlay, setDefensePlay] = useState(null)
  const [gameState, setGameState] = useState('select') // 'select', 'action', 'result'
  const [playResult, setPlayResult] = useState(null)
  const [timingChallenge, setTimingChallenge] = useState(false)
  const [buttonPosition, setButtonPosition] = useState(50)
  const [score, setScore] = useState(0)
  const [chains, setChains] = useState(0)

  const plays = [
    { id: 'run', name: '🏃‍♀️ Quick Run', desc: 'Safe but short', yards: [1, 4], beats: 'pass-defense' },
    { id: 'pass', name: '🎯 Short Pass', desc: 'Reliable medium gain', yards: [3, 7], beats: 'run-defense' },
    { id: 'bomb', name: '🚀 Deep Pass', desc: 'Big risk, big reward!', yards: [0, 12], beats: 'run-defense' }
  ]

  const defensePlayOptions = ['run-defense', 'pass-defense', 'blitz']

  useEffect(() => {
    if (timingChallenge) {
      const interval = setInterval(() => {
        setButtonPosition(Math.random() * 80 + 10)
      }, 150)
      
      const timeout = setTimeout(() => {
        setTimingChallenge(false)
        executePlay(Math.random() * 0.5) // Missed timing = poor execution
      }, 3000)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }
  }, [timingChallenge])

  const selectPlay = (play) => {
    setSelectedPlay(play)
    // Computer picks defense randomly, weighted toward countering your play
    const weights = {
      'run': ['run-defense', 'run-defense', 'pass-defense', 'blitz'],
      'pass': ['pass-defense', 'pass-defense', 'run-defense', 'blitz'],
      'bomb': ['pass-defense', 'pass-defense', 'pass-defense', 'blitz']
    }
    
    const defensePicks = weights[play.id]
    const computerDefense = defensePicks[Math.floor(Math.random() * defensePicks.length)]
    setDefensePlay(computerDefense)
    
    setGameState('action')
    setTimingChallenge(true)
  }

  const hitTiming = () => {
    if (!timingChallenge) return
    setTimingChallenge(false)
    
    // Good timing = better execution
    const accuracy = Math.abs(buttonPosition - 50) / 50 // 0 = perfect, 1 = terrible
    executePlay(1 - accuracy) // Convert to execution quality
  }

  const executePlay = (executionQuality) => {
    const play = selectedPlay
    const defense = defensePlay
    
    // Calculate result based on play vs defense and execution
    let baseYards = play.yards[0] + (play.yards[1] - play.yards[0]) * executionQuality
    
    // Play vs defense matchups
    let multiplier = 1
    if (play.beats === defense) {
      multiplier = 1.5 // Good matchup
    } else if (defense === 'blitz') {
      multiplier = Math.random() > 0.6 ? 1.8 : 0.3 // Big success or big failure
    } else {
      multiplier = 0.7 // Defense guessed right
    }
    
    const finalYards = Math.max(0, Math.floor(baseYards * multiplier))
    
    setPlayResult({
      yards: finalYards,
      execution: executionQuality > 0.7 ? 'great' : executionQuality > 0.4 ? 'good' : 'poor',
      matchup: play.beats === defense ? 'good' : defense === 'blitz' ? 'risky' : 'bad'
    })
    
    setGameState('result')
    
    // Apply result after showing animation
    setTimeout(() => {
      advanceGame(finalYards)
    }, 2500)
  }

  const advanceGame = (yards) => {
    const newPosition = Math.max(0, ballPosition - yards)
    setBallPosition(newPosition)
    
    // Touchdown!
    if (newPosition === 0) {
      setScore(score + 6)
      resetDrive()
      return
    }
    
    // First down!
    if (yards >= yardsToGo) {
      setDown(1)
      setYardsToGo(10)
      setChains(chains + 1)
      resetForNextPlay()
      return
    }
    
    // Next down
    const nextDown = down + 1
    if (nextDown > 4) {
      // Turnover
      setTimeout(() => {
        resetDrive()
      }, 1000)
      return
    }
    
    setDown(nextDown)
    setYardsToGo(yardsToGo - yards)
    resetForNextPlay()
  }

  const resetForNextPlay = () => {
    setTimeout(() => {
      setGameState('select')
      setSelectedPlay(null)
      setDefensePlay(null)
      setPlayResult(null)
    }, 1500)
  }

  const resetDrive = () => {
    setBallPosition(75)
    setDown(1)
    setYardsToGo(10)
    setGameState('select')
    setSelectedPlay(null)
    setDefensePlay(null)
    setPlayResult(null)
  }

  const resetGame = () => {
    resetDrive()
    setScore(0)
    setChains(0)
  }

  return (
    <div className="bg-gradient-to-br from-blue-900 to-purple-900 rounded-2xl p-6 shadow-2xl text-white" style={{fontFamily: 'monospace'}}>
      {/* Tecmo-style Header */}
      <div className="text-center mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-black p-4 rounded-xl font-bold">
        <h3 className="text-2xl mb-2">⚡ KICKOFF CLUB TECMO STYLE ⚡</h3>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>DOWN: {down}/4</div>
          <div>YARDS: {yardsToGo}</div>
          <div>SCORE: {score}</div>
        </div>
      </div>

      {/* Game Field */}
      <div className="mb-6">
        <div className="bg-green-600 h-20 rounded-lg relative overflow-hidden">
          {/* Field lines */}
          <div className="absolute inset-0 flex">
            {[...Array(11)].map((_, i) => (
              <div key={i} className="flex-1 border-r border-white/30"></div>
            ))}
          </div>
          
          {/* Ball */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 transition-all duration-1000"
            style={{ left: `${(100-ballPosition)}%` }}
          >
            <div className="bg-orange-500 w-4 h-4 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          
          {/* Goal line */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-yellow-400"></div>
          <div className="absolute left-0 -bottom-6 text-yellow-400 text-xs font-bold">GOAL</div>
          
          {/* Yards to go line */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-red-400"
            style={{ left: `${Math.min(100, (100-ballPosition) + (yardsToGo/100*80))}%` }}
          ></div>
        </div>
        
        <div className="text-center mt-2 text-sm text-blue-200">
          {ballPosition} yards to goal • {yardsToGo} yards for 1st down
        </div>
      </div>

      {/* Play Selection */}
      {gameState === 'select' && (
        <div className="space-y-4">
          <div className="text-center text-yellow-400 font-bold text-lg mb-4">
            🎮 CHOOSE YOUR PLAY!
          </div>
          
          <div className="grid gap-3">
            {plays.map((play, index) => (
              <button
                key={play.id}
                onClick={() => selectPlay(play)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 p-4 rounded-xl text-left transition-all duration-200 transform hover:scale-105 border-2 border-indigo-400"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-bold text-lg">{index + 1}. {play.name}</div>
                    <div className="text-sm text-blue-200">{play.desc}</div>
                    <div className="text-xs text-yellow-300">Gain: {play.yards[0]}-{play.yards[1]} yards</div>
                  </div>
                  <div className="text-3xl">⚡</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Phase */}
      {gameState === 'action' && (
        <div className="text-center space-y-6">
          <div className="text-yellow-400 font-bold text-xl">
            🏈 {selectedPlay.name} VS {defensePlay.toUpperCase().replace('-', ' ')} 🛡️
          </div>
          
          {timingChallenge && (
            <div className="bg-black/50 rounded-xl p-6 border-2 border-yellow-400">
              <div className="text-yellow-400 font-bold mb-4 text-lg animate-pulse">
                ⚡ HIT THE TIMING! ⚡
              </div>
              
              <div className="relative h-12 bg-gray-800 rounded-lg mb-4 border-2 border-white">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-green-400 text-sm font-bold">PERFECT</div>
                </div>
                <div 
                  className="absolute top-0 bottom-0 w-2 bg-yellow-400 animate-pulse transition-all duration-150"
                  style={{ left: `${buttonPosition}%` }}
                ></div>
              </div>
              
              <button
                onClick={hitTiming}
                className="bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-xl font-bold text-xl animate-bounce"
              >
                🎯 HIT IT!
              </button>
            </div>
          )}
          
          <div className="text-blue-200">
            Defense is trying to stop your {selectedPlay.name}!
          </div>
        </div>
      )}

      {/* Result Phase */}
      {gameState === 'result' && playResult && (
        <div className="text-center space-y-4">
          <div className={`text-4xl font-bold animate-pulse ${
            playResult.yards >= yardsToGo ? 'text-green-400' : 
            playResult.yards >= 3 ? 'text-yellow-400' : 'text-red-400'
          }`}>
            {playResult.yards >= yardsToGo ? '🎉 FIRST DOWN!' :
             playResult.yards === 0 ? '💥 NO GAIN!' :
             `+${playResult.yards} YARDS`}
          </div>
          
          <div className="bg-black/50 rounded-xl p-4">
            <div className="text-sm space-y-1">
              <div>Execution: <span className={`font-bold ${
                playResult.execution === 'great' ? 'text-green-400' :
                playResult.execution === 'good' ? 'text-yellow-400' : 'text-red-400'
              }`}>{playResult.execution.toUpperCase()}</span></div>
              <div>Matchup: <span className={`font-bold ${
                playResult.matchup === 'good' ? 'text-green-400' :
                playResult.matchup === 'risky' ? 'text-yellow-400' : 'text-red-400'
              }`}>{playResult.matchup.toUpperCase()}</span></div>
            </div>
          </div>
          
          {down > 4 && (
            <div className="text-red-400 font-bold text-xl animate-pulse">
              💀 TURNOVER! 💀
            </div>
          )}
        </div>
      )}

      {/* Stats */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="bg-black/30 rounded-lg p-3">
          <div className="text-green-400 font-bold text-xl">{chains}</div>
          <div className="text-xs">FIRST DOWNS</div>
        </div>
        <div className="bg-black/30 rounded-lg p-3">
          <div className="text-yellow-400 font-bold text-xl">{score}</div>
          <div className="text-xs">POINTS</div>
        </div>
        <div>
          <button 
            onClick={resetGame}
            className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm"
          >
            🔄 RESET
          </button>
        </div>
      </div>

      {/* How to Play */}
      <div className="mt-6 bg-black/30 rounded-xl p-4 text-xs text-blue-200">
        <div className="font-bold text-yellow-400 mb-2">🎮 TECMO TIPS:</div>
        <div className="space-y-1">
          <div>• Pick plays that beat the defense!</div>
          <div>• Hit perfect timing for better execution</div>
          <div>• Get 10 yards in 4 downs for 1st down</div>
          <div>• Defense tries to guess your play!</div>
        </div>
      </div>
    </div>
  )
}

export default TecmoDownsGame