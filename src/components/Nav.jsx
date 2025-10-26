import React, { useState, memo } from 'react'
import { useSimpleRouter } from '../App'

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { navigate, currentPath } = useSimpleRouter()
  
  const handleNavigate = (path) => {
    console.log('Nav button clicked for path:', path)
    navigate(path)
  }

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-primary-100 sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-accent-400 to-accent-600 rounded-xl flex items-center justify-center mr-3">
                <span className="text-white font-bold text-lg">⚡</span>
              </div>
              <span className="font-display font-bold text-xl text-secondary-100">Kickoff Club</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              <button 
                onClick={() => handleNavigate('/')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 ${
                  currentPath === '/' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600'
                }`}
                aria-current={currentPath === '/' ? 'page' : undefined}
                aria-label="Go to Home page"
              >
                Home
              </button>
              <button 
                onClick={() => handleNavigate('/platform')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 ${
                  currentPath === '/platform' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600'
                }`}
              >
                Platform
              </button>
              <button 
                onClick={() => handleNavigate('/lessons')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 ${
                  currentPath === '/lessons' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600'
                }`}
              >
                Lessons
              </button>
              <button 
                onClick={() => handleNavigate('/tracks')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 ${
                  currentPath === '/tracks' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600'
                }`}
              >
                Learning Tracks
              </button>
              <button 
                onClick={() => handleNavigate('/demo')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 ${
                  currentPath === '/demo' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600'
                }`}
              >
                Interactive Demo
              </button>
              <button 
                onClick={() => handleNavigate('/assessment')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 ${
                  currentPath === '/assessment' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600'
                }`}
              >
                Assessment
              </button>
              {/* Community - Coming Soon
              <button 
                onClick={() => handleNavigate('/community')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 ${
                  currentPath === '/community' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600'
                }`}
              >
                Community
              </button> */}
              <button 
                onClick={() => handleNavigate('/video-creator')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 ${
                  currentPath === '/video-creator' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600'
                }`}
              >
                🎬 Video Creator
              </button>
              <button 
                onClick={() => handleNavigate('/profile')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 ${
                  currentPath === '/profile' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600'
                }`}
              >
                Profile
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-xl text-secondary-100 hover:text-accent-600 hover:bg-primary-50"
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-primary-100">
              <button
                onClick={() => {navigate('/'); setIsMenuOpen(false)}}
                className={`w-full text-left px-3 py-2 rounded-xl text-base font-medium transition-all duration-200 ${
                  currentPath === '/' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600 hover:bg-primary-50'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {navigate('/platform'); setIsMenuOpen(false)}}
                className={`w-full text-left px-3 py-2 rounded-xl text-base font-medium transition-all duration-200 ${
                  currentPath === '/platform' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600 hover:bg-primary-50'
                }`}
              >
                Platform
              </button>
              <button
                onClick={() => {navigate('/lessons'); setIsMenuOpen(false)}}
                className={`w-full text-left px-3 py-2 rounded-xl text-base font-medium transition-all duration-200 ${
                  currentPath === '/lessons' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600 hover:bg-primary-50'
                }`}
              >
                Lessons
              </button>
              <button
                onClick={() => {navigate('/tracks'); setIsMenuOpen(false)}}
                className={`w-full text-left px-3 py-2 rounded-xl text-base font-medium transition-all duration-200 ${
                  currentPath === '/tracks' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600 hover:bg-primary-50'
                }`}
              >
                Learning Tracks
              </button>
              <button
                onClick={() => {navigate('/demo'); setIsMenuOpen(false)}}
                className={`w-full text-left px-3 py-2 rounded-xl text-base font-medium transition-all duration-200 ${
                  currentPath === '/demo' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600 hover:bg-primary-50'
                }`}
              >
                Interactive Demo
              </button>
              <button
                onClick={() => {navigate('/assessment'); setIsMenuOpen(false)}}
                className={`w-full text-left px-3 py-2 rounded-xl text-base font-medium transition-all duration-200 ${
                  currentPath === '/assessment' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600 hover:bg-primary-50'
                }`}
              >
                Assessment
              </button>
              {/* Community - Coming Soon
              <button
                onClick={() => {navigate('/community'); setIsMenuOpen(false)}}
                className={`w-full text-left px-3 py-2 rounded-xl text-base font-medium transition-all duration-200 ${
                  currentPath === '/community' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600 hover:bg-primary-50'
                }`}
              >
                Community
              </button> */}
              <button
                onClick={() => {navigate('/video-creator'); setIsMenuOpen(false)}}
                className={`w-full text-left px-3 py-2 rounded-xl text-base font-medium transition-all duration-200 ${
                  currentPath === '/video-creator' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600 hover:bg-primary-50'
                }`}
              >
                🎬 Video Creator
              </button>
              <button
                onClick={() => {navigate('/profile'); setIsMenuOpen(false)}}
                className={`w-full text-left px-3 py-2 rounded-xl text-base font-medium transition-all duration-200 ${
                  currentPath === '/profile' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600 hover:bg-primary-50'
                }`}
              >
                Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default memo(Nav)