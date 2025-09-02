import React from 'react'

export default function Hero({ onStart }) {
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
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-secondary-100 text-sm font-medium mb-6">
              <span className="mr-2">🏈</span>
              New to NFL? We've got you covered
            </div>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-100 leading-tight mb-6">
              Love the vibe.{' '}
              <span className="bg-gradient-to-r from-accent-600 to-rose-600 bg-clip-text text-transparent">
                Learn the game.
              </span>
            </h1>
            
            <p className="text-xl text-secondary-200 mb-8 max-w-2xl mx-auto lg:mx-0">
              Bite-size lessons that turn NFL chaos into "I totally get it now." 
              Start with a 90-second explainer that actually makes sense.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={onStart} 
                aria-label="Start 90-second lesson"
                className="btn-primary text-lg px-8 py-4 group"
              >
                <span className="flex items-center">
                  Start 90-second lesson
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </span>
              </button>
              
              <a 
                href="/quiz" 
                className="btn-secondary text-lg px-8 py-4 group"
              >
                <span className="flex items-center">
                  Take the New-Fan Quiz
                  <span className="ml-2 text-accent-600">✨</span>
                </span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-secondary-300">
              <div className="flex items-center">
                <div className="flex -space-x-2 mr-3">
                  <div className="w-8 h-8 rounded-full bg-accent-400 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-primary-400 border-2 border-white"></div>
                  <div className="w-8 h-8 rounded-full bg-rose-400 border-2 border-white"></div>
                </div>
                <span>Join 1,000+ new fans learning</span>
              </div>
              
              <div className="flex items-center">
                <span className="text-warning-500 mr-1">⭐⭐⭐⭐⭐</span>
                <span>4.9/5 from complete beginners</span>
              </div>
            </div>
          </div>

          {/* Video/Visual */}
          <div className="relative lg:order-last animate-slide-up">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-primary-200 to-accent-200 rounded-3xl -rotate-6 blur-lg opacity-50"></div>
              
              {/* Main video container */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-2 transform hover:rotate-1 transition-transform duration-500">
                <div className="rounded-2xl overflow-hidden bg-gray-100">
                  <video 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="w-full h-auto" 
                    aria-hidden
                  >
                    <source src="/assets/lesson-preview.mp4" type="video/mp4" />
                    <div className="w-full h-64 bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-accent-500 rounded-full flex items-center justify-center mx-auto mb-4">
                          <span className="text-2xl">🏈</span>
                        </div>
                        <p className="text-secondary-200">Video preview coming soon</p>
                      </div>
                    </div>
                  </video>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-lg p-4 animate-bounce">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-secondary-200">Live lesson</span>
                </div>
              </div>

              <div className="absolute -top-6 -left-8 bg-accent-500 text-secondary-100 rounded-xl p-3 shadow-lg transform -rotate-12 animate-wiggle">
                <span className="text-sm font-bold">90s only!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
