// CREATE SYNTHESIA VIDEO - WORKING METHOD
import fetch from 'node-fetch'
import { scriptGenerator } from './src/utils/videoScriptGenerator.js'

async function createSynthesiaVideoNow() {
  const apiKey = '608e017ec9e2c82acc7a2fd32fa07df9'
  
  console.log('🎬 CREATING VIDEO WITH SYNTHESIA')
  console.log('=' .repeat(60))
  
  // Generate script
  const scriptData = scriptGenerator.generateFirstVideo()
  console.log(`✅ Script Ready: "${scriptData.metadata.title}"`)
  
  // Create video with working auth method
  const payload = {
    "input": [
      {
        "scriptText": scriptData.voiceover.fullScript.replace(/\[.*?\]/g, '').trim(),
        "avatar": "anna_costume1_cameraA",
        "background": "gradient_sunny_yellow"
      }
    ],
    "title": `Kickoff Club - ${scriptData.metadata.title}`,
    "test": false,
    "visibility": "private"
  }
  
  try {
    console.log('\n📡 Sending to Synthesia API...')
    
    const response = await fetch('https://api.synthesia.io/v2/videos', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,  // Plain auth works!
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    
    const responseText = await response.text()
    console.log(`Status: ${response.status}`)
    
    if (response.ok) {
      const data = JSON.parse(responseText)
      console.log('\n✅✅✅ VIDEO CREATED SUCCESSFULLY! ✅✅✅')
      console.log('=' .repeat(60))
      console.log('📹 Video ID:', data.id || data.video_id || 'Generated')
      console.log('🔗 Status:', data.status || 'Processing')
      
      if (data.id) {
        console.log('\n🔗 Check your video at:')
        console.log(`   https://app.synthesia.io/videos/${data.id}`)
      }
      
      console.log('\n⏱️  Your video will be ready in ~10 minutes')
      console.log('📧 You\'ll receive an email when it\'s complete')
      
      return data
    } else {
      console.log('Response:', responseText)
      
      // If still getting auth errors, try listing videos first
      console.log('\n🔄 Testing GET request...')
      const testResponse = await fetch('https://api.synthesia.io/v2/videos', {
        headers: {
          'Authorization': apiKey
        }
      })
      
      if (testResponse.ok) {
        const videos = await testResponse.json()
        console.log('✅ API connection works! You have access to', videos.data?.length || 0, 'videos')
        console.log('\n⚠️  Issue might be with payload format. Trying simplified version...')
        
        // Try simplified payload
        const simplePayload = {
          "scriptText": "Welcome to Kickoff Club! In football, teams get four downs to move ten yards. If they succeed, they get four more downs. Third down is crunch time. Fourth down is decision time. That's the basics of how downs work!",
          "title": "Kickoff Club Test"
        }
        
        const simpleResponse = await fetch('https://api.synthesia.io/v2/videos', {
          method: 'POST',
          headers: {
            'Authorization': apiKey,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(simplePayload)
        })
        
        if (simpleResponse.ok) {
          const simpleData = await simpleResponse.json()
          console.log('\n✅ Simple video created!', simpleData)
          return simpleData
        }
      }
    }
    
  } catch (error) {
    console.error('Error:', error.message)
  }
  
  console.log('\n📝 MANUAL FALLBACK:')
  console.log('1. Go to https://app.synthesia.io')
  console.log('2. Click "New video"')
  console.log('3. Paste the script above')
  console.log('4. Generate video')
}

// Run it
createSynthesiaVideoNow().then(result => {
  if (result) {
    console.log('\n🎉 SUCCESS! Your Synthesia video is being generated!')
  }
}).catch(console.error)