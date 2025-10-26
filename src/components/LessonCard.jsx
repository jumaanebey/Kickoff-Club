import React from 'react'

export default function LessonCard({ lesson, onClick }) {
  return (
    <article 
      onClick={onClick}
      className="group card hover:scale-[1.02] transition-all duration-300 cursor-pointer"
    >
      {/* Video Thumbnail */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img 
          src={lesson.thumb} 
          alt={lesson.title} 
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
        />
        
        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
            <div className="w-0 h-0 border-l-[16px] border-l-primary-600 border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
          </div>
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-3 left-3 bg-primary-100 text-primary-700 px-2 py-1 rounded-lg text-xs font-medium">
          Beginner
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 leading-snug">
          {lesson.title}
        </h4>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center text-xs text-gray-500">
              <span className="mr-1">📺</span>
              <span>Quick lesson</span>
            </div>
          </div>

          <div className="flex items-center text-xs text-gray-500">
            <span className="mr-1">⭐</span>
            <span>4.8</span>
          </div>
        </div>

        {/* Action */}
        <a 
          href={`/lesson/${lesson.id}`} 
          className="inline-flex items-center text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors duration-200 group-hover:underline"
        >
          <span>Watch now</span>
          <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
        </a>
      </div>

      {/* Progress Bar (if lesson is in progress) */}
      {lesson.progress && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
            <span>Progress</span>
            <span>{Math.round(lesson.progress * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${lesson.progress * 100}%` }}
            ></div>
          </div>
        </div>
      )}
    </article>
  )
}
