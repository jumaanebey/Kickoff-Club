import React, { useState } from 'react'

const InteractiveFieldDiagram = () => {
  const [selectedYardLine, setSelectedYardLine] = useState(25)
  const [down, setDown] = useState(1)
  const [distance, setDistance] = useState(10)
  const [showExplanation, setShowExplanation] = useState(false)

  const getDownsExplanation = () => {
    if (down === 4) {
      if (distance <= 2) {
        return "4th & short - Teams often go for it!"
      } else if (selectedYardLine <= 35) {
        return "4th & long in field goal range - Likely a kick attempt"
      } else {
        return "4th & long - Time to punt and flip field position"
      }
    } else if (distance > 7) {
      return `${down}${getOrdinalSuffix(down)} & long - Expect a passing play`
    } else if (distance <= 3) {
      return `${down}${getOrdinalSuffix(down)} & short - Run or quick pass likely`
    } else {
      return `${down}${getOrdinalSuffix(down)} & ${distance} - Balanced down, many options`
    }
  }

  const getOrdinalSuffix = (num) => {
    if (num === 1) return 'st'
    if (num === 2) return 'nd'
    if (num === 3) return 'rd'
    return 'th'
  }

  const moveForward = (yards) => {
    const newPosition = selectedYardLine - yards
    if (newPosition <= 0) {
      alert("🏈 TOUCHDOWN! You reached the end zone!")
      setSelectedYardLine(25)
      setDown(1)
      setDistance(10)
      return
    }
    
    setSelectedYardLine(newPosition)
    
    if (yards >= distance) {
      setDown(1)
      setDistance(10)
      setShowExplanation(true)
    } else {
      const newDown = down + 1
      if (newDown > 4) {
        alert("Turnover on downs! The other team gets the ball.")
        setSelectedYardLine(100 - newPosition)
        setDown(1)
        setDistance(10)
      } else {
        setDown(newDown)
        setDistance(distance - yards)
      }
    }
  }

  const resetField = () => {
    setSelectedYardLine(25)
    setDown(1)
    setDistance(10)
    setShowExplanation(false)
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-sage-200">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-secondary-100 mb-2">
          🏈 Interactive Field Diagram
        </h3>
        <p className="text-secondary-300">
          Click to move the ball and see how downs work in real situations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Field Visualization */}
        <div className="space-y-4">
          <div className="relative bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 overflow-hidden">
            {/* Yard lines */}
            <div className="relative h-16 border-t-2 border-white">
              {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(yard => (
                <div 
                  key={yard}
                  className="absolute h-full border-l border-white opacity-60"
                  style={{ left: `${yard}%` }}
                >
                  <span className="absolute -top-6 -ml-2 text-xs text-white font-bold">
                    {yard === 0 ? 'TD' : yard === 100 ? 'TD' : 50 - Math.abs(yard - 50)}
                  </span>
                </div>
              ))}
              
              {/* Ball position */}
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${selectedYardLine}%` }}
              >
                <div className="bg-yellow-500 rounded-full w-4 h-4 border-2 border-yellow-700 animate-pulse"></div>
              </div>
              
              {/* First down marker */}
              <div 
                className="absolute top-0 bottom-0 border-l-2 border-yellow-300"
                style={{ left: `${Math.max(0, selectedYardLine - distance)}%` }}
              >
                <span className="absolute -top-6 -ml-4 text-xs text-yellow-300 font-bold">
                  1ST
                </span>
              </div>
            </div>
          </div>

          {/* Current situation display */}
          <div className="bg-gradient-to-r from-navy to-secondary-100 text-white rounded-lg p-4">
            <div className="text-center">
              <div className="text-2xl font-bold mb-2">
                {down}{getOrdinalSuffix(down)} & {distance}
              </div>
              <div className="text-sm opacity-90">
                {selectedYardLine} yards to end zone
              </div>
            </div>
          </div>
        </div>

        {/* Controls and explanation */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => moveForward(3)}
              className="bg-sage-500 hover:bg-sage-600 text-white px-4 py-2 rounded transition-colors"
            >
              +3 yards
            </button>
            <button 
              onClick={() => moveForward(7)}
              className="bg-blush-500 hover:bg-blush-600 text-white px-4 py-2 rounded transition-colors"
            >
              +7 yards
            </button>
            <button 
              onClick={() => moveForward(15)}
              className="bg-warmGold hover:bg-yellow-600 text-white px-4 py-2 rounded transition-colors"
            >
              +15 yards
            </button>
            <button 
              onClick={resetField}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
            >
              Reset
            </button>
          </div>

          <div className="bg-sage-50 rounded-lg p-4 border border-sage-200">
            <h4 className="font-bold text-navy mb-2">Situation Analysis</h4>
            <p className="text-sm text-gray-700">
              {getDownsExplanation()}
            </p>
          </div>

          {showExplanation && (
            <div className="bg-green-50 rounded-lg p-4 border border-green-200 animate-pulse">
              <h4 className="font-bold text-green-800 mb-1">🎉 First Down!</h4>
              <p className="text-sm text-green-700">
                Great job! You gained enough yards for a new set of downs.
              </p>
              <button 
                onClick={() => setShowExplanation(false)}
                className="mt-2 text-xs text-green-600 hover:text-green-800"
              >
                Continue playing →
              </button>
            </div>
          )}

          <div className="text-xs text-gray-600 space-y-1">
            <p>💡 <strong>Tips:</strong></p>
            <p>• Try different gain amounts to see strategic decisions</p>
            <p>• Watch how 4th down changes the options</p>
            <p>• See what happens when you don't get a first down</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveFieldDiagram