import { useState } from 'react'

const GameScenario = ({ className = '' }) => {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [gameComplete, setGameComplete] = useState(false)

  const scenarios = [
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
      description: "3rd & 8 from your own 35-yard line. Game is tied 14-14 with 2:30 left in the 4th quarter.",
      question: "What's the best play call?",
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
          explanation: 'Perfect! Gets the first down and good field position.',
          points: 3,
          isCorrect: true
        },
        {
          id: 'run',
          text: 'Handoff to running back',
          explanation: 'Risky on 3rd & long. Unlikely to get 8 yards.',
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
      description: "1st & goal from the 5-yard line. You're down 21-17 with 45 seconds left.",
      question: "What's your strategy?",
      choices: [
        {
          id: 'quick-score',
          text: 'Throw to end zone immediately',
          explanation: 'Too rushed! You have 4 downs and time.',
          points: 1,
          isCorrect: false
        },
        {
          id: 'run-first',
          text: 'Run the ball to control clock',
          explanation: 'Smart! Use time wisely and keep options open.',
          points: 3,
          isCorrect: true
        },
        {
          id: 'timeout',
          text: 'Call timeout to discuss',
          explanation: 'Wasteful! Clock stops under 2 minutes anyway.',
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
      description: "4th & 2 from midfield. You're up 14-10 in the 3rd quarter.",
      question: "What do you do?",
      choices: [
        {
          id: 'go-for-it',
          text: 'Go for the first down',
          explanation: 'Risky at midfield with the lead.',
          points: 1,
          isCorrect: false
        },
        {
          id: 'punt',
          text: 'Punt and trust defense',
          explanation: 'Perfect! Pin them deep and maintain field position.',
          points: 3,
          isCorrect: true
        },
        {
          id: 'fake-punt',
          text: 'Fake punt trick play',
          explanation: 'Too risky! Save tricks for desperate times.',
          points: 0,
          isCorrect: false
        }
      ]
    }
  ]

  const handleChoiceSelect = (choice) => {
    setSelectedChoice(choice)
    setShowResult(true)
    setScore(prev => prev + choice.points)
    
    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        nextScenario()
      } else {
        setGameComplete(true)
      }
    }, 3000)
  }

  const nextScenario = () => {
    setCurrentScenario(prev => prev + 1)
    setSelectedChoice(null)
    setShowResult(false)
  }

  const reset = () => {
    setCurrentScenario(0)
    setScore(0)
    setSelectedChoice(null)
    setShowResult(false)
    setGameComplete(false)
  }

  const scenario = scenarios[currentScenario]
  const maxScore = scenarios.length * 3
  const percentage = (score / maxScore) * 100

  if (gameComplete) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-navy mb-4">🏆 Challenge Complete!</h3>
          
          <div className="mb-6">
            <div className="text-4xl font-bold text-accent-600 mb-2">
              {score}/{maxScore}
            </div>
            <div className="text-lg font-semibold">
              {percentage >= 80 ? '🌟 Excellent!' : 
               percentage >= 60 ? '👍 Good Job!' : 
               '📚 Keep Learning!'}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-bold text-navy mb-2">Final Grade:</h4>
            <div className={`text-2xl font-bold ${
              percentage >= 80 ? 'text-green-600' : 
              percentage >= 60 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {percentage >= 90 ? 'A+' : 
               percentage >= 80 ? 'A' : 
               percentage >= 70 ? 'B' : 
               percentage >= 60 ? 'C' : 'D'}
            </div>
          </div>

          <button
            onClick={reset}
            className="bg-sage-500 hover:bg-sage-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-navy mb-2">
          🧠 Game Situation Challenge
        </h3>
        <p className="text-sm text-gray-600">
          Make the right coaching decisions in crucial moments
        </p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">
            Scenario {currentScenario + 1} of {scenarios.length}
          </span>
          <div className="text-sm font-bold text-accent-600">
            Score: {score}/{currentScenario * 3 + (showResult ? selectedChoice?.points || 0 : 0)}
          </div>
        </div>
      </div>

      {/* Game situation display */}
      <div className="bg-navy text-white rounded-lg p-4 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
          <div>
            <div className="font-bold text-lg">
              {scenario.situation.down === 1 ? '1st' : 
               scenario.situation.down === 2 ? '2nd' : 
               scenario.situation.down === 3 ? '3rd' : '4th'} & {scenario.situation.distance}
            </div>
            <div className="opacity-75">Down & Distance</div>
          </div>
          <div>
            <div className="font-bold text-lg">{scenario.situation.fieldPosition} yd</div>
            <div className="opacity-75">Field Position</div>
          </div>
          <div>
            <div className="font-bold text-lg">{scenario.situation.timeLeft}</div>
            <div className="opacity-75">Time Left</div>
          </div>
          <div>
            <div className="font-bold text-lg">{scenario.situation.score}</div>
            <div className="opacity-75">Score</div>
          </div>
        </div>
      </div>

      {/* Scenario description */}
      <div className="mb-6">
        <p className="text-gray-700 leading-relaxed mb-4">
          {scenario.description}
        </p>
        <h4 className="font-semibold text-navy text-lg">
          {scenario.question}
        </h4>
      </div>

      {/* Choices or Results */}
      {!showResult ? (
        <div className="space-y-3 mb-6">
          {scenario.choices.map((choice, index) => (
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
          <div className={`p-6 rounded-lg border-2 ${
            selectedChoice.isCorrect 
              ? 'border-green-300 bg-green-50' 
              : 'border-red-300 bg-red-50'
          }`}>
            <div className="flex items-center mb-4">
              <span className={`text-3xl mr-3 ${
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
              <strong>Coach's Analysis:</strong> {selectedChoice.explanation}
            </p>

            {!selectedChoice.isCorrect && (
              <div className="mt-4 p-3 bg-white rounded border border-green-200">
                <p className="text-sm text-gray-600">
                  <strong>Best choice:</strong> {scenario.choices.find(c => c.isCorrect)?.text}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Educational note */}
      <div className="p-3 bg-blush-100 rounded-lg">
        <p className="text-xs text-navy">
          <strong>💡 Coaching Tip:</strong> Great coaches consider down & distance, field position, score, and time. 
          Context matters more than any single factor!
        </p>
      </div>
    </div>
  )
}

export default GameScenario