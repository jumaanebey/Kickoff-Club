import React, { useState } from 'react'
import { trackEvent } from '../analytics'

export default function Quiz({ quiz, onPass }) {
  const [selected, setSelected] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const correct = quiz.correctIndex
  
  function submit() {
    setSubmitted(true)
    trackEvent('quiz_submitted', { question: quiz.question })
    if (selected === correct) {
      trackEvent('quiz_passed', { quiz: quiz.question })
      onPass && onPass()
    } else {
      trackEvent('quiz_failed', { quiz: quiz.question })
    }
  }

  const isCorrect = selected === correct
  const isIncorrect = selected !== null && selected !== correct && submitted

  return (
    <div className="card mt-8 bg-gradient-to-br from-white to-gray-50">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-secondary-100 rounded-xl flex items-center justify-center mr-4">
          <span className="text-lg">🤔</span>
        </div>
        <div>
          <h3 className="font-display font-semibold text-lg text-gray-900">Quick Knowledge Check</h3>
          <p className="text-sm text-gray-500">Let's see if you caught that!</p>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <p className="text-gray-700 font-medium text-lg leading-relaxed">{quiz.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {quiz.options.map((option, index) => {
          let buttonStyle = "relative p-4 text-left rounded-xl border-2 border-gray-200 hover:border-primary-300 transition-all duration-200 cursor-pointer group"
          
          if (submitted) {
            if (index === correct) {
              buttonStyle = "relative p-4 text-left rounded-xl border-2 border-success-400 bg-success-50 text-success-800"
            } else if (index === selected && selected !== correct) {
              buttonStyle = "relative p-4 text-left rounded-xl border-2 border-error-400 bg-error-50 text-error-800"
            } else {
              buttonStyle = "relative p-4 text-left rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-500"
            }
          } else if (selected === index) {
            buttonStyle = "relative p-4 text-left rounded-xl border-2 border-primary-500 bg-primary-50 text-primary-900"
          }

          return (
            <button 
              key={index} 
              className={buttonStyle}
              onClick={() => !submitted && setSelected(index)} 
              aria-pressed={selected === index}
              disabled={submitted}
            >
              <div className="flex items-center">
                {/* Option Letter */}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3 ${
                  submitted 
                    ? index === correct 
                      ? 'bg-success-500 text-white' 
                      : index === selected && selected !== correct
                        ? 'bg-error-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    : selected === index 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-gray-200 text-gray-600 group-hover:bg-primary-200'
                }`}>
                  {String.fromCharCode(65 + index)}
                </div>
                
                {/* Option Text */}
                <span className="flex-1 font-medium">{option}</span>
                
                {/* Status Icon */}
                {submitted && (
                  <div className="ml-3">
                    {index === correct ? (
                      <span className="text-success-500 text-lg">✓</span>
                    ) : index === selected && selected !== correct ? (
                      <span className="text-error-500 text-lg">✗</span>
                    ) : null}
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Submit Button */}
      {!submitted && (
        <div className="flex justify-center">
          <button 
            className={`btn-primary px-8 py-3 ${selected === null ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={submit}
            disabled={selected === null}
          >
            <span className="flex items-center">
              Check Answer
              <span className="ml-2">→</span>
            </span>
          </button>
        </div>
      )}

      {/* Results */}
      {submitted && (
        <div className={`mt-6 p-4 rounded-xl ${
          isCorrect ? 'bg-success-50 border border-success-200' : 'bg-error-50 border border-error-200'
        } animate-slide-up`}>
          <div className="flex items-start">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1 ${
              isCorrect ? 'bg-success-500' : 'bg-error-500'
            }`}>
              <span className="text-white text-lg">
                {isCorrect ? '🎉' : '💡'}
              </span>
            </div>
            <div className="flex-1">
              <h4 className={`font-semibold mb-2 ${
                isCorrect ? 'text-success-800' : 'text-error-800'
              }`}>
                {isCorrect ? "Great job! You got it right! 🌟" : "Not quite, but you're learning! 📚"}
              </h4>
              <p className={`text-sm ${
                isCorrect ? 'text-success-700' : 'text-error-700'
              }`}>
                {isCorrect 
                  ? "You're really getting the hang of this! Ready for the next lesson?" 
                  : `The correct answer was "${quiz.options[correct]}". Don't worry, these concepts take practice!`
                }
              </p>
            </div>
          </div>
          
          {isCorrect && (
            <div className="mt-4 flex justify-center">
              <div className="inline-flex items-center px-4 py-2 bg-success-100 text-success-700 rounded-full text-sm font-medium">
                <span className="mr-2">🏆</span>
                +10 Progress Points
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
