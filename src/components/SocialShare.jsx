import React, { useState } from 'react'
import { getProgressData } from '../utils/progressTracker'
import { badges } from '../data/achievements'

const SocialShare = () => {
  const [progress] = useState(getProgressData())
  const [shareType, setShareType] = useState('achievement')
  const [copiedToClipboard, setCopiedToClipboard] = useState(false)
  
  // Generate shareable content
  const generateShareContent = () => {
    const baseUrl = window.location.origin
    
    switch (shareType) {
      case 'achievement':
        const latestBadge = progress.badges.earned[progress.badges.earned.length - 1]
        const badge = latestBadge ? badges[latestBadge.badgeId] : null
        return {
          title: badge ? `🏆 Just earned the "${badge.name}" badge!` : '🏆 Learning football with Kickoff Club!',
          text: badge 
            ? `I just earned the "${badge.name}" badge on Kickoff Club! ${badge.description}` 
            : 'Join me in learning football football the fun way!',
          hashtags: ['football', 'Learning', 'KickoffClub', 'Achievement'],
          emoji: badge?.icon || '🏈'
        }
        
      case 'streak':
        return {
          title: `🔥 ${progress.stats.currentStreak} day learning streak!`,
          text: `I'm on a ${progress.stats.currentStreak} day learning streak on Kickoff Club! Learning football football has never been this fun.`,
          hashtags: ['LearningStreak', 'football', 'KickoffClub', 'Consistency'],
          emoji: '🔥'
        }
        
      case 'progress':
        return {
          title: `📚 Level ${Math.floor(progress.stats.totalPoints / 100)} football Expert!`,
          text: `I've completed ${progress.lessons.completed.length} lessons and earned ${progress.stats.totalPoints} points on Kickoff Club!`,
          hashtags: ['footballExpert', 'Learning', 'KickoffClub', 'Progress'],
          emoji: '📈'
        }
        
      case 'quiz':
        const perfectCount = progress.quizzes.perfect?.length || 0
        return {
          title: `🎯 ${perfectCount} Perfect Quiz Scores!`,
          text: `Aced ${perfectCount} quizzes on Kickoff Club! Testing my football knowledge and crushing it.`,
          hashtags: ['QuizMaster', 'football', 'KickoffClub', 'Perfect'],
          emoji: '💯'
        }
        
      default:
        return {
          title: '🏈 Learning football with Kickoff Club!',
          text: 'Join me in learning football football the fun and interactive way!',
          hashtags: ['football', 'Learning', 'KickoffClub'],
          emoji: '🏈'
        }
    }
  }
  
  const shareContent = generateShareContent()
  const shareUrl = window.location.href
  
  // Social platform share URLs
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareContent.title + ' - ' + shareContent.text)}&hashtags=${shareContent.hashtags.join(',')}&url=${encodeURIComponent(shareUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareContent.text)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareContent.title)}&summary=${encodeURIComponent(shareContent.text)}`,
    reddit: `https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareContent.title)}`,
    email: `mailto:?subject=${encodeURIComponent(shareContent.title)}&body=${encodeURIComponent(shareContent.text + '\n\nCheck it out: ' + shareUrl)}`
  }
  
  const handleShare = (platform) => {
    if (platform === 'copy') {
      const textToCopy = `${shareContent.title}

${shareContent.text}

