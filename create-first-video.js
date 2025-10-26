// Create First Kickoff Club Video with Synthesia AI
import { scriptGenerator } from './src/utils/videoScriptGenerator.js'
import { synthesiaAPI } from './src/services/synthesiaAPI.js'

async function createFirstVideo() {
  console.log('🚀 KICKOFF CLUB - FIRST VIDEO CREATION')
  console.log('=' .repeat(50))
  
  try {
    // Step 1: Generate the script
    console.log('📝 Step 1: Generating script...')
    const scriptData = scriptGenerator.generateFirstVideo()
    
    console.log(`✅ Script generated: "${scriptData.metadata.title}"`)
    console.log(`📊 Duration: ~${scriptData.voiceover.estimatedDuration} seconds`)
    console.log(`📝 Words: ${scriptData.voiceover.estimatedWords}`)
    
    // Step 2: Clean script for voice synthesis
    console.log('\n🎤 Step 2: Preparing voice script...')
    const cleanScript = synthesiaAPI.formatScriptForSynthesia(scriptData.voiceover.fullScript)
    
    console.log('📋 FINAL SCRIPT FOR SYNTHESIA:')
    console.log('-'.repeat(40))
    console.log(cleanScript)
    console.log('-'.repeat(40))
    
    // Step 3: Check if API key is configured
    if (synthesiaAPI.apiKey === 'YOUR_SYNTHESIA_API_KEY') {
      console.log('\n⚠️  API KEY REQUIRED')
      console.log('To generate the actual video, you need to:')
      console.log('1. Sign up at https://synthesia.io')
      console.log('2. Get your API key from the dashboard')
      console.log('3. Set environment variable: SYNTHESIA_API_KEY=your_key_here')
      console.log('\nFor now, here\'s what we would send to Synthesia:')
      
      // Show the payload we would send
      const payload = {
        title: scriptData.metadata.title,
        description: `Kickoff Club: ${scriptData.metadata.title} - ${scriptData.metadata.brandMessage}`,
        template: {
          id: "minimal",
          data: {
            avatar: {
              id: "anna_costume1_cameraA",
              style: "rectangular"
            },
            background: {
              type: "color", 
              value: "#F8F9FA"
            },
            script: cleanScript,
            soundtrack: {
              type: "none"
            },
            captions: true,
            brand: {
              logo: {
                url: "https://your-domain.com/assets/kickoff-club-logo.png",
                position: "bottom-right"
              },
              colors: {
                primary: "#9333EA",
                secondary: "#EC4899"
              }
            }
          }
        }
      }
      
      console.log('\n🤖 SYNTHESIA API PAYLOAD:')
      console.log(JSON.stringify(payload, null, 2))
      
      return {
        success: true,
        message: 'Script ready for Synthesia API',
        scriptData,
        payload,
        nextSteps: [
          'Get Synthesia API key',
          'Set SYNTHESIA_API_KEY environment variable',
          'Run this script again to generate video'
        ]
      }
    }
    
    // Step 4: Create video with Synthesia (if API key is available)
    console.log('\n🎬 Step 3: Sending to Synthesia API...')
    const videoResult = await synthesiaAPI.createVideo(scriptData)
    
    console.log('\n🎉 SUCCESS!')
    console.log(`📹 Video ID: ${videoResult.id}`)
    console.log(`📊 Status: ${videoResult.status}`)
    
    // Step 5: Monitor progress (optional)
    if (videoResult.status === 'processing') {
      console.log('\n⏳ Monitoring video generation...')
      const completedVideo = await synthesiaAPI.waitForCompletion(videoResult.id)
      
      console.log('\n🎊 VIDEO READY!')
      console.log(`📥 Download: ${completedVideo.download}`)
      
      return {
        success: true,
        video: completedVideo,
        scriptData
      }
    }
    
    return {
      success: true,
      video: videoResult,
      scriptData
    }
    
  } catch (error) {
    console.error('\n❌ ERROR:', error.message)
    return {
      success: false,
      error: error.message
    }
  }
}

// Run the video creation
createFirstVideo()
  .then(result => {
    if (result.success) {
      console.log('\n✅ PROCESS COMPLETE')
      if (result.nextSteps) {
        console.log('\n📋 NEXT STEPS:')
        result.nextSteps.forEach((step, i) => {
          console.log(`${i + 1}. ${step}`)
        })
      }
    } else {
      console.log('\n❌ PROCESS FAILED:', result.error)
    }
  })
  .catch(error => {
    console.error('\n💥 FATAL ERROR:', error)
  })