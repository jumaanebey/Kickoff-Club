import React from 'react'
import { useSimpleRouter } from '../App'

export default function ProfilePage() {
  const { navigate } = useSimpleRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-50 via-white to-sage-50 flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-accent-100 to-primary-100 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-6xl">👤</span>
          </div>
        </div>

        {/* Coming Soon Badge */}
        <div className="inline-block bg-accent-100 text-accent-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
          Coming Soon
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-bold text-secondary-100 mb-4">
          User Profiles
        </h1>

        {/* Description */}
        <p className="text-xl text-secondary-200 mb-8 max-w-xl mx-auto">
          We're working on something special! Soon you'll be able to create your profile, track your progress, earn badges, and connect with other football learners.
        </p>

        {/* Features List */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-primary-100">
          <h3 className="text-xl font-semibold text-secondary-100 mb-6">What's Coming:</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            <div className="flex items-start">
              <span className="text-2xl mr-3">📊</span>
              <div>
                <p className="font-medium text-secondary-100">Progress Tracking</p>
                <p className="text-sm text-secondary-300">See your learning journey</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">🏆</span>
              <div>
                <p className="font-medium text-secondary-100">Badges & Achievements</p>
                <p className="text-sm text-secondary-300">Earn rewards as you learn</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">🔥</span>
              <div>
                <p className="font-medium text-secondary-100">Learning Streaks</p>
                <p className="text-sm text-secondary-300">Build consistent habits</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-2xl mr-3">🤝</span>
              <div>
                <p className="font-medium text-secondary-100">Social Features</p>
                <p className="text-sm text-secondary-300">Connect with other learners</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/platform')}
            className="btn-primary text-lg px-8 py-4"
          >
            Browse Lessons
          </button>
          <button
            onClick={() => navigate('/assessment')}
            className="btn-secondary text-lg px-8 py-4"
          >
            Take Assessment
          </button>
        </div>

        {/* Newsletter Signup Note */}
        <p className="mt-8 text-sm text-secondary-300">
          Want to be notified when profiles launch? Sign up for our newsletter in the footer below!
        </p>
      </div>
    </div>
  )
}
