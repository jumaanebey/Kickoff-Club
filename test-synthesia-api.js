// Test Synthesia API endpoints to find the correct structure
import fetch from 'node-fetch'

const apiKey = '608e017ec9e2c82acc7a2fd32fa07df9'

async function testSynthesiaEndpoints() {
  const headers = {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  }

  const endpoints = [
    'https://api.synthesia.io/v1/videos',
    'https://api.synthesia.io/v2/videos', 
    'https://api.synthesia.io/videos',
    'https://api.synthesia.io/v1/avatars',
    'https://api.synthesia.io/v2/avatars'
  ]

  console.log('🔍 Testing Synthesia API endpoints...\n')

  for (const endpoint of endpoints) {
    try {
      console.log(`Testing: ${endpoint}`)
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: headers
      })
      
      console.log(`Status: ${response.status} ${response.statusText}`)
      
      if (response.ok) {
        const data = await response.json()
        console.log('✅ SUCCESS! This endpoint works')
        console.log('Response preview:', JSON.stringify(data, null, 2).substring(0, 200) + '...')
      } else {
        console.log(`❌ Failed: ${response.status}`)
      }
      console.log('-'.repeat(50))
      
    } catch (error) {
      console.log(`❌ Error: ${error.message}`)
      console.log('-'.repeat(50))
    }
  }
}

testSynthesiaEndpoints()