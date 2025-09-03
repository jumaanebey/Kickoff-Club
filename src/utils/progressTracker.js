// User progress tracking with localStorage
import { getLessonById, getBadgeById, getLevelByPoints, pointSources } from '../data/lessonsIndex.js'
import { badges, checkBadgeRequirement, getNextBadgeRecommendations } from '../data/achievements.js'

const STORAGE_KEY = 'kickoff-club-progress'

// Default user progress structure
const defaultProgress = {
  user: {
    id: null,
    name: 'New Fan',
    joinDate: new Date().toISOString(),
    lastActive: new Date().toISOString()
  },
  stats: {
    totalPoints: 0,
    currentLevel: 'rookie-level',
    currentStreak: 0,
    longestStreak: 0,
    lastLoginDate: new Date().toISOString().split('T')[0]
  },
  lessons: {
    completed: [], // lesson IDs
    inProgress: {}, // { lessonId: { progress: 0.5, lastAccess: timestamp } }
    bookmarked: [], // lesson IDs
    timeSpent: {} // { lessonId: seconds }
  },
  quizzes: {
    attempted: {}, // { quizId: { attempts: 3, bestScore: 85, lastAttempt: timestamp } }
    perfect: [], // quiz IDs with 100% scores
    totalAttempts: 0
  },
  badges: {
    earned: [], // badge IDs with timestamps
    progress: {} // { badgeId: { progress: 0.6, requirements: {...} } }
  },
  achievements: {
    streakRecords: [],
    milestones: [], // special achievement records
    personalBests: {}, // { category: value }
    perfectQuizStreak: 0, // consecutive perfect quiz scores
    timeBasedLearning: { lateNight: false, earlyMorning: false },
    interactiveUsage: { fieldDiagram: false, scoringSimulator: false, scenarios: false },
    sessionRecords: { maxLessonsInSession: 0, currentSession: 0 }
  },
  tracks: {
    completed: [],
    inProgress: {},
    unlocked: []
  }
}

// Load progress from localStorage
export const loadProgress = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return defaultProgress
    
    const progress = JSON.parse(saved)
    
    // Merge with default structure to handle new fields
    return {
      ...defaultProgress,
      ...progress,
      user: { ...defaultProgress.user, ...progress.user },
      stats: { ...defaultProgress.stats, ...progress.stats },
      lessons: { ...defaultProgress.lessons, ...progress.lessons },
      quizzes: { ...defaultProgress.quizzes, ...progress.quizzes },
      badges: { ...defaultProgress.badges, ...progress.badges },
      achievements: { ...defaultProgress.achievements, ...progress.achievements },
      tracks: { ...defaultProgress.tracks, ...progress.tracks }
    }
  } catch (error) {
    console.error('Failed to load progress:', error)
    return defaultProgress
  }
}

