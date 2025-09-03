import DownsCounterSimple from '../components/DownsCounterSimple'
import ScoringSimulatorSimple from '../components/ScoringSimulatorSimple'
import GameScenario from '../components/GameScenario'
import InteractiveFieldDiagram from '../components/InteractiveFieldDiagram'
import InteractiveScoringSimulator from '../components/InteractiveScoringSimulator'
import AchievementShowcase from '../components/AchievementShowcase'
import Leaderboard from '../components/Leaderboard'
import AnalyticsDashboard from '../components/AnalyticsDashboard'
import VideoPlayerWithScript from '../components/VideoPlayerWithScript'
import PracticeMode from '../components/PracticeMode'
import TeamSelector from '../components/TeamSelector'
import SocialShare from '../components/SocialShare'
import MiniGames from '../components/MiniGames'

const InteractiveDemo = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-secondary-100 mb-4">
          🎮 Interactive Professional Football Learning Experience
        </h1>
        <p className="text-xl text-secondary-300 max-w-3xl mx-auto">
          Experience hands-on learning with fully interactive simulators, challenges, and real-time feedback systems.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Interactive Field Diagram */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-secondary-100 mb-2">
              🏈 Interactive Field & Downs System
            </h2>
            <p className="text-secondary-300">
              Click to move the ball and experience how the 4-down system works in real situations
            </p>
          </div>
          <InteractiveFieldDiagram />
        </div>

        {/* Original Downs Counter (Simple Version) */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-secondary-100 mb-2">
              🔄 Basic Downs Counter
            </h2>
            <p className="text-secondary-300">
              Simple demonstration of how downs progress play by play
            </p>
          </div>
          <DownsCounterSimple />
        </div>

        {/* Interactive Scoring Simulator */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-secondary-100 mb-2">
              🎯 Advanced Scoring Decision Simulator
            </h2>
            <p className="text-secondary-300">
              Make strategic scoring decisions with real game consequences
            </p>
          </div>
          <InteractiveScoringSimulator />
        </div>

        {/* Original Scoring Simulator (Simple Version) */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-secondary-100 mb-2">
              ⚡ Quick Scoring Practice
            </h2>
            <p className="text-secondary-300">
              Simple practice with scoring plays and extra point decisions
            </p>
          </div>
          <ScoringSimulatorSimple />
        </div>

        {/* Game Scenario Challenge */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-secondary-100 mb-2">
              🧠 Strategic Decision Challenge
            </h2>
            <p className="text-secondary-300">
              Make coaching decisions in crucial game situations
            </p>
          </div>
          <GameScenario />
        </div>

        {/* Achievement System Showcase */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-secondary-100 mb-2">
              🏆 Advanced Achievement System
            </h2>
            <p className="text-secondary-300">
              Comprehensive badge system with streaks, milestones, and progress tracking
            </p>
          </div>
          <AchievementShowcase />
        </div>

        {/* Analytics Dashboard */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-secondary-100 mb-2">
              📊 Learning Analytics
            </h2>
            <p className="text-secondary-300">
              Track your progress with detailed insights and performance metrics
            </p>
          </div>
          <AnalyticsDashboard />
        </div>

        {/* Leaderboards */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-secondary-100 mb-2">
              🏆 Competitive Learning
            </h2>
            <p className="text-secondary-300">
              Compete with other learners and climb the leaderboards
            </p>
          </div>
          <Leaderboard />
        </div>

        {/* Practice Mode */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-secondary-100 mb-2">
              🎯 Practice Mode
            </h2>
            <p className="text-secondary-300">
              Unlimited practice questions with hints and instant feedback
            </p>
          </div>
          <PracticeMode />
        </div>

        {/* Team Selection */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-secondary-100 mb-2">
              🏈 Team-Based Learning
            </h2>
            <p className="text-secondary-300">
              Choose your favorite team and get personalized content
            </p>
          </div>
          <TeamSelector />
        </div>

        {/* Mini Games */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-secondary-100 mb-2">
              🎮 Learning Mini-Games
            </h2>
            <p className="text-secondary-300">
              Master concepts through fun, interactive games with time challenges
            </p>
          </div>
          <MiniGames />
        </div>

        {/* Social Sharing */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-secondary-100 mb-2">
              🌐 Social Learning
            </h2>
            <p className="text-secondary-300">
              Share your progress and achievements with friends
            </p>
          </div>
          <SocialShare />
        </div>

        {/* Video Player Demo */}
        <div className="space-y-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-secondary-100 mb-2">
              🎥 Video Learning Experience
            </h2>
            <p className="text-secondary-300">
              Synchronized video lessons with timed scripts and interactive elements
            </p>
          </div>
          <VideoPlayerWithScript 
            lesson={{
              id: "how-downs-work",
              title: "How Downs Work",
              subtitle: "The 4-Try System That Drives Every Play",
              duration: 90,
              script: {
                sections: [
                  {
                    timestamp: "0:03-0:12",
                    title: "Big Picture",
                    content: "A down is one try to move the ball forward. Teams get four downs to go ten yards.",
                    onScreen: "animated field + 'DOWN = one play attempt'"
                  },
                  {
                    timestamp: "0:12-0:26",
                    title: "1st Down Explained",
                    content: "If it's 1st and 10, the offense has four tries starting now to gain 10 yards.",
                    onScreen: "'1st & 10' badge appears showing yard marker moving 10 yards"
                  },
                  {
                    timestamp: "0:26-0:40",
                    title: "2nd & 3rd Down",
                    content: "If they don't get 10 on the first try, it becomes 2nd down. Then 3rd down.",
                    onScreen: "2nd & 5, 3rd & 7 examples with arrows"
                  }
                ]
              }
            }}
          />
        </div>

        {/* Feature Summary */}
        <div className="bg-gradient-to-r from-sage-50 to-blush-50 rounded-xl p-8 border border-sage-200">
          <h2 className="text-2xl font-bold text-secondary-100 mb-6 text-center">
            🚀 Enhanced Learning Platform Features
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">📚</div>
              <h3 className="font-bold text-navy mb-2">Enhanced Content</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Production-ready 90-second scripts</li>
                <li>• Detailed timestamps & production notes</li>
                <li>• WebVTT captions for accessibility</li>
                <li>• Interactive quiz systems</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">🎮</div>
              <h3 className="font-bold text-navy mb-2">Interactive Elements</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Hands-on downs simulator</li>
                <li>• Scoring decision mechanics</li>
                <li>• Strategic scenario challenges</li>
                <li>• Real-time feedback systems</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">🏆</div>
              <h3 className="font-bold text-navy mb-2">Advanced Gamification</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• 25+ new achievement badges</li>
                <li>• Streak-based rewards</li>
                <li>• Performance tracking</li>
                <li>• Learning pathway progression</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-bold text-navy mb-2">Learning Tracks</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Structured skill pathways</li>
                <li>• Beginner → Expert progression</li>
                <li>• Unlockable content system</li>
                <li>• Prerequisites management</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">📹</div>
              <h3 className="font-bold text-navy mb-2">Video Integration</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Script synchronization ready</li>
                <li>• Live quiz overlays</li>
                <li>• Section markers & controls</li>
                <li>• Caption system integrated</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-2xl mb-2">🔧</div>
              <h3 className="font-bold text-navy mb-2">Technical Excellence</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Component-based architecture</li>
                <li>• Real-time state management</li>
                <li>• Mobile-responsive design</li>
                <li>• Production-ready codebase</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="bg-warmGold bg-opacity-20 rounded-lg p-4 border border-warmGold">
              <h3 className="font-bold text-navy mb-2">🎉 Platform Status: Ready for Production</h3>
              <p className="text-sm text-gray-700">
                Complete learning management system with interactive elements, gamification, 
                structured progression, and video integration capabilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InteractiveDemo