// HeyGen API Integration - Alternative to Synthesia for AI Video Generation
import fetch from 'node-fetch'

export class HeyGenAPI {
  constructor() {
    // HeyGen API - more accessible alternative to Synthesia
    this.apiKey = process.env.HEYGEN_API_KEY || 'YOUR_HEYGEN_API_KEY'
    this.baseURL = 'https://api.heygen.com/v2'
    this.headers = {
      'X-API-KEY': this.apiKey,
      'Content-Type': 'application/json',
    }
  }

  // Create a new video from our script
  async createVideo(scriptData) {
    try {
      console.log('🎬 Sending video creation request to HeyGen...')
      
      const payload = {
        test: false,
        caption: false,
        title: scriptData.metadata.title,
        video_inputs: [
          {
            character: {
              type: "avatar",
              avatar_id: "Daisy-inskirt-20220818",
              scale: 1.0
            },
            voice: {
              type: "text",
              input_text: this.formatScriptForHeyGen(scriptData.voiceover.fullScript),
              voice_id: "1bd001e7e50f421d891986aad5158bc8"
            },
            background: {
              type: "color",
              value: "#F8F9FA"
            }
          }
        ],
        aspect_ratio: "16:9",
        callback_id: null
      }

      const response = await fetch(`${this.baseURL}/video/generate`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`HeyGen API error: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      
      console.log('✅ Video creation request successful!')
      console.log(`📹 Video ID: ${result.data.video_id}`)
      console.log(`⏱️  Status: ${result.data.status}`)

      return result.data

    } catch (error) {
      console.error('❌ Error creating video:', error.message)
      throw error
    }
  }

  // Check video generation status
  async getVideoStatus(videoId) {
    try {
      const response = await fetch(`${this.baseURL}/video_status/${videoId}`, {
        method: 'GET',
        headers: this.headers
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const result = await response.json()
      return result.data

    } catch (error) {
      console.error('Error checking video status:', error)
      throw error
    }
  }

  // Format our script for HeyGen's expected format
  formatScriptForHeyGen(fullScript) {
    return fullScript
      .replace(/\[.*?\]/g, '') // Remove [SECTION TITLES]
      .replace(/\n\n+/g, ' ') // Convert newlines to spaces for continuous speech
      .trim()
  }

  // Get available avatars
  async getAvailableAvatars() {
    try {
      const response = await fetch(`${this.baseURL}/avatars`, {
        headers: this.headers
      })
      
      const result = await response.json()
      return result.data.avatars || []
      
    } catch (error) {
      console.error('Error fetching avatars:', error)
      return []
    }
  }

  // Monitor video until completion
  async waitForCompletion(videoId, maxWaitTime = 600000) { // 10 minutes max
    const startTime = Date.now()
    
    console.log(`⏳ Waiting for video generation (max ${maxWaitTime/1000/60} minutes)...`)
    
    while (Date.now() - startTime < maxWaitTime) {
      const status = await this.getVideoStatus(videoId)
      
      console.log(`📊 Status: ${status.status}`)
      
      if (status.status === 'completed') {
        console.log('🎉 Video generation complete!')
        console.log(`📥 Download URL: ${status.video_url}`)
        return status
      }
      
      if (status.status === 'failed') {
        throw new Error(`Video generation failed: ${status.error}`)
      }
      
      // Wait 30 seconds before checking again
      await new Promise(resolve => setTimeout(resolve, 30000))
    }
    
    throw new Error('Video generation timed out')
  }
}

// Create instance
export const heygenAPI = new HeyGenAPI()