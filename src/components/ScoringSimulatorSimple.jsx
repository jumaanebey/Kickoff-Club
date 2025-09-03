import { useState } from 'react'

const ScoringSimulatorSimple = ({ className = '' }) => {
  const [homeScore, setHomeScore] = useState(14)
  const [awayScore, setAwayScore] = useState(10)
  const [lastScoring, setLastScoring] = useState(null)
  const [scoringHistory, setScoringHistory] = useState([])
  const [showExtraPointChoice, setShowExtraPointChoice] = useState(false)
  const [pendingTouchdown, setPendingTouchdown] = useState(null)

  const executeTouchdown = (team) => {
    setPendingTouchdown({ team })
    setShowExtraPointChoice(true)
  }

  const executeScore = (team, playType, points) => {
    if (team === 'home') {
      setHomeScore(prev => prev + points)
    } else {
      setAwayScore(prev => prev + points)
    }

    const scoringEvent = {
      team: team.toUpperCase(),
      play: playType,
      points: points
    }

    setLastScoring(scoringEvent)
    setScoringHistory(prev => [...prev, scoringEvent])
  }

  const handleExtraPointChoice = (choice) => {
    const { team } = pendingTouchdown
    let totalPoints = 6 // Touchdown base
    let choiceDescription = ''

    if (choice === 'kick') {
      totalPoints = 7
      choiceDescription = 'Touchdown + Extra Point Kick'
    } else if (choice === 'conversion') {
      // 60% success rate simulation
      const success = Math.random() > 0.4
      totalPoints = success ? 8 : 6
      choiceDescription = success 
        ? 'Touchdown + 2-Point Conversion ✅' 
        : 'Touchdown + 2-Point Conversion ❌'
    }

    executeScore(team, choiceDescription, totalPoints)
    setShowExtraPointChoice(false)
    setPendingTouchdown(null)
  }

  const reset = () => {
    setHomeScore(0)
    setAwayScore(0)
    setLastScoring(null)
    setScoringHistory([])
    setShowExtraPointChoice(false)
    setPendingTouchdown(null)
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-navy mb-2">
          🎯 Interactive Scoring Simulator
        </h3>
        <p className="text-sm text-gray-600">
          Learn how different scoring plays affect the game
        </p>
      </div>

      {/* Scoreboard */}
      <div className="bg-navy text-white rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-sm font-semibold mb-1">🏠 HOME</div>
            <div className="text-4xl font-bold">{homeScore}</div>
          </div>
          <div>
            <div className="text-sm font-semibold mb-1">✈️ AWAY</div>
            <div className="text-4xl font-bold">{awayScore}</div>
          </div>
        </div>
      </div>

      {/* Extra point choice modal */}
      {showExtraPointChoice && (
        <div className="mb-6 p-4 bg-warmGold bg-opacity-20 rounded-lg border-2 border-warmGold">
          <h4 className="font-bold text-navy mb-3 text-center">
            🏈 TOUCHDOWN! Choose your extra point attempt:
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleExtraPointChoice('kick')}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105"
            >
              <div className="text-center">
                <div className="text-lg">🦶 Kick</div>
                <div className="text-sm opacity-80">+1 point (95% success)</div>
              </div>
            </button>
            <button
              onClick={() => handleExtraPointChoice('conversion')}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105"
            >
              <div className="text-center">
                <div className="text-lg">🏃 Go for 2</div>
                <div className="text-sm opacity-80">+2 points (60% success)</div>
              </div>
            </button>
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">
            💡 Most teams choose the safe kick, but strategic situations might call for going for 2!
          </p>
        </div>
      )}

      {/* Scoring buttons */}
      {!showExtraPointChoice && (
        <div className="mb-6">
          <h4 className="font-bold text-navy mb-4 text-center">Score for:</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="font-semibold text-sage-600 mb-3">🏠 HOME TEAM</div>
              <div className="space-y-2">
                <button
                  onClick={() => executeTouchdown('home')}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
                >
                  🏈 Touchdown (6+pts)
                </button>
                <button
                  onClick={() => executeScore('home', 'Field Goal', 3)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
                >
                  🎯 Field Goal (3pts)
                </button>
                <button
                  onClick={() => executeScore('home', 'Safety', 2)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
                >
                  🛡️ Safety (2pts)
                </button>
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-rose-600 mb-3">✈️ AWAY TEAM</div>
              <div className="space-y-2">
                <button
                  onClick={() => executeTouchdown('away')}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
                >
                  🏈 Touchdown (6+pts)
                </button>
                <button
                  onClick={() => executeScore('away', 'Field Goal', 3)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
                >
                  🎯 Field Goal (3pts)
                </button>
                <button
                  onClick={() => executeScore('away', 'Safety', 2)}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
                >
                  🛡️ Safety (2pts)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Last scoring play */}
      {lastScoring && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm">
            <strong>Last Score:</strong> {lastScoring.team} - {lastScoring.play}
            <span className="text-green-600 font-bold"> (+{lastScoring.points} pts)</span>
          </div>
        </div>
      )}

      {/* Scoring history */}
      {scoringHistory.length > 0 && (
        <div className="mb-4">
          <h5 className="font-semibold text-navy mb-2">📊 Game History:</h5>
          <div className="max-h-24 overflow-y-auto bg-gray-50 rounded-lg p-3">
            {scoringHistory.slice(-3).map((score, index) => (
              <div key={index} className="text-xs mb-1 flex justify-between">
                <span>{score.team}: {score.play}</span>
                <span className="font-bold text-green-600">+{score.points}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="text-center">
        <button
          onClick={reset}
          className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          🔄 Reset Game
        </button>
      </div>

      {/* Educational note */}
      <div className="mt-4 p-3 bg-blush-100 rounded-lg">
        <p className="text-xs text-navy">
          <strong>💡 Key Learning:</strong> Touchdowns = 6 points + extra point decision (kick for 1 or go for 2). 
          Most teams take the safe kick, but situational strategy might require the risky 2-point attempt!
        </p>
      </div>
    </div>
  )
}

export default ScoringSimulatorSimple