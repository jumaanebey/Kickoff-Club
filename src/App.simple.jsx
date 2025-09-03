import React from 'react'
import Nav from './components/Nav'
import Home from './pages/Home'
import SimpleLessonPage from './pages/SimpleLessonPage'
import LessonsPage from './pages/LessonsPage'
import ProfilePage from './pages/ProfilePage'

function SimpleTestPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-secondary-100 mb-4">
        🎯 Enhanced Learning Tracks
      </h1>
      <p className="text-xl text-secondary-300 mb-8">
        Structured pathways to master football concepts
      </p>
      
      <div className="card mb-6">
        <h2 className="text-2xl font-bold text-secondary-100 mb-4">✅ Features Completed</h2>
        <ul className="space-y-2 text-secondary-200">
          <li>📚 Enhanced lesson content with production-ready scripts</li>
          <li>🎮 Interactive simulator previews</li>
          <li>🏆 Advanced badge system (25+ new badges)</li>
          <li>📊 Structured learning pathways</li>
          <li>🎯 Scenario-based challenges</li>
          <li>📹 Enhanced video player with script sync</li>
        </ul>
      </div>

      <div className="card border-2 border-sage-200 bg-sage-50">
        <h3 className="text-xl font-bold text-secondary-100 mb-4">🏈 NFL Fundamentals Track</h3>
        <p className="text-secondary-200 mb-4">
          Master the essential concepts that make football work. Perfect for complete beginners.
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <div className="flex items-center">
              <span className="w-6 h-6 bg-sage-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">1</span>
              <span className="font-medium">How Downs Work</span>
            </div>
            <a 
              href="/lesson/how-downs-work"
              className="bg-sage-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-sage-600 transition-colors"
            >
              View Enhanced Lesson
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
              View Enhanced Lesson
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
              View Enhanced Lesson
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Router() {
  const path = window.location.pathname
  
  if (path.startsWith('/lesson/')) {
    return <SimpleLessonPage />
  }
  if (path === '/lessons') {
    return <LessonsPage />
  }
  if (path === '/tracks') {
    return <SimpleTestPage />
  }
  if (path === '/profile') {
    return <ProfilePage />
  }
  
  return <Home />
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-grow">
        <Router />
      </div>
    </div>
  )
}