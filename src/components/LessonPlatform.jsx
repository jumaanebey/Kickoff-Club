import React, { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { useSimpleRouter } from '../App'
import PlatformLessonView from './PlatformLessonView'

const LessonPlatform = ({ currentLessonId }) => {
  const { state, actions } = useApp()
  const { navigate } = useSimpleRouter()
  const [expandedModules, setExpandedModules] = useState({})
  const [selectedLesson, setSelectedLesson] = useState(null)

  // Football lesson curriculum structure
  const curriculum = {
    modules: [
      {
        id: 1,
        title: "Football Foundations",
        progress: 85,
        lessons: [
          { id: "welcome", title: "Welcome to Kickoff Club", type: "lesson", completed: true },
          { id: "community-rules", title: "Community Guidelines", type: "lesson", completed: true },
          { id: "action-checklist", title: "TOOL: Learning Progress Tracker", type: "tool", completed: true },
          { id: "member-directory", title: "Kickoff Club Member Directory", type: "resource", completed: false },
          { id: "get-support", title: "How To Get Support", type: "lesson", completed: true },
          { id: "what-is-football", title: "What is Professional Football?", type: "lesson", completed: true },
          { id: "game-basics", title: "Game Basics: Field & Equipment", type: "lesson", completed: false },
          { id: "scoring-overview", title: "How Teams Score Points", type: "lesson", completed: false },
        ]
      },
      {
        id: 2,
        title: "Understanding the Game Flow",
        progress: 60,
        lessons: [
          { id: "downs-explained", title: "EXPLAINED: The Downs System", type: "lesson", completed: true },
          { id: "downs-framework", title: "D.O.W.N. Framework - Understanding Plays", type: "framework", completed: true },
          { id: "first-down", title: "D.O.W.N. Framework - First Down Strategy", type: "lesson", completed: true },
          { id: "second-down", title: "D.O.W.N. Framework - Second Down Options", type: "lesson", completed: false },
          { id: "third-down", title: "D.O.W.N. Framework - Third Down Pressure", type: "lesson", completed: false },
          { id: "fourth-down", title: "D.O.W.N. Framework - Fourth Down Decisions", type: "lesson", completed: false },
          { id: "play-analyzer", title: "TOOL: Football Play Analyzer™", type: "tool", completed: false },
        ]
      },
      {
        id: 3,
        title: "Player Positions & Roles",
        progress: 40,
        lessons: [
          { id: "position-overview", title: "EXPLAINED: 22 Players on the Field", type: "lesson", completed: true },
          { id: "offense-positions", title: "Offensive Positions Breakdown", type: "lesson", completed: true },
          { id: "quarterback-role", title: "The Quarterback: Field General", type: "lesson", completed: false },
          { id: "running-backs", title: "Running Backs: Ground Game", type: "lesson", completed: false },
          { id: "receivers", title: "Wide Receivers & Tight Ends", type: "lesson", completed: false },
          { id: "offensive-line", title: "Offensive Line: The Protectors", type: "lesson", completed: false },
        ]
      },
      {
        id: 4,
        title: "Defensive Fundamentals",
        progress: 20,
        lessons: [
          { id: "defense-overview", title: "How Defense Works", type: "lesson", completed: true },
          { id: "defensive-line", title: "Defensive Line: Pass Rush", type: "lesson", completed: false },
          { id: "linebackers", title: "Linebackers: The Middle Ground", type: "lesson", completed: false },
          { id: "secondary", title: "Secondary: Pass Coverage", type: "lesson", completed: false },
          { id: "defensive-schemes", title: "Common Defensive Schemes", type: "lesson", completed: false },
        ]
      },
      {
        id: 5,
        title: "Game Strategy & Situations",
        progress: 0,
        lessons: [
          { id: "clock-management", title: "Clock Management Strategy", type: "lesson", completed: false },
          { id: "red-zone", title: "Red Zone Tactics", type: "lesson", completed: false },
          { id: "two-minute-drill", title: "Two-Minute Drill", type: "lesson", completed: false },
          { id: "special-teams", title: "Special Teams Overview", type: "lesson", completed: false },
        ]
      },
      {
        id: 6,
        title: "Advanced Concepts",
        progress: 0,
        lessons: [
          { id: "play-calling", title: "Understanding Play Calling", type: "lesson", completed: false },
          { id: "formations", title: "Offensive & Defensive Formations", type: "lesson", completed: false },
          { id: "game-planning", title: "How Teams Prepare", type: "lesson", completed: false },
          { id: "analytics", title: "Modern Football Analytics", type: "lesson", completed: false },
        ]
      }
    ]
  }

  // Calculate overall progress
  const totalLessons = curriculum.modules.reduce((total, module) => total + module.lessons.length, 0)
  const completedLessons = curriculum.modules.reduce((total, module) => 
    total + module.lessons.filter(lesson => lesson.completed).length, 0)
  const overallProgress = Math.round((completedLessons / totalLessons) * 100)

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }))
  }

  const getLessonIcon = (type, completed) => {
    const baseClasses = "w-5 h-5 mr-3 flex-shrink-0"
    
    if (completed) {
      return <span className={`${baseClasses} text-green-500`}>✅</span>
    }

    switch (type) {
      case 'tool':
        return <span className={`${baseClasses} text-blue-500`}>🛠️</span>
      case 'resource':
        return <span className={`${baseClasses} text-purple-500`}>📋</span>
      case 'framework':
        return <span className={`${baseClasses} text-orange-500`}>📊</span>
      default:
        return <span className={`${baseClasses} text-gray-400`}>📖</span>
    }
  }

  const handleLessonClick = (lessonId) => {
    setSelectedLesson(lessonId)
  }

  // Auto-expand modules on load
  useEffect(() => {
    const initialExpanded = {}
    curriculum.modules.forEach(module => {
      initialExpanded[module.id] = true
    })
    setExpandedModules(initialExpanded)
  }, [])

  // Show lesson view if a lesson is selected
  if (selectedLesson) {
    return (
      <PlatformLessonView 
        lessonId={selectedLesson} 
        onBack={(nextLessonId) => {
          if (nextLessonId) {
            setSelectedLesson(nextLessonId)
          } else {
            setSelectedLesson(null)
          }
        }} 
      />
    )
  }

  return (
    <div className="bg-gray-50">
      {/* Header with progress */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Kickoff Club</h1>
              <p className="text-sm text-gray-600 mt-1">Master Professional Football</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-accent-600">{overallProgress}%</div>
              <div className="text-xs text-gray-500">Complete</div>
            </div>
          </div>
          
          {/* Progress bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-accent-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${overallProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar Navigation */}
        <div className="w-80 bg-white border-r border-gray-200 min-h-[80vh] overflow-y-auto">
          <div className="p-6">
            <div className="space-y-4">
              {curriculum.modules.map((module) => (
                <div key={module.id} className="border border-gray-200 rounded-lg">
                  {/* Module Header */}
                  <button
                    onClick={() => toggleModule(module.id)}
                    className="w-full p-4 text-left hover:bg-gray-50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <span className="bg-accent-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                        {module.id}
                      </span>
                      <div>
                        <h3 className="font-semibold text-gray-900">{module.title}</h3>
                        <div className="flex items-center mt-1">
                          <div className="w-20 bg-gray-200 rounded-full h-1 mr-2">
                            <div 
                              className="bg-green-500 h-1 rounded-full"
                              style={{ width: `${module.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{module.progress}%</span>
                        </div>
                      </div>
                    </div>
                    <span className={`transform transition-transform ${expandedModules[module.id] ? 'rotate-180' : ''}`}>
                      ⌄
                    </span>
                  </button>

                  {/* Module Lessons */}
                  {expandedModules[module.id] && (
                    <div className="border-t border-gray-100">
                      {module.lessons.map((lesson, index) => (
                        <button
                          key={lesson.id}
                          onClick={() => handleLessonClick(lesson.id)}
                          className={`w-full p-3 text-left hover:bg-gray-50 transition-colors flex items-center text-sm border-b border-gray-50 last:border-b-0 ${
                            currentLessonId === lesson.id ? 'bg-accent-50 border-l-4 border-l-accent-500' : ''
                          }`}
                        >
                          {getLessonIcon(lesson.type, lesson.completed)}
                          <span className={lesson.completed ? 'text-gray-900' : 'text-gray-600'}>
                            {lesson.title}
                          </span>
                          {lesson.type === 'tool' && (
                            <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              TOOL
                            </span>
                          )}
                          {lesson.type === 'resource' && (
                            <span className="ml-auto bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                              RESOURCE
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">Your Progress</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lessons Completed:</span>
                  <span className="font-medium">{completedLessons}/{totalLessons}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Level:</span>
                  <span className="font-medium">
                    {overallProgress < 25 ? 'Rookie' : 
                     overallProgress < 50 ? 'Fan' :
                     overallProgress < 75 ? 'Expert' : 'Coach'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Streak:</span>
                  <span className="font-medium">7 days 🔥</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 min-h-[60vh]">
            <div className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏈</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Select a lesson to get started
                </h2>
                <p className="text-gray-600 mb-6">
                  Choose any lesson from the sidebar to begin your football learning journey.
                </p>
                <button
                  onClick={() => setSelectedLesson('welcome')}
                  className="btn-primary px-6 py-3"
                >
                  Start with Welcome Lesson
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LessonPlatform