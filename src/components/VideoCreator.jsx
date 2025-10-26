import React, { useState } from 'react'

const VideoCreator = () => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [videoResult, setVideoResult] = useState(null)
  const [videoType, setVideoType] = useState('football')
  const [apiKeys, setApiKeys] = useState({
    synthesia: '',
    heygen: '',
    openai: ''
  })

  const handleGenerate = async () => {
    setIsGenerating(true)
    setVideoResult(null)

    try {
      // Simulate the video creation process
      const response = await fetch('/api/create-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoType,
          apiKeys
        })
      })

      const result = await response.json()
      setVideoResult(result)
    } catch (error) {
      setVideoResult({
        success: false,
        error: error.message,
        platform: 'Error'
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const mockVideoCreation = () => {
    setIsGenerating(true)
    
    // Simulate API call delay
    setTimeout(() => {
      setVideoResult({
        success: true,
        platform: 'Manual Creation',
        scriptData: {
          metadata: {
            title: videoType === 'football' ? 'How Downs Work' : 'Performance Review Excellence',
            subtitle: videoType === 'football' ? 'Master Football Basics' : 'Career Development Guide'
          },
          voiceover: {
            fullScript: videoType === 'football' 
              ? "Want to know why they keep saying '3rd and long'? Love the vibe. Learn the game. Here's how downs work in football..."
              : "Ready to excel in your performance review? Here are the key strategies for career success...",
            estimatedDuration: 90,
            estimatedWords: 120
          }
        },
        manualGuide: true,
        nextSteps: [
          'Set up recording environment',
          'Practice the script 2-3 times',
          'Record the video using recommended tools',
          'Edit and export in HD quality',
          'Upload to your preferred platform'
        ]
      })
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🎬 AI Video Creator</h1>
        <p className="text-gray-600">Automated video generation for Kickoff Club</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Settings Panel */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video Type
            </label>
            <select 
              value={videoType}
              onChange={(e) => setVideoType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
              disabled={isGenerating}
            >
              <option value="football">Football Tutorial</option>
              <option value="performance">Performance Review</option>
            </select>
          </div>

          <div>
            <h3 className="font-medium text-gray-700 mb-3">API Keys (Optional)</h3>
            <div className="space-y-3">
              <input
                type="password"
                placeholder="Synthesia API Key"
                value={apiKeys.synthesia}
                onChange={(e) => setApiKeys(prev => ({...prev, synthesia: e.target.value}))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                disabled={isGenerating}
              />
              <input
                type="password"
                placeholder="HeyGen API Key"
                value={apiKeys.heygen}
                onChange={(e) => setApiKeys(prev => ({...prev, heygen: e.target.value}))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                disabled={isGenerating}
              />
              <input
                type="password"
                placeholder="OpenAI API Key"
                value={apiKeys.openai}
                onChange={(e) => setApiKeys(prev => ({...prev, openai: e.target.value}))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                disabled={isGenerating}
              />
            </div>
          </div>

          <button
            onClick={mockVideoCreation}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isGenerating ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                Generating Video...
              </div>
            ) : (
              '🚀 Create Video'
            )}
          </button>
        </div>

        {/* Results Panel */}
        <div className="bg-gray-50 rounded-lg p-6">
          {!videoResult && !isGenerating && (
            <div className="text-center text-gray-500">
              <div className="text-6xl mb-4">🎥</div>
              <p>Select video type and click "Create Video" to begin</p>
            </div>
          )}

          {isGenerating && (
            <div className="text-center">
              <div className="animate-pulse">
                <div className="text-4xl mb-4">🤖</div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
                </div>
              </div>
              <p className="mt-4 text-gray-600">Generating your video script and assets...</p>
            </div>
          )}

          {videoResult && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  {videoResult.success ? '✅' : '❌'} Generation Complete
                </h3>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {videoResult.platform}
                </span>
              </div>

              {videoResult.success && videoResult.scriptData && (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-medium text-gray-800 mb-2">📋 Script Details</h4>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Title:</strong> {videoResult.scriptData.metadata.title}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Duration:</strong> ~{videoResult.scriptData.voiceover.estimatedDuration}s
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Words:</strong> {videoResult.scriptData.voiceover.estimatedWords}
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border">
                    <h4 className="font-medium text-gray-800 mb-2">🎤 Script Preview</h4>
                    <div className="bg-gray-50 p-3 rounded text-sm text-gray-700 max-h-32 overflow-y-auto">
                      {videoResult.scriptData.voiceover.fullScript.substring(0, 200)}...
                    </div>
                  </div>

                  {videoResult.nextSteps && (
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="font-medium text-gray-800 mb-2">📝 Next Steps</h4>
                      <ol className="list-decimal list-inside space-y-1">
                        {videoResult.nextSteps.map((step, index) => (
                          <li key={index} className="text-sm text-gray-600">{step}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </div>
              )}

              {!videoResult.success && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <p className="text-red-800 text-sm">
                    <strong>Error:</strong> {videoResult.error}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-800 mb-2">💡 How It Works</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-700">
          <div>
            <strong>1. Script Generation</strong>
            <p>AI creates engaging educational content</p>
          </div>
          <div>
            <strong>2. Platform Selection</strong>
            <p>Tries Synthesia → HeyGen → OpenAI</p>
          </div>
          <div>
            <strong>3. Fallback Guide</strong>
            <p>Manual creation instructions provided</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCreator