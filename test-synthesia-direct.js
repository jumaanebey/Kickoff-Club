// Direct Synthesia API Test with proper authentication
import fetch from 'node-fetch'

async function createSynthesiaVideo() {
  // Your API key from the dashboard (ending in 2fa07df9)
  const apiKey = '75628c2aef3b339eac677cd7479ae27a' // This is your first key
  
  console.log('🎬 Testing Synthesia API Video Creation')
  console.log('=' .repeat(50))
  
  // Simple payload matching their example
  const payload = {
    "test": true,
    "title": "Kickoff Club Test Video",
    "input": [
      {
        "scriptText": "Welcome to Kickoff Club! This is a test video to demonstrate automated AI video generation. In football, teams get four downs to move ten yards. It's that simple!",
        "avatar": "anna_costume1_cameraA",
        "background": "green_screen"
      }
    ]
  }
  
  try {
    console.log('📡 Sending request to Synthesia API...')
    console.log('Endpoint: https://api.synthesia.io/v2/videos')
    console.log('Using API key ending in:', apiKey.slice(-8))
    
    const response = await fetch('https://api.synthesia.io/v2/videos', {
      method: 'POST',
      headers: {
        'Authorization': `${apiKey}`, // Try without Bearer prefix
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    
    const responseText = await response.text()
    console.log(`\nStatus: ${response.status} ${response.statusText}`)
    console.log('Response:', responseText)
    
    if (response.ok) {
      const data = JSON.parse(responseText)
      console.log('\n✅ SUCCESS! Video creation initiated!')
      console.log('Video ID:', data.id || 'Generated')
      console.log('Status:', data.status || 'Processing')
      return data
    } else {
      console.log('\n❌ API request failed')
      
      // Try to parse error message
      try {
        const errorData = JSON.parse(responseText)
        console.log('Error details:', errorData)
      } catch {
        console.log('Raw error:', responseText)
      }
    }
    
  } catch (error) {
    console.error('\n💥 Fatal error:', error.message)
  }
  
  console.log('\n📝 TROUBLESHOOTING STEPS:')
  console.log('1. Verify your Synthesia account has Creator plan or higher')
  console.log('2. Check if API access is enabled in your account settings')
  console.log('3. Try regenerating your API key in the dashboard')
  console.log('4. Contact Synthesia support if the issue persists')
}

// Also try with the second API key you provided
async function tryAlternativeKey() {
  const alternativeKey = '608e017ec9e2c82acc7a2fd32fa07df9'
  
  console.log('\n🔄 Trying alternative API key...')
  
  const response = await fetch('https://api.synthesia.io/v2/videos', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${alternativeKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "test": true,
      "title": "Test Video",
      "input": [{
        "scriptText": "This is a test.",
        "avatar": "anna_costume1_cameraA",
        "background": "green_screen"
      }]
    })
  })
  
  console.log(`Alternative key status: ${response.status}`)
  const result = await response.text()
  console.log('Alternative key response:', result)
}

// Run both tests
console.log('Testing Synthesia API with multiple approaches...\n')

createSynthesiaVideo().then(() => {
  return tryAlternativeKey()
}).then(() => {
  console.log('\n✅ Testing complete!')
}).catch(error => {
  console.error('Error during testing:', error)
})