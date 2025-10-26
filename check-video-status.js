// Check Synthesia Video Status
import fetch from 'node-fetch'

async function checkVideoStatus() {
  const apiKey = '608e017ec9e2c82acc7a2fd32fa07df9'
  const videoId = '786d9e56-9847-409b-ab84-278cd9f97343'
  
  console.log('🔍 Checking video status...')
  
  const response = await fetch(`https://api.synthesia.io/v2/videos/${videoId}`, {
    headers: {
      'Authorization': apiKey
    }
  })
  
  if (response.ok) {
    const video = await response.json()
    
    console.log('\n📹 VIDEO STATUS:')
    console.log('=' .repeat(40))
    console.log('Title:', video.title)
    console.log('Status:', video.status)
    console.log('Duration:', video.duration ? `${video.duration} seconds` : 'Processing...')
    
    if (video.status === 'complete') {
      console.log('\n✅ VIDEO IS READY!')
      console.log('Download URL:', video.download)
      console.log('\nView in dashboard:')
      console.log('https://app.synthesia.io/#/videos')
    } else {
      console.log('\n⏳ Still processing... (usually takes 5-10 minutes)')
      console.log('Check again in a minute')
    }
    
    return video
  }
}

// Check every 30 seconds
async function monitorVideo() {
  let complete = false
  let checks = 0
  
  while (!complete && checks < 20) { // Max 10 minutes
    const status = await checkVideoStatus()
    
    if (status.status === 'complete') {
      complete = true
      console.log('\n🎉 YOUR VIDEO IS READY TO DOWNLOAD!')
    } else {
      checks++
      if (checks < 20) {
        console.log(`\n⏰ Checking again in 30 seconds... (${checks}/20)`)
        await new Promise(resolve => setTimeout(resolve, 30000))
      }
    }
  }
}

// Run it
monitorVideo().catch(console.error)