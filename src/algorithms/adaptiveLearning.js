// Advanced adaptive learning algorithms with ML-inspired approaches
export class AdaptiveLearningEngine {
  constructor(userProgress) {
    this.progress = userProgress
    this.learningModel = new LearningModel()
    this.contentOptimizer = new ContentOptimizer()
    this.difficultyAdjuster = new DifficultyAdjuster()
  }

  // Calculate optimal next lesson using multiple factors
  getOptimalNextLesson(availableLessons) {
    const scoredLessons = availableLessons.map(lesson => ({
      ...lesson,
      score: this.calculateLessonScore(lesson)
    }))

    return scoredLessons.sort((a, b) => b.score - a.score)
  }

  calculateLessonScore(lesson) {
    const factors = {
      difficulty: this.difficultyAdjuster.getDifficultyScore(lesson, this.progress),
      engagement: this.learningModel.predictEngagement(lesson, this.progress),
      knowledge_gap: this.calculateKnowledgeGap(lesson),
      retention_timing: this.calculateOptimalReviewTiming(lesson),
      personal_interest: this.calculatePersonalInterest(lesson),
      completion_probability: this.predictCompletionProbability(lesson)
    }

    // Weighted combination of factors
    const weights = {
      difficulty: 0.25,
      engagement: 0.20,
      knowledge_gap: 0.20,
      retention_timing: 0.15,
      personal_interest: 0.10,
      completion_probability: 0.10
    }

    return Object.entries(factors).reduce(
      (total, [factor, value]) => total + (value * weights[factor]),
      0
    )
  }

  calculateKnowledgeGap(lesson) {
    const prerequisites = lesson.prerequisites || []
    const relatedCompleted = this.progress.lessons.completed.filter(completed =>
      prerequisites.includes(completed) || 
      this.areTopicsRelated(lesson.topics, this.getLessonById(completed)?.topics)
    )

    const knowledgeRatio = relatedCompleted.length / Math.max(prerequisites.length, 1)
    return Math.max(0, 1 - knowledgeRatio) // Higher score for bigger knowledge gaps
  }

  calculateOptimalReviewTiming(lesson) {
    if (!this.progress.lessons.completed.includes(lesson.id)) {
      return 0.5 // Neutral for new lessons
    }

    const completedDate = this.progress.lessons.completedDates?.[lesson.id]
    if (!completedDate) return 0.2

    const daysSinceCompletion = (Date.now() - new Date(completedDate).getTime()) / (1000 * 60 * 60 * 24)
    
    // Optimal review intervals based on spaced repetition
    const optimalIntervals = [1, 3, 7, 14, 30, 60]
    
    const closestInterval = optimalIntervals.reduce((prev, current) =>
      Math.abs(current - daysSinceCompletion) < Math.abs(prev - daysSinceCompletion) ? current : prev
    )

    return Math.max(0, 1 - Math.abs(daysSinceCompletion - closestInterval) / closestInterval)
  }

  calculatePersonalInterest(lesson) {
    const userInterests = this.progress.achievements?.personalInterests || []
    const lessonTopics = lesson.topics || []
    
    const interestOverlap = lessonTopics.filter(topic => 
      userInterests.some(interest => 
        interest.toLowerCase().includes(topic.toLowerCase()) ||
        topic.toLowerCase().includes(interest.toLowerCase())
      )
    ).length

    return Math.min(1, interestOverlap / Math.max(lessonTopics.length, 1))
  }

  predictCompletionProbability(lesson) {
    const userLevel = this.progress.stats.currentLevel
    const avgSessionTime = this.calculateAverageSessionTime()
    const lessonDifficulty = lesson.difficulty || 'medium'
    
    const difficultyMultipliers = {
      easy: 0.9,
      medium: 0.7,
      hard: 0.5,
      expert: 0.3
    }

    const levelMultipliers = {
      'rookie-level': 0.6,
      'fan-level': 0.75,
      'enthusiast-level': 0.85,
      'expert-level': 0.95
    }

    const baseProb = (levelMultipliers[userLevel] || 0.7) * (difficultyMultipliers[lessonDifficulty] || 0.7)
    const timeAdjustment = Math.min(1, avgSessionTime / (lesson.estimatedTime || 300)) // 5 min default
    
    return Math.min(1, baseProb * timeAdjustment)
  }

