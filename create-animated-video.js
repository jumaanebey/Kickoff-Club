// Create Second Synthesia Video with Animations and Visual Elements
import fetch from 'node-fetch'

async function createAnimatedFootballVideo() {
  const apiKey = '608e017ec9e2c82acc7a2fd32fa07df9'
  
  console.log('🎬 CREATING ANIMATED FOOTBALL VIDEO')
  console.log('=' .repeat(60))
  
  // Enhanced script with visual cues for animations
  const animatedScript = `
    Let's visualize how downs work with animations!
    
    Picture a football field as a giant game board. The offense starts here, at their own twenty yard line.
    
    First down! Watch the yellow line appear ten yards ahead. That's your target. The team runs a play and gains three yards. The ball moves forward, but they still need seven more.
    
    Second down! The clock is ticking. They throw a quick pass for five yards. Now they're close, just two yards to go!
    
    Third down! This is where it gets intense. The defense knows they're desperate. The quarterback scrambles and dives forward. Did he make it? Yes! The chains move!
    
    Fresh set of downs! The yellow line resets ten yards ahead. It's like leveling up in a video game. The team keeps marching down the field.
    
    But wait! Now it's fourth down and they're short. Three choices appear on screen: Punt it away safely, kick a field goal for three points, or risk everything and go for it!
    
    This is football strategy in action. Four chances, ten yards, endless possibilities. Now you're thinking like a coach!
  `
  
  const payload = {
    "input": [
      {
        "scriptText": animatedScript.trim(),
        "avatar": "jack_business2_cameraA", // Different avatar for variety
        "background": "contemporary_beach",
        "avatarSettings": {
          "voice": "en-US-ChristopherNeural", // Male voice for variety
          "horizontalAlign": "left",
          "scale": 0.8,
          "style": "rectangular"
        }
      }
    ],
    "title": "Kickoff Club - Downs Explained (Animated)",
    "description": "Visual explanation of football downs with animated concepts",
    "test": false,
    "visibility": "private"
  }
  
  try {
    console.log('📡 Creating animated version with visual descriptions...')
    
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
      console.log('🎬 Title: Kickoff Club - Downs Explained (Animated)')
      console.log('🎨 Features: Visual descriptions for animation')
      console.log('👤 Avatar: Jack (for variety)')
      console.log('🏖️ Background: Contemporary Beach')
      console.log('\n🔗 View at: https://app.synthesia.io/videos/' + data.id)
      console.log('\n⏱️  Ready in ~10 minutes')
      
      return data
    } else {
      const error = await response.text()
      console.log('Response:', error)
    }
    
  } catch (error) {
    console.error('Error:', error.message)
  }
}

// Also create a third video with step-by-step breakdown
async function createStepByStepVideo() {
  const apiKey = '608e017ec9e2c82acc7a2fd32fa07df9'
  
  console.log('\n\n🎬 CREATING STEP-BY-STEP TUTORIAL')
  console.log('=' .repeat(60))
  
  const stepByStepScript = `
    Football Downs: Your Step-by-Step Guide.
    
    Step One: Understanding the Basics.
    Every time a team gets the ball, they receive four attempts called downs. Think of it like four swings at bat in baseball.
    
    Step Two: The Ten Yard Goal.
    The team must advance the ball ten yards in those four attempts. Imagine trying to move from your couch to your kitchen in four steps.
    
    Step Three: Earning Fresh Downs.
    When you successfully move ten yards, you earn four new downs. It's a reward system that keeps the game moving forward.
    
    Step Four: Reading the Scoreboard.
    When you see "2nd and 7", it means: second attempt, seven yards still needed. Simple math that tells the whole story.
    
    Step Five: The Third Down Drama.
    Third down is crucial. Fail here, and you face a tough decision on fourth down. This is why fans get loud on third down!
    
    Step Six: Fourth Down Decisions.
    Punt to play defense. Kick a field goal for points. Or gamble and go for it. Each choice changes the game.
    
    Congratulations! You now understand football downs. Practice spotting these situations during games, and you'll be an expert in no time!
  `
  
  const payload = {
    "input": [
      {
        "scriptText": stepByStepScript.trim(),
        "avatar": "anna_costume1_cameraA",
        "background": "luxury_lobby",
        "avatarSettings": {
          "voice": "en-US-JennyNeural",
          "horizontalAlign": "center",
          "scale": 1.0,
          "style": "circular"
        }
      }
    ],
    "title": "Kickoff Club - Downs Step-by-Step Guide",
    "description": "Structured tutorial breaking down football downs into clear steps",
    "test": false,
    "visibility": "private"
  }
  
  try {
    console.log('📡 Creating step-by-step tutorial...')
    
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
      console.log('\n✅✅✅ STEP-BY-STEP VIDEO CREATED! ✅✅✅')
      console.log('=' .repeat(60))
      console.log('📹 Video ID:', data.id)
      console.log('📚 Title: Kickoff Club - Downs Step-by-Step Guide')
      console.log('🎯 Format: Structured 6-step tutorial')
      console.log('🏢 Background: Luxury Lobby (professional)')
      console.log('\n🔗 View at: https://app.synthesia.io/videos/' + data.id)
      console.log('\n⏱️  Ready in ~10 minutes')
      
      return data
    }
    
  } catch (error) {
    console.error('Error:', error.message)
  }
}

// Create both videos
async function createVideoSeries() {
  console.log('🚀 CREATING KICKOFF CLUB VIDEO SERIES')
  console.log('=' .repeat(60))
  console.log('Creating multiple videos to cement the learning experience...\n')
  
  // Create animated version
  const animated = await createAnimatedFootballVideo()
  
  // Wait a moment between API calls
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Create step-by-step version
  const stepByStep = await createStepByStepVideo()
  
  console.log('\n\n🎉 VIDEO SERIES COMPLETE!')
  console.log('=' .repeat(60))
  console.log('You now have THREE videos:')
  console.log('1. ✅ Original "How Downs Work" - Already created')
  console.log('2. ✅ Animated Visual Explanation - Just created')
  console.log('3. ✅ Step-by-Step Tutorial - Just created')
  console.log('\n📺 All videos will be ready in ~10 minutes')
  console.log('📧 Check your email for completion notifications')
  console.log('\n🔗 View all videos at: https://app.synthesia.io/#/videos')
}

// Run it
createVideoSeries().catch(console.error)