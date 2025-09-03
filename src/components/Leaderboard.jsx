import React, { useState, useEffect } from 'react'
import { getProgressData } from '../utils/progressTracker'

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('weekly')
  const [userProgress, setUserProgress] = useState(getProgressData())
  
  // Simulated leaderboard data - in production this would come from a backend
  const generateLeaderboardData = () => {
    const names = [
      'GridironGuru', 'TouchdownKing', 'FieldGoalFanatic', 'QuarterbackQueen',
      'DefensiveDynamo', 'RedZoneRuler', 'BlitzMaster', 'EndZoneElite',
      'PuntPerfection', 'TwoMinuteDrill', 'FourthDownFighter', 'SackSpecialist'
    ]
    
    const currentUser = {
      rank: 8,
      name: userProgress.user?.name || 'You',
      points: userProgress.stats.totalPoints,
      streak: userProgress.stats.currentStreak,
      badges: userProgress.badges.earned.length,
      lessonsCompleted: userProgress.lessons.completed.length,
      isCurrentUser: true,
      avatar: '🏈'
    }
    
    const leaderboard = names.map((name, index) => ({
      rank: index + 1,
      name,
      points: Math.floor(Math.random() * 2000) + 500,
      streak: Math.floor(Math.random() * 30) + 1,
      badges: Math.floor(Math.random() * 15) + 3,
      lessonsCompleted: Math.floor(Math.random() * 20) + 5,
      isCurrentUser: false,
      avatar: ['🏆', '🥇', '🥈', '🥉', '⭐', '💪', '🔥', '🎯', '🚀', '💎', '🌟', '⚡'][index]
    }))
    
    // Sort by points and insert current user
    leaderboard.push(currentUser)
    leaderboard.sort((a, b) => b.points - a.points)
    leaderboard.forEach((user, index) => {
      user.rank = index + 1
    })
    
    return leaderboard
  }
  
  const [leaderboardData, setLeaderboardData] = useState(generateLeaderboardData())
  
  const timeframes = {
    daily: {
      title: 'Daily Leaders',
      subtitle: 'Top performers today',
      icon: '☀️',
      color: 'bg-yellow-50 border-yellow-300'
    },
    weekly: {
      title: 'Weekly Champions',
      subtitle: 'This week\'s best',
      icon: '📅',
      color: 'bg-sage-50 border-sage-300'
    },
    monthly: {
      title: 'Monthly Masters',
      subtitle: 'Top learners this month',
      icon: '📆',
      color: 'bg-blush-50 border-blush-300'
    },
    allTime: {
      title: 'All-Time Legends',
      subtitle: 'The greatest of all time',
      icon: '👑',
      color: 'bg-warmGold bg-opacity-20 border-yellow-400'
    }
  }
  
  const getRankStyle = (rank) => {
    switch(rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-bold'
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400 text-white font-bold'
      case 3:
        return 'bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }
  
  const getRankIcon = (rank) => {
    switch(rank) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return `#${rank}`
    }
  }
  
  const currentTimeframe = timeframes[activeTab]
  const currentUserData = leaderboardData.find(user => user.isCurrentUser)
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-sage-200">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-secondary-100 mb-2">
          🏆 Leaderboards
        </h3>
        <p className="text-secondary-300">
          Compete with other learners and climb the ranks
        </p>
      </div>
      
      {/* Timeframe Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {Object.entries(timeframes).map(([key, timeframe]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === key
                ? 'bg-sage-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{timeframe.icon}</span>
            <span className="hidden sm:inline">{timeframe.title.split(' ')[0]}</span>
            <span className="sm:hidden text-xs">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
          </button>
        ))}
      </div>
      
      {/* Current Timeframe Header */}
      <div className={`rounded-lg p-4 mb-6 border-2 ${currentTimeframe.color}`}>
        <div className="text-center">
          <div className="text-2xl mb-2">{currentTimeframe.icon}</div>
          <h4 className="text-lg font-bold text-navy">{currentTimeframe.title}</h4>
          <p className="text-sm text-gray-600">{currentTimeframe.subtitle}</p>
        </div>
      </div>
      
      {/* Your Position Card */}
      {currentUserData && (
        <div className="bg-gradient-to-r from-sage-50 to-blush-50 rounded-lg p-4 mb-6 border-2 border-sage-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${getRankStyle(currentUserData.rank)}`}>
                {getRankIcon(currentUserData.rank)}
              </div>
              <div>
                <div className="font-bold text-navy">Your Position</div>
                <div className="text-sm text-gray-600">Keep climbing! 💪</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-warmGold">{currentUserData.points}</div>
              <div className="text-xs text-gray-600">points</div>
            </div>
          </div>
        </div>
      )}
      
      {/* Leaderboard List */}
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {leaderboardData.slice(0, 10).map((user) => (
          <div
            key={user.rank}
            className={`rounded-lg p-3 transition-all ${
              user.isCurrentUser
                ? 'bg-sage-100 border-2 border-sage-400 shadow-md'
                : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm mr-3 ${getRankStyle(user.rank)}`}>
                  {getRankIcon(user.rank)}
                </div>
                <div className="text-xl mr-3">{user.avatar}</div>
                <div className="flex-1">
                  <div className="font-medium text-navy flex items-center">
                    {user.name}
                    {user.isCurrentUser && <span className="ml-2 text-xs bg-sage-500 text-white px-2 py-1 rounded">YOU</span>}
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-600 mt-1">
                    <span>🔥 {user.streak} day streak</span>
                    <span>🏅 {user.badges} badges</span>
                    <span>📚 {user.lessonsCompleted} lessons</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-warmGold">{user.points}</div>
                <div className="text-xs text-gray-500">points</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Stats Comparison */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h5 className="font-bold text-navy mb-3">📊 Quick Stats</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600">Avg Points</div>
            <div className="font-bold text-navy">
              {Math.round(leaderboardData.reduce((sum, u) => sum + u.points, 0) / leaderboardData.length)}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600">Top Streak</div>
            <div className="font-bold text-navy">
              {Math.max(...leaderboardData.map(u => u.streak))} days
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600">Most Badges</div>
            <div className="font-bold text-navy">
              {Math.max(...leaderboardData.map(u => u.badges))}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600">Active Users</div>
            <div className="font-bold text-navy">
              {leaderboardData.length}
            </div>
          </div>
        </div>
      </div>
      
      {/* Motivational Footer */}
      <div className="mt-6 text-center text-sm text-gray-600 italic">
        {currentUserData?.rank <= 3 && "🌟 Amazing! You're in the top 3!"}
        {currentUserData?.rank > 3 && currentUserData?.rank <= 10 && "💪 Great job! You're in the top 10!"}
        {currentUserData?.rank > 10 && "📈 Keep learning to climb the ranks!"}
      </div>
    </div>
  )
}

export default Leaderboard