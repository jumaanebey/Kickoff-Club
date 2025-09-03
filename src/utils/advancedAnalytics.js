// Advanced analytics with ML-powered insights and behavioral patterns
export class AdvancedAnalyticsEngine {
  constructor() {
    this.events = []
    this.sessionId = this.generateSessionId()
    this.startTime = Date.now()
    this.behaviorPatterns = new Map()
    this.heatmapData = new Map()
    this.performanceMetrics = new Map()
    this.learningAnalytics = new Map()
    
    // Initialize session tracking
    this.initializeSession()
  }

  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  initializeSession() {
    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      this.trackEvent('visibility_change', {
        hidden: document.hidden,
        timestamp: Date.now()
      })
    })

    // Track scroll behavior
    this.initializeScrollTracking()
    
    // Track mouse movement patterns
    this.initializeMouseTracking()
    
    // Track keyboard usage patterns
    this.initializeKeyboardTracking()
    
    // Track performance metrics
    this.initializePerformanceTracking()
  }

  trackEvent(eventType, data = {}, priority = 'normal') {
    const event = {
      id: this.generateEventId(),
      type: eventType,
      data,
      timestamp: Date.now(),
      sessionId: this.sessionId,
      priority,
      url: window.location.href,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }

    this.events.push(event)
    
    // Keep only last 1000 events to prevent memory issues
    if (this.events.length > 1000) {
      this.events = this.events.slice(-1000)
    }

    // Process event for patterns
    this.processBehaviorPattern(event)
    
    // Update heatmap data for click/tap events
    if (eventType.includes('click') || eventType.includes('tap')) {
      this.updateHeatmapData(event)
    }
    
    // Send high priority events immediately
    if (priority === 'high') {
      this.sendEventBatch([event])
    }

    return event.id
  }

  generateEventId() {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`
  }

  // Advanced behavior pattern analysis
  processBehaviorPattern(event) {
    const patternKey = `${event.type}_pattern`
    
    if (!this.behaviorPatterns.has(patternKey)) {
      this.behaviorPatterns.set(patternKey, {
        count: 0,
        averageTime: 0,
        sequence: [],
        contexts: new Map()
      })
    }

    const pattern = this.behaviorPatterns.get(patternKey)
    pattern.count++
    pattern.sequence.push({
      timestamp: event.timestamp,
      data: event.data
    })
    
    // Keep only last 50 sequence items
    if (pattern.sequence.length > 50) {
      pattern.sequence = pattern.sequence.slice(-50)
    }

    // Track context-specific patterns
    const context = this.getEventContext(event)
    if (!pattern.contexts.has(context)) {
      pattern.contexts.set(context, { count: 0, outcomes: [] })
    }
    pattern.contexts.get(context).count++
  }

  getEventContext(event) {
    const path = new URL(event.url).pathname
    const hour = new Date(event.timestamp).getHours()
    const dayOfWeek = new Date(event.timestamp).getDay()
    
    return `${path}_${this.getTimeCategory(hour)}_${this.getDayCategory(dayOfWeek)}`
  }

  getTimeCategory(hour) {
    if (hour >= 6 && hour < 12) return 'morning'
    if (hour >= 12 && hour < 17) return 'afternoon'
    if (hour >= 17 && hour < 21) return 'evening'
    return 'night'
  }

  getDayCategory(dayOfWeek) {
    return dayOfWeek === 0 || dayOfWeek === 6 ? 'weekend' : 'weekday'
  }

  // Heatmap data collection
  updateHeatmapData(event) {
    if (event.data.x && event.data.y) {
      const gridX = Math.floor(event.data.x / 50) // 50px grid
      const gridY = Math.floor(event.data.y / 50)
      const gridKey = `${gridX}_${gridY}`
      
      if (!this.heatmapData.has(gridKey)) {
        this.heatmapData.set(gridKey, {
          x: gridX * 50,
          y: gridY * 50,
          clicks: 0,
          events: []
        })
      }
      
      const gridData = this.heatmapData.get(gridKey)
      gridData.clicks++
      gridData.events.push({
        timestamp: event.timestamp,
        type: event.type
      })
    }
  }

  // Scroll behavior tracking
  initializeScrollTracking() {
    let lastScrollTime = 0
    let scrollDepth = 0
    let maxScrollDepth = 0
    
    const trackScroll = () => {
      const now = Date.now()
      const currentScrollDepth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      
      if (currentScrollDepth > maxScrollDepth) {
        maxScrollDepth = currentScrollDepth
      }
      
      // Track significant scroll events
      if (now - lastScrollTime > 1000) { // Throttle to 1 second
        this.trackEvent('scroll_milestone', {
          depth: currentScrollDepth,
          maxDepth: maxScrollDepth,
          scrollSpeed: Math.abs(currentScrollDepth - scrollDepth) / (now - lastScrollTime) * 1000
        })
        
        lastScrollTime = now
        scrollDepth = currentScrollDepth
      }
    }

    // Use passive listener for better performance
    window.addEventListener('scroll', trackScroll, { passive: true })
  }

  // Mouse movement pattern analysis
  initializeMouseTracking() {
    let mouseEvents = []
    let lastMouseTime = 0
    
    const trackMouseMovement = (e) => {
      const now = Date.now()
      
      if (now - lastMouseTime > 100) { // Throttle to 100ms
        mouseEvents.push({
          x: e.clientX,
          y: e.clientY,
          timestamp: now
        })
        
        // Keep only last 20 mouse events
        if (mouseEvents.length > 20) {
          mouseEvents = mouseEvents.slice(-20)
        }
        
        // Analyze movement patterns every 10 events
        if (mouseEvents.length >= 10) {
          const patterns = this.analyzeMousePatterns(mouseEvents)
          this.trackEvent('mouse_pattern_analysis', patterns)
        }
        
        lastMouseTime = now
      }
    }

    // Click tracking with position
    const trackClick = (e) => {
      this.trackEvent('click_positioned', {
        x: e.clientX,
        y: e.clientY,
        target: e.target.tagName,
        className: e.target.className,
        id: e.target.id
      })
    }

    document.addEventListener('mousemove', trackMouseMovement, { passive: true })
    document.addEventListener('click', trackClick)
  }

  analyzeMousePatterns(mouseEvents) {
    if (mouseEvents.length < 5) return {}

    // Calculate movement metrics
    let totalDistance = 0
    let totalTime = 0
    let directions = []
    
    for (let i = 1; i < mouseEvents.length; i++) {
      const prev = mouseEvents[i - 1]
      const curr = mouseEvents[i]
      
      const distance = Math.sqrt(
        Math.pow(curr.x - prev.x, 2) + Math.pow(curr.y - prev.y, 2)
      )
      
      totalDistance += distance
      totalTime += curr.timestamp - prev.timestamp
      
      // Track movement direction
      const angle = Math.atan2(curr.y - prev.y, curr.x - prev.x) * 180 / Math.PI
      directions.push(angle)
    }

    const averageSpeed = totalTime > 0 ? totalDistance / totalTime : 0
    const movementSmoothness = this.calculateMovementSmoothness(directions)
    
    return {
      totalDistance,
      averageSpeed,
      movementSmoothness,
      patternType: this.classifyMousePattern(directions, averageSpeed)
    }
  }

  calculateMovementSmoothness(directions) {
    if (directions.length < 2) return 1
    
    let totalVariation = 0
    for (let i = 1; i < directions.length; i++) {
      totalVariation += Math.abs(directions[i] - directions[i - 1])
    }
    
    return Math.max(0, 1 - (totalVariation / (directions.length * 180)))
  }

  classifyMousePattern(directions, speed) {
    if (speed > 1000) return 'rapid'
    if (speed < 100) return 'deliberate'
    
    const smoothness = this.calculateMovementSmoothness(directions)
    if (smoothness > 0.8) return 'smooth'
    if (smoothness < 0.3) return 'erratic'
    
    return 'normal'
  }

  // Keyboard usage patterns
  initializeKeyboardTracking() {
    let keySequences = []
    let lastKeyTime = 0
    
    const trackKeyboard = (e) => {
      const now = Date.now()
      
      keySequences.push({
        key: e.key,
        code: e.code,
        timestamp: now,
        timeSinceLastKey: now - lastKeyTime
      })
      
      // Keep only last 50 key events
      if (keySequences.length > 50) {
        keySequences = keySequences.slice(-50)
      }
      
      // Analyze typing patterns
      if (keySequences.length >= 10) {
        const typingMetrics = this.analyzeTypingPattern(keySequences)
        this.trackEvent('typing_pattern_analysis', typingMetrics)
      }
      
      lastKeyTime = now
    }

    document.addEventListener('keydown', trackKeyboard)
  }

  analyzeTypingPattern(sequences) {
    const intervals = sequences
      .slice(1)
      .map(seq => seq.timeSinceLastKey)
      .filter(interval => interval < 2000) // Filter out long pauses
    
    if (intervals.length === 0) return {}
    
    const averageInterval = intervals.reduce((a, b) => a + b) / intervals.length
    const wpm = intervals.length > 0 ? 60000 / (averageInterval * 5) : 0 // Rough WPM calculation
    
    return {
      averageInterval,
      estimatedWPM: Math.round(wpm),
      consistency: this.calculateTypingConsistency(intervals),
      skillLevel: this.classifyTypingSkill(wpm)
    }
  }

  calculateTypingConsistency(intervals) {
    if (intervals.length < 2) return 1
    
    const mean = intervals.reduce((a, b) => a + b) / intervals.length
    const variance = intervals.reduce((sum, interval) => sum + Math.pow(interval - mean, 2), 0) / intervals.length
    const standardDeviation = Math.sqrt(variance)
    
    return Math.max(0, 1 - (standardDeviation / mean))
  }

  classifyTypingSkill(wpm) {
    if (wpm > 60) return 'expert'
    if (wpm > 40) return 'proficient'
    if (wpm > 20) return 'intermediate'
    return 'beginner'
  }

  // Performance tracking
  initializePerformanceTracking() {
    // Track resource loading times
    if ('performance' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.trackEvent('performance_metric', {
            name: entry.name,
            duration: entry.duration,
            startTime: entry.startTime,
            entryType: entry.entryType
          }, 'low')
        }
      })
      
      observer.observe({ entryTypes: ['navigation', 'resource', 'measure'] })
    }
    
    // Track FPS for animation performance
    this.initializeFPSTracking()
  }

  initializeFPSTracking() {
    let lastTime = performance.now()
    let frames = 0
    let fps = 0
    
    const measureFPS = (currentTime) => {
      frames++
      
      if (currentTime - lastTime >= 1000) {
        fps = Math.round((frames * 1000) / (currentTime - lastTime))
        
        this.trackEvent('fps_measurement', {
          fps,
          timestamp: currentTime
        }, 'low')
        
        frames = 0
        lastTime = currentTime
      }
      
      requestAnimationFrame(measureFPS)
    }
    
    requestAnimationFrame(measureFPS)
  }

  // Learning analytics
  trackLearningEvent(eventType, lessonId, data = {}) {
    const learningEvent = {
      ...data,
      lessonId,
      learningSessionId: this.getCurrentLearningSessionId(),
      cognitiveLoad: this.estimateCognitiveLoad(),
      engagementScore: this.calculateEngagementScore()
    }

    this.trackEvent(`learning_${eventType}`, learningEvent, 'high')
    
    // Update learning analytics
    this.updateLearningAnalytics(lessonId, eventType, learningEvent)
  }

  getCurrentLearningSessionId() {
    const sessionKey = 'current_learning_session'
    let sessionId = sessionStorage.getItem(sessionKey)
    
    if (!sessionId) {
      sessionId = `learning_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`
      sessionStorage.setItem(sessionKey, sessionId)
    }
    
    return sessionId
  }

  estimateCognitiveLoad() {
    // Estimate based on recent activity patterns
    const recentEvents = this.events.slice(-20)
    
    const rapidEvents = recentEvents.filter(e => 
      Date.now() - e.timestamp < 5000 // Last 5 seconds
    ).length
    
    const mousePatterns = this.behaviorPatterns.get('mouse_pattern_analysis_pattern')
    const lastMousePattern = mousePatterns?.sequence.slice(-1)[0]
    
    let load = 0.5 // Base load
    
    // Increase load for rapid interactions
    if (rapidEvents > 5) load += 0.2
    
    // Increase load for erratic mouse movements
    if (lastMousePattern?.data.patternType === 'erratic') load += 0.15
    
    // Increase load for typing inconsistency
    const typingPatterns = this.behaviorPatterns.get('typing_pattern_analysis_pattern')
    const lastTypingPattern = typingPatterns?.sequence.slice(-1)[0]
    
    if (lastTypingPattern?.data.consistency < 0.5) load += 0.1
    
    return Math.min(1, Math.max(0, load))
  }

  calculateEngagementScore() {
    const recentEvents = this.events.slice(-50)
    const timeSpan = 60000 // 1 minute
    const now = Date.now()
    
    const activeEvents = recentEvents.filter(e => 
      now - e.timestamp < timeSpan &&
      ['click', 'scroll', 'keydown', 'focus'].some(type => e.type.includes(type))
    )
    
    const scrollEvents = activeEvents.filter(e => e.type.includes('scroll'))
    const interactionEvents = activeEvents.filter(e => e.type.includes('click'))
    
    let engagement = 0.5
    
    // Boost for interactions
    engagement += Math.min(0.3, interactionEvents.length * 0.05)
    
    // Boost for scrolling behavior
    engagement += Math.min(0.2, scrollEvents.length * 0.02)
    
    return Math.min(1, Math.max(0, engagement))
  }

  updateLearningAnalytics(lessonId, eventType, data) {
    if (!this.learningAnalytics.has(lessonId)) {
      this.learningAnalytics.set(lessonId, {
        startTime: Date.now(),
        events: [],
        cognitiveLoadHistory: [],
        engagementHistory: [],
        completionPrediction: null
      })
    }
    
    const analytics = this.learningAnalytics.get(lessonId)
    analytics.events.push({ type: eventType, timestamp: Date.now(), data })
    analytics.cognitiveLoadHistory.push(data.cognitiveLoad)
    analytics.engagementHistory.push(data.engagementScore)
    
    // Predict completion likelihood
    if (analytics.events.length >= 5) {
      analytics.completionPrediction = this.predictCompletionLikelihood(analytics)
    }
  }

  predictCompletionLikelihood(analytics) {
    const avgEngagement = analytics.engagementHistory.reduce((a, b) => a + b) / analytics.engagementHistory.length
    const avgCognitiveLoad = analytics.cognitiveLoadHistory.reduce((a, b) => a + b) / analytics.cognitiveLoadHistory.length
    const timeSpent = Date.now() - analytics.startTime
    
    let likelihood = 0.5
    
    // Higher engagement = higher completion likelihood
    likelihood += (avgEngagement - 0.5) * 0.4
    
    // Moderate cognitive load is optimal
    likelihood += Math.max(0, 0.2 - Math.abs(avgCognitiveLoad - 0.6) * 0.5)
    
    // Time spent factor
    const optimalTime = 300000 // 5 minutes
    const timeScore = Math.max(0, 1 - Math.abs(timeSpent - optimalTime) / optimalTime)
    likelihood += timeScore * 0.2
    
    return Math.min(1, Math.max(0, likelihood))
  }

  // Data export and analysis
  exportAnalyticsData() {
    return {
      sessionId: this.sessionId,
      events: this.events,
      behaviorPatterns: Object.fromEntries(this.behaviorPatterns),
      heatmapData: Object.fromEntries(this.heatmapData),
      learningAnalytics: Object.fromEntries(this.learningAnalytics),
      sessionDuration: Date.now() - this.startTime
    }
  }

  generateInsights() {
    return {
      mostEngagedTimeOfDay: this.getMostEngagedTimeOfDay(),
      learningEfficiencyScore: this.calculateLearningEfficiency(),
      recommendedBreakTime: this.calculateOptimalBreakTime(),
      strongestLearningPatterns: this.identifyStrongLearningPatterns(),
      areasForImprovement: this.identifyImprovementAreas()
    }
  }

  getMostEngagedTimeOfDay() {
    const timeCategories = {}
    
    for (const event of this.events) {
      const hour = new Date(event.timestamp).getHours()
      const category = this.getTimeCategory(hour)
      
      if (!timeCategories[category]) {
        timeCategories[category] = { count: 0, engagement: 0 }
      }
      
      timeCategories[category].count++
      if (event.data.engagementScore) {
        timeCategories[category].engagement += event.data.engagementScore
      }
    }
    
    let bestCategory = null
    let bestScore = 0
    
    for (const [category, data] of Object.entries(timeCategories)) {
      const avgEngagement = data.count > 0 ? data.engagement / data.count : 0
      if (avgEngagement > bestScore) {
        bestScore = avgEngagement
        bestCategory = category
      }
    }
    
    return bestCategory
  }

  calculateLearningEfficiency() {
    const learningEvents = this.events.filter(e => e.type.startsWith('learning_'))
    if (learningEvents.length === 0) return 0
    
    const completions = learningEvents.filter(e => e.type === 'learning_lesson_completed').length
    const attempts = learningEvents.filter(e => e.type === 'learning_lesson_started').length
    
    const completionRate = attempts > 0 ? completions / attempts : 0
    
    const avgEngagement = learningEvents
      .filter(e => e.data.engagementScore)
      .reduce((sum, e, _, arr) => sum + e.data.engagementScore / arr.length, 0)
    
    return (completionRate * 0.6) + (avgEngagement * 0.4)
  }

  calculateOptimalBreakTime() {
    const cognitiveLoadHistory = []
    
    for (const analytics of this.learningAnalytics.values()) {
      cognitiveLoadHistory.push(...analytics.cognitiveLoadHistory)
    }
    
    if (cognitiveLoadHistory.length === 0) return 300000 // 5 minutes default
    
    const avgLoad = cognitiveLoadHistory.reduce((a, b) => a + b) / cognitiveLoadHistory.length
    
    // Recommend break time based on cognitive load
    if (avgLoad > 0.8) return 600000 // 10 minutes for high load
    if (avgLoad > 0.6) return 300000 // 5 minutes for medium load
    return 120000 // 2 minutes for low load
  }

  identifyStrongLearningPatterns() {
    const patterns = []
    
    for (const [patternKey, patternData] of this.behaviorPatterns.entries()) {
      if (patternKey.startsWith('learning_') && patternData.count > 3) {
        const avgOutcome = this.calculatePatternOutcome(patternData)
        if (avgOutcome > 0.7) {
          patterns.push({
            pattern: patternKey,
            strength: avgOutcome,
            frequency: patternData.count
          })
        }
      }
    }
    
    return patterns.sort((a, b) => b.strength - a.strength).slice(0, 3)
  }

  calculatePatternOutcome(patternData) {
    // Simplified outcome calculation
    const contexts = Array.from(patternData.contexts.values())
    if (contexts.length === 0) return 0.5
    
    const totalOutcomes = contexts.reduce((sum, context) => {
      return sum + (context.outcomes?.length || 0)
    }, 0)
    
    const positiveOutcomes = contexts.reduce((sum, context) => {
      return sum + (context.outcomes?.filter(o => o.success).length || 0)
    }, 0)
    
    return totalOutcomes > 0 ? positiveOutcomes / totalOutcomes : 0.5
  }

  identifyImprovementAreas() {
    const areas = []
    
    // Check for low engagement patterns
    const avgEngagement = this.calculateEngagementScore()
    if (avgEngagement < 0.4) {
      areas.push({
        area: 'engagement',
        severity: 1 - avgEngagement,
        recommendation: 'Try shorter study sessions or more interactive content'
      })
    }
    
    // Check for high cognitive load
    const recentLoad = this.estimateCognitiveLoad()
    if (recentLoad > 0.8) {
      areas.push({
        area: 'cognitive_load',
        severity: recentLoad,
        recommendation: 'Take more frequent breaks and reduce multitasking'
      })
    }
    
    return areas
  }

  // Batch event sending (for production use)
  sendEventBatch(events) {
    // In production, this would send to your analytics service
    console.log('Analytics batch:', events)
    
    // Example: fetch('/api/analytics', { method: 'POST', body: JSON.stringify(events) })
  }

  // Periodic batch sending
  startBatchSending(intervalMs = 30000) { // 30 seconds
    setInterval(() => {
      const pendingEvents = this.events.filter(e => !e.sent)
      if (pendingEvents.length > 0) {
        this.sendEventBatch(pendingEvents)
        pendingEvents.forEach(e => e.sent = true)
      }
    }, intervalMs)
  }
}

// Singleton instance
export const analyticsEngine = new AdvancedAnalyticsEngine()

// Auto-start batch sending
if (typeof window !== 'undefined') {
  analyticsEngine.startBatchSending()
}

// Export tracking functions
export const trackAdvancedEvent = (type, data, priority) => 
  analyticsEngine.trackEvent(type, data, priority)

export const trackLearningEvent = (type, lessonId, data) => 
  analyticsEngine.trackLearningEvent(type, lessonId, data)

export const getAnalyticsInsights = () => 
  analyticsEngine.generateInsights()

export const exportAnalyticsData = () => 
  analyticsEngine.exportAnalyticsData()