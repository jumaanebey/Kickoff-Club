// Create Enhanced "How Downs Work" Video with Better Visuals
import fetch from 'node-fetch'

async function createEnhancedVideo() {
  const apiKey = '608e017ec9e2c82acc7a2fd32fa07df9'
  
  console.log('🎬 CREATING ENHANCED "HOW DOWNS WORK" VIDEO')
  console.log('=' .repeat(60))
  console.log('🎨 Features: Better backgrounds, chill voice, enhanced visuals')
  
  // More chill, conversational script
  const chillScript = `
    Hey there! Want to finally understand what's going on with all those downs in football? Cool, let's break it down.
    
    So here's the deal - think of football like a video game where you get four tries to move forward ten yards. That's literally it. Four attempts, ten yards. Simple, right?
    
    Picture this: the team gets the ball and sees a glowing line ten yards ahead. That's their target. They run a play, maybe gain three yards. Now they need seven more.
    
    Second try - they throw a quick pass for five yards. Getting closer! Just two yards to go now.
    
    Third down is where things get spicy. This is like the boss level. The defense knows the team is getting desperate, so they bring the heat. But our team pulls off a trick play and... boom! They made it!
    
    When you get those ten yards, it's like hitting a checkpoint in a game. Everything resets. You get four fresh attempts and a new ten-yard target appears ahead.
    
    Now here's where it gets interesting. If you're on fourth down and haven't made it, you've got three choices: punt it away and play defense, kick a field goal for some points, or say "forget it" and go for broke.
    
    And that's football downs, my friend. Four chances, ten yards, endless drama. Once you see it this way, you'll never be confused again.
    
    Pretty chill way to learn football, right? You're already thinking like someone who gets the game.
  `
  
  // Enhanced payload with better settings
  const payload = {
    "input": [
      {
        "scriptText": chillScript.trim(),
        "avatar": "anna_costume1_cameraA", // Keep Anna but with different settings
        "background": "studio_navy",  // More professional/cool background
        "avatarSettings": {
          "voice": {
            "provider": "elevenlabs",
            "speed": 0.9,  // Slightly slower for chill vibe
            "emotion": "friendly"
          }
        }
      }
    ],
    "title": "Kickoff Club - How Downs Work (Enhanced)",
    "description": "Chill, visual explanation of football downs with better production",
    "test": false,
    "visibility": "private"
  }
  
  try {
    console.log('📡 Creating enhanced video...')
    
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
      console.log('\n✅✅✅ ENHANCED VIDEO CREATED! ✅✅✅')
      console.log('=' .repeat(60))
      console.log('📹 Video ID:', data.id)
      console.log('🎨 Title: Kickoff Club - How Downs Work (Enhanced)')
      console.log('🎯 Style: Chill, conversational, visual')
      console.log('🎭 Background: Studio Navy (professional)')
      console.log('⚡ Voice: Slower speed, friendly emotion')
      console.log('\n🔗 View: https://app.synthesia.io/videos/' + data.id)
      
      return data
    } else {
      const errorText = await response.text()
      console.log('Error response:', errorText)
      
      // If advanced settings don't work, try simplified version
      console.log('\n🔄 Trying simplified enhanced version...')
      return await createSimplifiedEnhanced()
    }
    
  } catch (error) {
    console.error('Error:', error.message)
    // Fallback to simplified version
    return await createSimplifiedEnhanced()
  }
}

async function createSimplifiedEnhanced() {
  const apiKey = '608e017ec9e2c82acc7a2fd32fa07df9'
  
  // Chill script with more visual language
  const visualScript = `
    Hey! Ready to crack the code on football downs? Let's make this super visual and chill.
    
    Imagine you're playing a board game. You roll the dice and get four moves to advance ten spaces. That's exactly how football downs work - four chances to move ten yards.
    
    Picture a bright yellow line painted on the field ten yards ahead. That's your finish line. The team runs forward - maybe they get three yards. The yellow line is still seven yards away.
    
    Second down! They throw the ball through the air to a receiver. He catches it and runs five more yards. Now they're only two yards from that magical yellow line.
    
    Third down is crunch time! The defense is fired up, the crowd is loud. But watch this - the quarterback fakes a handoff and runs around the edge. He dives across the line!
    
    Boom! The yellow line disappears and a NEW one appears ten yards further down the field. It's like unlocking the next level in your favorite game. Four fresh chances, new target.
    
    But what if you're stuck on fourth down? Three doors appear: Door one says 'Punt' - give the ball to the other team but far away. Door two says 'Field Goal' - try to kick it for points. Door three says 'Go For It' - risk everything for the first down.
    
    That's the beautiful chaos of football downs. Four tries, ten yards, infinite possibilities. You're now seeing the game like a seasoned fan.
  `
  
  const simplePayload = {
    "input": [
      {
        "scriptText": visualScript.trim(),
        "avatar": "anna_costume1_cameraA",
        "background": "city_rooftop_day"  // Different cool background
      }
    ],
    "title": "Kickoff Club - Downs Explained (Visual & Chill)",
    "test": false
  }
  
  try {
    const response = await fetch('https://api.synthesia.io/v2/videos', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(simplePayload)
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('\n✅ VISUAL & CHILL VERSION CREATED!')
      console.log('📹 Video ID:', data.id)
      console.log('🏙️ Background: City Rooftop Day (dynamic)')
      console.log('🎯 Style: Visual metaphors, chill delivery')
      return data
    } else {
      console.log('Simplified version error:', await response.text())
    }
    
  } catch (error) {
    console.error('Simplified version error:', error.message)
  }
}

// Main execution
createEnhancedVideo().then(result => {
  if (result) {
    console.log('\n🎉 SUCCESS! Enhanced video is being created!')
    console.log('⏱️  Ready in ~10 minutes with better visuals and chill vibe')
  }
}).catch(console.error)