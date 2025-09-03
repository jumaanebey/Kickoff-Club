// Enhanced user account and progress persistence system
import { loadProgress, saveProgress } from './progressTracker.js'

export class UserAccountManager {
  constructor() {
    this.currentUser = null
    this.isOnline = navigator.onLine
    this.syncQueue = []
    this.autoSaveInterval = null
    
    this.initializeEventListeners()
    this.startAutoSync()
  }

  initializeEventListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true
      this.processSyncQueue()
    })
    
    window.addEventListener('offline', () => {
      this.isOnline = false
    })

    // Save before page unload
    window.addEventListener('beforeunload', () => {
      this.saveCurrentProgress(true) // Synchronous save
    })
  }

  startAutoSync() {
    // Auto-save every 30 seconds
    this.autoSaveInterval = setInterval(() => {
      if (this.currentUser) {
        this.saveCurrentProgress()
      }
    }, 30000)
  }

  // Create new user account
  async createAccount(userData) {
    const userId = this.generateUserId()
    const newUser = {
      id: userId,
      email: userData.email,
      username: userData.username || `learner_${userId.slice(0, 8)}`,
      createdAt: new Date().toISOString(),
      profile: {
        displayName: userData.displayName || userData.username,
        favoriteTeam: userData.favoriteTeam || null,
        experienceLevel: userData.experienceLevel || 'beginner',
        learningGoals: userData.learningGoals || [],
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      },
      settings: {
        notifications: true,
        autoplay: true,
        theme: 'light',
        difficulty: 'adaptive',
        privacy: {
          shareProgress: false,
          publicProfile: false
        }
      },
      progress: {
        lessons: {
          completed: [],
          inProgress: {},
          completedDates: {}
        },
        quizzes: {
          attempted: {},
          perfect: []
        },
        tracks: {
          started: [],
          completed: [],
          current: null
        },
        badges: {
          earned: [],
          progress: {}
        },
        stats: {
          totalPoints: 0,
          currentStreak: 0,
          longestStreak: 0,
          totalTimeSpent: 0,
          currentLevel: 'rookie-level',
          joinDate: new Date().toISOString(),
          lastActiveDate: new Date().toISOString()
        },
        achievements: {
          milestones: [],
          personalBests: {},
          socialInteractions: []
        }
      },
      social: {
        friends: [],
        groups: [],
        shareableStats: {
          totalLessons: 0,
          favoriteCategory: null,
          currentStreak: 0
        }
      }
    }

    await this.saveUserData(newUser)
    this.currentUser = newUser
    return newUser
  }

  // Login existing user
  async loginUser(credentials) {
    try {
      // In a real app, this would authenticate with a server
      const userData = await this.loadUserData(credentials.userId || credentials.email)
      
      if (userData) {
        this.currentUser = userData
        // Update last active date
        this.currentUser.progress.stats.lastActiveDate = new Date().toISOString()
        await this.saveUserData(this.currentUser)
        return userData
      }
      
      throw new Error('User not found')
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  // Load user data (from localStorage for now, would be API in production)
  async loadUserData(identifier) {
    try {
      const allUsers = JSON.parse(localStorage.getItem('kickoff_club_users') || '{}')
      
      // Find user by email, username, or ID
      const user = Object.values(allUsers).find(user => 
        user.email === identifier || 
        user.username === identifier || 
        user.id === identifier
      )
      
      return user || null
    } catch (error) {
      console.error('Failed to load user data:', error)
      return null
    }
  }

  // Save user data
  async saveUserData(userData) {
    try {
      const allUsers = JSON.parse(localStorage.getItem('kickoff_club_users') || '{}')
      allUsers[userData.id] = {
        ...userData,
        lastUpdated: new Date().toISOString()
      }
      
      localStorage.setItem('kickoff_club_users', JSON.stringify(allUsers))
      
      // Also save current user progress in the old format for compatibility
      if (this.currentUser && this.currentUser.id === userData.id) {
        saveProgress(userData.progress)
      }
      
      return true
    } catch (error) {
      console.error('Failed to save user data:', error)
      if (!this.isOnline) {
        this.addToSyncQueue('saveUser', userData)
      }
      return false
    }
  }

  // Update user progress
  async updateProgress(progressUpdate) {
    if (!this.currentUser) return false

    // Merge progress updates
    this.currentUser.progress = this.deepMerge(this.currentUser.progress, progressUpdate)
    this.currentUser.progress.stats.lastActiveDate = new Date().toISOString()
    
    return await this.saveUserData(this.currentUser)
  }

  // Add completed lesson
  async completeLesson(lessonId, lessonData) {
    if (!this.currentUser) return false

    const progress = this.currentUser.progress
    
    // Add to completed if not already there
    if (!progress.lessons.completed.includes(lessonId)) {
      progress.lessons.completed.push(lessonId)
      progress.lessons.completedDates[lessonId] = new Date().toISOString()
    }
    
    // Remove from in-progress
    delete progress.lessons.inProgress[lessonId]
    
    // Update stats
    progress.stats.totalPoints += lessonData.points || 10
    progress.stats.totalTimeSpent += lessonData.timeSpent || 0
    
    // Update streak
    this.updateStreak()
    
    // Check for level up
    await this.checkLevelUp()
    
    // Check for new badges
    await this.checkBadges()
    
    return await this.saveUserData(this.currentUser)
  }

  // Update learning streak
  updateStreak() {
    if (!this.currentUser) return

    const today = new Date().toDateString()
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    const lastActive = new Date(this.currentUser.progress.stats.lastActiveDate).toDateString()
    
    if (lastActive === today) {
      // Already counted today
      return
    } else if (lastActive === yesterday) {
      // Continuing streak
      this.currentUser.progress.stats.currentStreak++
    } else {
      // Streak broken, reset
      this.currentUser.progress.stats.currentStreak = 1
    }
    
    // Update longest streak
    if (this.currentUser.progress.stats.currentStreak > this.currentUser.progress.stats.longestStreak) {
      this.currentUser.progress.stats.longestStreak = this.currentUser.progress.stats.currentStreak
    }
  }

  // Check for level advancement
  async checkLevelUp() {
    if (!this.currentUser) return

    const points = this.currentUser.progress.stats.totalPoints
    const currentLevel = this.currentUser.progress.stats.currentLevel
    
    const levelThresholds = {
      'rookie-level': 0,
      'fan-level': 100,
      'enthusiast-level': 300,
      'expert-level': 600,
      'pro-level': 1000
    }
    
    let newLevel = currentLevel
    for (const [level, threshold] of Object.entries(levelThresholds)) {
      if (points >= threshold) {
        newLevel = level
      }
    }
    
    if (newLevel !== currentLevel) {
      this.currentUser.progress.stats.currentLevel = newLevel
      
      // Award level-up achievement
      this.currentUser.progress.achievements.milestones.push({
        type: 'level-up',
        level: newLevel,
        date: new Date().toISOString(),
        points: points
      })
      
      return newLevel
    }
    
    return null
  }

  // Check for new badges
  async checkBadges() {
    if (!this.currentUser) return []

    const newBadges = []
    const progress = this.currentUser.progress
    
    // Lesson completion badges
    if (progress.lessons.completed.length >= 5 && !this.hasBadge('lesson-learner')) {
      newBadges.push(this.awardBadge('lesson-learner', 'Completed 5 lessons'))
    }
    
    if (progress.lessons.completed.length >= 10 && !this.hasBadge('dedicated-student')) {
      newBadges.push(this.awardBadge('dedicated-student', 'Completed 10 lessons'))
    }
    
    // Streak badges
    if (progress.stats.currentStreak >= 7 && !this.hasBadge('week-warrior')) {
      newBadges.push(this.awardBadge('week-warrior', '7-day learning streak'))
    }
    
    if (progress.stats.currentStreak >= 30 && !this.hasBadge('month-master')) {
      newBadges.push(this.awardBadge('month-master', '30-day learning streak'))
    }
    
    // Perfect quiz badges
    if (progress.quizzes.perfect.length >= 3 && !this.hasBadge('quiz-ace')) {
      newBadges.push(this.awardBadge('quiz-ace', '3 perfect quiz scores'))
    }
    
    // Track completion badges
    if (progress.tracks.completed.length >= 1 && !this.hasBadge('track-finisher')) {
      newBadges.push(this.awardBadge('track-finisher', 'Completed first learning track'))
    }
    
    return newBadges
  }

  hasBadge(badgeId) {
    return this.currentUser.progress.badges.earned.some(badge => badge.badgeId === badgeId)
  }

  awardBadge(badgeId, reason) {
    const badge = {
      badgeId,
      earnedDate: new Date().toISOString(),
      reason,
      points: 50
    }
    
    this.currentUser.progress.badges.earned.push(badge)
    this.currentUser.progress.stats.totalPoints += badge.points
    
    return badge
  }

  // Social features
  async shareProgress(platform, content) {
    if (!this.currentUser) return false

    const shareData = {
      platform,
      content,
      timestamp: new Date().toISOString(),
      stats: {
        lessonsCompleted: this.currentUser.progress.lessons.completed.length,
        currentStreak: this.currentUser.progress.stats.currentStreak,
        currentLevel: this.currentUser.progress.stats.currentLevel,
        totalPoints: this.currentUser.progress.stats.totalPoints
      }
    }
    
    this.currentUser.progress.achievements.socialInteractions.push({
      type: 'share',
      ...shareData
    })
    
    return await this.saveUserData(this.currentUser)
  }

  // Export user data
  exportUserData() {
    if (!this.currentUser) return null

    return {
      exportDate: new Date().toISOString(),
      userData: this.currentUser,
      format: 'kickoff-club-v1'
    }
  }

  // Import user data
  async importUserData(importData) {
    try {
      if (importData.format !== 'kickoff-club-v1') {
        throw new Error('Unsupported data format')
      }
      
      this.currentUser = importData.userData
      await this.saveUserData(this.currentUser)
      return true
    } catch (error) {
      console.error('Import failed:', error)
      return false
    }
  }

  // Offline sync queue
  addToSyncQueue(action, data) {
    this.syncQueue.push({
      action,
      data,
      timestamp: Date.now()
    })
  }

  async processSyncQueue() {
    if (!this.isOnline || this.syncQueue.length === 0) return

    const queue = [...this.syncQueue]
    this.syncQueue = []
    
    for (const item of queue) {
      try {
        switch (item.action) {
          case 'saveUser':
            await this.saveUserData(item.data)
            break
          case 'updateProgress':
            await this.updateProgress(item.data)
            break
        }
      } catch (error) {
        console.error('Sync failed for item:', item, error)
        // Re-add to queue for retry
        this.syncQueue.push(item)
      }
    }
  }

  // Save current progress immediately
  saveCurrentProgress(synchronous = false) {
    if (!this.currentUser) return

    if (synchronous) {
      // Synchronous save for page unload
      try {
        localStorage.setItem(`kickoff_club_progress_${this.currentUser.id}`, 
          JSON.stringify(this.currentUser.progress))
      } catch (error) {
        console.error('Synchronous save failed:', error)
      }
    } else {
      return this.saveUserData(this.currentUser)
    }
  }

  // Utility functions
  generateUserId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
  }

  deepMerge(target, source) {
    const output = Object.assign({}, target)
    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] })
          } else {
            output[key] = this.deepMerge(target[key], source[key])
          }
        } else {
          Object.assign(output, { [key]: source[key] })
        }
      })
    }
    return output
  }

  isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item)
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser
  }

  // Logout
  async logout() {
    if (this.currentUser) {
      await this.saveCurrentProgress()
    }
    
    this.currentUser = null
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval)
    }
  }

  // Delete account
  async deleteAccount() {
    if (!this.currentUser) return false

    try {
      const allUsers = JSON.parse(localStorage.getItem('kickoff_club_users') || '{}')
      delete allUsers[this.currentUser.id]
      localStorage.setItem('kickoff_club_users', JSON.stringify(allUsers))
      
      // Clear current user
      this.currentUser = null
      return true
    } catch (error) {
      console.error('Account deletion failed:', error)
      return false
    }
  }
}

// Singleton instance
export const userAccountManager = new UserAccountManager()

// Convenience functions
export const createUserAccount = (userData) => userAccountManager.createAccount(userData)
export const loginUser = (credentials) => userAccountManager.loginUser(credentials)  
export const getCurrentUser = () => userAccountManager.getCurrentUser()
export const updateUserProgress = (progress) => userAccountManager.updateProgress(progress)
export const completeLesson = (lessonId, data) => userAccountManager.completeLesson(lessonId, data)
export const shareUserProgress = (platform, content) => userAccountManager.shareProgress(platform, content)
export const exportUserData = () => userAccountManager.exportUserData()
export const logoutUser = () => userAccountManager.logout()