// Enhanced Achievement and Badge System

export const achievementCategories = {
  learning: 'Learning Mastery',
  streaks: 'Consistency & Dedication',
  speed: 'Speed Learning',
  social: 'Community Engagement',
  completionist: 'Completionist',
  special: 'Special Recognition'
}

export const badgeRarities = {
  common: { color: 'text-gray-600', bg: 'bg-gray-100', border: 'border-gray-300' },
  uncommon: { color: 'text-green-600', bg: 'bg-green-100', border: 'border-green-300' },
  rare: { color: 'text-blue-600', bg: 'bg-blue-100', border: 'border-blue-300' },
  epic: { color: 'text-purple-600', bg: 'bg-purple-100', border: 'border-purple-300' },
  legendary: { color: 'text-yellow-600', bg: 'bg-yellow-100', border: 'border-yellow-400' }
}

export const badges = {
  // Learning Mastery Badges
  'first-lesson': {
    id: 'first-lesson',
    name: 'First Steps',
    description: 'Complete your first lesson',
    icon: '🏈',
    rarity: 'common',
    category: 'learning',
    requirements: { lessonsCompleted: 1 },
    points: 10
  },
  'lesson-streak-3': {
    id: 'lesson-streak-3',
    name: 'Getting Started',
    description: 'Complete 3 lessons in a row',
    icon: '📚',
    rarity: 'common', 
    category: 'learning',
    requirements: { lessonsCompleted: 3 },
    points: 25
  },
  'lesson-streak-5': {
    id: 'lesson-streak-5',
    name: 'Dedicated Student',
    description: 'Complete 5 lessons',
    icon: '🎓',
    rarity: 'uncommon',
    category: 'learning',
    requirements: { lessonsCompleted: 5 },
    points: 50
  },
  'perfect-quiz-streak': {
    id: 'perfect-quiz-streak',
    name: 'Perfectionist',
    description: 'Score 100% on 3 quizzes in a row',
    icon: '⭐',
    rarity: 'rare',
    category: 'learning',
    requirements: { perfectQuizStreak: 3 },
    points: 100
  },
  'all-basics': {
    id: 'all-basics',
    name: 'Fundamentals Master',
    description: 'Complete all basic rules lessons',
    icon: '🏆',
    rarity: 'epic',
    category: 'completionist',
    requirements: { categoryCompleted: 'basic-rules' },
    points: 200
  },

  // Streak & Consistency Badges
  'daily-streak-3': {
    id: 'daily-streak-3',
    name: 'Consistent Learner',
    description: 'Learn for 3 days in a row',
    icon: '🔥',
    rarity: 'common',
    category: 'streaks',
    requirements: { dailyStreak: 3 },
    points: 30
  },
  'daily-streak-7': {
    id: 'daily-streak-7',
    name: 'Weekly Warrior',
    description: 'Learn for 7 days straight',
    icon: '⚡',
    rarity: 'uncommon',
    category: 'streaks',
    requirements: { dailyStreak: 7 },
    points: 75
  },
  'daily-streak-30': {
    id: 'daily-streak-30',
    name: 'Month Master',
    description: 'Learn for 30 consecutive days',
    icon: '🌟',
    rarity: 'rare',
    category: 'streaks',
    requirements: { dailyStreak: 30 },
    points: 300
  },
  'daily-streak-100': {
    id: 'daily-streak-100',
    name: 'Century Club',
    description: 'Learn for 100 consecutive days',
    icon: '💎',
    rarity: 'legendary',
    category: 'streaks',
    requirements: { dailyStreak: 100 },
    points: 1000
  },

  // Speed Learning Badges
  'speed-learner': {
    id: 'speed-learner',
    name: 'Speed Demon',
    description: 'Complete a lesson in under 60 seconds',
    icon: '💨',
    rarity: 'uncommon',
    category: 'speed',
    requirements: { fastestLesson: 60 },
    points: 40
  },
  'quiz-master': {
    id: 'quiz-master',
    name: 'Quick Thinker',
    description: 'Answer a quiz question in under 5 seconds',
    icon: '🧠',
    rarity: 'rare',
    category: 'speed',
    requirements: { fastestQuiz: 5 },
    points: 60
  },
  'lesson-marathon': {
    id: 'lesson-marathon',
    name: 'Marathon Runner',
    description: 'Complete 5 lessons in one session',
    icon: '🏃‍♂️',
    rarity: 'epic',
    category: 'speed',
    requirements: { lessonSession: 5 },
    points: 150
  },

  // Completionist Badges
  'track-master': {
    id: 'track-master', 
    name: 'Track Champion',
    description: 'Complete an entire learning track',
    icon: '🛤️',
    rarity: 'rare',
    category: 'completionist',
    requirements: { trackCompleted: 1 },
    points: 250
  },
  'all-tracks': {
    id: 'all-tracks',
    name: 'Grand Slam',
    description: 'Complete all available learning tracks',
    icon: '👑',
    rarity: 'legendary',
    category: 'completionist',
    requirements: { allTracksCompleted: true },
    points: 500
  },
  'quiz-champion': {
    id: 'quiz-champion',
    name: 'Quiz Champion',
    description: 'Score 100% on 10 different quizzes',
    icon: '🎯',
    rarity: 'epic',
    category: 'completionist',
    requirements: { perfectQuizzes: 10 },
    points: 300
  },

  // Special Recognition Badges
  'early-adopter': {
    id: 'early-adopter',
    name: 'Early Adopter',
    description: 'One of the first 1000 users to join',
    icon: '🚀',
    rarity: 'legendary',
    category: 'special',
    requirements: { userId: 1000 }, // Special condition
    points: 100
  },
  'comeback-kid': {
    id: 'comeback-kid',
    name: 'Comeback Kid',
    description: 'Return after being away for 30+ days',
    icon: '💪',
    rarity: 'rare',
    category: 'special',
    requirements: { returnAfter: 30 },
    points: 80
  },
  'night-owl': {
    id: 'night-owl',
    name: 'Night Owl',
    description: 'Complete a lesson between midnight and 6 AM',
    icon: '🦉',
    rarity: 'uncommon',
    category: 'special',
    requirements: { lateNightLearning: true },
    points: 50
  },
  'early-bird': {
    id: 'early-bird',
    name: 'Early Bird',
    description: 'Complete a lesson between 5 AM and 7 AM',
    icon: '🐦',
    rarity: 'uncommon',
    category: 'special',
    requirements: { earlyMorningLearning: true },
    points: 50
  },

  // Interactive Feature Badges
  'interactive-explorer': {
    id: 'interactive-explorer',
    name: 'Interactive Explorer',
    description: 'Use all interactive field diagram features',
    icon: '🎮',
    rarity: 'rare',
    category: 'learning',
    requirements: { interactiveEngagement: true },
    points: 75
  },
  'scenario-master': {
    id: 'scenario-master',
    name: 'Strategic Mind',
    description: 'Complete all scenario challenges with A+ grades',
    icon: '♟️',
    rarity: 'epic',
    category: 'learning',
    requirements: { scenarioMastery: true },
    points: 200
  },
  'video-scholar': {
    id: 'video-scholar',
    name: 'Video Scholar',
    description: 'Watch complete video lessons with all interactions',
    icon: '📹',
    rarity: 'uncommon',
    category: 'learning',
    requirements: { videoEngagement: 5 },
    points: 60
  }
}

