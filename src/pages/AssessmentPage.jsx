import React from 'react'
import ProFootballAssessment from '../components/ProFootballAssessment'

export default function AssessmentPage() {
  const handleAssessmentComplete = (results) => {
    console.log('Assessment completed:', results)
    // Could trigger celebrations, unlock new content, etc.
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <ProFootballAssessment onComplete={handleAssessmentComplete} />
      </div>
    </div>
  )
}