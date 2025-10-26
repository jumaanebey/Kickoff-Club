// Adaptive loading component with accessibility
import React, { memo } from 'react'

const LoadingSpinner = ({ size = 'medium', message = 'Loading...', minimal = false }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  if (minimal) {
    return (
      <div 
        className="inline-flex items-center justify-center"
        role="status" 
        aria-label={message}
      >
        <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-accent-200 border-t-accent-600`}></div>
        <span className="sr-only">{message}</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] py-12">
      <div 
        className={`${sizeClasses[size]} animate-spin rounded-full border-3 border-accent-200 border-t-accent-600 mb-4`}
        role="status" 
        aria-label="Loading"
      ></div>
      
      <p className="text-gray-600 font-medium animate-pulse">
        {message}
      </p>
      
      <div className="flex space-x-1 mt-3">
        <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
        <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
        <div className="w-2 h-2 bg-accent-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
      </div>
      
      <span className="sr-only">{message}</span>
    </div>
  )
}

export default memo(LoadingSpinner)