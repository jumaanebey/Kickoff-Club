import React from 'react'
import { useSimpleRouter } from '../App'
import VideoLesson from '../components/VideoLesson'

export default function SimpleLessonPage({ params }) {
  const { navigate } = useSimpleRouter()
  const lessonId = params?.id || window.location.pathname.split('/').pop()

  const handleLessonComplete = () => {
    // Navigate back to platform
    navigate('/platform')
  }

  return <VideoLesson lessonId={lessonId} onComplete={handleLessonComplete} />
}