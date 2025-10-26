import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

const PlatformLessonView = ({ lessonId, onBack }) => {
  const { state, actions } = useApp()
  const [completed, setCompleted] = useState(false)

  // Sample lesson content based on lesson ID
  const getLessonContent = (id) => {
    const lessons = {
      'welcome': {
        title: 'Welcome to Kickoff Club',
        type: 'lesson',
        duration: '3 min read',
        content: `
          <h2>Welcome to the Kickoff Club Community! 🏈</h2>
          <p>You've just joined thousands of football fans on their journey from confused to confident. This platform will be your guide through the exciting world of professional football.</p>
          
          <h3>What You'll Learn</h3>
          <ul>
            <li>Core football concepts in bite-sized video lessons</li>
            <li>How to follow games with confidence</li>
            <li>The strategy behind every play</li>
            <li>Player positions and their roles</li>
          </ul>

          <div class="bg-accent-50 p-4 rounded-lg my-6">
            <h4>💡 Pro Tip</h4>
            <p>Complete lessons in order to unlock advanced content. Each lesson builds on the previous one!</p>
          </div>

          <h3>Your Learning Path</h3>
          <p>We've organized everything into 6 modules, starting with the absolute basics and progressing to advanced strategy. You can always jump back to review concepts.</p>
        `,
        nextLesson: 'community-rules'
      },
      'community-rules': {
        title: 'Community Guidelines',
        type: 'lesson',
        duration: '2 min read',
        content: `
          <h2>Our Community Guidelines 📋</h2>
          <p>Kickoff Club is built on respect, curiosity, and shared learning. Here's how we keep our community awesome:</p>
          
          <h3>The Kickoff Club Way</h3>
          <ol>
            <li><strong>No Dumb Questions</strong> - Everyone starts somewhere. Ask away!</li>
            <li><strong>Help Others Learn</strong> - Share your insights and support fellow learners</li>
            <li><strong>Stay Curious</strong> - Football is complex and beautiful. Embrace the learning process</li>
            <li><strong>Be Respectful</strong> - We welcome fans of all teams and backgrounds</li>
          </ol>

          <div class="bg-green-50 p-4 rounded-lg my-6">
            <h4>✅ Remember</h4>
            <p>Learning football should be fun! Don't worry about memorizing everything - focus on understanding the flow and excitement of the game.</p>
          </div>

          <h3>Getting Support</h3>
          <p>Need help? Use our community forums or reach out to mentors. We're here to help you succeed!</p>
        `,
        nextLesson: 'what-is-football'
      },
      'what-is-football': {
        title: 'What is Professional Football?',
        type: 'lesson',
        duration: '5 min read',
        content: `
          <h2>Professional Football: The Beautiful Game 🏈</h2>
          <p>At its heart, professional football is a strategic battle between two teams fighting for territory, with each play being a carefully planned tactical maneuver.</p>
          
          <h3>The Basic Concept</h3>
          <p>Two teams take turns trying to advance an oval ball down a 100-yard field to score points. It's like chess with athletes - every move is calculated and purposeful.</p>

          <div class="bg-blue-50 p-4 rounded-lg my-6">
            <h4>🎯 Key Insight</h4>
            <p>Think of football as "controlled chaos" - while it looks frantic, every player has a specific job on every play.</p>
          </div>

          <h3>Why It's Compelling</h3>
          <ul>
            <li><strong>Strategy Meets Athletics</strong> - Brain and brawn combined</li>
            <li><strong>Every Play Matters</strong> - One play can change everything</li>
            <li><strong>Team Chemistry</strong> - 11 players moving as one unit</li>
            <li><strong>Dramatic Moments</strong> - Last-second comebacks and game-changing plays</li>
          </ul>

          <p>Ready to dive deeper? Let's explore how the game actually works...</p>
        `,
        nextLesson: 'game-basics'
      },
      'action-checklist': {
        title: 'TOOL: Learning Progress Tracker',
        type: 'tool',
        duration: '5 min setup',
        content: `
          <h2>📊 Learning Progress Tracker</h2>
          <p>This tool helps you track your football knowledge journey and identify areas for improvement.</p>
          
          <div class="bg-blue-50 p-6 rounded-lg my-6">
            <h3>How to Use This Tool</h3>
            <ol>
              <li>Complete the self-assessment below</li>
              <li>Track your progress after each module</li>
              <li>Identify your strongest and weakest areas</li>
              <li>Get personalized lesson recommendations</li>
            </ol>
          </div>

          <h3>Football Knowledge Self-Assessment</h3>
          <div class="space-y-4">
            <div class="border p-4 rounded">
              <h4>Basic Rules (Rate 1-10)</h4>
              <p>How well do you understand downs, scoring, and game flow?</p>
              <input type="range" min="1" max="10" class="w-full" />
            </div>
            
            <div class="border p-4 rounded">
              <h4>Player Positions (Rate 1-10)</h4>
              <p>Can you identify positions and their roles?</p>
              <input type="range" min="1" max="10" class="w-full" />
            </div>
            
            <div class="border p-4 rounded">
              <h4>Strategy & Tactics (Rate 1-10)</h4>
              <p>Do you understand why teams make certain decisions?</p>
              <input type="range" min="1" max="10" class="w-full" />
            </div>
          </div>

          <div class="bg-green-50 p-4 rounded-lg mt-6">
            <h4>🎯 Your Goal</h4>
            <p>By the end of this course, you should rate yourself 8+ in all areas. We'll get you there!</p>
          </div>
        `,
        nextLesson: 'member-directory'
      }
    }

    return lessons[id] || {
      title: 'Lesson Not Found',
      content: '<p>This lesson is coming soon!</p>',
      type: 'lesson'
    }
  }

  const lesson = getLessonContent(lessonId)

  const markComplete = () => {
    setCompleted(true)
    // Here you would typically update user progress
    // actions.completLesson(lessonId)
  }

  return (
    <div className="bg-gray-50">
      {/* Header with progress */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Platform
            </button>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{lesson.duration}</span>
              {lesson.type === 'tool' && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  TOOL
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">{lesson.title}</h1>
            
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content }} />

            <div className="border-t border-gray-200 mt-8 pt-8">
              <div className="flex items-center justify-between">
                <div>
                  {!completed && (
                    <button
                      onClick={markComplete}
                      className="btn-primary px-6 py-3"
                    >
                      Mark as Complete
                    </button>
                  )}
                  {completed && (
                    <div className="flex items-center text-green-600">
                      <span className="mr-2">✅</span>
                      Lesson Complete!
                    </div>
                  )}
                </div>

                {lesson.nextLesson && completed && (
                  <button
                    onClick={() => onBack(lesson.nextLesson)}
                    className="btn-secondary px-6 py-3"
                  >
                    Next Lesson →
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlatformLessonView