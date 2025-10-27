import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

const VideoLesson = ({ lessonId, onComplete }) => {
  const { state, actions } = useApp()
  const [showAchievement, setShowAchievement] = useState(false)
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [videoWatched, setVideoWatched] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [helpfulFeedback, setHelpfulFeedback] = useState(null)

  // Load animation preference from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('kickoff-animations-enabled')
    if (saved !== null) {
      setAnimationsEnabled(JSON.parse(saved))
    }
  }, [])

  const toggleAnimations = () => {
    const newValue = !animationsEnabled
    setAnimationsEnabled(newValue)
    localStorage.setItem('kickoff-animations-enabled', JSON.stringify(newValue))
  }

  const triggerAchievement = (type, title, description) => {
    if (!animationsEnabled) return
    
    setShowAchievement({ type, title, description })
    setTimeout(() => setShowAchievement(false), 4000)
  }

  const handleVideoComplete = () => {
    setVideoWatched(true)
    triggerAchievement('video', 'Video Complete! 🎥', 'You watched the full lesson')
  }

  const handleQuizComplete = () => {
    setQuizCompleted(true)
    triggerAchievement('quiz', 'Quiz Master! 🧠', 'Perfect score on the quiz')
    
    // Trigger lesson completion achievement after a delay
    setTimeout(() => {
      triggerAchievement('lesson', 'Lesson Mastered! ⚡', 'You completed all parts of this lesson')
      setTimeout(() => onComplete && onComplete(), 1000)
    }, 2000)
  }

  const lessonData = {
    'how-downs-work': {
      title: 'How Downs Work',
      videoUrl: '/assets/lessons/how-downs-work.mp4',
      duration: 'Video lesson',
      description: 'Master the most important concept in football',
      quiz: [
        {
          question: 'How many downs does a team get to advance 10 yards?',
          options: ['3', '4', '5', '6'],
          correct: 1
        },
        {
          question: 'What happens if a team doesn\'t get a first down?',
          options: ['They lose the ball', 'They get more tries', 'Game over', 'Penalty'],
          correct: 0
        }
      ]
    },
    'scoring-touchdowns': {
      title: 'Scoring Touchdowns',
      videoUrl: '/assets/lessons/scoring-touchdowns.mp4',
      duration: 'Video lesson',
      description: 'Learn how teams score the most points',
      quiz: [
        {
          question: 'How many points is a touchdown worth?',
          options: ['3', '6', '7', '8'],
          correct: 1
        },
        {
          question: 'What can teams do after scoring a touchdown?',
          options: ['Kick extra point', 'Go for 2 points', 'Both A and B', 'Nothing'],
          correct: 2
        }
      ]
    },
    'understanding-penalties': {
      title: 'Understanding Penalties',
      videoUrl: '/assets/lessons/understanding-penalties.mp4',
      duration: 'Video lesson',
      description: 'Learn about yellow flags and rule violations',
      quiz: [
        {
          question: 'What does a yellow flag indicate?',
          options: ['Timeout', 'Penalty', 'Touchdown', 'Injury'],
          correct: 1
        },
        {
          question: 'How many yards is a holding penalty?',
          options: ['5', '10', '15', '20'],
          correct: 1
        }
      ]
    },
    'special-teams-basics': {
      title: 'Special Teams Explained',
      videoUrl: '/assets/lessons/special-teams-basics.mp4',
      duration: 'Video lesson',
      description: 'Understanding kickoffs, punts, and field goals',
      quiz: [
        {
          question: 'How many points is a field goal worth?',
          options: ['1', '2', '3', '6'],
          correct: 2
        },
        {
          question: 'What is a punt used for?',
          options: ['Scoring', 'Field position', 'Celebration', 'Starting play'],
          correct: 1
        }
      ]
    },
    'field-layout-basics': {
      title: 'Field Layout Basics',
      videoUrl: '/assets/lessons/field-layout-basics.mp4',
      duration: 'Video lesson',
      description: 'Understanding the 120-yard battlefield',
      quiz: [
        {
          question: 'How long is a football field including end zones?',
          options: ['100 yards', '110 yards', '120 yards', '130 yards'],
          correct: 2
        },
        {
          question: 'What is the red zone?',
          options: ['First 20 yards', 'Midfield area', 'Within 20 yards of goal line', 'End zone'],
          correct: 2
        }
      ]
    },
    'quarterback-101': {
      title: 'Quarterback 101',
      videoUrl: '/assets/lessons/quarterback-101.mp4',
      duration: 'Video lesson',
      description: 'The field general who runs every play',
      quiz: [
        {
          question: 'What is an audible?',
          options: ['A loud cheer', 'Changing the play at the line', 'A type of pass', 'A penalty'],
          correct: 1
        },
        {
          question: 'What does a pocket passer do?',
          options: ['Runs with the ball', 'Stays protected and throws precisely', 'Kicks field goals', 'Plays defense'],
          correct: 1
        }
      ]
    },
    'timeouts-and-clock': {
      title: 'Timeouts & Clock Management',
      videoUrl: '/assets/lessons/timeouts-and-clock.mp4',
      duration: 'Video lesson',
      description: 'How teams control time to win games',
      quiz: [
        {
          question: 'How many timeouts does each team get per half?',
          options: ['2', '3', '4', '5'],
          correct: 1
        },
        {
          question: 'When does the two-minute warning occur?',
          options: ['At 5:00 left', 'At 3:00 left', 'At 2:00 left', 'At 1:00 left'],
          correct: 2
        }
      ]
    }
  }

  const lesson = lessonData[lessonId] || lessonData['how-downs-work']
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [quizResults, setQuizResults] = useState([])

  const handleQuizAnswer = (answerIndex) => {
    const isCorrect = answerIndex === lesson.quiz[currentQuiz].correct
    const newResults = [...quizResults, { question: currentQuiz, correct: isCorrect }]
    setQuizResults(newResults)
    
    if (animationsEnabled) {
      // Animate the answer
      setSelectedAnswer(answerIndex)
      setTimeout(() => {
        if (currentQuiz + 1 < lesson.quiz.length) {
          setCurrentQuiz(currentQuiz + 1)
          setSelectedAnswer(null)
        } else {
          // Quiz completed
          const score = newResults.filter(r => r.correct).length
          if (score === lesson.quiz.length) {
            handleQuizComplete()
          }
        }
      }, 1500)
    } else {
      // No animation, immediate progression
      if (currentQuiz + 1 < lesson.quiz.length) {
        setCurrentQuiz(currentQuiz + 1)
      } else {
        const score = newResults.filter(r => r.correct).length
        if (score === lesson.quiz.length) {
          handleQuizComplete()
        }
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 relative">
      {/* Animation Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={toggleAnimations}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
            animationsEnabled 
              ? 'bg-accent-100 text-accent-700 border border-accent-200' 
              : 'bg-gray-100 text-gray-600 border border-gray-200'
          }`}
        >
          ✨ Animations {animationsEnabled ? 'ON' : 'OFF'}
        </button>
      </div>

      {/* Achievement Animation Overlay */}
      {showAchievement && animationsEnabled && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center transform animate-bounce-in">
            <div className="w-16 h-16 bg-gradient-to-r from-accent-500 to-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin-once">
              <span className="text-2xl text-white">🏆</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{showAchievement.title}</h3>
            <p className="text-gray-600">{showAchievement.description}</p>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-gradient-to-r from-accent-500 to-rose-500 h-full rounded-full animate-progress-fill"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {/* Lesson Header */}
        <div className="p-6 border-b bg-gradient-to-r from-accent-50 to-primary-50">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
          <p className="text-gray-600 mb-4">{lesson.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>⏱️ {lesson.duration}</span>
            <span>📹 Video + Quiz</span>
            <span>🎯 Interactive</span>
          </div>
        </div>

        {/* Video Section */}
        <div className="p-6">
          <div className="aspect-video bg-gray-900 rounded-lg relative overflow-hidden mb-6">
            {/* Real HTML5 Video Player */}
            <video
              controls
              className="w-full h-full"
              onEnded={handleVideoComplete}
              src={lesson.videoUrl}
            >
              Your browser does not support the video tag.
            </video>

            {videoWatched && (
              <div className="absolute top-4 right-4">
                <div className={`bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium ${
                  animationsEnabled ? 'animate-bounce-in' : ''
                }`}>
                  ✓ Watched
                </div>
              </div>
            )}
          </div>

          {/* Feedback Section - after video */}
          {videoWatched && !quizCompleted && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-700 mb-3">Was this lesson helpful?</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setHelpfulFeedback('yes')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    helpfulFeedback === 'yes'
                      ? 'bg-green-500 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:border-green-500'
                  }`}
                  aria-label="This lesson was helpful"
                >
                  👍 Yes, helpful!
                </button>
                <button
                  onClick={() => setHelpfulFeedback('no')}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    helpfulFeedback === 'no'
                      ? 'bg-red-500 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:border-red-500'
                  }`}
                  aria-label="This lesson needs improvement"
                >
                  👎 Needs work
                </button>
              </div>
              {helpfulFeedback && (
                <p className="mt-3 text-xs text-gray-600 animate-fade-in">
                  {helpfulFeedback === 'yes'
                    ? '✓ Thanks for your feedback! We\'re glad this helped.'
                    : '✓ Thanks! We\'ll work on improving this lesson.'}
                </p>
              )}
            </div>
          )}

          {/* Quiz Section */}
          {videoWatched && !quizCompleted && (
            <div className={`border-t pt-6 ${animationsEnabled ? 'animate-slide-up' : ''}`}>
              <h3 className="text-xl font-semibold mb-4">Quick Knowledge Check</h3>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">
                    Question {currentQuiz + 1} of {lesson.quiz.length}
                  </span>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-accent-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentQuiz + 1) / lesson.quiz.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h4 className="text-lg font-medium mb-4">{lesson.quiz[currentQuiz].question}</h4>
                
                <div className="space-y-3">
                  {lesson.quiz[currentQuiz].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={`w-full p-4 text-left rounded-lg border transition-all ${
                        selectedAnswer === null 
                          ? 'hover:bg-white hover:border-accent-300 bg-white border-gray-200' 
                          : selectedAnswer === index
                            ? index === lesson.quiz[currentQuiz].correct
                              ? 'bg-green-100 border-green-300 text-green-800'
                              : 'bg-red-100 border-red-300 text-red-800'
                            : index === lesson.quiz[currentQuiz].correct
                              ? 'bg-green-100 border-green-300 text-green-800'
                              : 'bg-gray-100 border-gray-200 text-gray-600'
                      } ${animationsEnabled && selectedAnswer === index ? 'animate-pulse' : ''}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Completion State */}
          {quizCompleted && (
            <div className={`border-t pt-6 text-center ${animationsEnabled ? 'animate-fade-in' : ''}`}>
              <div className="bg-green-50 rounded-lg p-6">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl text-white">🎉</span>
                </div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">Lesson Complete!</h3>
                <p className="text-green-600">You've mastered the basics. Ready for the next challenge?</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes bounce-in {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.1) rotate(180deg); opacity: 1; }
          100% { transform: scale(1) rotate(360deg); opacity: 1; }
        }
        
        @keyframes spin-once {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes progress-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.6s ease-out;
        }
        
        .animate-spin-once {
          animation: spin-once 1s ease-in-out;
        }
        
        .animate-progress-fill {
          animation: progress-fill 3s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default VideoLesson