// Synthesia API Integration for Kickoff Club Video Generation
import fetch from 'node-fetch'

export class SynthesiaAPI {
  constructor() {
    // You'll need to add your Synthesia API key here
    this.apiKey = process.env.SYNTHESIA_API_KEY || 'YOUR_SYNTHESIA_API_KEY'
    this.baseURL = 'https://api.synthesia.io/v2'
    this.headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    }
  }

  // Create a new video from our script
  async createVideo(scriptData) {
    try {
      console.log('🎬 Sending video creation request to Synthesia...')
      
      // Use the correct Synthesia API format from official documentation
      const payload = {
        test: true, // Set to true for testing
        title: scriptData.metadata.title,
        scriptText: this.formatScriptForSynthesia(scriptData.voiceover.fullScript),
        avatar: "anna_costume1_cameraA", // Professional female avatar
        background: "green_screen" // Standard background option
      }

      const response = await fetch(`${this.baseURL}/videos`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify(payload)
      })

      if (!response.ok) {
        throw new Error(`Synthesia API error: ${response.status} ${response.statusText}`)
      }

      const result = await response.json()
      
      console.log('✅ Video creation request successful!')
      console.log(`📹 Video ID: ${result.id}`)
      console.log(`⏱️  Status: ${result.status}`)
      console.log(`🔗 You can check progress at: ${result.url || 'Synthesia dashboard'}`)

      return result

    } catch (error) {
      console.error('❌ Error creating video:', error.message)
      throw error
    }
  }

  // Check video generation status
  async getVideoStatus(videoId) {
    try {
      const response = await fetch(`${this.baseURL}/videos/${videoId}`, {
        method: 'GET',
        headers: this.headers
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const result = await response.json()
      return result

    } catch (error) {
      console.error('Error checking video status:', error)
      throw error
    }
  }

  // Format our script for Synthesia's expected format
  formatScriptForSynthesia(fullScript) {
    // Remove timestamp annotations and clean up for voice synthesis
    return fullScript
      .replace(/\[.*?\]/g, '') // Remove [SECTION TITLES]
      .replace(/\n\n+/g, '\n\n') // Clean up extra newlines
      .trim()
  }

  // Get available avatars
  async getAvailableAvatars() {
    try {
      const response = await fetch(`${this.baseURL}/avatars`, {
        headers: this.headers
      })
      
      const avatars = await response.json()
      return avatars.filter(avatar => 
        avatar.gender === 'female' && 
        avatar.style === 'casual' &&
        avatar.language.includes('en')
      )
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
      
      if (status.status === 'complete') {
        console.log('🎉 Video generation complete!')
        console.log(`📥 Download URL: ${status.download}`)
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
export const synthesiaAPI = new SynthesiaAPI()