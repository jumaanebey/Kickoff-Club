// Advanced spaced repetition algorithm with forgetting curve modeling
export class SpacedRepetitionEngine {
  constructor() {
    // SuperMemo-2 algorithm constants with ML optimizations
    this.DEFAULT_EASINESS = 2.5
    this.MIN_EASINESS = 1.3
    this.MAX_EASINESS = 4.0
    this.EASINESS_ADJUSTMENT = 0.1
    this.MINIMUM_INTERVAL = 1 // days
    
    // Forgetting curve parameters (based on Ebbinghaus research)
    this.FORGETTING_CURVE_CONSTANTS = {
      b: 1.25, // forgetting rate
      c: 1.25  // knowledge retention strength
    }
  }

  // Calculate next review date based on performance and history
  calculateNextReview(item, performanceRating, currentDate = new Date()) {
    const {
      easiness = this.DEFAULT_EASINESS,
      interval = 1,
      repetitions = 0,
      lastReview = currentDate,
      reviewHistory = []
    } = item

    // Update review history
    const newHistory = [...reviewHistory, {
      date: currentDate.toISOString(),
      rating: performanceRating,
      interval: interval
    }].slice(-20) // Keep last 20 reviews for pattern analysis

    // Calculate new easiness factor
    const newEasiness = this.calculateNewEasiness(easiness, performanceRating)
    
    // Determine new interval based on performance
    let newInterval
    let newRepetitions = repetitions

    if (performanceRating < 3) {
      // Failed review - reset with penalty
      newInterval = 1
      newRepetitions = 0
    } else {
      newRepetitions += 1
      
      if (newRepetitions === 1) {
        newInterval = 1
      } else if (newRepetitions === 2) {
        newInterval = 6
      } else {
        // Apply difficulty multiplier with adaptive adjustments
        const baseInterval = Math.round(interval * newEasiness)
        
        // Apply learning pattern adjustments
        const patternAdjustment = this.calculatePatternAdjustment(newHistory)
        const timeOfDayAdjustment = this.calculateTimeOfDayAdjustment(currentDate)
        const difficultyCurveAdjustment = this.calculateDifficultyCurveAdjustment(item)
        
        newInterval = Math.round(
          baseInterval * 
          patternAdjustment * 
          timeOfDayAdjustment * 
          difficultyCurveAdjustment
        )
      }
    }

    // Ensure minimum interval
    newInterval = Math.max(this.MINIMUM_INTERVAL, newInterval)
    
    // Calculate next review date
    const nextReview = new Date(currentDate)
    nextReview.setDate(nextReview.getDate() + newInterval)

    return {
      easiness: newEasiness,
      interval: newInterval,
      repetitions: newRepetitions,
      lastReview: currentDate.toISOString(),
      nextReview: nextReview.toISOString(),
      reviewHistory: newHistory,
      confidence: this.calculateConfidence(newHistory, performanceRating)
    }
  }

  calculateNewEasiness(currentEasiness, performanceRating) {
    // Modified SuperMemo-2 formula with smoother adjustments
    const qualityFactor = (5 - performanceRating) * (0.08 + (performanceRating - 5) * 0.02)
    let newEasiness = currentEasiness - qualityFactor
    
    return Math.max(this.MIN_EASINESS, Math.min(this.MAX_EASINESS, newEasiness))
  }

  // Analyze user's learning patterns for personalized intervals
  calculatePatternAdjustment(reviewHistory) {
    if (reviewHistory.length < 3) return 1.0
    
    const recentReviews = reviewHistory.slice(-5)
    const averageRating = recentReviews.reduce((sum, r) => sum + r.rating, 0) / recentReviews.length
    
    // Adjust based on consistent performance
    if (averageRating >= 4.5) return 1.2 // Extend intervals for strong performance
    if (averageRating <= 2.5) return 0.8 // Shorten intervals for weak performance
    
    return 1.0
  }

  // Adjust for time-of-day learning effectiveness
  calculateTimeOfDayAdjustment(reviewDate) {
    const hour = reviewDate.getHours()
    
    // Peak learning hours (based on circadian rhythm research)
    if (hour >= 9 && hour <= 11) return 1.1 // Morning peak
    if (hour >= 15 && hour <= 17) return 1.05 // Afternoon peak
    if (hour >= 22 || hour <= 6) return 0.9 // Low attention periods
    
    return 1.0
  }

  // Adjust based on content difficulty curve
  calculateDifficultyCurveAdjustment(item) {
    const difficulty = item.difficulty || 'medium'
    const userLevel = item.userLevel || 'intermediate'
    
    const difficultyMismatch = this.calculateDifficultyMismatch(difficulty, userLevel)
    
    // Adjust intervals based on difficulty vs user level
    if (difficultyMismatch > 1) return 0.8 // Content too hard, review more often
    if (difficultyMismatch < -1) return 1.3 // Content too easy, review less often
    
    return 1.0
  }

  calculateDifficultyMismatch(contentDifficulty, userLevel) {
    const difficultyLevels = { easy: 1, medium: 2, hard: 3, expert: 4 }
    const userLevels = { rookie: 1, fan: 2, enthusiast: 3, expert: 4 }
    
    return difficultyLevels[contentDifficulty] - userLevels[userLevel]
  }

