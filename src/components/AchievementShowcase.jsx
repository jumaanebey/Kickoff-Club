import React, { useState, useEffect } from 'react'
import { getProgressData, trackInteractiveUsage } from '../utils/progressTracker'
import { badges, badgeRarities, achievementCategories, getBadgesByCategory } from '../data/achievements'
import { getCurrentUser, updateUserProgress } from '../utils/userAccountSystem'
import SocialSharingEnhanced from './SocialSharingEnhanced'

const AchievementShowcase = () => {
  const [progress, setProgress] = useState(getProgressData())
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showEarnedOnly, setShowEarnedOnly] = useState(false)
  const [user, setUser] = useState(null)
  const [selectedAchievement, setSelectedAchievement] = useState(null)
  const [showShareModal, setShowShareModal] = useState(false)
  const [communityAchievements, setCommunityAchievements] = useState([])

  useEffect(() => {
    // Track that user viewed achievements
    const updatedProgress = trackInteractiveUsage(progress, 'achievements')
    if (updatedProgress.newBadges?.length) {
      setProgress(getProgressData()) // Refresh if new badges were earned
    }
    
    // Load user account data
    const currentUser = getCurrentUser()
    setUser(currentUser)
    
    // Load community achievements
    loadCommunityAchievements()
  }, [])

  const loadCommunityAchievements = () => {
    // Sample community achievements - would come from API in real app
    const mockCommunityAchievements = [
      {
        id: 'community-1',
        user: { username: 'proFootballMaster2024', displayName: 'Mike Johnson' },
        badge: badges.completionist,
        earnedDate: '2024-12-01T15:30:00Z',
        likes: 23,
        isLiked: false
      },
      {
        id: 'community-2',
        user: { username: 'GridironGuru', displayName: 'Sarah Chen' },
        badge: badges.speedLearner,
        earnedDate: '2024-11-28T12:00:00Z',
        likes: 45,
        isLiked: false
      }
    ]
    setCommunityAchievements(mockCommunityAchievements)
  }

  const filterBadges = () => {
    let allBadges = Object.values(badges)
    
    if (selectedCategory !== 'all') {
      allBadges = getBadgesByCategory(selectedCategory)
    }
    
    if (showEarnedOnly) {
      allBadges = allBadges.filter(badge => 
        progress.badges.earned.some(earned => earned.badgeId === badge.id)
      )
    }
    
    return allBadges.sort((a, b) => {
      // Sort by rarity (legendary first) then by points
      const rarityOrder = ['legendary', 'epic', 'rare', 'uncommon', 'common']
      const aRarityIndex = rarityOrder.indexOf(a.rarity)
      const bRarityIndex = rarityOrder.indexOf(b.rarity)
      
      if (aRarityIndex !== bRarityIndex) {
        return aRarityIndex - bRarityIndex
      }
      
      return b.points - a.points
    })
  }

  const getBadgeProgress = (badge) => {
    const isEarned = progress.badges.earned.some(earned => earned.badgeId === badge.id)
    
    if (isEarned) {
      return { percentage: 100, isEarned: true }
    }
    
    // Calculate progress percentage based on requirements
    const req = badge.requirements
    let percentage = 0
    
    if (req.lessonsCompleted) {
      percentage = Math.min(100, (progress.lessons.completed.length / req.lessonsCompleted) * 100)
    } else if (req.dailyStreak) {
      percentage = Math.min(100, (progress.stats.currentStreak / req.dailyStreak) * 100)
    } else if (req.perfectQuizzes) {
      percentage = Math.min(100, (progress.quizzes.perfect.length / req.perfectQuizzes) * 100)
    } else {
      percentage = 0
    }
    
    return { percentage: Math.round(percentage), isEarned: false }
  }

  const getRarityStyle = (rarity) => {
    return badgeRarities[rarity] || badgeRarities.common
  }

  const getRequirementText = (badge) => {
    const req = badge.requirements
    if (req.lessonsCompleted) return `Complete ${req.lessonsCompleted} lessons`
    if (req.dailyStreak) return `${req.dailyStreak} day learning streak`
    if (req.perfectQuizzes) return `Score 100% on ${req.perfectQuizzes} quizzes`
    if (req.perfectQuizStreak) return `${req.perfectQuizStreak} perfect quizzes in a row`
    if (req.categoryCompleted) return `Complete all ${req.categoryCompleted} lessons`
    if (req.fastestLesson) return `Complete lesson in under ${req.fastestLesson} seconds`
    if (req.lessonSession) return `Complete ${req.lessonSession} lessons in one session`
    if (req.trackCompleted) return `Complete a learning track`
    if (req.allTracksCompleted) return `Complete all learning tracks`
    if (req.lateNightLearning) return `Learn between midnight and 6 AM`
    if (req.earlyMorningLearning) return `Learn between 5 AM and 7 AM`
    if (req.interactiveEngagement) return `Use all interactive features`
    if (req.scenarioMastery) return `Perfect all scenario challenges`
    return 'Special requirement'
  }

  const shareAchievement = (badge) => {
    const achievement = {
      name: badge.name,
      description: badge.description,
      icon: badge.icon,
      reason: getRequirementText(badge)
    }
    setSelectedAchievement(achievement)
    setShowShareModal(true)
  }

  const formatTimeAgo = (dateString) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInMinutes = Math.floor((now - date) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  const filteredBadges = filterBadges()
  const earnedCount = progress.badges.earned.length
  const totalBadges = Object.keys(badges).length

  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-sage-200">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-secondary-100 mb-2">
          🏆 Achievement System
        </h3>
        <p className="text-secondary-300">
          Earn badges and track your learning milestones
        </p>
        <div className="mt-3 text-sm text-gray-600">
          {earnedCount} of {totalBadges} badges earned ({Math.round((earnedCount / totalBadges) * 100)}%)
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-sage-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-sage-600">{earnedCount}</div>
          <div className="text-xs text-gray-600">Badges Earned</div>
        </div>
        <div className="bg-blush-50 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-blush-600">{progress.stats.currentStreak}</div>
          <div className="text-xs text-gray-600">Current Streak</div>
        </div>
        <div className="bg-warmGold bg-opacity-20 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-yellow-600">{progress.stats.totalPoints}</div>
          <div className="text-xs text-gray-600">Total Points</div>
        </div>
        <div className="bg-navy bg-opacity-10 rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-navy">{progress.lessons.completed.length}</div>
          <div className="text-xs text-gray-600">Lessons Done</div>
        </div>
      </div>

      {/* Next Badge Recommendations */}
      {progress.nextBadges?.length > 0 && (
        <div className="bg-gradient-to-r from-sage-50 to-blush-50 rounded-lg p-4 mb-6 border border-sage-200">
          <h4 className="font-bold text-navy mb-3">🎯 Recommended Next Badges</h4>
          <div className="grid gap-3">
            {progress.nextBadges.slice(0, 3).map(badge => {
              const badgeProgress = getBadgeProgress(badge)
              const rarityStyle = getRarityStyle(badge.rarity)
              
              return (
                <div key={badge.id} className="bg-white rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{badge.icon}</span>
                      <div>
                        <div className="font-medium text-sm">{badge.name}</div>
                        <div className="text-xs text-gray-600">{getRequirementText(badge)}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs px-2 py-1 rounded ${rarityStyle.bg} ${rarityStyle.color} border ${rarityStyle.border}`}>
                        {badge.rarity}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">+{badge.points} pts</div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{badgeProgress.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-sage-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${badgeProgress.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <select 
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-sage-200 rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-sage-500"
        >
          <option value="all">All Categories</option>
          {Object.entries(achievementCategories).map(([key, name]) => (
            <option key={key} value={key}>{name}</option>
          ))}
        </select>
        
        <button
          onClick={() => setShowEarnedOnly(!showEarnedOnly)}
          className={`px-3 py-1 rounded-lg text-sm transition-colors ${
            showEarnedOnly 
              ? 'bg-sage-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {showEarnedOnly ? 'Show All' : 'Earned Only'}
        </button>
      </div>

      {/* Badge Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBadges.map(badge => {
          const badgeProgress = getBadgeProgress(badge)
          const rarityStyle = getRarityStyle(badge.rarity)
          const isEarned = badgeProgress.isEarned
          
          return (
            <div 
              key={badge.id} 
              className={`rounded-lg p-4 border-2 transition-all ${
                isEarned 
                  ? `${rarityStyle.bg} ${rarityStyle.border}` 
                  : 'bg-gray-50 border-gray-200 opacity-75'
              }`}
            >
              <div className="text-center mb-3">
                <div className={`text-3xl mb-2 ${isEarned ? '' : 'grayscale'}`}>
                  {badge.icon}
                </div>
                <h5 className="font-bold text-navy text-sm mb-1">{badge.name}</h5>
                <div className={`text-xs px-2 py-1 rounded ${rarityStyle.bg} ${rarityStyle.color} border ${rarityStyle.border} inline-block`}>
                  {badge.rarity}
                </div>
              </div>
              
              <p className="text-xs text-gray-600 text-center mb-3 leading-relaxed">
                {badge.description}
              </p>
              
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-2">
                  {getRequirementText(badge)}
                </div>
                
                {!isEarned && (
                  <div className="mb-2">
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-sage-500 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${badgeProgress.percentage}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {badgeProgress.percentage}% complete
                    </div>
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium text-warmGold">
                    {isEarned ? '✅ Earned!' : `+${badge.points} points`}
                  </div>
                  {isEarned && (
                    <button
                      onClick={() => shareAchievement(badge)}
                      className="text-xs text-sage-600 hover:text-sage-700 transition-colors ml-2"
                      title="Share Achievement"
                    >
                      📤 Share
                    </button>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {filteredBadges.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🏅</div>
          <p>No badges match your current filters</p>
        </div>
      )}

      {/* Community Achievements Section */}
      {user && communityAchievements.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-sage-50 to-blush-50 rounded-lg p-6 border border-sage-200">
          <h4 className="text-lg font-bold text-navy mb-4">🌟 Community Highlights</h4>
          <div className="space-y-4">
            {communityAchievements.map(item => (
              <div key={item.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{item.badge.icon}</div>
                    <div>
                      <div className="font-medium text-sm">{item.user.displayName} earned</div>
                      <div className="font-bold text-navy">{item.badge.name}</div>
                      <div className="text-xs text-gray-600">{formatTimeAgo(item.earnedDate)}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">❤️ {item.likes}</span>
                    <button 
                      onClick={() => shareAchievement(item.badge)}
                      className="text-xs text-sage-600 hover:text-sage-700 font-medium"
                    >
                      🎉 Congratulate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Share Modal */}
      {showShareModal && selectedAchievement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-96 overflow-y-auto">
            <SocialSharingEnhanced 
              achievement={selectedAchievement}
              onComplete={() => setShowShareModal(false)}
            />
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => setShowShareModal(false)}
                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AchievementShowcase