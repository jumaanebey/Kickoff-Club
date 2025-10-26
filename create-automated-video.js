// Automated Video Creation with Multiple AI Platforms
import { scriptGenerator } from './src/utils/videoScriptGenerator.js'
import { synthesiaAPI } from './src/services/synthesiaAPI.js'
import { heygenAPI } from './src/services/heygenAPI.js'
import { openaiVideoAPI } from './src/services/openaiVideoAPI.js'

class AutomatedVideoCreator {
  constructor() {
    this.platforms = [
      { name: 'Synthesia', api: synthesiaAPI, priority: 1 },
      { name: 'HeyGen', api: heygenAPI, priority: 2 },
      { name: 'OpenAI Video', api: openaiVideoAPI, priority: 3 }
    ]
  }

  async createVideo(videoType = 'football') {
    console.log('🚀 AUTOMATED AI VIDEO CREATION')
    console.log('='.repeat(50))
    
    try {
      // Step 1: Generate the script
      console.log('📝 Step 1: Generating script...')
      const scriptData = videoType === 'performance' 
        ? this.generatePerformanceReviewScript()
        : scriptGenerator.generateFirstVideo()
      
      console.log(`✅ Script generated: "${scriptData.metadata.title}"`)
      console.log(`📊 Duration: ~${scriptData.voiceover.estimatedDuration} seconds`)
      
      // Step 2: Try each platform until one works
      console.log('\n🤖 Step 2: Attempting video creation with AI platforms...')
      
      for (const platform of this.platforms) {
        try {
          console.log(`\n🔄 Trying ${platform.name}...`)
          
          if (platform.name === 'Synthesia') {
            // Check API key first
            if (platform.api.apiKey === 'YOUR_SYNTHESIA_API_KEY') {
              console.log('⚠️  Synthesia API key not configured, skipping...')
              continue
            }
            
            const result = await platform.api.createVideo(scriptData)
            console.log(`✅ SUCCESS with ${platform.name}!`)
            
            // Monitor completion if needed
            if (result.status === 'processing') {
              console.log('⏳ Monitoring video generation...')
              const completed = await platform.api.waitForCompletion(result.id)
              return {
                success: true,
                platform: platform.name,
                video: completed,
                scriptData
              }
            }
            
            return {
              success: true,
              platform: platform.name,
              video: result,
              scriptData
            }
            
          } else if (platform.name === 'HeyGen') {
            if (platform.api.apiKey === 'YOUR_HEYGEN_API_KEY') {
              console.log('⚠️  HeyGen API key not configured, skipping...')
              continue
            }
            
            const result = await platform.api.createVideo(scriptData)
            console.log(`✅ SUCCESS with ${platform.name}!`)
            
            const completed = await platform.api.waitForCompletion(result.video_id)
            return {
              success: true,
              platform: platform.name,
              video: completed,
              scriptData
            }
            
          } else if (platform.name === 'OpenAI Video') {
            if (platform.api.apiKey === 'YOUR_OPENAI_API_KEY') {
              console.log('⚠️  OpenAI API key not configured, skipping...')
              continue
            }
            
            const assets = await platform.api.createVideoAssets(scriptData)
            console.log(`✅ SUCCESS with ${platform.name}!`)
            
            return {
              success: true,
              platform: platform.name,
              assets,
              scriptData,
              note: 'Video assets created. You can use these with video editing software.'
            }
          }
          
        } catch (error) {
          console.log(`❌ ${platform.name} failed: ${error.message}`)
          continue
        }
      }
      
      // If all platforms fail, provide manual creation guide
      console.log('\n⚠️  All AI platforms unavailable. Providing manual creation guide...')
      return this.createManualGuide(scriptData)
      
    } catch (error) {
      console.error('\n❌ FATAL ERROR:', error.message)
      return {
        success: false,
        error: error.message,
        fallback: 'Check API keys and try manual video creation'
      }
    }
  }

  generatePerformanceReviewScript() {
    // Import the performance review generator if available
    try {
      const { PerformanceReviewScriptGenerator } = require('./generate-performance-review-video.js')
      const generator = new PerformanceReviewScriptGenerator()
      return generator.generatePerformanceReviewVideo()
    } catch (error) {
      // Fallback to basic script
      return {
        metadata: {
          title: "Performance Review Excellence",
          subtitle: "Master Your Career Conversations",
          brandMessage: "Professional development made simple"
        },
        voiceover: {
          fullScript: "Ready to excel in your performance review? Here are the key strategies: First, document your achievements throughout the year. Second, use the STAR method to showcase your impact. Third, address challenges honestly as learning opportunities. Finally, come prepared with future goals and development plans. Your performance review is a career conversation - approach it with confidence!",
          estimatedDuration: 45,
          estimatedWords: 65
        }
      }
    }
  }

  createManualGuide(scriptData) {
    console.log('\n📋 MANUAL VIDEO CREATION GUIDE')
    console.log('='.repeat(40))
    console.log('Since automated platforms are unavailable, here\'s how to create your video manually:')
    
    console.log('\n🎬 SCRIPT FOR MANUAL RECORDING:')
    console.log('-'.repeat(30))
    console.log(scriptData.voiceover.fullScript)
    
    console.log('\n🛠️  RECOMMENDED TOOLS:')
    console.log('1. Loom (https://loom.com) - Screen recording with webcam')
    console.log('2. OBS Studio (https://obsproject.com) - Professional recording')
    console.log('3. Canva (https://canva.com) - Video templates and editing')
    console.log('4. VEED.io (https://veed.io) - Online video editor')
    
    console.log('\n📱 QUICK SETUP:')
    console.log('1. Choose a clean, well-lit background')
    console.log('2. Use good lighting (face a window or use a ring light)')
    console.log('3. Ensure clear audio (use a headset microphone if possible)')
    console.log('4. Keep the video between 60-90 seconds')
    console.log('5. Record in landscape orientation')
    
    return {
      success: true,
      platform: 'Manual Creation',
      scriptData,
      manualGuide: true,
      nextSteps: [
        'Set up recording environment',
        'Practice the script 2-3 times',
        'Record the video using recommended tools',
        'Edit and export in HD quality',
        'Upload to your preferred platform'
      ]
    }
  }
}

// Create and run the automated video creator
async function main() {
  const creator = new AutomatedVideoCreator()
  
  // Check command line arguments
  const videoType = process.argv[2] || 'football'
  console.log(`Creating ${videoType} video...`)
  
  const result = await creator.createVideo(videoType)
  
  console.log('\n' + '='.repeat(50))
  if (result.success) {
    console.log('✅ VIDEO CREATION PROCESS COMPLETE!')
    console.log(`Platform used: ${result.platform}`)
    
    if (result.nextSteps) {
      console.log('\n📋 NEXT STEPS:')
      result.nextSteps.forEach((step, i) => {
        console.log(`${i + 1}. ${step}`)
      })
    }
    
    if (result.video) {
      console.log('\n📹 VIDEO DETAILS:')
      console.log(`- ID: ${result.video.id || 'Generated'}`)
      console.log(`- Status: ${result.video.status || 'Ready'}`)
      if (result.video.download || result.video.video_url) {
        console.log(`- Download: ${result.video.download || result.video.video_url}`)
      }
    }
    
  } else {
    console.log('❌ VIDEO CREATION FAILED')
    console.log(`Error: ${result.error}`)
    console.log(`Fallback: ${result.fallback}`)
  }
}

// Run the video creation
main().catch(error => {
  console.error('💥 FATAL ERROR:', error.message)
  process.exit(1)
})

export default AutomatedVideoCreator