import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { getCurrentUser, updateUserProgress } from '../utils/userAccountSystem'
import DiscussionForums from './DiscussionForums'

export default function CommunityFeatures() {
  const { state } = useApp()
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('leaderboard')
  const [leaderboardData, setLeaderboardData] = useState([])
  const [userGroups, setUserGroups] = useState([])
  const [challenges, setChallenges] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    loadCommunityData()
  }, [])

  const loadCommunityData = async () => {
    setLoading(true)
    
    // Simulate loading community data
    setTimeout(() => {
      setLeaderboardData(generateLeaderboardData())
      setUserGroups(generateUserGroups())
      setChallenges(generateChallenges())
      setLoading(false)
    }, 1000)
  }

  const generateLeaderboardData = () => {
    const mockUsers = [
      { id: '1', username: 'proFootballMaster2024', displayName: 'Mike Johnson', points: 2850, level: 'pro-level', streak: 45, avatar: '🏆' },
      { id: '2', username: 'GridironGuru', displayName: 'Sarah Chen', points: 2640, level: 'expert-level', streak: 38, avatar: '🎯' },
      { id: '3', username: 'TouchdownTom', displayName: 'Tom Wilson', points: 2420, level: 'expert-level', streak: 29, avatar: '⚡' },
      { id: '4', username: 'DefenseDeep', displayName: 'Alex Rodriguez', points: 2180, level: 'enthusiast-level', streak: 22, avatar: '🛡️' },
      { id: '5', username: 'QuarterbackQueen', displayName: 'Jessica Taylor', points: 1950, level: 'enthusiast-level', streak: 18, avatar: '👑' },
      { id: '6', username: 'RedZoneRookie', displayName: 'Chris Brown', points: 1740, level: 'fan-level', streak: 15, avatar: '🚀' },
      { id: '7', username: 'PlayoffPro', displayName: 'Amanda Davis', points: 1520, level: 'fan-level', streak: 12, avatar: '🌟' },
      { id: '8', username: 'EndZoneExpert', displayName: 'Kevin Lee', points: 1380, level: 'fan-level', streak: 9, avatar: '🎪' },
    ]

    // Add current user to leaderboard if they exist
    if (user) {
      const userRank = {
        id: user.id,
        username: user.username,
        displayName: user.profile.displayName,
        points: user.progress.stats.totalPoints,
        level: user.progress.stats.currentLevel,
        streak: user.progress.stats.currentStreak,
        avatar: '👤'
      }
      
      mockUsers.push(userRank)
      mockUsers.sort((a, b) => b.points - a.points)
    }

    return mockUsers.slice(0, 10).map((user, index) => ({ ...user, rank: index + 1 }))
  }

  const generateUserGroups = () => [
    {
      id: 'beginners',
      name: 'Pro Football Newcomers',
      description: 'Perfect for those just starting their pro football journey',
      members: 1247,
      category: 'skill-based',
      isJoined: user?.progress?.stats?.currentLevel === 'rookie-level',
      icon: '🌱',
      color: 'bg-green-100 text-green-800'
    },
    {
      id: 'chiefs-fans',
      name: 'Kansas City Chiefs Fans',
      description: 'Red Kingdom unite! Discuss Chiefs plays and strategy',
      members: 892,
      category: 'team-based',
      isJoined: user?.profile?.favoriteTeam === 'KC',
      icon: '🔴',
      color: 'bg-red-100 text-red-800'
    },
    {
      id: 'advanced-strategy',
      name: 'Advanced Strategy Discussion',
      description: 'Deep dives into complex pro football tactics and analytics',
      members: 456,
      category: 'skill-based',
      isJoined: user?.progress?.stats?.currentLevel === 'expert-level' || user?.progress?.stats?.currentLevel === 'pro-level',
      icon: '🧠',
      color: 'bg-purple-100 text-purple-800'
    },
    {
      id: 'daily-learners',
      name: 'Daily Streak Masters',
      description: 'For dedicated learners maintaining daily streaks',
      members: 324,
      category: 'achievement-based',
      isJoined: user?.progress?.stats?.currentStreak >= 7,
      icon: '🔥',
      color: 'bg-orange-100 text-orange-800'
    },
    {
      id: 'quiz-champions',
      name: 'Quiz Champions',
      description: 'Compete in weekly quiz challenges',
      members: 678,
      category: 'competitive',
      isJoined: false,
      icon: '🏅',
      color: 'bg-yellow-100 text-yellow-800'
    },
    {
      id: 'fantasy-focus',
      name: 'Fantasy Football Focus',
      description: 'Learn pro football through the lens of fantasy football',
      members: 1089,
      category: 'interest-based',
      isJoined: false,
      icon: '📊',
      color: 'bg-blue-100 text-blue-800'
    }
  ]

  const generateChallenges = () => [
    {
      id: 'weekly-quiz',
      title: '🏆 Weekly Quiz Challenge',
      description: 'Test your knowledge against the community',
      type: 'competitive',
      participants: 1247,
      timeLeft: '3 days',
      reward: '500 points',
      difficulty: 'Medium',
      isParticipating: false,
      status: 'active'
    },
    {
      id: 'streak-master',
      title: '🔥 30-Day Streak Master',
      description: 'Complete lessons for 30 consecutive days',
      type: 'endurance',
      participants: 432,
      timeLeft: '25 days',
      reward: 'Streak Master Badge + 1000 points',
      difficulty: 'Hard',
      isParticipating: user?.progress?.stats?.currentStreak >= 5,
      status: 'active'
    },
    {
      id: 'rookie-bootcamp',
      title: '🌱 Rookie Bootcamp',
      description: 'Complete all basic lessons in 2 weeks',
      type: 'learning',
      participants: 892,
      timeLeft: '10 days',
      reward: 'Bootcamp Graduate Badge',
      difficulty: 'Easy',
      isParticipating: false,
      status: 'active'
    },
    {
      id: 'perfect-scores',
      title: '⭐ Perfect Score Pursuit',
      description: 'Achieve perfect scores on 5 different quizzes',
      type: 'accuracy',
      participants: 256,
      timeLeft: '1 week',
      reward: 'Perfectionist Badge + 750 points',
      difficulty: 'Hard',
      isParticipating: false,
      status: 'active'
    },
    {
      id: 'team-trivia',
      title: '📚 Team Trivia Tournament',
      description: 'Weekly trivia focused on your favorite team',
      type: 'knowledge',
      participants: 1156,
      timeLeft: 'Starts in 2 days',
      reward: '300 points per win',
      difficulty: 'Medium',
      isParticipating: false,
      status: 'upcoming'
    }
  ]

  const joinGroup = async (groupId) => {
    if (!user) return

    const group = userGroups.find(g => g.id === groupId)
    if (!group) return

    // Update user groups
    const updatedGroups = userGroups.map(g => 
      g.id === groupId 
        ? { ...g, isJoined: !g.isJoined, members: g.isJoined ? g.members - 1 : g.members + 1 }
        : g
    )
    setUserGroups(updatedGroups)

    // Update user progress
    await updateUserProgress({
      social: {
        ...user.social,
        groups: group.isJoined 
          ? user.social.groups.filter(id => id !== groupId)
          : [...user.social.groups, groupId]
      }
    })
  }

  const joinChallenge = async (challengeId) => {
    if (!user) return

    const challenge = challenges.find(c => c.id === challengeId)
    if (!challenge) return

    const updatedChallenges = challenges.map(c =>
      c.id === challengeId
        ? { 
            ...c, 
            isParticipating: !c.isParticipating,
            participants: c.isParticipating ? c.participants - 1 : c.participants + 1
          }
        : c
    )
    setChallenges(updatedChallenges)

    // Award participation points
    if (!challenge.isParticipating) {
      await updateUserProgress({
        stats: {
          ...user.progress.stats,
          totalPoints: user.progress.stats.totalPoints + 25
        },
        achievements: {
          ...user.progress.achievements,
          socialInteractions: [
            ...user.progress.achievements.socialInteractions,
            {
              type: 'challenge-join',
              challengeId,
              timestamp: new Date().toISOString()
            }
          ]
        }
      })
    }
  }

  const getLevelIcon = (level) => {
    const icons = {
      'rookie-level': '🌱',
      'fan-level': '⚽',
      'enthusiast-level': '🔥',
      'expert-level': '⚡',
      'pro-level': '🏆'
    }
    return icons[level] || '👤'
  }

  const getLevelColor = (level) => {
    const colors = {
      'rookie-level': 'bg-green-100 text-green-800',
      'fan-level': 'bg-blue-100 text-blue-800',
      'enthusiast-level': 'bg-orange-100 text-orange-800',
      'expert-level': 'bg-purple-100 text-purple-800',
      'pro-level': 'bg-yellow-100 text-yellow-800'
    }
    return colors[level] || 'bg-gray-100 text-gray-800'
  }

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Easy': 'bg-green-100 text-green-800',
      'Medium': 'bg-orange-100 text-orange-800',
      'Hard': 'bg-red-100 text-red-800'
    }
    return colors[difficulty] || 'bg-gray-100 text-gray-800'
  }

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-gradient-to-r from-sage-50 to-blush-50 rounded-xl p-8 text-center">
          <div className="text-4xl mb-4">👥</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join the Community</h2>
          <p className="text-gray-600 mb-6">
            Create an account to connect with other pro football learners, compete in challenges, and climb the leaderboards!
          </p>
          <button className="btn-primary">
            Create Account
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🏈 Community Hub
        </h1>
        <p className="text-xl text-gray-600">
          Connect, compete, and learn together with fellow pro football enthusiasts
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center mb-8">
        {[
          { id: 'leaderboard', label: '🏆 Leaderboard', desc: 'Top performers' },
          { id: 'groups', label: '👥 Groups', desc: 'Find your tribe' },
          { id: 'challenges', label: '⚔️ Challenges', desc: 'Test yourself' },
          { id: 'forums', label: '💬 Forums', desc: 'Discussion & Q&A' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 min-w-0 p-4 text-center border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-sage-500 bg-sage-50 text-sage-700'
                : 'border-gray-200 hover:border-sage-300 hover:bg-gray-50'
            }`}
          >
            <div className="font-semibold">{tab.label}</div>
            <div className="text-sm text-gray-500">{tab.desc}</div>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin text-4xl mb-4">⚽</div>
          <p className="text-gray-600">Loading community data...</p>
        </div>
      ) : (
        <>
          {/* Leaderboard Tab */}
          {activeTab === 'leaderboard' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-sage-500 to-blush-500 p-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">🏆 Top Learners</h2>
                  <p className="opacity-90">See how you stack up against the community</p>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {leaderboardData.map((player, index) => {
                      const isCurrentUser = player.id === user.id
                      return (
                        <div
                          key={player.id}
                          className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                            isCurrentUser
                              ? 'bg-gradient-to-r from-sage-50 to-blush-50 border-sage-300 shadow-md'
                              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                              index < 3 
                                ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
                                : 'bg-gradient-to-br from-gray-400 to-gray-500'
                            }`}>
                              {index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${player.rank}`}
                            </div>
                            
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className={`font-semibold ${isCurrentUser ? 'text-sage-700' : 'text-gray-900'}`}>
                                  {player.displayName}
                                </h3>
                                {isCurrentUser && (
                                  <span className="px-2 py-1 bg-sage-200 text-sage-800 text-xs rounded-full font-medium">
                                    You
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>@{player.username}</span>
                                <span className={`px-2 py-1 rounded-full text-xs ${getLevelColor(player.level)}`}>
                                  {getLevelIcon(player.level)} {player.level.replace('-level', '')}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-xl font-bold text-sage-600">
                              {player.points.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600 flex items-center">
                              🔥 {player.streak} day streak
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-900 mb-2">💡 Climbing Tips</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Complete daily lessons to maintain your streak</li>
                      <li>• Perfect quiz scores give bonus points</li>
                      <li>• Join challenges for extra point opportunities</li>
                      <li>• Help other learners in group discussions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Groups Tab */}
          {activeTab === 'groups' && (
            <div className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {userGroups.map(group => (
                  <div key={group.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${group.color}`}>
                          {group.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                          <p className="text-sm text-gray-600">{group.members.toLocaleString()} members</p>
                        </div>
                      </div>
                      
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${group.color}`}>
                        {group.category.replace('-', ' ')}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-6">{group.description}</p>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => joinGroup(group.id)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          group.isJoined
                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            : 'bg-sage-500 text-white hover:bg-sage-600'
                        }`}
                      >
                        {group.isJoined ? 'Leave Group' : 'Join Group'}
                      </button>

                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>👥 {group.members}</span>
                        {group.isJoined && <span className="text-green-600">✓ Joined</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Forums Tab */}
          {activeTab === 'forums' && (
            <DiscussionForums />
          )}

          {/* Challenges Tab */}
          {activeTab === 'challenges' && (
            <div className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {challenges.map(challenge => (
                  <div key={challenge.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{challenge.title}</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                            {challenge.difficulty}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {challenge.type}
                          </span>
                        </div>
                      </div>

                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        challenge.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {challenge.status}
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4">{challenge.description}</p>

                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Participants</span>
                        <span className="font-medium">{challenge.participants.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Time Left</span>
                        <span className="font-medium text-orange-600">{challenge.timeLeft}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Reward</span>
                        <span className="font-medium text-green-600">{challenge.reward}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => joinChallenge(challenge.id)}
                      disabled={challenge.status === 'upcoming'}
                      className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                        challenge.isParticipating
                          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          : challenge.status === 'upcoming'
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-sage-500 text-white hover:bg-sage-600'
                      }`}
                    >
                      {challenge.isParticipating 
                        ? 'Leave Challenge' 
                        : challenge.status === 'upcoming'
                        ? 'Coming Soon'
                        : 'Join Challenge'
                      }
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
                <h4 className="font-semibold text-gray-900 mb-4">🎯 Challenge Strategy</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">For Beginners:</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Start with learning-focused challenges</li>
                      <li>• Focus on consistency over perfection</li>
                      <li>• Join group challenges for support</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">For Advanced Users:</h5>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>• Take on competitive challenges</li>
                      <li>• Aim for perfect scores and speed</li>
                      <li>• Help others in group challenges</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}