// Advanced accessibility toolbar for user control
import React, { useState, useRef, useEffect } from 'react'
import { useAccessibility } from '../hooks/useAccessibility'

const AccessibilityToolbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const { preferences, adjustFontSize, announce } = useAccessibility()
  const toolbarRef = useRef(null)
  const triggerRef = useRef(null)

  // Show toolbar when user starts using keyboard navigation
  useEffect(() => {
    let keyboardUsageCount = 0
    
    const handleKeyDown = (e) => {
      if (e.key === 'Tab' || e.key === 'Enter' || e.key === ' ' || e.key.startsWith('Arrow')) {
        keyboardUsageCount++
        if (keyboardUsageCount >= 3 && !isVisible) {
          setIsVisible(true)
          announce('Accessibility toolbar available. Press Alt+A to access.')
        }
      }
    }
    
    // Global keyboard shortcut Alt+A
    const handleGlobalShortcut = (e) => {
      if (e.altKey && e.key.toLowerCase() === 'a') {
        e.preventDefault()
        setIsVisible(true)
        setIsOpen(true)
        setTimeout(() => triggerRef.current?.focus(), 100)
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keydown', handleGlobalShortcut)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keydown', handleGlobalShortcut)
    }
  }, [announce, isVisible])

  if (!isVisible) return null
  
  return (
    <div
      ref={toolbarRef}
      className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
        isOpen ? 'w-80' : 'w-auto'
      }`}
      role="complementary"
      aria-label="Accessibility toolbar"
    >
      {/* Floating Trigger Button */}
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12 bg-accent-600 hover:bg-accent-700 text-white rounded-full shadow-lg transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-accent-300"
        aria-label={`${isOpen ? 'Close' : 'Open'} accessibility toolbar`}
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      </button>
      
      {/* Expanded Toolbar Panel */}
      {isOpen && (
        <div
          id="accessibility-panel"
          className="absolute top-14 right-0 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 animate-slide-down"
          role="dialog"
          aria-labelledby="accessibility-title"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 id="accessibility-title" className="text-lg font-bold text-gray-900 flex items-center">
              <svg className="w-5 h-5 mr-2 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              Accessibility
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-accent-500"
              aria-label="Close accessibility toolbar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Font Size Controls */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Text Size
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['small', 'normal', 'large', 'extra-large'].map(size => (
                  <button
                    key={size}
                    onClick={() => adjustFontSize(size)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-500 ${
                      preferences.fontSize === size
                        ? 'bg-accent-100 border-accent-300 text-accent-700'
                        : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                    }`}
                    aria-pressed={preferences.fontSize === size}
                  >
                    {size === 'extra-large' ? 'XL' : size.charAt(0).toUpperCase() + size.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Press <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs font-mono">Alt+A</kbd> anytime to access this toolbar
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default AccessibilityToolbar