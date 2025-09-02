import React, { useState } from 'react'

export default function BadgeModal({ isOpen, onClose, badgeTitle = "First-Play Expert" }) {
  const [copied, setCopied] = useState(false)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleDownload = () => {
    // Simulate downloading the badge SVG
    const link = document.createElement('a')
    link.href = '/assets/badge-first-play.svg'
    link.download = 'first-play-expert-badge.svg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full mx-auto transform animate-slide-up border border-gray-200">
        {/* Header */}
        <div className="text-center p-6 pb-4">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            aria-label="Close modal"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Celebration */}
          <div className="mb-4">
            <div className="text-4xl mb-2">🎉</div>
            <h2 className="font-semibold text-2xl text-gray-900 mb-2">Congratulations!</h2>
            <p className="text-gray-600 font-medium">You've earned your first badge</p>
          </div>
        </div>

        {/* Badge Display */}
        <div className="px-6 pb-4">
          <div className="relative mx-auto w-32 h-32 mb-4">
            {/* Badge SVG placeholder with warm design */}
            <div className="w-full h-full bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
              <div className="text-center">
                <div className="text-2xl mb-1">🏈</div>
                <div className="text-white font-bold text-xs">EXPERT</div>
              </div>
            </div>
            
            {/* Sparkle effects */}
            <div className="absolute -top-2 -right-2 text-primary-500 text-xl animate-bounce">✨</div>
            <div className="absolute -bottom-2 -left-2 text-secondary-500 text-lg animate-bounce" style={{animationDelay: '0.5s'}}>⭐</div>
            <div className="absolute top-1/4 -left-3 text-primary-400 text-sm animate-bounce" style={{animationDelay: '1s'}}>💫</div>
          </div>

          {/* Badge Title */}
          <div className="text-center mb-6">
            <h3 className="font-semibold text-xl text-gray-900 mb-1">{badgeTitle}</h3>
            <p className="text-sm text-gray-600 font-medium">You've mastered the basics of NFL scoring!</p>
          </div>
        </div>

        {/* Share Actions */}
        <div className="p-6 pt-0">
          <div className="space-y-3">
            <button
              onClick={handleCopyLink}
              className="btn-primary w-full"
            >
              <span className="flex items-center justify-center">
                {copied ? (
                  <>
                    <span className="text-lg mr-2">✓</span>
                    Link Copied!
                  </>
                ) : (
                  <>
                    <span className="text-lg mr-2">🔗</span>
                    Share Achievement
                  </>
                )}
              </span>
            </button>

            <button
              onClick={handleDownload}
              className="btn-secondary w-full"
            >
              <span className="flex items-center justify-center">
                <span className="text-lg mr-2">⬇️</span>
                Download Badge
              </span>
            </button>
          </div>

          {/* Close action */}
          <div className="mt-4 text-center">
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors duration-200"
            >
              Continue Learning
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-8 left-8 w-4 h-4 bg-primary-300/30 rounded-full animate-pulse"></div>
        <div className="absolute -top-4 right-12 w-3 h-3 bg-secondary-400/40 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute -bottom-6 right-8 w-5 h-5 bg-primary-300/30 rounded-full animate-pulse" style={{animationDelay: '2.5s'}}></div>
      </div>
    </div>
  )
}
