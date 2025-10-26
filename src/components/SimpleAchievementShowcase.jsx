import React, { useState } from 'react'

const SimpleAchievementShowcase = () => {
  const [unlockedAchievements, setUnlockedAchievements] = useState(['first-lesson', 'video-watcher'])

  const achievements = [
    {
      id: 'first-lesson',
      title: 'First Steps',
      description: 'Completed your first lesson',
      icon: '🎯',
      rarity: 'common',
      unlocked: true
    },
    {
      id: 'video-watcher',
      title: 'Video Learner',
      description: 'Watched a complete video lesson',
      icon: '🎥',
      rarity: 'common',
      unlocked: true
    },
    {
      id: 'quiz-master',
      title: 'Quiz Master',
      description: 'Got 100% on a lesson quiz',
      icon: '🧠',
      rarity: 'uncommon',
      unlocked: false
    },
    {
      id: 'streak-keeper',
      title: 'Streak Keeper',
      description: 'Maintained a 7-day learning streak',
      icon: '🔥',
      rarity: 'uncommon',
      unlocked: false
    },
    {
      id: 'football-guru',
      title: 'Football Guru',
      description: 'Completed all foundational lessons',
      icon: '🏆',
      rarity: 'rare',
      unlocked: false
    },
    {
      id: 'coach-level',
      title: 'Coach Level',
      description: 'Reached expert understanding',
      icon: '👨‍🏫',
      rarity: 'legendary',
      unlocked: false
    }
  ]

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'border-gray-300 bg-gray-50'
      case 'uncommon': return 'border-green-300 bg-green-50'
      case 'rare': return 'border-blue-300 bg-blue-50'
      case 'legendary': return 'border-purple-300 bg-purple-50'
      default: return 'border-gray-300 bg-gray-50'
    }
  }

  const getRarityText = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-gray-600'
      case 'uncommon': return 'text-green-600'
      case 'rare': return 'text-blue-600'
      case 'legendary': return 'text-purple-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">🏆 Achievement Showcase</h3>
        <p className="text-gray-600">Track your football learning milestones</p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-lg font-bold text-gray-800">
              {unlockedAchievements.length} / {achievements.length}
            </div>
            <div className="text-sm text-gray-600">Achievements Unlocked</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-accent-600">
              {Math.round((unlockedAchievements.length / achievements.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </div>
        <div className="w-full bg-white rounded-full h-2 mt-3">
          <div 
            className="bg-accent-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(unlockedAchievements.length / achievements.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => {
          const isUnlocked = unlockedAchievements.includes(achievement.id)
          return (
            <div
              key={achievement.id}
              className={`border-2 rounded-lg p-4 transition-all ${
                isUnlocked 
                  ? getRarityColor(achievement.rarity)
                  : 'border-gray-200 bg-gray-100 opacity-60'
              }`}
            >
              <div className="text-center">
                <div className={`text-3xl mb-2 ${isUnlocked ? '' : 'grayscale'}`}>
                  {achievement.icon}
                </div>
                <h4 className={`font-semibold mb-1 ${
                  isUnlocked ? 'text-gray-800' : 'text-gray-500'
                }`}>
                  {achievement.title}
                </h4>
                <p className={`text-sm mb-2 ${
                  isUnlocked ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {achievement.description}
                </p>
                <div className={`text-xs font-medium uppercase ${
                  isUnlocked ? getRarityText(achievement.rarity) : 'text-gray-400'
                }`}>
                  {achievement.rarity}
                  {isUnlocked && <span className="ml-2">✓</span>}
                  {!isUnlocked && <span className="ml-2">🔒</span>}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Motivation Message */}
      <div className="text-center mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-blue-700 text-sm">
          💡 <strong>Keep going!</strong> Complete more lessons and quizzes to unlock new achievements and show off your football expertise!
        </p>
      </div>
    </div>
  )
}

export default SimpleAchievementShowcase