// Save progress to localStorage
export const saveProgress = (progress) => {
  try {
    progress.user.lastActive = new Date().toISOString()
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (error) {
    console.error('Failed to save progress:', error)
  }
}

// Award points and update level
export const awardPoints = (progress, points, source) => {
  progress.stats.totalPoints += points
  
  // Check for level up
  const newLevel = getLevelByPoints(progress.stats.totalPoints)
  if (newLevel.id !== progress.stats.currentLevel) {
    progress.stats.currentLevel = newLevel.id
    // Trigger level up celebration
    return { ...progress, levelUp: newLevel }
  }
  
  return progress
}

// Complete a lesson
export const completeLesson = (progress, lessonId, timeSpent = 0) => {
  if (!progress.lessons.completed.includes(lessonId)) {
    progress.lessons.completed.push(lessonId)
    
    // Award points
    let points = pointSources.lessonCompleted
    
    // Bonus for first completion
    if (progress.lessons.completed.length === 1) {
      points += pointSources.firstTry
    }
    
    progress = awardPoints(progress, points, 'lessonCompleted')
  }
  
  // Track time spent
  progress.lessons.timeSpent[lessonId] = (progress.lessons.timeSpent[lessonId] || 0) + timeSpent
  
  // Remove from in progress
  delete progress.lessons.inProgress[lessonId]
  
  saveProgress(progress)
  return progress
}

// Complete a quiz
export const completeQuiz = (progress, quizId, score) => {
  const quizData = progress.quizzes.attempted[quizId] || { attempts: 0, bestScore: 0 }
  
  quizData.attempts += 1
  quizData.lastAttempt = new Date().toISOString()
  
  if (score > quizData.bestScore) {
    quizData.bestScore = score
  }
  
  progress.quizzes.attempted[quizId] = quizData
  progress.quizzes.totalAttempts += 1
  
  // Award points
  let points = pointSources.quizPassed
  
  // Perfect score bonus
  if (score === 100) {
    points = pointSources.perfectQuiz
    if (!progress.quizzes.perfect.includes(quizId)) {
      progress.quizzes.perfect.push(quizId)
    }
  }
  
  progress = awardPoints(progress, points, 'quizCompleted')
  
  saveProgress(progress)
  return progress
}

// Check and award badges
export const checkBadgeProgress = (progress) => {
  const newBadges = []
  
  // Check all badges for new achievements
  Object.values(badges).forEach(badge => {
    const alreadyEarned = progress.badges.earned.some(earned => earned.badgeId === badge.id)
    
    if (!alreadyEarned && checkBadgeRequirement(progress, badge)) {
      const earnedBadge = {
        badgeId: badge.id,
        earnedAt: new Date().toISOString(),
        points: badge.points
      }
      
      progress.badges.earned.push(earnedBadge)
      progress = awardPoints(progress, badge.points, 'badgeEarned')
      newBadges.push(badge)
    }
  })
  
  saveProgress(progress)
  return { ...progress, newBadges }
}

// Update daily streak
export const updateStreak = (progress) => {
  const today = new Date().toISOString().split('T')[0]
  const lastLogin = progress.stats.lastLoginDate
  
  if (lastLogin !== today) {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split('T')[0]
    
    if (lastLogin === yesterdayStr) {
      // Continue streak
      progress.stats.currentStreak += 1
    } else {
      // Reset streak
      progress.stats.currentStreak = 1
    }
    
    // Update longest streak
    if (progress.stats.currentStreak > progress.stats.longestStreak) {
      progress.stats.longestStreak = progress.stats.currentStreak
    }
    
    // Award daily login points
    progress = awardPoints(progress, pointSources.dailyLogin, 'dailyLogin')
    
    progress.stats.lastLoginDate = today
    saveProgress(progress)
  }
  
  return progress
}

// Get user stats for dashboard
export const getUserStats = (progress) => {
  return {
    level: getLevelByPoints(progress.stats.totalPoints),
    points: progress.stats.totalPoints,
    streak: progress.stats.currentStreak,
    lessonsCompleted: progress.lessons.completed.length,
    badgesEarned: progress.badges.earned.length,
    perfectQuizzes: progress.quizzes.perfect.length,
    totalQuizAttempts: progress.quizzes.totalAttempts
  }
}

// Check if lesson is unlocked
export const isLessonUnlocked = (progress, lessonId) => {
  const lesson = getLessonById(lessonId)
  if (!lesson) return false
  
  // Check prerequisites
  if (lesson.prerequisites && lesson.prerequisites.length > 0) {
    return lesson.prerequisites.every(prereq => 
      progress.lessons.completed.includes(prereq)
    )
  }
  
  return true
}

// Export progress for backup/sharing
export const exportProgress = (progress) => {
  return btoa(JSON.stringify(progress))
}

// Import progress from backup
export const importProgress = (exportedData) => {
  try {
    const progress = JSON.parse(atob(exportedData))
    saveProgress(progress)
    return progress
  } catch (error) {
    console.error('Failed to import progress:', error)
    return null
  }
}

// Reset all progress (with confirmation)
export const resetProgress = () => {
  localStorage.removeItem(STORAGE_KEY)
  return defaultProgress
}

// Track interactive component usage
export const trackInteractiveUsage = (progress, component, action = 'used') => {
  if (!progress.achievements.interactiveUsage) {
    progress.achievements.interactiveUsage = {}
  }
  
  progress.achievements.interactiveUsage[component] = true
  
  // Award points for first time usage
  progress = awardPoints(progress, 5, 'interactiveEngagement')
  
  saveProgress(progress)
  return checkBadgeProgress(progress)
}

// Track time-based learning patterns
export const trackLearningTime = (progress) => {
  const hour = new Date().getHours()
  
  if (!progress.achievements.timeBasedLearning) {
    progress.achievements.timeBasedLearning = {}
  }
  
  // Late night learning (midnight to 6 AM)
  if (hour >= 0 && hour < 6) {
    progress.achievements.timeBasedLearning.lateNight = true
  }
  
  // Early morning learning (5 AM to 7 AM)  
  if (hour >= 5 && hour < 7) {
    progress.achievements.timeBasedLearning.earlyMorning = true
  }
  
  saveProgress(progress)
  return checkBadgeProgress(progress)
}

// Track session length and lesson completion streaks
export const trackSessionProgress = (progress) => {
  if (!progress.achievements.sessionRecords) {
    progress.achievements.sessionRecords = { maxLessonsInSession: 0, currentSession: 0 }
  }
  
  progress.achievements.sessionRecords.currentSession += 1
  
  if (progress.achievements.sessionRecords.currentSession > progress.achievements.sessionRecords.maxLessonsInSession) {
    progress.achievements.sessionRecords.maxLessonsInSession = progress.achievements.sessionRecords.currentSession
    
    // Update personal bests
    if (!progress.achievements.personalBests) {
      progress.achievements.personalBests = {}
    }
    progress.achievements.personalBests.singleSession = progress.achievements.sessionRecords.maxLessonsInSession
  }
  
  saveProgress(progress)
  return checkBadgeProgress(progress)
}

// End session (call when user navigates away or after timeout)
export const endSession = (progress) => {
  if (progress.achievements.sessionRecords) {
    progress.achievements.sessionRecords.currentSession = 0
  }
  saveProgress(progress)
  return progress
}

// Track perfect quiz streak
export const trackPerfectQuizStreak = (progress, score) => {
  if (score === 100) {
    progress.achievements.perfectQuizStreak = (progress.achievements.perfectQuizStreak || 0) + 1
  } else {
    progress.achievements.perfectQuizStreak = 0
  }
  
  saveProgress(progress)
  return checkBadgeProgress(progress)
}

// Get badge recommendations for user
export const getProgressData = () => {
  const progress = loadProgress()
  return {
    ...progress,
    nextBadges: getNextBadgeRecommendations(progress),
    earnedBadgeDetails: progress.badges.earned.map(earned => ({
      ...earned,
      badge: badges[earned.badgeId]
    }))
  }
}

// Complete track
export const completeTrack = (progress, trackId) => {
  if (!progress.tracks.completed.includes(trackId)) {
    progress.tracks.completed.push(trackId)
    progress = awardPoints(progress, 100, 'trackCompleted')
  }
  
  saveProgress(progress)
  return checkBadgeProgress(progress)
}