import { useState, useEffect } from 'react'
import { getProgressData } from '../utils/progressTracker'

const LearningTracksPage = () => {
  const [progress, setProgress] = useState(getProgressData())

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-secondary-100 mb-4">
          Learning Tracks
        </h1>
        <p className="text-xl text-secondary-300 max-w-2xl mx-auto">
          Structured pathways to master professional football concepts. Start with Fundamentals and work your way up to Expert Analysis.
        </p>
      </div>

      {/* Progress overview */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="card text-center">
          <div className="text-2xl font-bold text-accent-600">
            {progress.lessons.completed.length}
          </div>
          <div className="text-sm text-secondary-300">Lessons Completed</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-accent-600">
            {(progress.tracks?.completed || []).length}
          </div>
          <div className="text-sm text-secondary-300">Tracks Completed</div>
        </div>
        <div className="card text-center">
          <div className="text-2xl font-bold text-accent-600">
            {Math.round(progress.stats.level)}
          </div>
          <div className="text-sm text-secondary-300">Current Level</div>
        </div>
      </div>

      {/* Fundamentals Track */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-secondary-100 mb-6">Start Here: Professional Football Fundamentals</h2>
        <div className="card border-2 border-sage-200 bg-sage-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="text-3xl mr-4">🏈</span>
              <div>
                <h3 className="text-xl font-bold text-secondary-100">Professional Football Fundamentals</h3>
                <p className="text-secondary-300 text-sm">Start here to learn the basics</p>
              </div>
            </div>
            
            <div className="text-right">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600">
                Beginner
              </span>
            </div>
          </div>

          <p className="text-secondary-200 mb-4 leading-relaxed">
            Master the essential concepts that make professional football work. Perfect for complete beginners.
          </p>

          <div className="mb-4">
            <div className="flex justify-between text-sm text-secondary-300 mb-2">
              <span>Lessons in this track:</span>
              <span>⏱️ ~15 minutes</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-sage-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">1</span>
                  <span className="font-medium">How Downs Work</span>
                </div>
                <a 
                  href="/lesson/how-downs-work"
                  className="bg-sage-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-sage-600 transition-colors"
                >
                  Start Lesson
                </a>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-sage-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">2</span>
                  <span className="font-medium">Scoring Touchdowns</span>
                </div>
                <a 
                  href="/lesson/scoring-touchdowns"
                  className="bg-sage-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-sage-600 transition-colors"
                >
                  Start Lesson
                </a>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div className="flex items-center">
                  <span className="w-6 h-6 bg-sage-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">3</span>
                  <span className="font-medium">Quarterback 101</span>
                </div>
                <a 
                  href="/lesson/quarterback-101"
                  className="bg-sage-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-sage-600 transition-colors"
                >
                  Start Lesson
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Tracks */}
      <div>
        <h2 className="text-2xl font-bold text-secondary-100 mb-6">Coming Soon</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card opacity-60 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-3xl mr-4">⚡</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-600">Offensive Strategy</h3>
                  <p className="text-gray-500 text-sm">How teams move the ball and score</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-600">
                Intermediate
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Unlock after completing Professional Football Fundamentals
            </p>
          </div>

          <div className="card opacity-60 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="text-3xl mr-4">👥</span>
                <div>
                  <h3 className="text-xl font-bold text-gray-600">Player Positions</h3>
                  <p className="text-gray-500 text-sm">What each position does and why</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-600">
                Intermediate
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Unlock after completing Professional Football Fundamentals
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LearningTracksPage