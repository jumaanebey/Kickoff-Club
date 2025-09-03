import { useState } from 'react'

const ScenarioChallenge = ({ scenario, onComplete, className = '' }) => {
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [currentRound, setCurrentRound] = useState(0)
  const [gameHistory, setGameHistory] = useState([])

  const scenarios = scenario?.scenarios || [
    {
      id: 'third-and-long',
      situation: {
        down: 3,
        distance: 8,
        fieldPosition: 35,
        timeLeft: '2:30',
        score: 'Tied 14-14',
        quarter: 4
      },
      description: "It's 3rd & 8 from your own 35-yard line. The game is tied 14-14 with 2:30 left in the 4th quarter.",
      question: "What's the best play call here?",
      choices: [
        {
          id: 'short-pass',
          text: 'Quick 5-yard slant pass',
          explanation: 'Safe but likely comes up short of the first down.',
          points: 1,
          isCorrect: false
        },
        {
          id: 'deep-pass',
          text: 'Deep 15-yard out route',
          explanation: 'Perfect! Gets the first down and gives your team good field position.',
          points: 3,
          isCorrect: true
        },
        {
          id: 'run',
          text: 'Handoff to running back',
          explanation: 'Risky on 3rd & long. Unlikely to get 8 yards rushing.',
          points: 0,
          isCorrect: false
        },
        {
          id: 'punt',
          text: 'Punt on 3rd down',
          explanation: 'You never punt on 3rd down! Teams get 4 attempts.',
          points: 0,
          isCorrect: false
        }
      ]
    },
    {
      id: 'red-zone',
      situation: {
        down: 1,
        distance: 10,
        fieldPosition: 95,
        timeLeft: '0:45',
        score: 'Down 21-17',
        quarter: 4
      },
      description: "1st & goal from the 5-yard line. You're down 21-17 with 45 seconds left. This could be your last drive.",
      question: "What's your priority here?",
      choices: [
        {
          id: 'quick-touchdown',
          text: 'Throw to the end zone immediately',
          explanation: 'Risky! You have 4 downs and plenty of time. Be patient.',
          points: 1,
          isCorrect: false
        },
        {
          id: 'run-first',
          text: 'Run the ball to control the clock',
          explanation: 'Smart! Use the time, get closer, and keep your options open.',
          points: 3,
          isCorrect: true
        },
        {
          id: 'timeout',
          text: 'Call timeout to think',
          explanation: 'Wasted timeout! You have plenty of time and clock stops in the final 2 minutes.',
          points: 0,
          isCorrect: false
        },
        {
          id: 'field-goal',
          text: 'Kick a field goal now',
          explanation: 'Terrible! A field goal still leaves you down by 1 point.',
          points: 0,
          isCorrect: false
        }
      ]
    },
    {
      id: 'fourth-down',
      situation: {
        down: 4,
        distance: 2,
        fieldPosition: 45,
        timeLeft: '8:30',
        score: 'Up 14-10',
        quarter: 3
      },
      description: "4th & 2 from midfield. You're up 14-10 in the 3rd quarter. Still plenty of time left.",
      question: "What's the smart decision?",
      choices: [
        {
          id: 'go-for-it',
          text: 'Go for the first down',
          explanation: 'Aggressive but risky. Midfield is dangerous territory to give away.',
          points: 1,
          isCorrect: false
        },
        {
          id: 'punt',
          text: 'Punt and play defense',
          explanation: 'Smart! Pin them deep, trust your defense, and maintain field position.',
          points: 3,
          isCorrect: true
        },
        {
          id: 'fake-punt',
          text: 'Fake punt and run',
          explanation: 'Creative but extremely risky. Save trick plays for desperate situations.',
          points: 0,
          isCorrect: false
        },
        {
          id: 'field-goal',
          text: 'Attempt 62-yard field goal',
          explanation: 'Impossible! Most NFL kickers max out around 55-60 yards.',
          points: 0,
          isCorrect: false
        }
      ]
    }
  ]

  const currentScenario = scenarios[currentRound]

  const handleChoiceSelect = (choice) => {
    setSelectedChoice(choice)
    setShowResult(true)
    
    const newScore = score + choice.points
    setScore(newScore)
    
    setGameHistory(prev => [...prev, {
      scenario: currentScenario.id,
      choice: choice.text,
      points: choice.points,
      correct: choice.isCorrect
    }])

    // Auto-advance after showing result
    setTimeout(() => {
      if (currentRound < scenarios.length - 1) {
        nextRound()
      } else {
        // Game complete
        if (onComplete) {
          onComplete({
            finalScore: newScore,
            maxScore: scenarios.length * 3,
            history: [...gameHistory, {
              scenario: currentScenario.id,
              choice: choice.text,
              points: choice.points,
              correct: choice.isCorrect
            }]
          })
        }
      }
    }, 3000)
  }

  const nextRound = () => {
    setCurrentRound(prev => prev + 1)
    setSelectedChoice(null)
    setShowResult(false)
  }

  const reset = () => {
    setCurrentRound(0)
    setScore(0)
    setSelectedChoice(null)
    setShowResult(false)
    setGameHistory([])
  }

  const getScoreColor = () => {
    const percentage = (score / (scenarios.length * 3)) * 100
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreGrade = () => {
    const percentage = (score / ((currentRound + 1) * 3)) * 100
    if (percentage >= 90) return 'A+'
    if (percentage >= 80) return 'A'
    if (percentage >= 70) return 'B'
    if (percentage >= 60) return 'C'
    return 'F'
  }

  return (
    <div className={`scenario-challenge bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-navy mb-2">
          Game Situation Challenge
        </h3>
        <p className="text-sm text-gray-600">
          Make the right call in crucial game moments
        </p>
      </div>

      {/* Progress and Score */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-600">
            Scenario {currentRound + 1} of {scenarios.length}
          </span>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-sage-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentRound + 1) / scenarios.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-lg font-bold ${getScoreColor()}`}>
            {score}/{(currentRound + (showResult ? 1 : 0)) * 3} pts
          </div>
          <div className="text-sm text-gray-500">
            Grade: {getScoreGrade()}
          </div>
        </div>
      </div>

      {currentRound < scenarios.length ? (
        <div>
          {/* Situation Display */}
          <div className="bg-navy text-white rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
              <div>
                <div className="font-bold text-lg">{currentScenario.situation.down === 1 ? '1st' : currentScenario.situation.down === 2 ? '2nd' : currentScenario.situation.down === 3 ? '3rd' : '4th'} & {currentScenario.situation.distance}</div>
                <div className="opacity-75">Down & Distance</div>
              </div>
              <div>
                <div className="font-bold text-lg">{currentScenario.situation.fieldPosition} yd</div>
                <div className="opacity-75">Field Position</div>
              </div>
              <div>
                <div className="font-bold text-lg">{currentScenario.situation.timeLeft}</div>
                <div className="opacity-75">Time Left</div>
              </div>
              <div>
                <div className="font-bold text-lg">{currentScenario.situation.score}</div>
                <div className="opacity-75">Score</div>
              </div>
            </div>
          </div>

          {/* Scenario Description */}
          <div className="mb-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              {currentScenario.description}
            </p>
            <h4 className="font-semibold text-navy text-lg">
              {currentScenario.question}
            </h4>
          </div>

          {/* Choices */}
          {!showResult ? (
            <div className="space-y-3 mb-6">
              {currentScenario.choices.map((choice, index) => (
                <button
                  key={choice.id}
                  onClick={() => handleChoiceSelect(choice)}
                  className="w-full text-left p-4 rounded-lg border-2 border-gray-200 hover:border-sage-300 hover:bg-sage-50 transition-all duration-200"
                >
                  <div className="flex items-center">
                    <span className="w-8 h-8 bg-sage-100 text-sage-600 rounded-full flex items-center justify-center font-bold mr-4 text-sm">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="font-medium">{choice.text}</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="mb-6">
              {/* Result Display */}
              <div className={`p-6 rounded-lg border-2 ${
                selectedChoice.isCorrect 
                  ? 'border-green-300 bg-green-50' 
                  : 'border-red-300 bg-red-50'
              }`}>
                <div className="flex items-center mb-4">
                  <span className={`text-2xl mr-3 ${
                    selectedChoice.isCorrect ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedChoice.isCorrect ? '✅' : '❌'}
                  </span>
                  <div>
                    <div className="font-bold text-lg">
                      {selectedChoice.isCorrect ? 'Great Call!' : 'Not Quite...'}
                    </div>
                    <div className="text-sm text-gray-600">
                      +{selectedChoice.points} points
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-4">
                  <strong>Your choice:</strong> {selectedChoice.text}
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  <strong>Explanation:</strong> {selectedChoice.explanation}
                </p>

                {!selectedChoice.isCorrect && (
                  <div className="mt-4 p-3 bg-white rounded border border-green-200">
                    <p className="text-sm text-gray-600">
                      <strong>Best answer:</strong> {currentScenario.choices.find(c => c.isCorrect)?.text}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        // Game Complete
        <div className="text-center">
          <h4 className="text-2xl font-bold text-navy mb-4">
            Challenge Complete!
          </h4>
          <div className={`text-4xl font-bold mb-4 ${getScoreColor()}`}>
            {score}/{scenarios.length * 3}
          </div>
          <div className="text-lg font-semibold mb-6">
            Final Grade: {getScoreGrade()}
          </div>
          
          <button
            onClick={reset}
            className="bg-sage-500 hover:bg-sage-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Educational Note */}
      <div className="mt-6 p-4 bg-blush-100 rounded-lg">
        <p className="text-xs text-navy">
          <strong>Pro Tip:</strong> Great coaches consider down & distance, field position, score, and time remaining when making decisions. 
          Context matters more than any single factor!
        </p>
      </div>
    </div>
  )
}

export default ScenarioChallenge