import React, { useState } from 'react'

const DownsChainGame = () => {
  const [currentChain, setCurrentChain] = useState(1)
  const [progress, setProgress] = useState(0)
  const [gameState, setGameState] = useState('playing') // 'playing', 'success', 'failed'
  const [chains, setChains] = useState([])
  const [totalChains, setTotalChains] = useState(0)

  const chainEmojis = ['🔗', '⛓️', '🔒', '🎯']
  
  const playCard = (yards) => {
    if (gameState !== 'playing') return
    
    const newProgress = progress + yards
    
    // Success! Made it 10 yards
    if (newProgress >= 10) {
      setGameState('success')
      const newTotalChains = totalChains + 1
      setTotalChains(newTotalChains)
      setChains([...chains, currentChain])
      
      setTimeout(() => {
        setCurrentChain(1)
        setProgress(0)
        setGameState('playing')
      }, 2000)
      
      return
    }
    
    // Move to next chain link
    const nextChain = currentChain + 1
    setProgress(newProgress)
    
    if (nextChain > 4) {
      // Failed! Used all 4 chains
      setGameState('failed')
      setTimeout(() => {
        resetGame()
      }, 3000)
    } else {
      setCurrentChain(nextChain)
    }
  }
  
  const resetGame = () => {
    setCurrentChain(1)
    setProgress(0)
    setGameState('playing')
    setChains([])
    setTotalChains(0)
  }
  
  const getYardsNeeded = () => 10 - progress
  
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg border-2 border-purple-200">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-secondary-100 mb-3">
          ⛓️ The Chain Game
        </h3>
        <p className="text-lg text-secondary-200 max-w-md mx-auto">
          Build a chain to reach 10 yards! But you only have 4 links... choose wisely! 💜
        </p>
      </div>

      {/* Chain Visualization */}
      <div className="mb-8">
        <div className="flex justify-center items-center mb-4">
          <div className="text-sm text-purple-600 mr-4">START</div>
          
          {/* Chain Links */}
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4].map(link => (
              <div key={link} className="flex items-center">
                <div className={`w-12 h-8 rounded-lg flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                  link <= currentChain && gameState === 'playing' ? 'bg-purple-400 text-white scale-110' :
                  link < currentChain ? 'bg-purple-300 text-white' :
                  'bg-gray-200 text-gray-400'
                }`}>
                  {chainEmojis[link - 1]}
                </div>
                {link < 4 && (
                  <div className={`w-6 h-1 ${
                    link < currentChain ? 'bg-purple-400' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
          
          <div className="text-sm text-purple-600 ml-4">10 YARDS!</div>
        </div>
        
        {/* Progress Bar */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-purple-600 mb-2">
            <span>Progress: {progress}/10 yards</span>
            <span>Need: {getYardsNeeded()} more</span>
          </div>
          <div className="w-full bg-white/60 rounded-full h-4 border border-purple-200">
            <div 
              className="bg-gradient-to-r from-purple-400 to-pink-400 h-4 rounded-full transition-all duration-500"
              style={{ width: `${(progress / 10) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Game State Messages */}
      <div className="mb-8 text-center">
        {gameState === 'success' && (
          <div className="bg-green-100 border border-green-300 rounded-2xl p-6 animate-bounce">
            <div className="text-4xl mb-2">🎉</div>
            <div className="text-xl font-bold text-green-800">Chain Complete!</div>
            <div className="text-green-600">You made it 10 yards! New set of chains coming up...</div>
          </div>
        )}
        
        {gameState === 'failed' && (
          <div className="bg-red-100 border border-red-300 rounded-2xl p-6">
            <div className="text-4xl mb-2">💔</div>
            <div className="text-xl font-bold text-red-800">Chain Broken!</div>
            <div className="text-red-600">You used all 4 links but didn't reach 10 yards. Other team's turn!</div>
          </div>
        )}
        
        {gameState === 'playing' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200">
            <div className="text-lg font-bold text-secondary-100 mb-2">
              Link #{currentChain} of 4
            </div>
            <div className="text-secondary-200">
              {currentChain === 1 ? "Start building your chain! 🔗" :
               currentChain === 2 ? `Good start! Need ${getYardsNeeded()} more yards 💪` :
               currentChain === 3 ? `Getting close! ${getYardsNeeded()} yards to go ⚡` :
               `FINAL LINK! Must get ${getYardsNeeded()} yards! 🎯`}
            </div>
          </div>
        )}
      </div>

      {/* Play Cards */}
      {gameState === 'playing' && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <button 
            onClick={() => playCard(2)}
            className="bg-gradient-to-b from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white p-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <div className="text-2xl mb-1">🐢</div>
            <div>Safe Play</div>
            <div className="text-sm opacity-90">+2 yards</div>
          </button>
          
          <button 
            onClick={() => playCard(5)}
            className="bg-gradient-to-b from-purple-400 to-purple-500 hover:from-purple-500 hover:to-purple-600 text-white p-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <div className="text-2xl mb-1">⚡</div>
            <div>Medium Play</div>
            <div className="text-sm opacity-90">+5 yards</div>
          </button>
          
          <button 
            onClick={() => playCard(9)}
            className="bg-gradient-to-b from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white p-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            <div className="text-2xl mb-1">🚀</div>
            <div>Big Play</div>
            <div className="text-sm opacity-90">+9 yards</div>
          </button>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/60 rounded-xl p-4 text-center border border-purple-200">
          <div className="text-2xl font-bold text-purple-600">{totalChains}</div>
          <div className="text-sm text-purple-500">Chains Completed</div>
        </div>
        <div className="text-center">
          <button 
            onClick={resetGame}
            className="bg-white border-2 border-purple-300 text-purple-600 px-6 py-3 rounded-xl font-medium hover:bg-purple-50 transition-colors"
          >
            🔄 New Game
          </button>
        </div>
      </div>

      {/* How to Play */}
      <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
        <h4 className="text-lg font-bold text-secondary-100 mb-3 text-center">💡 How the Chain Game Works</h4>
        <div className="space-y-2 text-sm text-secondary-200">
          <p>🔗 <strong>You have 4 chain links</strong> to reach 10 yards</p>
          <p>🎯 <strong>Each play uses one link</strong> - choose carefully!</p>
          <p>✨ <strong>Reach 10+ yards</strong> to complete the chain and get 4 new links</p>
          <p>💔 <strong>Use all 4 links without reaching 10 yards</strong> = game over!</p>
        </div>
      </div>
    </div>
  )
}

export default DownsChainGame