  // Calculate confidence score for knowledge retention
  calculateConfidence(reviewHistory, lastRating) {
    if (reviewHistory.length === 0) return 0.5
    
    const recentPerformance = reviewHistory.slice(-3)
    const averageRating = recentPerformance.reduce((sum, r) => sum + r.rating, 0) / recentPerformance.length
    const consistency = this.calculateConsistency(recentPerformance)
    
    // Base confidence on recent performance and consistency
    const baseConfidence = (averageRating - 1) / 4 // Normalize to 0-1
    const consistencyBonus = consistency * 0.2
    
    return Math.min(1, Math.max(0, baseConfidence + consistencyBonus))
  }

  calculateConsistency(reviews) {
    if (reviews.length < 2) return 0.5
    
    const variance = this.calculateVariance(reviews.map(r => r.rating))
    return Math.max(0, 1 - variance / 2) // Lower variance = higher consistency
  }

  calculateVariance(values) {
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length
    const squaredDiffs = values.map(val => Math.pow(val - mean, 2))
    return squaredDiffs.reduce((sum, diff) => sum + diff, 0) / values.length
  }

  // Get items due for review
  getItemsDueForReview(items, currentDate = new Date()) {
    return items
      .filter(item => {
        const nextReview = new Date(item.nextReview || item.lastReview || currentDate)
        return nextReview <= currentDate
      })
      .sort((a, b) => {
        // Prioritize by urgency and importance
        const urgencyA = this.calculateUrgency(a, currentDate)
        const urgencyB = this.calculateUrgency(b, currentDate)
        const importanceA = this.calculateImportance(a)
        const importanceB = this.calculateImportance(b)
        
        const scoreA = urgencyA * 0.6 + importanceA * 0.4
        const scoreB = urgencyB * 0.6 + importanceB * 0.4
        
        return scoreB - scoreA
      })
  }

  calculateUrgency(item, currentDate) {
    const nextReview = new Date(item.nextReview || item.lastReview || currentDate)
    const daysPastDue = (currentDate - nextReview) / (1000 * 60 * 60 * 24)
    
    // Exponential urgency increase
    return Math.min(1, Math.max(0, daysPastDue / 7)) // Normalize to 0-1 over a week
  }

  calculateImportance(item) {
    let importance = 0.5 // Base importance
    
    // Factor in difficulty (harder content = more important to review)
    const difficultyWeights = { easy: 0.3, medium: 0.5, hard: 0.7, expert: 0.9 }
    importance += (difficultyWeights[item.difficulty] || 0.5) * 0.3
    
    // Factor in previous performance (weaker performance = more important)
    const confidence = item.confidence || 0.5
    importance += (1 - confidence) * 0.2
    
    return Math.min(1, importance)
  }

  // Predict knowledge retention using forgetting curve
  predictRetention(item, targetDate = new Date()) {
    const lastReview = new Date(item.lastReview || targetDate)
    const daysSinceReview = (targetDate - lastReview) / (1000 * 60 * 60 * 24)
    
    if (daysSinceReview <= 0) return 1.0 // Perfect retention immediately after review
    
    const { b, c } = this.FORGETTING_CURVE_CONSTANTS
    const easinessFactor = (item.easiness || this.DEFAULT_EASINESS) / this.DEFAULT_EASINESS
    
    // Modified forgetting curve with personal easiness adjustment
    const retention = Math.pow(1 + b * daysSinceReview / (c * easinessFactor), -1)
    
    return Math.max(0, Math.min(1, retention))
  }

  // Generate study schedule optimization
  optimizeStudySchedule(items, studyTimeAvailable, currentDate = new Date()) {
    const dueItems = this.getItemsDueForReview(items, currentDate)
    const schedule = []
    let remainingTime = studyTimeAvailable
    
    for (const item of dueItems) {
      if (remainingTime <= 0) break
      
      const estimatedTime = item.estimatedReviewTime || 3 // 3 minutes default
      
      if (estimatedTime <= remainingTime) {
        schedule.push({
          item,
          estimatedTime,
          priority: this.calculateUrgency(item, currentDate) + this.calculateImportance(item),
          predictedRetention: this.predictRetention(item, currentDate)
        })
        remainingTime -= estimatedTime
      }
    }
    
    return {
      schedule,
      totalTime: studyTimeAvailable - remainingTime,
      itemsSkipped: dueItems.length - schedule.length,
      projectedLearning: this.calculateProjectedLearning(schedule)
    }
  }

  calculateProjectedLearning(schedule) {
    return schedule.reduce((total, session) => {
      const improvementPotential = 1 - session.predictedRetention
      return total + improvementPotential * session.priority
    }, 0)
  }
}

// Export singleton instance
export const spacedRepetitionEngine = new SpacedRepetitionEngine()

// Export factory for custom instances
export const createSpacedRepetitionEngine = (options = {}) => {
  const engine = new SpacedRepetitionEngine()
  
  // Override default settings
  Object.assign(engine, options)
  
  return engine
}