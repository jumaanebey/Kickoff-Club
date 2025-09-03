import React, { useState } from 'react'
import { useRouter } from '../hooks/useRouter'

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { navigate, currentRoute } = useRouter()

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-primary-100 sticky top-0 z-50">
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
                onClick={() => navigate('/')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 ${
                  currentRoute.path === '/' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => navigate('/lessons')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 ${
                  currentRoute.path === '/lessons' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600'
                }`}
              >
                Lessons
              </button>
              <button 
                onClick={() => navigate('/tracks')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 ${
                  currentRoute.path === '/tracks' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600'
                }`}
              >
                Learning Tracks
              </button>
              <button 
                onClick={() => navigate('/demo')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 ${
                  currentRoute.path === '/demo' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600'
                }`}
              >
                Demo
              </button>
              <button 
                onClick={() => navigate('/assessment')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 ${
                  currentRoute.path === '/assessment' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600'
                }`}
              >
                Assessment
              </button>
              <button 
                onClick={() => navigate('/community')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 ${
                  currentRoute.path === '/community' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600'
                }`}
              >
                Community
              </button>
              <button 
                onClick={() => navigate('/profile')}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 ${
                  currentRoute.path === '/profile' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600'
                }`}
              >
                Profile
              </button>
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <button className="btn-primary text-sm">
              Start Learning
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-secondary-100 hover:text-secondary-100 hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-accent-500 p-2 rounded-lg transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-slide-down">
          <div className="px-4 pt-2 pb-4 space-y-2 bg-white border-t border-primary-100">
            <button
              onClick={() => {navigate('/'); setIsMenuOpen(false)}}
              className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentRoute.path === '/' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600 hover:bg-primary-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => {navigate('/lessons'); setIsMenuOpen(false)}}
              className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentRoute.path === '/lessons' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600 hover:bg-primary-50'
              }`}
            >
              Lessons
            </button>
            <button
              onClick={() => {navigate('/tracks'); setIsMenuOpen(false)}}
              className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentRoute.path === '/tracks' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600 hover:bg-primary-50'
              }`}
            >
              Learning Tracks
            </button>
            <button
              onClick={() => {navigate('/demo'); setIsMenuOpen(false)}}
              className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentRoute.path === '/demo' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600 hover:bg-primary-50'
              }`}
            >
              Demo
            </button>
            <button
              onClick={() => {navigate('/assessment'); setIsMenuOpen(false)}}
              className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentRoute.path === '/assessment' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600 hover:bg-primary-50'
              }`}
            >
              Assessment
            </button>
            <button
              onClick={() => {navigate('/community'); setIsMenuOpen(false)}}
              className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentRoute.path === '/community' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600 hover:bg-primary-50'
              }`}
            >
              Community
            </button>
            <button
              onClick={() => {navigate('/profile'); setIsMenuOpen(false)}}
              className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                currentRoute.path === '/profile' ? 'text-accent-600 bg-primary-50' : 'text-secondary-100 hover:text-accent-600 hover:bg-primary-50'
              }`}
            >
              Profile
            </button>
            <div className="pt-2">
              <button className="btn-primary w-full text-sm">
                Start Learning
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