${shareUrl}`
      navigator.clipboard.writeText(textToCopy).then(() => {
        setCopiedToClipboard(true)
        setTimeout(() => setCopiedToClipboard(false), 2000)
      })
    } else if (platform === 'native' && navigator.share) {
      navigator.share({
        title: shareContent.title,
        text: shareContent.text,
        url: shareUrl
      })
    } else {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400')
    }
  }
  
  // Generate achievement card
  const generateAchievementCard = () => {
    const latestBadges = progress.badges.earned.slice(-3).reverse()
    
    return (
      <div className="bg-gradient-to-br from-sage-50 to-blush-50 rounded-lg p-4 border border-sage-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <span className="text-3xl mr-3">{shareContent.emoji}</span>
            <div>
              <h5 className="font-bold text-navy">My football Learning Journey</h5>
              <p className="text-xs text-gray-600">@{progress.user?.name || 'footballLearner'}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-warmGold">{progress.stats.totalPoints}</div>
            <div className="text-xs text-gray-600">Total Points</div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-3 text-center">
          <div className="bg-white rounded p-2">
            <div className="text-lg font-bold text-sage-600">{progress.lessons.completed.length}</div>
            <div className="text-xs text-gray-600">Lessons</div>
          </div>
          <div className="bg-white rounded p-2">
            <div className="text-lg font-bold text-blush-600">{progress.stats.currentStreak}</div>
            <div className="text-xs text-gray-600">Streak</div>
          </div>
          <div className="bg-white rounded p-2">
            <div className="text-lg font-bold text-navy">{progress.badges.earned.length}</div>
            <div className="text-xs text-gray-600">Badges</div>
          </div>
        </div>
        
        {latestBadges.length > 0 && (
          <div className="bg-white rounded p-2">
            <div className="text-xs text-gray-600 mb-1">Recent Badges</div>
            <div className="flex gap-2">
              {latestBadges.map(earned => {
                const badge = badges[earned.badgeId]
                return badge ? (
                  <span key={earned.badgeId} className="text-xl" title={badge.name}>
                    {badge.icon}
                  </span>
                ) : null
              })}
            </div>
          </div>
        )}
      </div>
    )
  }
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-sage-200">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-secondary-100 mb-2">
          🌐 Share Your Progress
        </h3>
        <p className="text-secondary-300">
          Celebrate your achievements and inspire others to learn
        </p>
      </div>
      
      {/* Share Type Selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {[
          { id: 'achievement', label: '🏆 Achievement', desc: 'Latest badge earned' },
          { id: 'streak', label: '🔥 Streak', desc: `${progress.stats.currentStreak} days` },
          { id: 'progress', label: '📈 Progress', desc: `Level ${Math.floor(progress.stats.totalPoints / 100)}` },
          { id: 'quiz', label: '💯 Quiz Score', desc: `${progress.quizzes.perfect?.length || 0} perfect` }
        ].map(type => (
          <button
            key={type.id}
            onClick={() => setShareType(type.id)}
            className={`p-3 rounded-lg border-2 transition-all ${
              shareType === type.id
                ? 'bg-sage-100 border-sage-400'
                : 'bg-gray-50 border-gray-200 hover:border-sage-300'
            }`}
          >
            <div className="text-lg mb-1">{type.label}</div>
            <div className="text-xs text-gray-600">{type.desc}</div>
          </button>
        ))}
      </div>
      
      {/* Preview Card */}
      <div className="mb-6">
        <h4 className="font-bold text-navy mb-3">Preview</h4>
        {generateAchievementCard()}
      </div>
      
      {/* Share Message */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h5 className="font-medium text-navy mb-2">{shareContent.title}</h5>
        <p className="text-sm text-gray-700 mb-3">{shareContent.text}</p>
        <div className="flex flex-wrap gap-2">
          {shareContent.hashtags.map(tag => (
            <span key={tag} className="text-xs px-2 py-1 bg-sage-100 text-sage-700 rounded">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      
      {/* Share Buttons */}
      <div className="space-y-3">
        <h5 className="font-bold text-navy">Share On</h5>
        
        {/* Native Share (if available) */}
        {navigator.share && (
          <button
            onClick={() => handleShare('native')}
            className="w-full flex items-center justify-between p-3 bg-gradient-to-r from-sage-500 to-blush-500 text-white rounded-lg hover:shadow-md transition-all"
          >
            <span className="flex items-center">
              <span className="text-xl mr-3">📤</span>
              Share
            </span>
            <span className="text-sm opacity-90">Use device sharing</span>
          </button>
        )}
        
        {/* Social Platforms */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button
            onClick={() => handleShare('twitter')}
            className="flex items-center justify-center p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            <span className="mr-2">🐦</span> Twitter
          </button>
          
          <button
            onClick={() => handleShare('facebook')}
            className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="mr-2">📘</span> Facebook
          </button>
          
          <button
            onClick={() => handleShare('linkedin')}
            className="flex items-center justify-center p-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
          >
            <span className="mr-2">💼</span> LinkedIn
          </button>
          
          <button
            onClick={() => handleShare('reddit')}
            className="flex items-center justify-center p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            <span className="mr-2">🤖</span> Reddit
          </button>
          
          <button
            onClick={() => handleShare('email')}
            className="flex items-center justify-center p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <span className="mr-2">✉️</span> Email
          </button>
          
          <button
            onClick={() => handleShare('copy')}
            className={`flex items-center justify-center p-3 rounded-lg transition-all ${
              copiedToClipboard
                ? 'bg-green-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <span className="mr-2">{copiedToClipboard ? '✅' : '📋'}</span>
            {copiedToClipboard ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      
      {/* Sharing Benefits */}
      <div className="mt-6 p-4 bg-warmGold bg-opacity-10 rounded-lg border border-warmGold">
        <h5 className="font-bold text-navy mb-2">🎁 Sharing Benefits</h5>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• Inspire friends to learn about football</li>
          <li>• Track and celebrate your milestones</li>
          <li>• Build a learning community</li>
          <li>• Earn the "Social Butterfly" badge after 5 shares!</li>
        </ul>
      </div>
    </div>
  )
}

export default SocialShare