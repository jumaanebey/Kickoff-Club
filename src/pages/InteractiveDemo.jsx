import React from 'react'

// Fallback components for missing imports
const FallbackComponent = ({ name, description }) => (
  <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
    <div className="text-center">
      <div className="text-4xl mb-4">🚧</div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
      <div className="mt-4 bg-blue-50 rounded-lg p-3">
        <p className="text-blue-700 text-xs">Component ready for integration</p>
      </div>
    </div>
  </div>
)

// Import the actual components - they exist now
import DownsCounterSimple from '../components/DownsCounterSimple'
import ScoringSimulatorSimple from '../components/ScoringSimulatorSimple'
import FootballScenarioGame from '../components/FootballScenarioGame'
import SimpleAchievementShowcase from '../components/SimpleAchievementShowcase'

// Import available components with fallbacks for ones that may not exist yet
let GameScenario, InteractiveScoringSimulator, Leaderboard, AnalyticsDashboard, VideoPlayerWithScript, PracticeMode, TeamSelector, SocialShare, MiniGames

try {
  GameScenario = require('../components/GameScenario').default
} catch {
  GameScenario = () => <FallbackComponent name="Game Scenarios" description="Strategic decision challenges" />
}

try {
  InteractiveScoringSimulator = require('../components/InteractiveScoringSimulator').default
} catch {
  InteractiveScoringSimulator = () => <FallbackComponent name="Advanced Scoring" description="Complex scoring decision simulator" />
}

try {
  Leaderboard = require('../components/Leaderboard').default
} catch {
  Leaderboard = () => <FallbackComponent name="Leaderboards" description="Competitive learning rankings" />
}

try {
  AnalyticsDashboard = require('../components/AnalyticsDashboard').default
} catch {
  AnalyticsDashboard = () => <FallbackComponent name="Analytics" description="Learning progress insights" />
}

try {
  VideoPlayerWithScript = require('../components/VideoPlayerWithScript').default
} catch {
  VideoPlayerWithScript = () => <FallbackComponent name="Video Integration" description="Synchronized video lessons" />
}

try {
  PracticeMode = require('../components/PracticeMode').default
} catch {
  PracticeMode = () => <FallbackComponent name="Practice Mode" description="Unlimited practice questions" />
}

try {
  TeamSelector = require('../components/TeamSelector').default
} catch {
  TeamSelector = () => <FallbackComponent name="Team Selection" description="Personalized team-based content" />
}

try {
  SocialShare = require('../components/SocialShare').default
} catch {
  SocialShare = () => <FallbackComponent name="Social Sharing" description="Share progress with friends" />
}

try {
  MiniGames = require('../components/MiniGames').default
} catch {
  MiniGames = () => <FallbackComponent name="Mini Games" description="Interactive learning games" />
}

const InteractiveDemo = ({ navigate }) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-secondary-100 mb-4">
          🎮 Try Our Interactive Learning Tools
        </h1>
        <p className="text-lg text-secondary-300 max-w-2xl mx-auto">
          Get hands-on with the core concepts of football through simple, interactive simulations.
        </p>
      </div>

      <div className="space-y-12">
        {/* Football Scenarios Game */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-secondary-100 mb-2">
              🏈 Football Scenarios
            </h2>
            <p className="text-secondary-300">
              Experience real football plays and learn what happens on each down!
            </p>
          </div>
          <FootballScenarioGame />
        </div>

        {/* Scoring Simulator */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-secondary-100 mb-2">
              🎯 Practice Scoring Plays
            </h2>
            <p className="text-secondary-300">
              Try different scoring plays and make touchdown decisions
            </p>
          </div>
          <ScoringSimulatorSimple />
        </div>

        {/* Achievement System */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-secondary-100 mb-2">
              🏆 Track Your Progress
            </h2>
            <p className="text-secondary-300">
              See how achievements work as you complete lessons
            </p>
          </div>
          <SimpleAchievementShowcase />
        </div>

        {/* Simple Call to Action */}
        <div className="text-center mt-12 p-6 bg-gradient-to-r from-sage-50 to-blush-50 rounded-lg border border-sage-200">
          <h2 className="text-2xl font-bold text-secondary-100 mb-4">
            Ready to Learn Football?
          </h2>
          <p className="text-secondary-300 mb-4">
            Start with our structured lessons or continue exploring the interactive tools above.
          </p>
          <div className="space-x-4">
            <button 
              onClick={() => navigate('/lessons')}
              className="bg-sage-500 hover:bg-sage-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              📚 Start Learning
            </button>
            <button 
              onClick={() => navigate('/platform')}
              className="bg-accent-500 hover:bg-accent-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              📖 View All Lessons
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveDemo