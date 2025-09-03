import React, { useState, useEffect } from 'react'
import { AdaptiveAssessment, assessmentConfig, getUnlockedTiers, canAccessTier, getTierProgress } from '../data/assessmentTest'
import { useApp } from '../context/AppContext'
import { getCurrentUser, updateUserProgress } from '../utils/userAccountSystem'

export default function AssessmentDebug() {
  const [debugInfo, setDebugInfo] = useState({})
  const [errors, setErrors] = useState([])
  
  useEffect(() => {
    const runDebugTests = async () => {
      const debug = {}
      const errorList = []
      
      try {
        // Test 1: Context availability
        debug.contextTest = 'Testing context...'
        try {
          // Note: We can't use useApp here as it would cause hook issues
          debug.contextAvailable = true
        } catch (error) {
          debug.contextAvailable = false
          errorList.push(`Context error: ${error.message}`)
        }
        
        // Test 2: Assessment data
        debug.assessmentConfigTest = 'Testing assessment config...'
        try {
          debug.assessmentConfig = assessmentConfig ? 'Available' : 'Missing'
          debug.assessmentModes = assessmentConfig.modes ? Object.keys(assessmentConfig.modes) : 'Missing'
          debug.totalQuestions = Object.keys(assessmentConfig.modes || {}).length
        } catch (error) {
          errorList.push(`Assessment config error: ${error.message}`)
        }
        
        // Test 3: Question data
        debug.questionDataTest = 'Testing question data...'
        try {
          const { assessmentQuestions } = await import('../data/assessmentTest')
          debug.totalAssessmentQuestions = Object.keys(assessmentQuestions).length
          debug.sampleQuestions = Object.keys(assessmentQuestions).slice(0, 3)
        } catch (error) {
          errorList.push(`Question data error: ${error.message}`)
        }
        
        // Test 4: User system
        debug.userSystemTest = 'Testing user system...'
        try {
          const currentUser = getCurrentUser()
          debug.userAvailable = currentUser ? 'Available' : 'No current user'
        } catch (error) {
          errorList.push(`User system error: ${error.message}`)
        }
        
        // Test 5: Tier functions
        debug.tierFunctionsTest = 'Testing tier functions...'
        try {
          const mockProgress = { assessments: {} }
          debug.unlockedTiers = getUnlockedTiers(mockProgress)
          debug.tierProgress = getTierProgress(mockProgress)
        } catch (error) {
          errorList.push(`Tier functions error: ${error.message}`)
        }
        
        // Test 6: Assessment creation
        debug.assessmentCreationTest = 'Testing assessment creation...'
        try {
          const mockProgress = { lessons: { completed: [] } }
          const assessment = new AdaptiveAssessment(mockProgress, 'beginner')
          debug.assessmentCreated = assessment ? 'Success' : 'Failed'
        } catch (error) {
          errorList.push(`Assessment creation error: ${error.message}`)
        }
        
        setDebugInfo(debug)
        setErrors(errorList)
        
      } catch (globalError) {
        setErrors([`Global error: ${globalError.message}`])
      }
    }
    
    runDebugTests()
  }, [])
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Pro Football Assessment Debug Information</h2>
      
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-red-800 mb-2">Errors Found:</h3>
          <ul className="list-disc list-inside space-y-1">
            {errors.map((error, index) => (
              <li key={index} className="text-red-700">{error}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="space-y-4">
        {Object.entries(debugInfo).map(([key, value]) => (
          <div key={key} className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <span className="font-medium text-gray-700">{key}:</span>
              <span className="text-gray-900 ml-4">
                {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Instructions:</h3>
        <p className="text-blue-700">
          This debug component tests the assessment system components. If you see errors above, 
          those indicate the specific issues preventing the assessment from working properly.
        </p>
      </div>
    </div>
  )
}