  calculateAverageSessionTime() {
    const sessions = this.progress.achievements?.sessionRecords || {}
    const recentSessions = sessions.recentSessionTimes || []
    
    if (recentSessions.length === 0) return 600 // 10 min default
    
    return recentSessions.reduce((sum, time) => sum + time, 0) / recentSessions.length
  }

  areTopicsRelated(topics1 = [], topics2 = []) {
    const commonTopics = topics1.filter(topic => topics2.includes(topic))
    const totalUnique = [...new Set([...topics1, ...topics2])].length
    
    return commonTopics.length / Math.max(totalUnique, 1) > 0.3 // 30% similarity threshold
  }

  getLessonById(id) {
    // This would connect to your lesson data
    // For now, placeholder
    return { topics: [] }
  }
}

// Machine learning inspired engagement prediction
class LearningModel {
  constructor() {
    this.features = [
      'time_of_day',
      'day_of_week', 
      'lesson_length',
      'topic_familiarity',
      'recent_performance',
      'streak_length'
    ]
  }

  predictEngagement(lesson, progress) {
    const features = this.extractFeatures(lesson, progress)
    return this.simpleLinearModel(features)
  }

  extractFeatures(lesson, progress) {
    const now = new Date()
    
    return {
      time_of_day: now.getHours() / 24, // 0-1 normalized
      day_of_week: now.getDay() / 7, // 0-1 normalized
      lesson_length: Math.min(1, (lesson.estimatedTime || 300) / 1200), // normalized to max 20 min
      topic_familiarity: this.calculateTopicFamiliarity(lesson.topics, progress),
      recent_performance: this.calculateRecentPerformance(progress),
      streak_length: Math.min(1, (progress.stats?.currentStreak || 0) / 30) // normalized to max 30 days
    }
  }

  simpleLinearModel(features) {
    // Simplified linear regression weights (would be trained from data)
    const weights = {
      time_of_day: 0.1,
      day_of_week: 0.05,
      lesson_length: -0.3, // shorter lessons = higher engagement
      topic_familiarity: 0.4,
      recent_performance: 0.3,
      streak_length: 0.15
    }

    return Math.max(0, Math.min(1, 
      Object.entries(features).reduce(
        (sum, [feature, value]) => sum + (weights[feature] * value),
        0.5 // base engagement
      )
    ))
  }

  calculateTopicFamiliarity(lessonTopics = [], progress) {
    const completedLessons = progress.lessons?.completed || []
    // This would analyze completed lesson topics vs current lesson topics
    // Simplified for now
    return Math.min(1, completedLessons.length / 10) // Basic familiarity based on completion count
  }

  calculateRecentPerformance(progress) {
    const recentQuizzes = Object.values(progress.quizzes?.attempted || {})
      .filter(quiz => {
        if (!quiz.lastAttempt) return false
        const daysSince = (Date.now() - new Date(quiz.lastAttempt).getTime()) / (1000 * 60 * 60 * 24)
        return daysSince <= 7 // Last 7 days
      })
    
    if (recentQuizzes.length === 0) return 0.5 // neutral
    
    const avgScore = recentQuizzes.reduce((sum, quiz) => sum + (quiz.bestScore || 0), 0) / recentQuizzes.length
    return avgScore / 100 // normalize to 0-1
  }
}

// Dynamic difficulty adjustment
class DifficultyAdjuster {
  getDifficultyScore(lesson, progress) {
    const userLevel = this.getUserSkillLevel(progress)
    const lessonDifficulty = this.getLessonDifficulty(lesson)
    
    // Optimal difficulty is slightly above current level (zone of proximal development)
    const difficultyGap = lessonDifficulty - userLevel
    
    // Bell curve: optimal when gap is small and positive
    if (difficultyGap < -0.5) return 0.2 // Too easy
    if (difficultyGap > 1.0) return 0.1 // Too hard
    if (difficultyGap >= 0 && difficultyGap <= 0.3) return 1.0 // Optimal zone
    
    return Math.max(0.3, 1 - Math.abs(difficultyGap - 0.15) * 2)
  }

