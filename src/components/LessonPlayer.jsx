import React, { useState, useEffect, useRef } from 'react'
import { trackEvent } from '../analytics'

export default function LessonPlayer({ lesson, onComplete }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showScript, setShowScript] = useState(false)
  const videoRef = useRef(null)
  const progressRef = useRef(null)

  // Convert timestamp to seconds
  const parseTimestamp = (timestamp) => {
    const [start] = timestamp.split('-')
    const [minutes, seconds] = start.split(':').map(Number)
    return minutes * 60 + seconds
  }

  // Auto-advance through script sections
  useEffect(() => {
    if (!isPlaying) return

    const currentSectionData = lesson.script.sections[currentSection]
    if (!currentSectionData) return

    const endTime = parseTimestamp(currentSectionData.timestamp.split('-')[1])
    const startTime = parseTimestamp(currentSectionData.timestamp.split('-')[0])
    const duration = (endTime - startTime) * 1000 // Convert to milliseconds

    const timer = setTimeout(() => {
      if (currentSection < lesson.script.sections.length - 1) {
        setCurrentSection(currentSection + 1)
      } else {
        setIsPlaying(false)
        setProgress(100)
        onComplete && onComplete()
        trackEvent('lesson_completed', { lesson_id: lesson.id })
      }
    }, duration)

    return () => clearTimeout(timer)
  }, [currentSection, isPlaying, lesson, onComplete])

  // Update progress
  useEffect(() => {
    const newProgress = ((currentSection + (isPlaying ? 0.5 : 0)) / lesson.script.sections.length) * 100
    setProgress(newProgress)
  }, [currentSection, isPlaying, lesson.script.sections.length])

  const handlePlay = () => {
    if (!isPlaying) {
      trackEvent('lesson_started', { lesson_id: lesson.id })
    }
    setIsPlaying(!isPlaying)
  }

  const handleSectionClick = (index) => {
    setCurrentSection(index)
    setIsPlaying(false)
  }

  const currentSectionData = lesson.script.sections[currentSection]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Video/Visual Area */}
      <div className="relative bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl overflow-hidden mb-6 aspect-video">
        {/* Video element (placeholder for now) */}
        <video 
          ref={videoRef}
          className="w-full h-full object-cover"
          poster={lesson.thumbnailUrl}
          aria-label={`${lesson.title} video lesson`}
        >
          <source src={lesson.videoUrl} type="video/mp4" />
          <track
            kind="captions"
            src={lesson.captionsUrl}
            srcLang="en"
            label="English captions"
            default
          />
          Your browser does not support the video tag.
        </video>

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <div className="text-center text-white max-w-2xl px-6">
            <h1 className="text-2xl md:text-4xl font-bold mb-4">{lesson.title}</h1>
            <p className="text-lg md:text-xl opacity-90 mb-6">{lesson.subtitle}</p>
            
            {/* Play Button */}
            <button
              onClick={handlePlay}
              className="w-16 h-16 bg-accent-500 hover:bg-accent-600 rounded-full flex items-center justify-center text-white text-2xl transition-all duration-200 transform hover:scale-105 shadow-lg"
              aria-label={isPlaying ? 'Pause lesson' : 'Play lesson'}
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
          <div 
            className="h-full bg-accent-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Current Section Content */}
      <div className="card mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center mr-4">
              <span className="text-accent-600 font-bold">{currentSection + 1}</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-secondary-100">{currentSectionData?.title}</h3>
              <p className="text-sm text-secondary-300">{currentSectionData?.timestamp}</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowScript(!showScript)}
            className="text-sm text-accent-600 hover:text-accent-700 font-medium"
          >
            {showScript ? 'Hide Script' : 'Show Script'}
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-secondary-200 leading-relaxed text-lg">
            {currentSectionData?.content}
          </p>
          
          {currentSectionData?.onScreen && (
            <div className="p-4 bg-primary-50 rounded-xl border border-primary-200">
              <p className="text-sm text-secondary-300 mb-1">On Screen:</p>
              <p className="text-secondary-200 italic">{currentSectionData.onScreen}</p>
            </div>
          )}
        </div>
      </div>

      {/* Script Navigation */}
      <div className="card mb-6">
        <h4 className="font-semibold text-secondary-100 mb-4">Lesson Sections</h4>
        <div className="space-y-2">
          {lesson.script.sections.map((section, index) => (
            <button
              key={index}
              onClick={() => handleSectionClick(index)}
              className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                index === currentSection
                  ? 'bg-accent-100 border-2 border-accent-500 text-accent-800'
                  : index < currentSection
                    ? 'bg-primary-50 border border-primary-200 text-secondary-200'
                    : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-primary-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="text-sm font-medium mr-3">{section.timestamp}</span>
                    <span className="font-semibold">{section.title}</span>
                  </div>
                  {showScript && (
                    <p className="text-sm opacity-75 mt-2">{section.content}</p>
                  )}
                </div>
                <div className="ml-4">
                  {index < currentSection ? (
                    <span className="text-accent-500">✓</span>
                  ) : index === currentSection && isPlaying ? (
                    <span className="text-accent-500">▶️</span>
                  ) : null}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lesson Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-secondary-300">
            {Math.round(progress)}% complete
          </span>
          <span className="text-sm text-secondary-300">
            Section {currentSection + 1} of {lesson.script.sections.length}
          </span>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className="btn-secondary text-sm py-2 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          
          <button
            onClick={() => {
              if (currentSection < lesson.script.sections.length - 1) {
                setCurrentSection(currentSection + 1)
              } else {
                onComplete && onComplete()
              }
            }}
            className="btn-primary text-sm py-2 px-4"
          >
            {currentSection < lesson.script.sections.length - 1 ? 'Next →' : 'Complete Lesson'}
          </button>
        </div>
      </div>
    </div>
  )
}