import { useState } from 'react'

const DownsCounterSimple = ({ className = '' }) => {
  const [currentDown, setCurrentDown] = useState(1)
  const [yardsToGo, setYardsToGo] = useState(10)
  const [fieldPosition, setFieldPosition] = useState(25)
  const [gameLog, setGameLog] = useState([])
  const [isComplete, setIsComplete] = useState(false)

  const plays = [
    { yards: 3, description: "Handoff to RB" },
    { yards: 5, description: "Quick slant pass" },
    { yards: -2, description: "QB sacked" },
    { yards: 12, description: "Deep pass complete" },
    { yards: 1, description: "QB sneak" },
    { yards: 8, description: "Screen pass" },
    { yards: 0, description: "Incomplete pass" },
    { yards: 6, description: "Out route" }
  ]

  const executePlay = () => {
    if (isComplete) return

    const randomPlay = plays[Math.floor(Math.random() * plays.length)]
    const newFieldPosition = Math.min(100, fieldPosition + randomPlay.yards)
    const newYardsToGo = Math.max(0, yardsToGo - randomPlay.yards)
    
    let result = ""
    let nextDown = currentDown
    let nextYards = newYardsToGo

    // Check for first down
    if (randomPlay.yards >= yardsToGo) {
      nextDown = 1
      nextYards = 10
      result = "FIRST DOWN!"
    } else if (currentDown === 4) {
      // Fourth down - turnover
      setIsComplete(true)
      result = "TURNOVER ON DOWNS"
    } else {
      nextDown = currentDown + 1
    }

    // Check for touchdown
    if (newFieldPosition >= 100) {
      setIsComplete(true)
      result = "TOUCHDOWN! 🎉"
    }

    setCurrentDown(nextDown)
    setYardsToGo(nextYards)
    setFieldPosition(newFieldPosition)
    setGameLog(prev => [...prev, {
      down: currentDown,
      play: randomPlay.description,
      yards: randomPlay.yards,
      result
    }])
  }

  const reset = () => {
    setCurrentDown(1)
    setYardsToGo(10)
    setFieldPosition(25)
    setGameLog([])
    setIsComplete(false)
  }

  const getDownText = () => {
    if (currentDown === 1) return "1st"
    if (currentDown === 2) return "2nd"
    if (currentDown === 3) return "3rd"
    return "4th"
  }

  const getDownColor = () => {
    if (currentDown <= 2) return "text-green-600"
    if (currentDown === 3) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-navy mb-2">
          🏈 Interactive Downs Simulator
        </h3>
        <p className="text-sm text-gray-600">
          Experience how the 4-down system works in real game situations
        </p>
      </div>

      {/* Current situation display */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center space-x-4 bg-gray-100 rounded-lg p-4">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getDownColor()}`}>
              {getDownText()}
            </div>
            <div className="text-sm text-gray-500">Down</div>
          </div>
          <div className="text-2xl text-gray-400">&</div>
          <div className="text-center">
            <div className="text-3xl font-bold text-navy">
              {yardsToGo}
            </div>
            <div className="text-sm text-gray-500">Yards to go</div>
          </div>
        </div>
      </div>

      {/* Field position */}
      <div className="text-center mb-6">
        <div className="text-sm text-gray-600 mb-2">
          Field Position: <span className="font-bold">{fieldPosition} yard line</span>
        </div>
        <div className="w-full bg-green-200 rounded-full h-4 relative">
          <div 
            className="bg-sage-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(fieldPosition, 100)}%` }}
          />
          {/* Goal line marker */}
          <div className="absolute right-0 top-0 h-4 w-1 bg-red-500 rounded-r-full" />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Own Goal</span>
          <span>50 yard line</span>
          <span>🏈 Goal Line</span>
        </div>
      </div>

      {/* Action button */}
      <div className="text-center mb-6">
        {!isComplete ? (
          <button
            onClick={executePlay}
            className="bg-sage-500 hover:bg-sage-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105"
          >
            🏈 Run Next Play
          </button>
        ) : (
          <div className="space-y-3">
            <div className={`text-lg font-bold ${
              gameLog[gameLog.length - 1]?.result.includes('TOUCHDOWN') ? 'text-green-600' : 'text-red-600'
            }`}>
              {gameLog[gameLog.length - 1]?.result}
            </div>
            <button
              onClick={reset}
              className="bg-warmGold hover:bg-yellow-600 text-navy font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              🔄 Start New Drive
            </button>
          </div>
        )}
      </div>

      {/* Game log */}
      {gameLog.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-bold text-navy mb-3">📊 Drive Summary:</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {gameLog.slice(-4).map((play, index) => (
              <div key={index} className="text-sm flex justify-between items-center border-b border-gray-200 pb-1">
                <span>
                  <span className="font-bold">
                    {play.down === 1 ? '1st' : play.down === 2 ? '2nd' : play.down === 3 ? '3rd' : '4th'} down:
                  </span> {play.play}
                </span>
                <div className="text-right">
                  <span className={`font-bold ${
                    play.yards > 0 ? 'text-green-600' : play.yards < 0 ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {play.yards > 0 ? '+' : ''}{play.yards} yds
                  </span>
                  {play.result && (
                    <div className={`text-xs font-bold ${
                      play.result.includes('FIRST') ? 'text-green-600' : 
                      play.result.includes('TOUCHDOWN') ? 'text-blue-600' : 'text-red-600'
                    }`}>
                      {play.result}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Educational note */}
      <div className="mt-4 p-3 bg-blush-100 rounded-lg">
        <p className="text-xs text-navy">
          <strong>💡 Remember:</strong> Teams get 4 downs to advance 10 yards. Success = new set of 4 downs. 
          This continues until they score, turn the ball over, or punt.
        </p>
      </div>
    </div>
  )
}

export default DownsCounterSimple