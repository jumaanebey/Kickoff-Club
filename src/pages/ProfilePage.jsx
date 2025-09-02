import React, { useState } from 'react'
import { loadProgress, getUserStats, exportProgress, resetProgress } from '../utils/progressTracker'
import { getLevelByPoints, badges } from '../data/lessonsIndex'

export default function ProfilePage() {
  const [progress, setProgress] = useState(loadProgress())
  const [activeTab, setActiveTab] = useState('overview')
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportData, setExportData] = useState('')

  const userStats = getUserStats(progress)
  const currentLevel = getLevelByPoints(progress.stats.totalPoints)

  const handleExportProgress = () => {
    const exported = exportProgress(progress)
    setExportData(exported)
    setShowExportModal(true)
  }

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      const resetData = resetProgress()
      setProgress(resetData)
    }
  }

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'badges', name: 'Badges', icon: '🏆' },
    { id: 'stats', name: 'Statistics', icon: '📈' },
    { id: 'settings', name: 'Settings', icon: '⚙️' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary-100 to-secondary-200 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex items-center">
            <div className="w-20 h-20 bg-accent-500 rounded-full flex items-center justify-center text-2xl font-bold mr-6">
              {progress.user.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">{progress.user.name}</h1>
              <div className="flex items-center mb-2">
                <div className="w-6 h-6 bg-accent-500 rounded-full flex items-center justify-center mr-2">
                  <span className="text-white text-sm font-bold">{Math.floor(progress.stats.totalPoints / 100) + 1}</span>
                </div>
                <span className="text-blush-200 font-medium">{currentLevel.name}</span>
              </div>
              <p className="text-blush-200">
                Member since {new Date(progress.user.joinDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-accent-500 text-accent-600'
                    : 'border-transparent text-secondary-300 hover:text-secondary-200 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="card text-center">
                <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🎯</span>
                </div>
                <div className="text-2xl font-bold text-secondary-100 mb-1">
                  {progress.stats.totalPoints}
                </div>
                <p className="text-sm text-secondary-300">Total Points</p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📚</span>
                </div>
                <div className="text-2xl font-bold text-secondary-100 mb-1">
                  {progress.lessons.completed.length}
                </div>
                <p className="text-sm text-secondary-300">Lessons Completed</p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🏆</span>
                </div>
                <div className="text-2xl font-bold text-secondary-100 mb-1">
                  {progress.badges.earned.length}
                </div>
                <p className="text-sm text-secondary-300">Badges Earned</p>
              </div>

              <div className="card text-center">
                <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🔥</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {progress.stats.currentStreak}
                </div>
                <p className="text-sm text-blush-200">Day Streak</p>
              </div>
            </div>

            {/* Current Level Progress */}
            <div className="card">
              <h3 className="text-xl font-semibold text-secondary-100 mb-4">Level Progress</h3>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-accent-600 font-bold text-xl">{Math.floor(progress.stats.totalPoints / 100) + 1}</span>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-secondary-100">{currentLevel.name}</span>
                    <span className="text-sm text-secondary-300">
                      {progress.stats.totalPoints} / {currentLevel.pointsToNext ? currentLevel.pointsRequired + currentLevel.pointsToNext : '∞'} pts
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-accent-500 h-3 rounded-full transition-all duration-300"
                      style={{ 
                        width: currentLevel.pointsToNext 
                          ? `${((progress.stats.totalPoints - currentLevel.pointsRequired) / currentLevel.pointsToNext) * 100}%`
                          : '100%'
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <p className="text-secondary-200">{currentLevel.description}</p>
            </div>

            {/* Recent Activity */}
            <div className="card">
              <h3 className="text-xl font-semibold text-secondary-100 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {progress.lessons.completed.slice(-3).map((lessonId, index) => (
                  <div key={index} className="flex items-center p-3 bg-primary-50 rounded-lg">
                    <div className="w-8 h-8 bg-accent-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-secondary-100">Completed "{lessonId.replace('-', ' ')}"</p>
                      <p className="text-sm text-secondary-300">Earned 10 points</p>
                    </div>
                  </div>
                ))}
                
                {progress.lessons.completed.length === 0 && (
                  <p className="text-center text-secondary-300 py-8">
                    No activity yet. Start your first lesson to see progress here!
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-secondary-100 mb-2">Your Badge Collection</h2>
              <p className="text-secondary-200">
                Earn badges by completing lessons and mastering NFL concepts
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {badges.map((badge) => {
                const isEarned = progress.badges.earned.includes(badge.id)
                
                return (
                  <div
                    key={badge.id}
                    className={`card text-center transition-all duration-200 ${
                      isEarned ? 'bg-gradient-to-br from-white to-accent-50 border-accent-200' : 'opacity-60'
                    }`}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl ${
                      isEarned ? 'bg-accent-100' : 'bg-gray-100'
                    }`}>
                      {isEarned ? badge.icon : '🔒'}
                    </div>
                    <h3 className={`font-semibold mb-2 ${isEarned ? 'text-secondary-100' : 'text-gray-400'}`}>
                      {badge.name}
                    </h3>
                    <p className={`text-sm ${isEarned ? 'text-secondary-200' : 'text-gray-400'}`}>
                      {badge.description}
                    </p>
                    {isEarned && (
                      <div className="mt-3 inline-block px-2 py-1 bg-accent-100 text-accent-700 text-xs rounded-full">
                        {badge.rarity}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-xl font-semibold text-secondary-100 mb-4">Account Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-100 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={progress.user.name}
                    className="input"
                    placeholder="Enter your name"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-semibold text-secondary-100 mb-4">Progress Management</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-secondary-100 mb-2">Export Progress</h4>
                  <p className="text-sm text-secondary-300 mb-3">
                    Create a backup of your learning progress and achievements
                  </p>
                  <button onClick={handleExportProgress} className="btn-secondary">
                    Export Data
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-rose-600 mb-2">Reset Progress</h4>
                  <p className="text-sm text-secondary-300 mb-3">
                    This will permanently delete all your progress, badges, and statistics
                  </p>
                  <button onClick={handleResetProgress} className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-xl font-medium transition-colors">
                    Reset All Progress
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-gray-900/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-secondary-100 mb-4">Export Progress</h3>
            <p className="text-sm text-secondary-300 mb-4">
              Copy this code to backup your progress. You can import it later to restore your data.
            </p>
            <textarea
              value={exportData}
              readOnly
              className="w-full h-24 p-3 border border-gray-200 rounded-lg text-xs bg-gray-50"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowExportModal(false)}
                className="btn-secondary text-sm"
              >
                Close
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(exportData)}
                className="btn-primary text-sm"
              >
                Copy Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}