import React from 'react'
import ProFootballAssessment from '../components/ProFootballAssessment'
import { saveProgress, loadProgress } from '../utils/progressTracker'

export default function AssessmentPage() {
  const handleAssessmentComplete = (results) => {
    // Save assessment results to progress
    const currentProgress = loadProgress()
    
    // Update assessment history
    if (!currentProgress.assessments) {
      currentProgress.assessments = []
    }
    
    currentProgress.assessments.push({
      date: new Date().toISOString(),
      score: results.score,
      total: results.totalQuestions,
      passed: results.passed,
      tier: results.tier
    })
    
    // Update stats
    currentProgress.stats.assessmentsTaken = (currentProgress.stats.assessmentsTaken || 0) + 1
    if (results.passed) {
      currentProgress.stats.assessmentsPassed = (currentProgress.stats.assessmentsPassed || 0) + 1
    }
    
    // Save updated progress
    saveProgress(currentProgress)
    
    // In development, log results for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('Assessment completed:', results)
    }
    
    // Could trigger celebrations, unlock new content, analytics tracking, etc.
    if (results.passed && results.newTierUnlocked) {
      // Trigger celebration animation or notification
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-50 to-sage-50">
      {/* Header Section */}
      <div className="bg-white/95 backdrop-blur-md border-b border-primary-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-secondary-100 mb-4">
              ✨ Test Your Football Knowledge
            </h1>
            <p className="text-lg text-secondary-200 max-w-2xl mx-auto">
              No pressure, no judgment - just a fun way to see what you already know and discover what to learn next!
            </p>
          </div>
        </div>
      </div>

      {/* Assessment Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <ProFootballAssessment onComplete={handleAssessmentComplete} />
      </div>
    </div>
  )
}