import React from 'react'
import Hero from '../components/Hero'
import LessonCard from '../components/LessonCard'
import { allLessons } from '../data/lessonsIndex'
import { trackEvent } from '../analytics'

export default function Home() {
  function start() {
    const first = allLessons[0]
    trackEvent('lesson_started', { lesson: first.id })
    window.location.href = `/lesson/${first.id}`
  }

  function goToLessons() {
    window.location.href = '/lessons'
  }

  return (
    <div>
      <Hero onStart={start}/>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Featured Lessons */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-100 mb-4">Start Your NFL Journey</h2>
          <p className="text-xl text-secondary-200 mb-8">
            Master the basics with our bite-sized lessons designed for complete beginners
          </p>
          <button onClick={goToLessons} className="btn-primary text-lg px-8 py-4">
            View All Lessons →
          </button>
        </div>

        {/* Sample Lesson Cards */}
        <h3 className="text-2xl font-semibold text-secondary-100 mb-6">Featured Lessons</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {allLessons.slice(0, 3).map(lesson => (
            <LessonCard 
              key={lesson.id} 
              lesson={lesson}
              onClick={() => window.location.href = `/lesson/${lesson.id}`}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center p-8 bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl">
          <h3 className="text-2xl font-bold text-secondary-100 mb-4">
            Ready to become an NFL expert?
          </h3>
          <p className="text-secondary-200 mb-6">
            Join thousands of fans who've gone from confused to confident
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={goToLessons} className="btn-primary">
              Start Learning Now
            </button>
            <button 
              onClick={() => window.location.href = '/profile'}
              className="btn-secondary"
            >
              View Your Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
