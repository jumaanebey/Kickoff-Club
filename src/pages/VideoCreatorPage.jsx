import React from 'react'
import VideoCreator from '../components/VideoCreator'

const VideoCreatorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <div className="container mx-auto px-4">
        <VideoCreator />
      </div>
    </div>
  )
}

export default VideoCreatorPage