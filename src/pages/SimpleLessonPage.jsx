import React, { useState, useEffect } from 'react'
import { getLessonById } from '../data/lessonsIndex'

export default function SimpleLessonPage() {
  const lessonId = window.location.pathname.split('/').pop()
  const [lesson, setLesson] = useState(null)

  useEffect(() => {
    const lessonData = getLessonById(lessonId)
    setLesson(lessonData)
  }, [lessonId])

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blush-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <span className="text-2xl">📚</span>
          </div>
          <p className="text-secondary-200">
            {lessonId ? `Looking for lesson: ${lessonId}` : 'Loading lesson...'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card mb-6">
          <h1 className="text-3xl font-bold text-secondary-100 mb-4">{lesson.title}</h1>
          <p className="text-xl text-secondary-200 mb-6">{lesson.subtitle}</p>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-secondary-100 mb-4">Lesson Script</h2>
            <div className="space-y-4">
              <div className="p-4 bg-accent-50 rounded-xl border border-accent-200">
                <h3 className="font-semibold text-accent-800 mb-2">Hook</h3>
                <p className="text-secondary-200">{lesson.script.hook}</p>
              </div>
              
              {lesson.script.sections.map((section, index) => (
                <div key={index} className="p-4 bg-primary-50 rounded-xl border border-primary-200">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-secondary-100">{section.title}</h3>
                    <span className="text-sm text-secondary-300">{section.timestamp}</span>
                  </div>
                  <p className="text-secondary-200 mb-2">{section.content}</p>
                  {section.onScreen && (
                    <div className="mt-3 p-3 bg-white rounded-lg">
                      <p className="text-xs text-secondary-300 mb-1">On Screen:</p>
                      <p className="text-sm text-secondary-200 italic">{section.onScreen}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {lesson.quiz && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-secondary-100 mb-4">Quiz</h2>
              <div className="p-4 bg-rose-50 rounded-xl border border-rose-200">
                <h3 className="font-semibold text-rose-800 mb-3">{lesson.quiz.question}</h3>
                <div className="space-y-2">
                  {lesson.quiz.options.map((option, index) => (
                    <div 
                      key={index} 
                      className={`p-3 rounded-lg ${
                        index === lesson.quiz.correctIndex 
                          ? 'bg-accent-100 border border-accent-300' 
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <span className="font-medium">{String.fromCharCode(65 + index)}.</span> {option}
                      {index === lesson.quiz.correctIndex && (
                        <span className="ml-2 text-accent-600">✓ Correct</span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-accent-50 rounded-lg">
                  <p className="text-sm text-secondary-200">{lesson.quiz.explanation}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="text-center">
          <button 
            onClick={() => window.location.href = '/'}
            className="btn-primary"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}