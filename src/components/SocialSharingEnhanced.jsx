import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { getCurrentUser, shareUserProgress } from '../utils/userAccountSystem'

export default function SocialSharingEnhanced({ achievement, lesson, customContent }) {
  const { state } = useApp()
  const [shareType, setShareType] = useState('achievement')
  const [isSharing, setIsSharing] = useState(false)
  const [shareSuccess, setShareSuccess] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser(getCurrentUser())
  }, [])

  const generateShareContent = () => {
    const baseStats = user ? {
      level: user.progress.stats.currentLevel.replace('-level', ''),
      streak: user.progress.stats.currentStreak,
      totalPoints: user.progress.stats.totalPoints,
      lessonsCompleted: user.progress.lessons.completed.length,
      username: user.profile.displayName || user.username
    } : {}

    switch (shareType) {
      case 'achievement':
        if (achievement) {
          return {
            title: `🏆 New Achievement Unlocked!`,
            text: `Just earned "${achievement.name}" on Kickoff Club! ${achievement.reason || ''}`,
            hashtags: ['football', 'Learning', 'Achievement', 'KickoffClub'],
            emoji: achievement.icon || '🏆',
            image: generateAchievementImage(achievement)
          }
        }
        break

      case 'lesson-completion':
        if (lesson) {
          return {
            title: `📚 Lesson Complete!`,
            text: `Just finished "${lesson.title}" on Kickoff Club! Learning football has never been this engaging.`,
            hashtags: ['footballEducation', 'Learning', 'KickoffClub'],
            emoji: '📚',
            image: generateLessonImage(lesson)
          }
        }
        break

      case 'streak':
        return {
          title: `🔥 ${baseStats.streak}-Day Learning Streak!`,
          text: `I'm on fire! ${baseStats.streak} days straight of football learning on Kickoff Club. Who else is building their football knowledge?`,
          hashtags: ['LearningStreak', 'football', 'Consistency', 'KickoffClub'],
          emoji: '🔥',
          image: generateStreakImage(baseStats.streak)
        }

      case 'level-up':
        return {
          title: `📈 Level Up! Now ${baseStats.level}!`,
          text: `Just reached ${baseStats.level} level on Kickoff Club with ${baseStats.totalPoints} total points! The football learning journey continues!`,
          hashtags: ['LevelUp', 'football', 'Progress', 'KickoffClub'],
          emoji: '📈',
          image: generateLevelImage(baseStats.level)
        }

      case 'custom':
        return customContent || {
          title: '🏈 Learning football with Kickoff Club!',
          text: 'Join me in mastering football football the fun way!',
          hashtags: ['football', 'Learning', 'KickoffClub'],
          emoji: '🏈'
        }

      default:
        return {
          title: '🏈 Learning football Football!',
          text: `I'm learning football football on Kickoff Club! ${baseStats.lessonsCompleted} lessons completed and counting!`,
          hashtags: ['football', 'Learning', 'KickoffClub'],
          emoji: '🏈'
        }
    }
  }

  const generateAchievementImage = (achievement) => {
    // In a real app, this would generate or fetch a custom image
    return `data:image/svg+xml,${encodeURIComponent(
      `<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" fill="#1a2332"/>
        <text x="200" y="80" font-family="Arial" font-size="48" fill="#D4AF37" text-anchor="middle">${achievement.icon || '🏆'}</text>
        <text x="200" y="120" font-family="Arial" font-size="20" fill="white" text-anchor="middle">${achievement.name}</text>
        <text x="200" y="150" font-family="Arial" font-size="14" fill="#8FAA96" text-anchor="middle">Kickoff Club Achievement</text>
      </svg>`
    )}`
  }

  const generateLessonImage = (lesson) => {
    return `data:image/svg+xml,${encodeURIComponent(
      `<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" fill="#8FAA96"/>
        <text x="200" y="80" font-family="Arial" font-size="48" fill="white" text-anchor="middle">📚</text>
        <text x="200" y="120" font-family="Arial" font-size="18" fill="white" text-anchor="middle">${lesson.title}</text>
        <text x="200" y="150" font-family="Arial" font-size="14" fill="#1a2332" text-anchor="middle">Lesson Complete!</text>
      </svg>`
    )}`
  }

  const generateStreakImage = (streak) => {
    return `data:image/svg+xml,${encodeURIComponent(
      `<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="fireGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#ff6b6b"/>
            <stop offset="100%" style="stop-color:#ff8e3c"/>
          </linearGradient>
        </defs>
        <rect width="400" height="200" fill="url(#fireGradient)"/>
        <text x="200" y="80" font-family="Arial" font-size="48" fill="white" text-anchor="middle">🔥</text>
        <text x="200" y="120" font-family="Arial" font-size="28" fill="white" text-anchor="middle">${streak} Days</text>
        <text x="200" y="150" font-family="Arial" font-size="14" fill="white" text-anchor="middle">Learning Streak</text>
      </svg>`
    )}`
  }

  const generateLevelImage = (level) => {
    return `data:image/svg+xml,${encodeURIComponent(
      `<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="200" fill="#D4AF37"/>
        <text x="200" y="80" font-family="Arial" font-size="48" fill="#1a2332" text-anchor="middle">📈</text>
        <text x="200" y="120" font-family="Arial" font-size="24" fill="#1a2332" text-anchor="middle">${level.toUpperCase()}</text>
        <text x="200" y="150" font-family="Arial" font-size="14" fill="#1a2332" text-anchor="middle">Level Achieved!</text>
      </svg>`
    )}`
  }

  const shareContent = generateShareContent()

  const platformConfigs = {
    twitter: {
      name: 'Twitter',
      icon: '🐦',
      color: 'bg-blue-400 hover:bg-blue-500',
      generateUrl: (content) => {
        const text = `${content.title}\n\n${content.text}`
        const hashtags = content.hashtags.join(',')
        const url = window.location.origin
        return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&hashtags=${hashtags}&url=${encodeURIComponent(url)}`
      }
    },
    facebook: {
      name: 'Facebook',
      icon: '📘',
      color: 'bg-blue-600 hover:bg-blue-700',
      generateUrl: (content) => {
        const url = window.location.origin
        return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(content.text)}`
      }
    },
    linkedin: {
      name: 'LinkedIn',
      icon: '💼',
      color: 'bg-blue-700 hover:bg-blue-800',
      generateUrl: (content) => {
        const url = window.location.origin
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(content.title)}&summary=${encodeURIComponent(content.text)}`
      }
    },
    reddit: {
      name: 'Reddit',
      icon: '🤖',
      color: 'bg-orange-500 hover:bg-orange-600',
      generateUrl: (content) => {
        const url = window.location.origin
        return `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(content.title)}`
      }
    },
    instagram: {
      name: 'Instagram Story',
      icon: '📷',
      color: 'bg-pink-500 hover:bg-pink-600',
      action: 'story'
    }
  }

  const handleShare = async (platform) => {
    setIsSharing(true)
    
    try {
      const config = platformConfigs[platform]
      
      if (config.action === 'story') {
        // For Instagram, download the image for sharing
        if (shareContent.image) {
          await downloadImage(shareContent.image, `kickoff-club-${shareType}.png`)
        }
      } else {
        // Open social platform URL
        const shareUrl = config.generateUrl(shareContent)
        window.open(shareUrl, '_blank', 'width=600,height=400')
      }
      
      // Track the share
      if (user) {
        await shareUserProgress(platform, {
          type: shareType,
          content: shareContent,
          achievement,
          lesson
        })
      }
      
      setShareSuccess(true)
      setTimeout(() => setShareSuccess(false), 3000)
      
    } catch (error) {
      console.error('Share failed:', error)
    } finally {
      setIsSharing(false)
    }
  }

  const handleNativeShare = async () => {
    if (!navigator.share) return

    try {
      await navigator.share({
        title: shareContent.title,
        text: shareContent.text,
        url: window.location.origin
      })
      
      if (user) {
        await shareUserProgress('native', { type: shareType, content: shareContent })
      }
      
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Native share failed:', error)
      }
    }
  }

  const handleCopyLink = async () => {
    const textToCopy = `${shareContent.title}\n\n${shareContent.text}\n\n${window.location.origin}`
    
    try {
      await navigator.clipboard.writeText(textToCopy)
      setShareSuccess(true)
      setTimeout(() => setShareSuccess(false), 2000)
      
      if (user) {
        await shareUserProgress('copy', { type: shareType, content: shareContent })
      }
    } catch (error) {
      console.error('Copy failed:', error)
    }
  }

  const downloadImage = async (dataUrl, filename) => {
    const link = document.createElement('a')
    link.download = filename
    link.href = dataUrl
    link.click()
  }

  if (!user) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
        <p className="text-yellow-800">Create an account to share your achievements and progress!</p>
        <button className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
          Create Account
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          📢 Share Your Progress
        </h3>
        <p className="text-gray-600">
          Show off your football learning achievements and inspire others!
        </p>
      </div>

      {/* Share Type Selector */}
      {!achievement && !lesson && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { id: 'achievement', label: '🏆 Achievement', desc: 'Latest badge' },
            { id: 'streak', label: '🔥 Streak', desc: `${user.progress.stats.currentStreak} days` },
            { id: 'level-up', label: '📈 Level', desc: user.progress.stats.currentLevel.replace('-level', '') },
            { id: 'custom', label: '📝 Custom', desc: 'Your message' }
          ].map(type => (
            <button
              key={type.id}
              onClick={() => setShareType(type.id)}
              className={`p-3 rounded-lg border-2 transition-all text-center ${
                shareType === type.id
                  ? 'bg-sage-100 border-sage-400'
                  : 'bg-gray-50 border-gray-200 hover:border-sage-300'
              }`}
            >
              <div className="text-sm font-medium mb-1">{type.label}</div>
              <div className="text-xs text-gray-600">{type.desc}</div>
            </button>
          ))}
        </div>
      )}

      {/* Preview */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-900 mb-3">Preview</h4>
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          {shareContent.image && (
            <img 
              src={shareContent.image} 
              alt="Share preview" 
              className="w-full max-w-md mx-auto mb-4 rounded-lg shadow-sm"
            />
          )}
          <h5 className="font-bold text-gray-900 mb-2">{shareContent.title}</h5>
          <p className="text-gray-700 mb-3">{shareContent.text}</p>
          <div className="flex flex-wrap gap-2">
            {shareContent.hashtags.map(tag => (
              <span key={tag} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Share Buttons */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Share On</h4>
        
        {/* Native Share */}
        {navigator.share && (
          <button
            onClick={handleNativeShare}
            disabled={isSharing}
            className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:shadow-md transition-all disabled:opacity-50"
          >
            <span className="flex items-center">
              <span className="text-xl mr-3">📤</span>
              Share (Native)
            </span>
            <span className="text-sm opacity-90">Use device sharing</span>
          </button>
        )}

        {/* Social Platforms */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(platformConfigs).map(([platform, config]) => (
            <button
              key={platform}
              onClick={() => handleShare(platform)}
              disabled={isSharing}
              className={`flex items-center justify-center p-3 text-white rounded-lg transition-colors disabled:opacity-50 ${config.color}`}
            >
              <span className="mr-2">{config.icon}</span>
              {config.name}
            </button>
          ))}
        </div>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          disabled={isSharing}
          className={`w-full flex items-center justify-center p-3 rounded-lg transition-all disabled:opacity-50 ${
            shareSuccess 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <span className="mr-2">{shareSuccess ? '✅' : '📋'}</span>
          {shareSuccess ? 'Copied to Clipboard!' : 'Copy Link'}
        </button>
      </div>

      {/* Benefits */}
      <div className="mt-6 p-4 bg-gradient-to-r from-sage-50 to-blush-50 rounded-lg border border-sage-200">
        <h5 className="font-bold text-gray-900 mb-2">🎁 Why Share?</h5>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Inspire friends to learn about football</li>
          <li>• Build accountability for your learning</li>
          <li>• Celebrate your achievements</li>
          <li>• Help grow the learning community</li>
          {user.progress.achievements.socialInteractions.length >= 5 ? (
            <li className="text-green-700 font-medium">• You've earned the "Social Butterfly" badge! 🦋</li>
          ) : (
            <li>• Share {5 - user.progress.achievements.socialInteractions.length} more times to earn "Social Butterfly" badge!</li>
          )}
          <li>• Unlock exclusive community challenges by sharing</li>
          <li>• Featured achievements get highlighted in community</li>
        </ul>
      </div>

      {/* User Stats Summary */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Your Progress: {user.progress.lessons.completed.length} lessons • {user.progress.stats.currentStreak} day streak • {user.progress.stats.currentLevel.replace('-level', '')} level
      </div>
    </div>
  )
}