import React from 'react'
import { useSimpleRouter } from '../App'

export default function NotFound() {
  const { navigate } = useSimpleRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-50 to-sage-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-8xl mb-4">🏈</div>
          <h1 className="text-6xl font-bold text-secondary-100 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-secondary-200 mb-4">
            Oops! That play didn't work
          </h2>
          <p className="text-secondary-300 mb-8">
            Looks like this page fumbled the ball. Let's get you back in the game!
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full px-6 py-3 bg-blush-500 text-white rounded-xl hover:bg-blush-600 transition-all duration-200 transform hover:scale-105 font-medium shadow-sm"
          >
            🏠 Go Home
          </button>
          <button
            onClick={() => navigate('/platform')}
            className="w-full px-6 py-3 bg-white border-2 border-blush-300 text-blush-600 rounded-xl hover:bg-blush-50 hover:border-blush-400 transition-all duration-200 font-medium"
          >
            📚 Browse Lessons
          </button>
          <button
            onClick={() => navigate('/assessment')}
            className="w-full px-6 py-3 bg-white border-2 border-accent-300 text-accent-600 rounded-xl hover:bg-accent-50 hover:border-accent-400 transition-all duration-200 font-medium"
          >
            📝 Take Assessment
          </button>
        </div>

        <div className="mt-8 p-4 bg-white/60 backdrop-blur-sm rounded-xl border border-blush-200">
          <p className="text-sm text-secondary-300">
            💡 <strong>Quick tip:</strong> Use the navigation menu at the top to find what you're looking for!
          </p>
        </div>
      </div>
    </div>
  )
}
