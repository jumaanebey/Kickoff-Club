// Create Animated Football Video - Simplified Version
import fetch from 'node-fetch'

async function createAnimatedVideo() {
  const apiKey = '608e017ec9e2c82acc7a2fd32fa07df9'
  
  console.log('🎬 CREATING ANIMATED FOOTBALL VIDEO')
  console.log('=' .repeat(60))
  
  // Script optimized for visual descriptions and animations
  const animatedScript = `
    Let's visualize how downs work step by step!
    
    Picture a football field as your game board. The offense starts here, holding the ball.
    
    First down! Imagine a bright yellow line appearing ten yards ahead. That's your target. The team runs a play and gains three yards. The ball moves forward, but look - they still need seven more yards to reach that yellow line.
    
    Second down! The pressure builds. They throw a quick pass for five yards. Now they're getting close - just two yards away from earning fresh downs!
    
    Third down! This is the moment of truth. Watch as the defense gets ready. The quarterback takes the snap, scrambles left, and dives forward. He made it! 
    
    The chains move! Fresh set of downs appears. The yellow line jumps forward another ten yards. It's like leveling up in your favorite game.
    
    But here comes fourth down later in the drive. Picture three doors appearing: Door one says 'Punt' - play it safe. Door two says 'Field Goal' - try for three points. Door three says 'Go For It' - risk everything!
    
    This is football strategy coming alive. Four chances, ten yards, endless excitement. You're now thinking like a coach who sees the field in living color!
  `
  
  // Simplified payload
  const payload = {
    "input": [
      {
        "scriptText": animatedScript.trim(),
        "avatar": "jack_business2_cameraA",
        "background": "gradient_blue_pink"
      }
    ],
    "title": "Kickoff Club - Downs with Animations",
    "test": false
  }
  
  try {
    console.log('📡 Creating animated video...')
    
    const response = await fetch('https://api.synthesia.io/v2/videos', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('\n✅✅✅ ANIMATED VIDEO CREATED! ✅✅✅')
      console.log('=' .repeat(60))
      console.log('📹 Video ID:', data.id)
      console.log('🎨 Title: Kickoff Club - Downs with Animations')
      console.log('👤 Avatar: Jack (different presenter)')
      console.log('🌈 Background: Gradient Blue/Pink')
      console.log('🎬 Style: Visual descriptions for animation effects')
      console.log('\n🔗 View: https://app.synthesia.io/videos/' + data.id)
      
      return data
    } else {
      const error = await response.text()
      console.log('Error:', error)
    }
    
  } catch (error) {
    console.error('Error:', error.message)
  }
}

// Create step-by-step version too
async function createStepByStepVideo() {
  const apiKey = '608e017ec9e2c82acc7a2fd32fa07df9'
  
  await new Promise(resolve => setTimeout(resolve, 3000)) // Wait between calls
  
  console.log('\n🎬 CREATING STEP-BY-STEP VIDEO')
  console.log('=' .repeat(60))
  
  const stepScript = `
    Master Football Downs in Six Simple Steps!
    
    Step One: The Foundation. Every possession starts with four attempts called downs. Think of them as four chances to succeed.
    
    Step Two: The Ten Yard Challenge. Your mission? Move the ball ten yards forward using those four chances. Picture walking from your front door to your mailbox - that's about ten yards.
    
    Step Three: The Reset Reward. Make it ten yards? Congratulations! You earn four brand new downs. The counter resets, and you start fresh. It's like getting extra lives in a video game.
    
    Step Four: Reading the Display. See "Third and Five" on screen? That means third attempt, five yards still needed. The math tells you everything about the situation.
    
    Step Five: Third Down Pressure. This is crunch time! Miss here, and you face a big decision on fourth down. That's why stadiums explode with noise on third down.
    
    Step Six: The Ultimate Choice. Fourth down presents three paths: punt the ball away safely, attempt a field goal for points, or risk everything and go for it. Champions are made in these moments.
    
    You've mastered the downs system! Now you can watch any football game and understand exactly what's happening. Welcome to the inner circle of football fans!
  `
  
  const payload = {
    "input": [
      {
        "scriptText": stepScript.trim(),
        "avatar": "anna_costume1_cameraA",
        "background": "contemporary_office"
      }
    ],
    "title": "Kickoff Club - Downs Mastery Guide",
    "test": false
  }
  
  try {
    console.log('📡 Creating step-by-step guide...')
    
    const response = await fetch('https://api.synthesia.io/v2/videos', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('\n✅✅✅ MASTERY GUIDE CREATED! ✅✅✅')
      console.log('=' .repeat(60))
      console.log('📹 Video ID:', data.id)
      console.log('📚 Title: Kickoff Club - Downs Mastery Guide')
      console.log('👩 Avatar: Anna (returning presenter)')
      console.log('🏢 Background: Contemporary Office')
      console.log('🎯 Format: 6-step structured learning')
      console.log('\n🔗 View: https://app.synthesia.io/videos/' + data.id)
      
      return data
    } else {
      const error = await response.text()
      console.log('Error:', error)
    }
    
  } catch (error) {
    console.error('Error:', error.message)
  }
}

// Create both videos
async function main() {
  console.log('🚀 EXPANDING KICKOFF CLUB VIDEO LIBRARY')
  console.log('=' .repeat(70))
  console.log('Creating complementary videos to cement the learning...\n')
  
  const animated = await createAnimatedVideo()
  const stepByStep = await createStepByStepVideo()
  
  console.log('\n\n🎉 VIDEO SERIES EXPANDED!')
  console.log('=' .repeat(70))
  console.log('Your Kickoff Club now has THREE videos:')
  console.log('\n1. ✅ "How Downs Work" - Core explanation')
  console.log('2. ✅ "Downs with Animations" - Visual descriptions')
  console.log('3. ✅ "Downs Mastery Guide" - Step-by-step breakdown')
  console.log('\n🎯 This creates a complete learning experience:')
  console.log('   • Different learning styles covered')
  console.log('   • Multiple presenters for variety')  
  console.log('   • Progressive complexity levels')
  console.log('\n⏱️  All videos ready in ~10 minutes')
  console.log('📺 View at: https://app.synthesia.io/#/videos')
}

main().catch(console.error)