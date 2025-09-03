import React, { useState, useEffect } from 'react'
import { getProgressData } from '../utils/progressTracker'

const AnalyticsDashboard = () => {
  const [progress, setProgress] = useState(getProgressData())
  const [timeRange, setTimeRange] = useState('week')
  
  // Calculate analytics data
  const calculateAnalytics = () => {
    const now = new Date()
    const joinDate = new Date(progress.user.joinDate)
    const daysActive = Math.floor((now - joinDate) / (1000 * 60 * 60 * 24)) || 1
    
    // Learning pace
    const lessonsPerDay = (progress.lessons.completed.length / daysActive).toFixed(1)
    const pointsPerDay = Math.round(progress.stats.totalPoints / daysActive)
    
    // Quiz performance
    const totalQuizAttempts = progress.quizzes.totalAttempts || 0
    const perfectQuizzes = progress.quizzes.perfect?.length || 0
    const quizSuccessRate = totalQuizAttempts > 0 
      ? Math.round((perfectQuizzes / totalQuizAttempts) * 100) 
      : 0
    
    // Time analysis
    const totalTimeSpent = Object.values(progress.lessons.timeSpent || {})
      .reduce((sum, time) => sum + time, 0)
    const avgTimePerLesson = progress.lessons.completed.length > 0
      ? Math.round(totalTimeSpent / progress.lessons.completed.length / 60)
      : 0
    
    // Streaks and consistency
    const studyDaysThisWeek = Math.min(7, progress.stats.currentStreak)
    const consistencyScore = Math.round((studyDaysThisWeek / 7) * 100)
    
    // Category breakdown
    const categoryProgress = {
      'basic-rules': 3,
      'positions': 1,
      'scoring': 1,
      'strategy': 0,
      'advanced-rules': 0
    }
    
    return {
      daysActive,
      lessonsPerDay,
      pointsPerDay,
      quizSuccessRate,
      avgTimePerLesson,
      consistencyScore,
      totalTimeSpent: Math.round(totalTimeSpent / 60), // in minutes
      categoryProgress,
      weeklyActivity: generateWeeklyActivity(),
      performanceTrend: generatePerformanceTrend()
    }
  }
  
  // Generate weekly activity data
  const generateWeeklyActivity = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const today = new Date().getDay()
    
    return days.map((day, index) => {
      const isToday = index === (today === 0 ? 6 : today - 1)
      const isFuture = index > (today === 0 ? 6 : today - 1)
      
      return {
        day,
        lessons: isFuture ? 0 : (isToday ? 2 : Math.floor(Math.random() * 4)),
        points: isFuture ? 0 : (isToday ? 150 : Math.floor(Math.random() * 200) + 50),
        active: !isFuture,
        isToday
      }
    })
  }
  
  // Generate performance trend data
  const generatePerformanceTrend = () => {
    return [
      { period: 'Week 1', score: 65, label: 'Getting Started' },
      { period: 'Week 2', score: 72, label: 'Building Momentum' },
      { period: 'Week 3', score: 78, label: 'Steady Progress' },
      { period: 'This Week', score: 85, label: 'Great Performance!' }
    ]
  }
  
  const analytics = calculateAnalytics()
  
  const getStreakColor = (streak) => {
    if (streak >= 30) return 'text-yellow-600'
    if (streak >= 7) return 'text-green-600'
    if (streak >= 3) return 'text-blue-600'
    return 'text-gray-600'
  }
  
  const getScoreGrade = (score) => {
    if (score >= 90) return { grade: 'A+', color: 'text-green-600' }
    if (score >= 80) return { grade: 'A', color: 'text-green-500' }
    if (score >= 70) return { grade: 'B', color: 'text-blue-600' }
    if (score >= 60) return { grade: 'C', color: 'text-yellow-600' }
    return { grade: 'D', color: 'text-red-600' }
  }
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-sage-200">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-secondary-100 mb-2">
          📊 Progress Analytics
        </h3>
        <p className="text-secondary-300">
          Track your learning journey with detailed insights
        </p>
      </div>
      
      {/* Key Metrics Grid */}
      <div className="grid md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-sage-50 to-sage-100 rounded-lg p-4">
          <div className="text-3xl mb-2">📚</div>
          <div className="text-2xl font-bold text-sage-700">
            {progress.lessons.completed.length}
          </div>
          <div className="text-sm text-gray-600">Lessons Completed</div>
          <div className="text-xs text-sage-600 mt-1">
            {analytics.lessonsPerDay} per day avg
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blush-50 to-blush-100 rounded-lg p-4">
          <div className="text-3xl mb-2">🔥</div>
          <div className={`text-2xl font-bold ${getStreakColor(progress.stats.currentStreak)}`}>
            {progress.stats.currentStreak}
          </div>
          <div className="text-sm text-gray-600">Day Streak</div>
          <div className="text-xs text-blush-600 mt-1">
            Best: {progress.stats.longestStreak} days
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4">
          <div className="text-3xl mb-2">⭐</div>
          <div className="text-2xl font-bold text-yellow-700">
            {progress.stats.totalPoints}
          </div>
          <div className="text-sm text-gray-600">Total Points</div>
          <div className="text-xs text-yellow-600 mt-1">
            {analytics.pointsPerDay} per day avg
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-navy to-secondary-100 text-white rounded-lg p-4">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-2xl font-bold">
            {progress.badges.earned.length}
          </div>
          <div className="text-sm">Badges Earned</div>
          <div className="text-xs opacity-90 mt-1">
            {progress.nextBadges?.length || 0} close to earning
          </div>
        </div>
      </div>
      
      {/* Weekly Activity Chart */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-bold text-navy mb-4">📅 Weekly Activity</h4>
        <div className="space-y-3">
          {analytics.weeklyActivity.map((day) => (
            <div key={day.day} className="flex items-center">
              <div className={`w-12 text-sm font-medium ${day.isToday ? 'text-sage-600' : 'text-gray-600'}`}>
                {day.day}
              </div>
              <div className="flex-1 mx-3">
                <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      day.isToday ? 'bg-sage-500' : 'bg-sage-400'
                    }`}
                    style={{ width: `${Math.min(100, (day.points / 200) * 100)}%` }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                      {day.lessons > 0 && `${day.lessons} lessons`}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-16 text-right text-sm text-gray-600">
                {day.points} pts
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Weekly Total</span>
            <span className="font-bold text-navy">
              {analytics.weeklyActivity.reduce((sum, day) => sum + day.points, 0)} points
            </span>
          </div>
        </div>
      </div>
      
      {/* Performance Metrics */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Quiz Performance */}
        <div className="bg-sage-50 rounded-lg p-4">
          <h4 className="font-bold text-navy mb-3">🎯 Quiz Performance</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Success Rate</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                  <div 
                    className="bg-sage-500 h-2 rounded-full"
                    style={{ width: `${analytics.quizSuccessRate}%` }}
                  ></div>
                </div>
                <span className="font-bold text-sage-700">{analytics.quizSuccessRate}%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Perfect Scores</span>
              <span className="font-bold text-sage-700">{perfectQuizzes}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Attempts</span>
              <span className="font-bold text-sage-700">{totalQuizAttempts}</span>
            </div>
          </div>
        </div>
        
        {/* Learning Efficiency */}
        <div className="bg-blush-50 rounded-lg p-4">
          <h4 className="font-bold text-navy mb-3">⚡ Learning Efficiency</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg Time/Lesson</span>
              <span className="font-bold text-blush-700">{analytics.avgTimePerLesson} min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Study Time</span>
              <span className="font-bold text-blush-700">{analytics.totalTimeSpent} min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Consistency Score</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                  <div 
                    className="bg-blush-500 h-2 rounded-full"
                    style={{ width: `${analytics.consistencyScore}%` }}
                  ></div>
                </div>
                <span className="font-bold text-blush-700">{analytics.consistencyScore}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Performance Trend */}
      <div className="bg-gradient-to-r from-sage-50 to-blush-50 rounded-lg p-4 mb-6">
        <h4 className="font-bold text-navy mb-4">📈 Performance Trend</h4>
        <div className="space-y-3">
          {analytics.performanceTrend.map((period, index) => {
            const { grade, color } = getScoreGrade(period.score)
            return (
              <div key={period.period} className="flex items-center">
                <div className="w-20 text-sm font-medium text-gray-600">
                  {period.period}
                </div>
                <div className="flex-1 mx-3">
                  <div className="bg-gray-200 rounded-full h-8 relative overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        index === analytics.performanceTrend.length - 1 
                          ? 'bg-gradient-to-r from-sage-400 to-sage-500' 
                          : 'bg-sage-300'
                      }`}
                      style={{ width: `${period.score}%` }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                        {period.label}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`w-12 text-right font-bold ${color}`}>
                  {grade}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Category Progress */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h4 className="font-bold text-navy mb-4">📖 Category Progress</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(analytics.categoryProgress).map(([category, completed]) => {
            const total = 5 // Assuming 5 lessons per category for demo
            const percentage = Math.round((completed / total) * 100)
            
            return (
              <div key={category} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">
                  {category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </div>
                <div className="text-lg font-bold text-navy">
                  {completed}/{total}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                  <div 
                    className="bg-sage-500 h-1 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* Insights */}
      <div className="mt-6 p-4 bg-warmGold bg-opacity-10 rounded-lg border border-warmGold">
        <h5 className="font-bold text-navy mb-2">💡 Insights</h5>
        <ul className="text-sm text-gray-700 space-y-1">
          {analytics.consistencyScore >= 80 && <li>• Excellent consistency! You're learning every day 🌟</li>}
          {analytics.consistencyScore < 80 && analytics.consistencyScore >= 50 && <li>• Good progress! Try to maintain daily practice for better retention 📚</li>}
          {analytics.consistencyScore < 50 && <li>• Building consistency will accelerate your learning. Aim for daily sessions! 🎯</li>}
          {analytics.quizSuccessRate >= 80 && <li>• Outstanding quiz performance! You're mastering the material 🏆</li>}
          {analytics.avgTimePerLesson < 5 && <li>• You're a speed learner! Consider reviewing lessons for deeper understanding 📖</li>}
          {progress.badges.earned.length >= 10 && <li>• Badge collector! You've earned {progress.badges.earned.length} badges so far 🏅</li>}
        </ul>
      </div>
    </div>
  )
}

export default AnalyticsDashboard