import React, { useState, useRef, useEffect } from 'react'

const VideoPlayerWithScript = ({ lesson }) => {
  const [currentTime, setCurrentTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const [showCaptions, setShowCaptions] = useState(true)
  const [showScript, setShowScript] = useState(true)
  const videoRef = useRef(null)
  const progressRef = useRef(null)

  const parseTimestamp = (timestamp) => {
    const [start] = timestamp.split('-')
    const [minutes, seconds] = start.split(':').map(Number)
    return minutes * 60 + seconds
  }

  const parseEndTimestamp = (timestamp) => {
    const [, end] = timestamp.split('-')
    const [minutes, seconds] = end.split(':').map(Number)
    return minutes * 60 + seconds
  }

  useEffect(() => {
    if (lesson?.script?.sections) {
      const current = lesson.script.sections.findIndex((section, index) => {
        const startTime = parseTimestamp(section.timestamp)
        const nextSection = lesson.script.sections[index + 1]
        const endTime = nextSection ? parseTimestamp(nextSection.timestamp) : lesson.duration
        return currentTime >= startTime && currentTime < endTime
      })
      if (current !== -1 && current !== currentSection) {
        setCurrentSection(current)
      }
    }
  }, [currentTime, lesson, currentSection])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const jumpToSection = (sectionIndex) => {
    const timestamp = lesson.script.sections[sectionIndex].timestamp
    const startTime = parseTimestamp(timestamp)
    setCurrentTime(startTime)
    setCurrentSection(sectionIndex)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleProgressClick = (e) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const width = rect.width
      const newTime = (clickX / width) * lesson.duration
      setCurrentTime(newTime)
    }
  }

  // Simulate video playback
  useEffect(() => {
    let interval
    if (isPlaying && currentTime < lesson.duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= lesson.duration) {
            setIsPlaying(false)
            return lesson.duration
          }
          return prev + 0.1
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, lesson.duration])

  const currentSectionData = lesson?.script?.sections?.[currentSection]
  const progressPercentage = (currentTime / lesson.duration) * 100

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Video Player Area */}
      <div className="relative bg-black aspect-video">
        {/* Placeholder for actual video */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy to-secondary-100 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-6xl mb-4">🏈</div>
            <h3 className="text-xl font-bold mb-2">{lesson.title}</h3>
            <p className="text-sm opacity-75 max-w-md">{lesson.subtitle}</p>
            
            {/* Simulated video content overlay */}
            <div className="mt-8 bg-black bg-opacity-50 rounded-lg p-4 max-w-lg">
              <div className="text-lg font-bold mb-2">
                {currentSectionData?.title || "Introduction"}
              </div>
              <div className="text-sm opacity-90">
                {currentSectionData?.onScreen || "Video content would appear here"}
              </div>
            </div>
          </div>
        </div>

        {/* Caption overlay */}
        {showCaptions && currentSectionData && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-black bg-opacity-80 text-white p-3 rounded-lg text-center">
              <p className="text-sm leading-relaxed">
                {currentSectionData.content}
              </p>
            </div>
          </div>
        )}

        {/* Play/Pause overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-4 transition-all duration-200 backdrop-blur-sm"
          >
            {isPlaying ? (
              <div className="w-8 h-8 flex">
                <div className="w-1 h-8 bg-white mr-2"></div>
                <div className="w-1 h-8 bg-white"></div>
              </div>
            ) : (
              <div className="w-0 h-0 border-l-8 border-l-white border-y-4 border-y-transparent ml-1"></div>
            )}
          </button>
        </div>
      </div>

      {/* Video controls */}
      <div className="p-4 bg-gray-100">
        <div className="flex items-center space-x-4">
          <button 
            onClick={togglePlay}
            className="bg-sage-500 hover:bg-sage-600 text-white px-4 py-2 rounded transition-colors"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          
          <div className="flex-1">
            <div 
              ref={progressRef}
              className="relative bg-gray-300 rounded-full h-2 cursor-pointer"
              onClick={handleProgressClick}
            >
              <div 
                className="absolute left-0 top-0 bg-sage-500 h-full rounded-full transition-all duration-100"
                style={{ width: `${progressPercentage}%` }}
              ></div>
              
              {/* Section markers */}
              {lesson.script.sections.map((section, index) => {
                const startTime = parseTimestamp(section.timestamp)
                const position = (startTime / lesson.duration) * 100
                return (
                  <div 
                    key={index}
                    className="absolute top-0 w-1 h-2 bg-warmGold rounded cursor-pointer hover:bg-yellow-600"
                    style={{ left: `${position}%` }}
                    onClick={(e) => {
                      e.stopPropagation()
                      jumpToSection(index)
                    }}
                    title={section.title}
                  ></div>
                )
              })}
            </div>
          </div>
          
          <div className="text-sm text-gray-600 font-mono">
            {formatTime(currentTime)} / {formatTime(lesson.duration)}
          </div>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowCaptions(!showCaptions)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                showCaptions 
                  ? 'bg-blush-500 text-white' 
                  : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
              }`}
            >
              CC
            </button>
            <button 
              onClick={() => setShowScript(!showScript)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                showScript 
                  ? 'bg-blush-500 text-white' 
                  : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
              }`}
            >
              Script
            </button>
          </div>
        </div>
      </div>

      {/* Script sections panel */}
      {showScript && (
        <div className="border-t border-gray-200">
          <div className="p-4">
            <h4 className="font-bold text-navy mb-3">Script Sections</h4>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {lesson.script.sections.map((section, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    index === currentSection 
                      ? 'bg-sage-100 border border-sage-300' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => jumpToSection(index)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-navy">{section.title}</h5>
                    <span className="text-xs text-gray-500 font-mono">
                      {section.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {section.content}
                  </p>
                  {section.onScreen && (
                    <div className="mt-2 text-xs text-blush-600 italic">
                      On screen: {section.onScreen}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoPlayerWithScript