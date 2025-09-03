// Advanced interactive lesson components with micro-interactions and gamification
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { trackLearningEvent } from '../utils/advancedAnalytics'
import { useApp } from '../context/AppContext'

// Interactive Football Field Diagram
export const InteractiveFieldDiagram = ({ lessonId, onInteraction }) => {
  const [selectedZone, setSelectedZone] = useState(null)
  const [animatingPlay, setAnimatingPlay] = useState(false)
  const [playersVisible, setPlayersVisible] = useState(false)
  const svgRef = useRef(null)
  
  const fieldZones = [
    { id: 'endzone1', name: 'End Zone', x: 10, y: 50, width: 80, height: 100, color: '#e6b85c' },
    { id: 'redzone1', name: 'Red Zone', x: 90, y: 50, width: 80, height: 100, color: '#ff9aa2' },
    { id: 'midfield', name: 'Midfield', x: 450, y: 50, width: 100, height: 100, color: '#cde7d9' },
    { id: 'redzone2', name: 'Red Zone', x: 830, y: 50, width: 80, height: 100, color: '#ff9aa2' },
    { id: 'endzone2', name: 'End Zone', x: 910, y: 50, width: 80, height: 100, color: '#e6b85c' }
  ]
  
  const handleZoneClick = useCallback((zone) => {
    setSelectedZone(zone)
    
    trackLearningEvent('interactive_element_used', lessonId, {
      elementType: 'field_diagram',
      action: 'zone_selected',
      zoneId: zone.id
    })
    
    if (onInteraction) {
      onInteraction({ type: 'zone_selected', data: zone })
    }
  }, [lessonId, onInteraction])
  
  const animatePlay = useCallback(() => {
    setAnimatingPlay(true)
    setPlayersVisible(true)
    
    trackLearningEvent('interactive_element_used', lessonId, {
      elementType: 'field_diagram',
      action: 'play_animated'
    })
    
    setTimeout(() => {
      setAnimatingPlay(false)
      setPlayersVisible(false)
    }, 3000)
  }, [lessonId])
  
  return (
    <div className=\"interactive-field-diagram bg-white rounded-2xl p-6 shadow-lg border border-gray-200\">
      <div className=\"flex items-center justify-between mb-6\">
        <h3 className=\"text-lg font-semibold text-gray-900 flex items-center\">
          <svg className=\"w-6 h-6 text-accent-600 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
            <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7\" />
          </svg>
          Interactive Field
        </h3>
        <button
          onClick={animatePlay}
          disabled={animatingPlay}
          className=\"px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors disabled:opacity-50 flex items-center\"
        >
          <svg className=\"w-4 h-4 mr-2\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
            <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" />
          </svg>
          {animatingPlay ? 'Playing...' : 'Animate Play'}
        </button>
      </div>
      
      <div className=\"relative overflow-hidden rounded-xl bg-green-100\">
        <svg
          ref={svgRef}
          viewBox=\"0 0 1000 200\"
          className=\"w-full h-48 cursor-pointer\"
        >
          {/* Field Background */}
          <rect width=\"1000\" height=\"200\" fill=\"#22c55e\" className=\"opacity-80\" />
          
          {/* Yard Lines */}
          {Array.from({ length: 11 }, (_, i) => (
            <g key={i}>
              <line
                x1={i * 100}
                y1={0}
                x2={i * 100}
                y2={200}
                stroke=\"white\"
                strokeWidth=\"2\"
                opacity=\"0.8\"
              />
              <text
                x={i * 100 + 10}
                y={100}
                fill=\"white\"
                fontSize=\"12\"
                fontWeight=\"bold\"
              >
                {i === 0 ? 'G' : i === 10 ? 'G' : i * 10}
              </text>
            </g>
          ))}
          
          {/* Interactive Zones */}
          {fieldZones.map((zone) => (
            <rect
              key={zone.id}
              x={zone.x}
              y={zone.y}
              width={zone.width}
              height={zone.height}
              fill={zone.color}
              opacity={selectedZone?.id === zone.id ? 0.8 : 0.3}
              stroke={selectedZone?.id === zone.id ? '#0b2545' : 'transparent'}
              strokeWidth=\"3\"
              className=\"cursor-pointer transition-all duration-200 hover:opacity-60\"
              onClick={() => handleZoneClick(zone)}
            >
              <title>{zone.name}</title>
            </rect>
          ))}
          
          {/* Animated Players */}
          {playersVisible && (
            <g className={animatingPlay ? 'animate-pulse' : ''}>
              {/* Offense */}
              <circle cx=\"400\" cy=\"100\" r=\"8\" fill=\"#0b2545\" className=\"animate-bounce\" />
              <circle cx=\"420\" cy=\"90\" r=\"6\" fill=\"#0b2545\" className=\"animate-bounce\" style={{ animationDelay: '0.1s' }} />
              <circle cx=\"420\" cy=\"110\" r=\"6\" fill=\"#0b2545\" className=\"animate-bounce\" style={{ animationDelay: '0.2s' }} />
              
              {/* Defense */}
              <circle cx=\"480\" cy=\"100\" r=\"8\" fill=\"#ff9aa2\" className=\"animate-bounce\" style={{ animationDelay: '0.3s' }} />
              <circle cx=\"500\" cy=\"90\" r=\"6\" fill=\"#ff9aa2\" className=\"animate-bounce\" style={{ animationDelay: '0.4s' }} />
              <circle cx=\"500\" cy=\"110\" r=\"6\" fill=\"#ff9aa2\" className=\"animate-bounce\" style={{ animationDelay: '0.5s' }} />
            </g>
          )}
          
          {/* Ball */}
          <ellipse cx=\"430\" cy=\"100\" rx=\"4\" ry=\"6\" fill=\"#8B4513\" className={animatingPlay ? 'animate-bounce' : ''} />
        </svg>
        
        {selectedZone && (
          <div className=\"absolute bottom-4 left-4 right-4 bg-white bg-opacity-95 rounded-lg p-4 shadow-lg animate-slide-up\">
            <h4 className=\"font-semibold text-gray-900 mb-2\">{selectedZone.name}</h4>
            <p className=\"text-sm text-gray-600\">
              {selectedZone.id === 'endzone1' || selectedZone.id === 'endzone2' ? 
                'The end zone is where touchdowns are scored!' :
                selectedZone.id === 'redzone1' || selectedZone.id === 'redzone2' ?
                'The red zone is within 20 yards of the goal line - prime scoring territory!' :
                'The midfield area where most plays develop and strategies unfold.'}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// Interactive Down Counter with Visual Feedback
export const InteractiveDownCounter = ({ lessonId, onComplete }) => {
  const [currentDown, setCurrentDown] = useState(1)
  const [yardsToGo, setYardsToGo] = useState(10)
  const [yardsGained, setYardsGained] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [playHistory, setPlayHistory] = useState([])
  
  const handlePlayResult = useCallback((yards) => {
    const newYardsToGo = Math.max(0, yardsToGo - yards)
    const newYardsGained = yardsGained + yards
    
    setYardsGained(yards)
    setPlayHistory(prev => [...prev, { down: currentDown, yards, yardsToGo: newYardsToGo }])
    
    trackLearningEvent('interactive_element_used', lessonId, {
      elementType: 'down_counter',
      action: 'play_simulated',
      down: currentDown,
      yardsGained: yards,
      yardsToGo: newYardsToGo
    })
    
    setTimeout(() => {
      if (newYardsToGo === 0) {
        // First down!
        setCurrentDown(1)
        setYardsToGo(10)
        setIsComplete(true)
        
        if (onComplete) {
          onComplete({ type: 'first_down', playHistory: [...playHistory, { down: currentDown, yards, yardsToGo: newYardsToGo }] })
        }
      } else if (currentDown === 4) {
        // Turnover on downs
        setIsComplete(true)
        
        if (onComplete) {
          onComplete({ type: 'turnover', playHistory: [...playHistory, { down: currentDown, yards, yardsToGo: newYardsToGo }] })
        }
      } else {
        // Next down
        setCurrentDown(prev => prev + 1)
        setYardsToGo(newYardsToGo)
      }
      
      setYardsGained(0)
    }, 1500)
  }, [currentDown, yardsToGo, yardsGained, playHistory, lessonId, onComplete])
  
  const resetScenario = useCallback(() => {
    setCurrentDown(1)
    setYardsToGo(10)
    setYardsGained(0)
    setIsComplete(false)
    setPlayHistory([])
  }, [])
  
  return (
    <div className=\"interactive-down-counter bg-white rounded-2xl p-6 shadow-lg border border-gray-200\">
      <div className=\"text-center mb-6\">
        <h3 className=\"text-lg font-semibold text-gray-900 mb-2\">Down & Distance Simulator</h3>
        <p className=\"text-sm text-gray-600\">Experience how the down system works in real game situations</p>
      </div>
      
      <div className=\"text-center mb-8\">
        <div className=\"inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-accent-100 to-primary-100 mb-4\">
          <div className=\"text-center\">
            <div className=\"text-3xl font-bold text-accent-700 mb-1\">{currentDown}</div>
            <div className=\"text-sm text-gray-600\">DOWN</div>
          </div>
        </div>
        
        <div className=\"text-2xl font-semibold text-gray-900 mb-2\">
          {currentDown}{currentDown === 1 ? 'st' : currentDown === 2 ? 'nd' : currentDown === 3 ? 'rd' : 'th'} & {yardsToGo}
        </div>
        
        {yardsGained > 0 && (
          <div className=\"text-lg text-accent-600 font-medium animate-bounce\">
            +{yardsGained} yards!
          </div>
        )}
      </div>
      
      <div className=\"mb-6\">
        <div className=\"flex justify-between text-sm text-gray-600 mb-2\">
          <span>Yards needed for 1st down</span>
          <span>{yardsToGo} yards</span>
        </div>
        <div className=\"w-full bg-gray-200 rounded-full h-4 overflow-hidden\">
          <div 
            className=\"bg-gradient-to-r from-accent-500 to-primary-500 h-4 rounded-full transition-all duration-1000 ease-out\"
            style={{ width: `${((10 - yardsToGo) / 10) * 100}%` }}
          />
        </div>
      </div>
      
      {!isComplete ? (
        <div className=\"grid grid-cols-2 gap-3 mb-6\">
          <button
            onClick={() => handlePlayResult(Math.floor(Math.random() * 3) + 1)}
            className=\"p-4 bg-primary-50 hover:bg-primary-100 rounded-xl border border-primary-200 transition-colors group\"
          >
            <div className=\"text-center\">
              <div className=\"text-lg font-semibold text-primary-700 mb-1\">Short Gain</div>
              <div className=\"text-sm text-primary-600\">1-3 yards</div>
            </div>
          </button>
          
          <button
            onClick={() => handlePlayResult(Math.floor(Math.random() * 5) + 4)}
            className=\"p-4 bg-accent-50 hover:bg-accent-100 rounded-xl border border-accent-200 transition-colors group\"
          >
            <div className=\"text-center\">
              <div className=\"text-lg font-semibold text-accent-700 mb-1\">Medium Gain</div>
              <div className=\"text-sm text-accent-600\">4-8 yards</div>
            </div>
          </button>
          
          <button
            onClick={() => handlePlayResult(Math.floor(Math.random() * 7) + 9)}
            className=\"p-4 bg-success-50 hover:bg-success-100 rounded-xl border border-success-200 transition-colors group\"
          >
            <div className=\"text-center\">
              <div className=\"text-lg font-semibold text-success-700 mb-1\">Long Gain</div>
              <div className=\"text-sm text-success-600\">9+ yards</div>
            </div>
          </button>
          
          <button
            onClick={() => handlePlayResult(0)}
            className=\"p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors group\"
          >
            <div className=\"text-center\">
              <div className=\"text-lg font-semibold text-gray-700 mb-1\">No Gain</div>
              <div className=\"text-sm text-gray-600\">0 yards</div>
            </div>
          </button>
        </div>
      ) : (
        <div className=\"text-center mb-6\">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            playHistory.length > 0 && playHistory[playHistory.length - 1].yardsToGo === 0
              ? 'bg-success-100'
              : 'bg-error-100'
          }`}>
            {playHistory.length > 0 && playHistory[playHistory.length - 1].yardsToGo === 0 ? (
              <svg className=\"w-8 h-8 text-success-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z\" />
              </svg>
            ) : (
              <svg className=\"w-8 h-8 text-error-600\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M6 18L18 6M6 6l12 12\" />
              </svg>
            )}
          </div>
          <h4 className={`text-xl font-bold mb-2 ${
            playHistory.length > 0 && playHistory[playHistory.length - 1].yardsToGo === 0
              ? 'text-success-600'
              : 'text-error-600'
          }`}>
            {playHistory.length > 0 && playHistory[playHistory.length - 1].yardsToGo === 0 ? 'First Down!' : 'Turnover on Downs!'}
          </h4>
          <p className=\"text-gray-600 mb-4\">
            {playHistory.length > 0 && playHistory[playHistory.length - 1].yardsToGo === 0 
              ? 'Great job! The offense earned a new set of four downs.'
              : 'The offense failed to gain enough yards and loses possession.'}
          </p>
          <button
            onClick={resetScenario}
            className=\"btn-primary\"
          >
            Try Another Scenario
          </button>
        </div>
      )}
      
      {playHistory.length > 0 && (
        <div className=\"border-t border-gray-200 pt-4\">
          <h4 className=\"font-medium text-gray-900 mb-3\">Play History</h4>
          <div className=\"space-y-2\">
            {playHistory.map((play, index) => (
              <div key={index} className=\"flex items-center justify-between p-2 bg-gray-50 rounded-lg\">
                <span className=\"text-sm font-medium\">
                  {play.down}{play.down === 1 ? 'st' : play.down === 2 ? 'nd' : play.down === 3 ? 'rd' : 'th'} Down
                </span>
                <span className=\"text-sm text-gray-600\">
                  {play.yards > 0 ? '+' : ''}{play.yards} yards
                </span>
                <span className=\"text-sm text-gray-500\">
                  {play.yardsToGo} to go
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Interactive Scoring Calculator
export const InteractiveScoringCalculator = ({ lessonId, onScoreUpdate }) => {
  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)
  const [scoringHistory, setScoringHistory] = useState([])
  const [lastScoringPlay, setLastScoringPlay] = useState(null)
  
  const scoringPlays = [
    { name: 'Touchdown', points: 6, color: 'success' },
    { name: 'Field Goal', points: 3, color: 'accent' },
    { name: 'Safety', points: 2, color: 'primary' },
    { name: 'Extra Point', points: 1, color: 'warning' },
    { name: '2-Point Conversion', points: 2, color: 'rose' }
  ]
  
  const handleScore = useCallback((team, play) => {
    const newScore = team === 'home' ? homeScore + play.points : awayScore + play.points
    
    if (team === 'home') {
      setHomeScore(newScore)
    } else {
      setAwayScore(newScore)
    }
    
    const scoringEvent = {
      team,
      play: play.name,
      points: play.points,
      timestamp: Date.now(),
      newScore: { home: team === 'home' ? newScore : homeScore, away: team === 'away' ? newScore : awayScore }
    }
    
    setScoringHistory(prev => [...prev, scoringEvent])
    setLastScoringPlay(scoringEvent)
    
    trackLearningEvent('interactive_element_used', lessonId, {
      elementType: 'scoring_calculator',
      action: 'score_added',
      team,
      playType: play.name,
      points: play.points
    })
    
    if (onScoreUpdate) {
      onScoreUpdate(scoringEvent)
    }
    
    // Clear the last scoring play highlight after 3 seconds
    setTimeout(() => setLastScoringPlay(null), 3000)
  }, [homeScore, awayScore, lessonId, onScoreUpdate])
  
  const resetGame = useCallback(() => {
    setHomeScore(0)
    setAwayScore(0)
    setScoringHistory([])
    setLastScoringPlay(null)
  }, [])
  
  return (
    <div className=\"interactive-scoring-calculator bg-white rounded-2xl p-6 shadow-lg border border-gray-200\">
      <div className=\"text-center mb-6\">
        <h3 className=\"text-lg font-semibold text-gray-900 mb-2\">NFL Scoring System</h3>
        <p className=\"text-sm text-gray-600\">Learn how different plays contribute to the final score</p>
      </div>
      
      {/* Scoreboard */}
      <div className=\"bg-secondary-100 rounded-xl p-6 mb-6 text-white\">
        <div className=\"grid grid-cols-2 gap-6\">
          <div className=\"text-center\">
            <div className=\"text-sm font-medium opacity-80 mb-2\">HOME</div>
            <div className={`text-5xl font-bold transition-all duration-500 ${
              lastScoringPlay?.team === 'home' ? 'animate-pulse text-accent-300' : ''
            }`}>
              {homeScore}
            </div>
          </div>
          
          <div className=\"text-center\">
            <div className=\"text-sm font-medium opacity-80 mb-2\">AWAY</div>
            <div className={`text-5xl font-bold transition-all duration-500 ${
              lastScoringPlay?.team === 'away' ? 'animate-pulse text-accent-300' : ''
            }`}>
              {awayScore}
            </div>
          </div>
        </div>
        
        {lastScoringPlay && (
          <div className=\"text-center mt-4 text-accent-300 font-medium animate-bounce\">
            {lastScoringPlay.team.toUpperCase()}: {lastScoringPlay.play} (+{lastScoringPlay.points})
          </div>
        )}
      </div>
      
      {/* Scoring Options */}
      <div className=\"grid grid-cols-1 md:grid-cols-2 gap-6 mb-6\">
        <div>
          <h4 className=\"font-medium text-gray-900 mb-3\">HOME Team Scoring</h4>
          <div className=\"space-y-2\">
            {scoringPlays.map((play, index) => (
              <button
                key={index}
                onClick={() => handleScore('home', play)}
                className={`w-full p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                  play.color === 'success' ? 'border-success-200 bg-success-50 hover:bg-success-100 text-success-700' :
                  play.color === 'accent' ? 'border-accent-200 bg-accent-50 hover:bg-accent-100 text-accent-700' :
                  play.color === 'primary' ? 'border-primary-200 bg-primary-50 hover:bg-primary-100 text-primary-700' :
                  play.color === 'warning' ? 'border-warning-200 bg-warning-50 hover:bg-warning-100 text-warning-700' :
                  'border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700'
                }`}
              >
                <div className=\"flex items-center justify-between\">
                  <span className=\"font-medium\">{play.name}</span>
                  <span className=\"font-bold\">+{play.points}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className=\"font-medium text-gray-900 mb-3\">AWAY Team Scoring</h4>
          <div className=\"space-y-2\">
            {scoringPlays.map((play, index) => (
              <button
                key={index}
                onClick={() => handleScore('away', play)}
                className={`w-full p-3 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
                  play.color === 'success' ? 'border-success-200 bg-success-50 hover:bg-success-100 text-success-700' :
                  play.color === 'accent' ? 'border-accent-200 bg-accent-50 hover:bg-accent-100 text-accent-700' :
                  play.color === 'primary' ? 'border-primary-200 bg-primary-50 hover:bg-primary-100 text-primary-700' :
                  play.color === 'warning' ? 'border-warning-200 bg-warning-50 hover:bg-warning-100 text-warning-700' :
                  'border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700'
                }`}
              >
                <div className=\"flex items-center justify-between\">
                  <span className=\"font-medium\">{play.name}</span>
                  <span className=\"font-bold\">+{play.points}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scoring History */}
      {scoringHistory.length > 0 && (
        <div className=\"border-t border-gray-200 pt-6\">
          <div className=\"flex items-center justify-between mb-4\">
            <h4 className=\"font-medium text-gray-900\">Scoring Summary</h4>
            <button
              onClick={resetGame}
              className=\"text-sm text-gray-500 hover:text-gray-700 flex items-center\"
            >
              <svg className=\"w-4 h-4 mr-1\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\">
                <path strokeLinecap=\"round\" strokeLinejoin=\"round\" strokeWidth={2} d=\"M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15\" />
              </svg>
              Reset Game
            </button>
          </div>
          
          <div className=\"max-h-48 overflow-y-auto space-y-2\">
            {scoringHistory.reverse().map((event, index) => (
              <div key={index} className=\"flex items-center justify-between p-3 bg-gray-50 rounded-lg\">
                <div className=\"flex items-center\">
                  <span className={`font-medium mr-3 ${
                    event.team === 'home' ? 'text-primary-600' : 'text-accent-600'
                  }`}>
                    {event.team.toUpperCase()}
                  </span>
                  <span className=\"text-gray-700\">{event.play}</span>
                </div>
                <div className=\"flex items-center\">
                  <span className=\"text-success-600 font-bold mr-3\">+{event.points}</span>
                  <span className=\"text-sm text-gray-500\">
                    {event.newScore.home}-{event.newScore.away}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Micro-interaction wrapper for enhanced UX
export const MicroInteractionWrapper = ({ children, onInteraction, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [ripples, setRipples] = useState([])
  
  const handleClick = useCallback((e) => {
    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    }
    
    setRipples(prev => [...prev, newRipple])
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id))
    }, 600)
    
    if (onInteraction) {
      onInteraction(e)
    }
  }, [onInteraction])
  
  return (
    <div
      className={`relative overflow-hidden transition-all duration-200 ${
        isPressed ? 'scale-95' : isHovered ? 'scale-102' : 'scale-100'
      } ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={handleClick}
    >
      {children}
      
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <span
          key={ripple.id}
          className=\"absolute pointer-events-none animate-ping\"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: 'rgba(230, 184, 92, 0.3)'
          }}
        />
      ))}
    </div>
  )
}

// Export all components
export default {
  InteractiveFieldDiagram,
  InteractiveDownCounter,
  InteractiveScoringCalculator,
  MicroInteractionWrapper
}"