// Helper functions for checking badge requirements
export const checkBadgeRequirement = (progress, badge) => {
  const req = badge.requirements
  
  // Learning-based requirements
  if (req.lessonsCompleted && progress.lessons.completed.length >= req.lessonsCompleted) {
    return true
  }
  
  // Streak requirements
  if (req.dailyStreak && progress.stats.currentStreak >= req.dailyStreak) {
    return true
  }
  
  // Perfect quiz requirements
  if (req.perfectQuizzes && progress.quizzes.perfect.length >= req.perfectQuizzes) {
    return true
  }
  
  // Perfect quiz streak
  if (req.perfectQuizStreak) {
    // This would need more complex logic to track consecutive perfects
    return progress.achievements.perfectQuizStreak >= req.perfectQuizStreak
  }
  
  // Category completion
  if (req.categoryCompleted) {
    const categoryLessons = getLessonsByCategory(req.categoryCompleted)
    return categoryLessons.every(lessonId => 
      progress.lessons.completed.includes(lessonId)
    )
  }
  
  // Speed requirements
  if (req.fastestLesson && progress.achievements.personalBests?.fastestLesson <= req.fastestLesson) {
    return true
  }
  
  if (req.fastestQuiz && progress.achievements.personalBests?.fastestQuiz <= req.fastestQuiz) {
    return true
  }
  
  // Session requirements
  if (req.lessonSession && progress.achievements.personalBests?.singleSession >= req.lessonSession) {
    return true
  }
  
  // Track completion
  if (req.trackCompleted && progress.tracks?.completed >= req.trackCompleted) {
    return true
  }
  
  // Special time-based requirements
  if (req.lateNightLearning && progress.achievements.timeBasedLearning?.lateNight) {
    return true
  }
  
  if (req.earlyMorningLearning && progress.achievements.timeBasedLearning?.earlyMorning) {
    return true
  }
  
  // Interactive engagement
  if (req.interactiveEngagement && progress.achievements.interactiveUsage?.fieldDiagram && 
      progress.achievements.interactiveUsage?.scoringSimulator) {
    return true
  }
  
  return false
}

// Get all available badges in a category
export const getBadgesByCategory = (category) => {
  return Object.values(badges).filter(badge => badge.category === category)
}

// Get all badges by rarity
export const getBadgesByRarity = (rarity) => {
  return Object.values(badges).filter(badge => badge.rarity === rarity)
}

// Calculate total possible points
export const getTotalPossiblePoints = () => {
  return Object.values(badges).reduce((total, badge) => total + badge.points, 0)
}

// Get next badge recommendations
export const getNextBadgeRecommendations = (progress, limit = 3) => {
  const unearned = Object.values(badges).filter(badge => 
    !progress.badges.earned.some(earned => earned.badgeId === badge.id)
  )
  
  // Sort by how close user is to earning them (simplified)
  return unearned
    .filter(badge => {
      // Only show badges that are reasonably achievable
      const req = badge.requirements
      if (req.lessonsCompleted && req.lessonsCompleted <= progress.lessons.completed.length + 3) return true
      if (req.dailyStreak && req.dailyStreak <= progress.stats.currentStreak + 7) return true
      if (req.perfectQuizzes && req.perfectQuizzes <= progress.quizzes.perfect.length + 3) return true
      return false
    })
    .sort((a, b) => {
      // Prioritize by points (higher value badges first, but achievable ones)
      return b.points - a.points
    })
    .slice(0, limit)
}

// Helper to get lessons by category (this would integrate with the lessons system)
const getLessonsByCategory = (category) => {
  switch (category) {
    case 'basic-rules':
      return ['how-downs-work', 'scoring-touchdowns', 'field-layout-basics']
    case 'positions':
      return ['quarterback-101', 'special-teams-basics']
    case 'strategy':
      return ['timeouts-and-clock']
    case 'advanced-rules':
      return ['understanding-penalties']
    default:
      return []
  }
}