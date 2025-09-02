// User progress tracking with localStorage
import { getLessonById, getBadgeById, getLevelByPoints, pointSources } from '../data/lessonsIndex.js'

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
    personalBests: {} // { category: value }
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
      achievements: { ...defaultProgress.achievements, ...progress.achievements }
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
  const badges = getBadgeById() // This will need updating when we have the full badge system
  // Badge checking logic will be implemented when we integrate with the badge system
  
  saveProgress(progress)
  return progress
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