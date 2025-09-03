import { useState } from 'react'

const ScoringSimulator = ({ onScoreUpdate, className = '' }) => {
  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)
  const [lastScoring, setLastScoring] = useState(null)
  const [scoringHistory, setScoringHistory] = useState([])
  const [showExtraPointChoice, setShowExtraPointChoice] = useState(false)
  const [pendingTouchdown, setPendingTouchdown] = useState(null)

  const scoringPlays = [
    { type: 'touchdown', points: 6, label: 'Touchdown', description: 'Ball crosses the goal line' },
    { type: 'field-goal', points: 3, label: 'Field Goal', description: 'Kick through the uprights' },
    { type: 'safety', points: 2, label: 'Safety', description: 'Tackle in own end zone' }
  ]

  const executeScore = (team, playType) => {
    const play = scoringPlays.find(p => p.type === playType)
    
    if (playType === 'touchdown') {
      setPendingTouchdown({ team, play })
      setShowExtraPointChoice(true)
      return
    }

    // Handle non-touchdown scoring
    if (team === 'home') {
      setHomeScore(prev => prev + play.points)
    } else {
      setAwayScore(prev => prev + play.points)
    }

    const scoringEvent = {
      team,
      play: play.label,
      points: play.points,
      description: play.description
    }

    setLastScoring(scoringEvent)
    setScoringHistory(prev => [...prev, scoringEvent])

    if (onScoreUpdate) {
      onScoreUpdate({ home: team === 'home' ? homeScore + play.points : homeScore, away: team === 'away' ? awayScore + play.points : awayScore })
    }
  }

  const handleExtraPointChoice = (choice) => {
    const { team, play } = pendingTouchdown
    let totalPoints = 6
    let choiceDescription = ''

    if (choice === 'kick') {
      totalPoints = 7
      choiceDescription = 'Extra point kick (1 pt)'
    } else if (choice === 'conversion') {
      const success = Math.random() > 0.4 // 60% success rate
      totalPoints = success ? 8 : 6
      choiceDescription = success ? '2-point conversion SUCCESS (2 pts)' : '2-point conversion FAILED (0 pts)'
    }

    if (team === 'home') {
      setHomeScore(prev => prev + totalPoints)
    } else {
      setAwayScore(prev => prev + totalPoints)
    }

    const scoringEvent = {
      team,
      play: `${play.label} + ${choiceDescription}`,
      points: totalPoints,
      description: `${play.description} then ${choiceDescription}`
    }

    setLastScoring(scoringEvent)
    setScoringHistory(prev => [...prev, scoringEvent])
    setShowExtraPointChoice(false)
    setPendingTouchdown(null)

    if (onScoreUpdate) {
      onScoreUpdate({ 
        home: team === 'home' ? homeScore + totalPoints : homeScore, 
        away: team === 'away' ? awayScore + totalPoints : awayScore 
      })
    }
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
    <div className={`scoring-simulator bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-navy mb-2">
          Scoring Simulator
        </h3>
        <p className="text-sm text-gray-600">
          Learn how different scoring plays affect the game
        </p>
      </div>

      {/* Scoreboard */}
      <div className="bg-navy text-white rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-sm font-semibold mb-1">HOME</div>
            <div className="text-4xl font-bold">{homeScore}</div>
          </div>
          <div>
            <div className="text-sm font-semibold mb-1">AWAY</div>
            <div className="text-4xl font-bold">{awayScore}</div>
          </div>
        </div>
      </div>

      {/* Extra point choice modal */}
      {showExtraPointChoice && (
        <div className="mb-6 p-4 bg-warmGold bg-opacity-20 rounded-lg border border-warmGold">
          <h4 className="font-bold text-navy mb-3 text-center">
            TOUCHDOWN! Choose your extra point attempt:
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleExtraPointChoice('kick')}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <div className="text-center">
                <div className="text-lg">Kick</div>
                <div className="text-sm opacity-80">+1 point (safe)</div>
              </div>
            </button>
            <button
              onClick={() => handleExtraPointChoice('conversion')}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              <div className="text-center">
                <div className="text-lg">Go for 2</div>
                <div className="text-sm opacity-80">+2 points (risky)</div>
              </div>
            </button>
          </div>
          <p className="text-xs text-gray-600 text-center mt-2">
            Extra point kicks are nearly automatic. 2-point conversions succeed about 60% of the time.
          </p>
        </div>
      )}

      {/* Scoring buttons */}
      {!showExtraPointChoice && (
        <div className="mb-6">
          <h4 className="font-bold text-navy mb-3 text-center">Score for:</h4>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="font-semibold text-sage-600 mb-2">HOME TEAM</div>
              <div className="space-y-2">
                {scoringPlays.map(play => (
                  <button
                    key={play.type}
                    onClick={() => executeScore('home', play.type)}
                    className="w-full bg-sage-500 hover:bg-sage-600 text-white font-bold py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
                  >
                    {play.label} ({play.points}pts)
                  </button>
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-blush-600 mb-2">AWAY TEAM</div>
              <div className="space-y-2">
                {scoringPlays.map(play => (
                  <button
                    key={play.type}
                    onClick={() => executeScore('away', play.type)}
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-3 rounded-lg transition-colors duration-200 text-sm"
                  >
                    {play.label} ({play.points}pts)
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Last scoring play */}
      {lastScoring && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm">
            <strong>Last Score:</strong> {lastScoring.team.toUpperCase()} - {lastScoring.play} 
            <span className="text-green-600 font-bold"> (+{lastScoring.points} pts)</span>
          </div>
          <div className="text-xs text-gray-600 mt-1">
            {lastScoring.description}
          </div>
        </div>
      )}

      {/* Scoring history */}
      {scoringHistory.length > 0 && (
        <div className="mb-4">
          <h5 className="font-semibold text-navy mb-2">Game History:</h5>
          <div className="max-h-32 overflow-y-auto bg-gray-50 rounded-lg p-3">
            {scoringHistory.slice(-5).map((score, index) => (
              <div key={index} className="text-xs mb-1 flex justify-between">
                <span>{score.team.toUpperCase()}: {score.play}</span>
                <span className="font-bold">+{score.points}</span>
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
          Reset Game
        </button>
      </div>

      {/* Educational note */}
      <div className="mt-4 p-3 bg-blush-100 rounded-lg">
        <p className="text-xs text-navy">
          <strong>Key Learning:</strong> Touchdowns are worth 6 points, but the extra point decision can make it 7 or 8 total. 
          Most teams choose the safer 1-point kick, but strategic situations might call for the 2-point conversion.
        </p>
      </div>
    </div>
  )
}

export default ScoringSimulator