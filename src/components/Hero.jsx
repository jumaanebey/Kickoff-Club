import React, { memo } from 'react'

function Hero({ onStart, navigate }) {
  // Brand message - consistent and locked in
  const currentMessage = {
    title: "Love the vibe. Learn the game.",
    subtitle: "Football explained simply - no judgment, no gatekeeping. From \"what's a down?\" to \"that's holding!\" in bite-sized lessons that actually make sense."
  }
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blush-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary-200 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-accent-200 rounded-full blur-xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-rose-300 rounded-full blur-xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-accent-100 to-primary-100 text-accent-700 text-sm font-medium mb-6 shadow-sm">
              <span className="mr-2">⚡</span>
              New Fan? Start Here
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-100 leading-tight mb-6">
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent font-extrabold tracking-tight">
                Love the vibe.
              </span>
              <br />
              <span className="text-secondary-100">
                Learn the game.
              </span>
            </h1>
            
            <p className="text-xl text-secondary-200 mb-8 max-w-2xl mx-auto lg:mx-0">
              {currentMessage.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onStart}
                aria-label="Start learning"
                className="btn-primary text-lg px-8 py-4 group"
              >
                <span className="flex items-center">
                  Start Learning Now ✨
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-secondary-300">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  <div className="w-8 h-8 rounded-full bg-accent-400 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-primary-400 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-rose-400 border-2 border-white"></div>
                </div>
                <span>Start learning today (no silly questions!)</span>
              </div>

              <div className="flex items-center">
                <span className="text-warning-500 mr-1">✨</span>
                <span>Free • 7 lessons • Easy to follow</span>
              </div>
            </div>
          </div>

          {/* Video/Visual */}
          <div className="relative lg:order-last animate-slide-up">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-primary-200 to-accent-200 rounded-3xl -rotate-6 blur-lg opacity-50"></div>

              {/* Main video container - clickable */}
              <button
                onClick={() => navigate('/platform')}
                className="relative bg-white rounded-3xl shadow-2xl p-2 transform hover:rotate-1 hover:scale-105 transition-all duration-500 w-full cursor-pointer"
                aria-label="Go to video lessons"
              >
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-primary-100 to-accent-100">
                  <div className="w-full h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-4xl">🏈</span>
                      </div>
                      <p className="text-lg font-bold text-secondary-100">Video Lessons</p>
                      <p className="text-sm text-secondary-200 mt-2">Quick & Easy to Learn</p>
                    </div>
                  </div>
                </div>
              </button>

              {/* Floating elements */}

              <div className="absolute -top-6 -left-8 bg-green-500 text-white rounded-xl p-3 shadow-lg transform -rotate-12 animate-wiggle">
                <span className="text-sm font-bold">Quick & Easy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default memo(Hero)
