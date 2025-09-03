import React, { useState, useEffect, useRef } from 'react'
import { trackEvent } from '../analytics'

export default function EnhancedVideoPlayer({ lesson, onComplete, showInteractives = true }) {
  const [currentSection, setCurrentSection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showScript, setShowScript] = useState(false)
  const [volume, setVolume] = useState(1)
  const [showCaptions, setShowCaptions] = useState(true)
  const [showQuizOverlay, setShowQuizOverlay] = useState(false)
  const [quizAnswered, setQuizAnswered] = useState(false)
  
  const videoRef = useRef(null)
  const captionsRef = useRef(null)

  // Convert timestamp to seconds
  const parseTimestamp = (timestamp) => {
    const [start] = timestamp.split('-')
    const [minutes, seconds] = start.split(':').map(Number)
    return minutes * 60 + seconds
  }

  // Get end time from timestamp
  const parseEndTimestamp = (timestamp) => {
    const [, end] = timestamp.split('-')
    const [minutes, seconds] = end.split(':').map(Number)
    return minutes * 60 + seconds
  }

  // Sync video with script sections
  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current
    
    const handleTimeUpdate = () => {
      const time = video.currentTime
      setCurrentTime(time)
      
      // Find current section based on video time
      const sectionIndex = lesson.script.sections.findIndex((section, index) => {
        const startTime = parseTimestamp(section.timestamp)
        const endTime = index < lesson.script.sections.length - 1 
          ? parseTimestamp(lesson.script.sections[index + 1].timestamp)
          : parseEndTimestamp(section.timestamp)
        
        return time >= startTime && time < endTime
      })
      
      if (sectionIndex !== -1 && sectionIndex !== currentSection) {
        setCurrentSection(sectionIndex)
      }

      // Show quiz at end of lesson
      if (time >= duration - 5 && !quizAnswered && lesson.quiz) {
        setShowQuizOverlay(true)
        video.pause()
        setIsPlaying(false)
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      onComplete && onComplete()
      trackEvent('lesson_completed', { lesson_id: lesson.id })
    }

    const handlePlay = () => {
      setIsPlaying(true)
      if (currentTime === 0) {
        trackEvent('lesson_started', { lesson_id: lesson.id })
      }
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [lesson, currentSection, duration, quizAnswered, onComplete])

  const togglePlayPause = () => {
    if (!videoRef.current) return

    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
  }

  const skipToSection = (sectionIndex) => {
    if (!videoRef.current) return
    
    const startTime = parseTimestamp(lesson.script.sections[sectionIndex].timestamp)
    videoRef.current.currentTime = startTime
    setCurrentSection(sectionIndex)
  }

  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
    }
  }

  const seekTo = (percentage) => {
    if (!videoRef.current || !duration) return
    
    const time = (percentage / 100) * duration
    videoRef.current.currentTime = time
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleQuizAnswer = (correct) => {
    setQuizAnswered(true)
    setShowQuizOverlay(false)
    
    if (correct) {
      // Award points or badges
      trackEvent('quiz_correct', { lesson_id: lesson.id })
    }
    
    // Resume video
    if (videoRef.current) {
      videoRef.current.play()
    }
  }

  const currentSectionData = lesson.script.sections[currentSection]
  const progress = duration ? (currentTime / duration) * 100 : 0

  return (
    <div className="max-w-4xl mx-auto">
      {/* Video Player */}
      <div className="relative bg-black rounded-2xl overflow-hidden mb-6">
        <video 
          ref={videoRef}
          className="w-full aspect-video object-cover"
          poster={lesson.thumbnailUrl}
          preload="metadata"
          aria-label={`${lesson.title} video lesson`}
        >
          <source src={lesson.videoUrl} type="video/mp4" />
          <track
            ref={captionsRef}
            kind="captions"
            src={lesson.captionsUrl}
            srcLang="en"
            label="English captions"
            default={showCaptions}
          />
          Your browser does not support the video tag.
        </video>

        {/* Video Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <div 
              className="w-full h-2 bg-gray-600 rounded-full cursor-pointer"
              onClick={(e) => {
                const rect = e.target.getBoundingClientRect()
                const percentage = ((e.clientX - rect.left) / rect.width) * 100
                seekTo(percentage)
              }}
            >
              <div 
                className="h-full bg-accent-500 rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              ></div>
              {/* Section markers */}
              {lesson.script.sections.map((section, index) => {
                const startTime = parseTimestamp(section.timestamp)
                const markerPosition = duration ? (startTime / duration) * 100 : 0
                return (
                  <div
                    key={index}
                    className="absolute top-0 w-1 h-full bg-white/60"
                    style={{ left: `${markerPosition}%` }}
                  />
                )
              })}
            </div>
            
            {/* Section indicators */}
            <div className="flex justify-between text-xs text-white/60 mt-1">
              {lesson.script.sections.map((section, index) => (
                <span 
                  key={index}
                  className={`cursor-pointer hover:text-white ${
                    index === currentSection ? 'text-accent-400 font-bold' : ''
                  }`}
                  onClick={() => skipToSection(index)}
                >
                  {section.title}
                </span>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={togglePlayPause}
                className="w-12 h-12 bg-accent-500 hover:bg-accent-600 rounded-full flex items-center justify-center text-white text-xl transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? '⏸️' : '▶️'}
              </button>
              
              <div className="flex items-center space-x-2">
                <span className="text-white text-sm">🔊</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-20"
                />
              </div>
              
              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowCaptions(!showCaptions)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  showCaptions ? 'bg-accent-500 text-white' : 'bg-gray-600 text-gray-300'
                }`}
              >
                CC
              </button>
              
              <button
                onClick={() => setShowScript(!showScript)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  showScript ? 'bg-accent-500 text-white' : 'bg-gray-600 text-gray-300'
                }`}
              >
                Script
              </button>
            </div>
          </div>
        </div>

        {/* Quiz Overlay */}
        {showQuizOverlay && lesson.quiz && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-6">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-navy mb-4">Quick Check!</h3>
              <p className="text-gray-700 mb-4">{lesson.quiz.question}</p>
              <div className="space-y-2">
                {lesson.quiz.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuizAnswer(index === lesson.quiz.correctIndex)}
                    className="w-full text-left p-3 rounded-lg border hover:bg-sage-50 transition-colors"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Current Section Display */}
      {showScript && currentSectionData && (
        <div className="card mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-accent-100 rounded-xl flex items-center justify-center mr-4">
                <span className="text-accent-600 font-bold">{currentSection + 1}</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-secondary-100">{currentSectionData.title}</h3>
                <p className="text-sm text-secondary-300">{currentSectionData.timestamp}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-secondary-200 leading-relaxed text-lg">
              {currentSectionData.content}
            </p>
            
            {currentSectionData.onScreen && (
              <div className="p-4 bg-primary-50 rounded-xl border border-primary-200">
                <p className="text-sm text-secondary-300 mb-1">On Screen:</p>
                <p className="text-secondary-200 italic">{currentSectionData.onScreen}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interactive Elements */}
      {showInteractives && (
        <div className="mb-6">
          {lesson.id === 'how-downs-work' && (
            <div className="mb-6">
              <h4 className="text-lg font-bold text-navy mb-4">Try It: Downs Simulator</h4>
              <div className="lazy-load">
                {/* DownsCounter component would be imported and used here */}
                <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
                  Interactive Downs Counter Component
                  <br />
                  <small>Click "Run Next Play" to see how downs work in practice</small>
                </div>
              </div>
            </div>
          )}
          
          {lesson.id === 'scoring-touchdowns' && (
            <div className="mb-6">
              <h4 className="text-lg font-bold text-navy mb-4">Try It: Scoring Simulator</h4>
              <div className="lazy-load">
                <div className="bg-gray-100 rounded-lg p-8 text-center text-gray-500">
                  Scoring Simulator Component
                  <br />
                  <small>Practice scoring touchdowns and making extra point decisions</small>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Section Navigation */}
      <div className="card">
        <h4 className="font-semibold text-secondary-100 mb-4">Jump to Section</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {lesson.script.sections.map((section, index) => (
            <button
              key={index}
              onClick={() => skipToSection(index)}
              className={`text-left p-4 rounded-xl transition-all duration-200 ${
                index === currentSection
                  ? 'bg-accent-100 border-2 border-accent-500 text-accent-800'
                  : index <= Math.floor(currentTime / (duration / lesson.script.sections.length))
                    ? 'bg-primary-50 border border-primary-200 text-secondary-200'
                    : 'bg-gray-50 border border-gray-200 text-gray-600 hover:bg-primary-50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-500 mr-3">{section.timestamp}</span>
                  <span className="font-semibold">{section.title}</span>
                </div>
                {index <= Math.floor(currentTime / (duration / lesson.script.sections.length)) && (
                  <span className="text-accent-500">✓</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}