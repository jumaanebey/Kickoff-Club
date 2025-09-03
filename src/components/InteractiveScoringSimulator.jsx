import React, { useState } from 'react'

const InteractiveScoringSimulator = () => {
  const [gameScore, setGameScore] = useState({ home: 14, away: 13 })
  const [timeLeft, setTimeLeft] = useState('2:30')
  const [scenario, setScenario] = useState('touchdown')
  const [choice, setChoice] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [explanation, setExplanation] = useState('')

  const scenarios = {
    touchdown: {
      title: "Just Scored a Touchdown!",
      description: "Your team just scored 6 points. You're trailing by 1 point with 2:30 left.",
      options: [
        { id: 'kick', name: 'Kick Extra Point', points: 1, success: 95 },
        { id: 'go2', name: 'Go for 2', points: 2, success: 45 }
      ]
    },
    fieldgoal: {
      title: "4th & 8 from the 25-yard line",
      description: "You're in field goal range but it's a 42-yard attempt. What's your call?",
      options: [
        { id: 'kick', name: 'Attempt Field Goal', points: 3, success: 75 },
        { id: 'go', name: 'Go for It (TD)', points: 6, success: 35 }
      ]
    },
    safety: {
      title: "Tackled in Your Own End Zone",
      description: "The other team just got 2 points for a safety. You have to kick to them.",
      options: [
        { id: 'accept', name: 'Accept the Safety', points: -2, success: 100 }
      ]
    }
  }

  const makeChoice = (option) => {
    setChoice(option)
    const success = Math.random() * 100 < option.success
    const points = success ? option.points : 0
    
    let newScore = { ...gameScore }
    if (scenario === 'safety') {
      newScore.away += Math.abs(points)
    } else {
      newScore.home += points
    }
    setGameScore(newScore)
    
    let resultText = ''
    if (scenario === 'touchdown') {
      if (option.id === 'kick') {
        resultText = success 
          ? `✅ GOOD! Extra point is good. Score is now ${newScore.home}-${newScore.away}.`
          : `❌ MISSED! Rare miss on the extra point. Still ${newScore.home}-${newScore.away}.`
      } else {
        resultText = success 
          ? `🔥 CONVERTED! 2-point conversion successful! You take the lead ${newScore.home}-${newScore.away}!`
          : `❌ NO GOOD! 2-point attempt fails. Still trailing ${newScore.away}-${newScore.home}.`
      }
    } else if (scenario === 'fieldgoal') {
      if (option.id === 'kick') {
        resultText = success 
          ? `✅ GOOD! 42-yard field goal is good! Score is now ${newScore.home}-${newScore.away}.`
          : `❌ WIDE LEFT! Field goal attempt misses. Still ${gameScore.home}-${gameScore.away}.`
      } else {
        resultText = success 
          ? `🚀 TOUCHDOWN! Amazing 4th down conversion! Score is now ${newScore.home}-${newScore.away}!`
          : `🛑 TURNOVER! Failed to convert. Other team gets the ball at the 25.`
      }
    } else {
      resultText = "Safety! The other team gets 2 points and you have to kick to them from your 20-yard line."
    }
    
    setExplanation(resultText)
    setShowResult(true)
  }

  const resetScenario = () => {
    setChoice(null)
    setShowResult(false)
    setExplanation('')
    setGameScore({ home: 14, away: 13 })
  }

  const currentScenario = scenarios[scenario]

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-sage-200">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-secondary-100 mb-2">
          🎯 Interactive Scoring Simulator
        </h3>
        <p className="text-secondary-300">
          Make strategic scoring decisions in real game situations
        </p>
      </div>

      {/* Scoreboard */}
      <div className="bg-gradient-to-r from-navy to-secondary-100 text-white rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <div className="text-center">
            <div className="text-sm opacity-75">HOME</div>
            <div className="text-3xl font-bold">{gameScore.home}</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">Q4</div>
            <div className="text-sm">{timeLeft}</div>
          </div>
          <div className="text-center">
            <div className="text-sm opacity-75">AWAY</div>
            <div className="text-3xl font-bold">{gameScore.away}</div>
          </div>
        </div>
      </div>

      {/* Scenario selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Choose a scenario:
        </label>
        <select 
          value={scenario}
          onChange={(e) => {
            setScenario(e.target.value)
            resetScenario()
          }}
          className="w-full border border-sage-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sage-500"
        >
          <option value="touchdown">Touchdown + Extra Point Decision</option>
          <option value="fieldgoal">Field Goal vs Go For It</option>
          <option value="safety">Safety Situation</option>
        </select>
      </div>

      {/* Current scenario */}
      <div className="space-y-4">
        <div className="bg-sage-50 rounded-lg p-4 border border-sage-200">
          <h4 className="font-bold text-navy mb-2">{currentScenario.title}</h4>
          <p className="text-sm text-gray-700 mb-4">{currentScenario.description}</p>
          
          {!showResult ? (
            <div className="grid gap-3">
              {currentScenario.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => makeChoice(option)}
                  className="flex justify-between items-center bg-white border border-sage-300 rounded-lg px-4 py-3 hover:bg-sage-50 transition-colors"
                >
                  <span className="font-medium">{option.name}</span>
                  <div className="text-right text-sm">
                    <div className="font-bold text-warmGold">+{Math.abs(option.points)} pts</div>
                    <div className="text-gray-500">{option.success}% success</div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border-2 border-warmGold">
                <h5 className="font-bold text-navy mb-2">Result:</h5>
                <p className="text-gray-700">{explanation}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <button 
                  onClick={resetScenario}
                  className="bg-sage-500 hover:bg-sage-600 text-white px-4 py-2 rounded transition-colors"
                >
                  Try Again
                </button>
                
                <div className="text-sm text-gray-600">
                  Success Rate: {choice?.success}%
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Strategy tips */}
        <div className="bg-blush-50 rounded-lg p-4 border border-blush-200">
          <h5 className="font-bold text-navy mb-2">🧠 Strategy Notes</h5>
          <div className="text-sm text-gray-700 space-y-1">
            {scenario === 'touchdown' && (
              <>
                <p>• Extra points are nearly automatic (~95% success rate)</p>
                <p>• Go for 2 when you need exactly 2 to tie or win</p>
                <p>• Consider game time and score differential</p>
              </>
            )}
            {scenario === 'fieldgoal' && (
              <>
                <p>• Field goal percentages drop with distance and conditions</p>
                <p>• Going for it risks giving opponent good field position</p>
                <p>• 4th & short near goal line favors going for touchdown</p>
              </>
            )}
            {scenario === 'safety' && (
              <>
                <p>• Safeties are rare but game-changing</p>
                <p>• Opponent gets 2 points AND the ball via free kick</p>
                <p>• Often results from intentional grounding in end zone</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveScoringSimulator