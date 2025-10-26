// Test Synthesia Authentication Methods
import fetch from 'node-fetch'

async function testAllAuthMethods() {
  const apiKey = '608e017ec9e2c82acc7a2fd32fa07df9'
  
  console.log('🔐 Testing Synthesia Authentication Methods')
  console.log('=' .repeat(50))
  
  // Test 1: Bearer token
  console.log('\n1. Testing with Bearer token:')
  try {
    const response1 = await fetch('https://api.synthesia.io/v2/videos', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    })
    console.log(`   Status: ${response1.status}`)
    if (response1.status === 200) console.log('   ✅ Bearer token works!')
  } catch (e) {
    console.log('   ❌ Error:', e.message)
  }
  
  // Test 2: X-API-Key header
  console.log('\n2. Testing with X-API-Key:')
  try {
    const response2 = await fetch('https://api.synthesia.io/v2/videos', {
      method: 'GET',
      headers: {
        'X-API-Key': apiKey
      }
    })
    console.log(`   Status: ${response2.status}`)
    if (response2.status === 200) console.log('   ✅ X-API-Key works!')
  } catch (e) {
    console.log('   ❌ Error:', e.message)
  }
  
  // Test 3: API key in URL
  console.log('\n3. Testing with API key in URL:')
  try {
    const response3 = await fetch(`https://api.synthesia.io/v2/videos?api_key=${apiKey}`, {
      method: 'GET'
    })
    console.log(`   Status: ${response3.status}`)
    if (response3.status === 200) console.log('   ✅ URL parameter works!')
  } catch (e) {
    console.log('   ❌ Error:', e.message)
  }
  
  // Test 4: Basic Auth
  console.log('\n4. Testing with Basic Auth:')
  try {
    const auth = Buffer.from(`${apiKey}:`).toString('base64')
    const response4 = await fetch('https://api.synthesia.io/v2/videos', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`
      }
    })
    console.log(`   Status: ${response4.status}`)
    if (response4.status === 200) console.log('   ✅ Basic Auth works!')
  } catch (e) {
    console.log('   ❌ Error:', e.message)
  }
  
  // Test 5: Just the key without Bearer
  console.log('\n5. Testing with plain Authorization:')
  try {
    const response5 = await fetch('https://api.synthesia.io/v2/videos', {
      method: 'GET',
      headers: {
        'Authorization': apiKey
      }
    })
    console.log(`   Status: ${response5.status}`)
    if (response5.status === 200) console.log('   ✅ Plain Authorization works!')
  } catch (e) {
    console.log('   ❌ Error:', e.message)
  }
  
  console.log('\n' + '=' .repeat(50))
  console.log('📝 NEXT STEPS:')
  console.log('1. Go to https://app.synthesia.io/#/account')
  console.log('2. Click on "API" or "API Keys" section')
  console.log('3. Check if API access is ENABLED for your account')
  console.log('4. If you see "Enable API" button, click it')
  console.log('5. Generate a NEW API key if needed')
  console.log('\nNOTE: Creator plan ($89/month) or higher is required for API access')
}

testAllAuthMethods()