  getUserSkillLevel(progress) {
    const levelMappings = {
      'rookie-level': 0.2,
      'fan-level': 0.4,
      'enthusiast-level': 0.7,
      'expert-level': 1.0
    }

    const baseLevel = levelMappings[progress.stats?.currentLevel] || 0.2
    
    // Adjust based on recent performance
    const recentPerformance = this.calculateRecentPerformanceAdjustment(progress)
    
    return Math.min(1, baseLevel + recentPerformance)
  }

  getLessonDifficulty(lesson) {
    const difficultyMappings = {
      'easy': 0.2,
      'medium': 0.5,
      'hard': 0.8,
      'expert': 1.0
    }

    return difficultyMappings[lesson.difficulty || 'medium'] || 0.5
  }

  calculateRecentPerformanceAdjustment(progress) {
    const recentQuizzes = Object.values(progress.quizzes?.attempted || {})
      .filter(quiz => {
        if (!quiz.lastAttempt) return false
        const daysSince = (Date.now() - new Date(quiz.lastAttempt).getTime()) / (1000 * 60 * 60 * 24)
        return daysSince <= 14 // Last 2 weeks
      })
      .sort((a, b) => new Date(b.lastAttempt) - new Date(a.lastAttempt))
      .slice(0, 5) // Most recent 5 quizzes
    
    if (recentQuizzes.length < 2) return 0
    
    const avgScore = recentQuizzes.reduce((sum, quiz) => sum + (quiz.bestScore || 0), 0) / recentQuizzes.length
    
    // Adjust level based on performance
    if (avgScore >= 90) return 0.1 // Performing well, increase difficulty
    if (avgScore <= 60) return -0.1 // Struggling, decrease difficulty
    return 0 // No adjustment needed
  }
}

// Content optimization based on user behavior
class ContentOptimizer {
  optimizeContentOrder(lessons, progress) {
    return lessons.sort((a, b) => {
      const scoreA = this.calculateContentScore(a, progress)
      const scoreB = this.calculateContentScore(b, progress)
      return scoreB - scoreA
    })
  }

  calculateContentScore(lesson, progress) {
    const factors = {
      prerequisite_completion: this.checkPrerequisites(lesson, progress),
      learning_path_alignment: this.checkLearningPathAlignment(lesson, progress),
      content_freshness: this.calculateContentFreshness(lesson),
      user_preference_match: this.calculatePreferenceMatch(lesson, progress)
    }

    return Object.values(factors).reduce((sum, score) => sum + score, 0) / Object.keys(factors).length
  }

  checkPrerequisites(lesson, progress) {
    const prerequisites = lesson.prerequisites || []
    if (prerequisites.length === 0) return 1
    
    const completedPrereqs = prerequisites.filter(prereq => 
      progress.lessons?.completed?.includes(prereq)
    )
    
    return completedPrereqs.length / prerequisites.length
  }

  checkLearningPathAlignment(lesson, progress) {
    // Check if lesson aligns with user's current learning track
    const currentTracks = progress.tracks?.inProgress || {}
    if (Object.keys(currentTracks).length === 0) return 0.5
    
    for (const trackId of Object.keys(currentTracks)) {
      if (lesson.tracks?.includes(trackId)) return 1
    }
    
    return 0.3
  }

  calculateContentFreshness(lesson) {
    const createdDate = lesson.createdDate ? new Date(lesson.createdDate) : new Date()
    const daysSinceCreation = (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24)
    
    // Slightly prefer newer content, but not too heavily
    return Math.max(0.3, 1 - daysSinceCreation / 365) // Decay over a year
  }

  calculatePreferenceMatch(lesson, progress) {
    const userPreferences = progress.achievements?.contentPreferences || {}
    let score = 0.5 // default neutral
    
    // Check format preferences
    if (userPreferences.preferredFormat && lesson.format === userPreferences.preferredFormat) {
      score += 0.3
    }
    
    // Check topic interests
    if (userPreferences.topicInterests && lesson.topics) {
      const matchingTopics = lesson.topics.filter(topic => 
        userPreferences.topicInterests.includes(topic)
      )
      score += (matchingTopics.length / lesson.topics.length) * 0.2
    }
    
    return Math.min(1, score)
  }
}

// Export factory function
export const createAdaptiveLearningEngine = (userProgress) => {
  return new AdaptiveLearningEngine(userProgress)
}