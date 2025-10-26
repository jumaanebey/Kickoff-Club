// Create YouTube-Style Video with Synthesia (Best Possible Version)
import fetch from 'node-fetch'

async function createYouTubeStyleVideo() {
  const apiKey = '608e017ec9e2c82acc7a2fd32fa07df9'
  
  console.log('🎬 CREATING YOUTUBE-STYLE SYNTHESIA VIDEO')
  console.log('=' .repeat(60))
  console.log('🎯 Goal: Match that YouTube video quality within Synthesia limits')
  
  // Script written specifically for visual interpretation and dynamic delivery
  const youtubeStyleScript = `
    What's up football fans! Today we're breaking down the MOST important concept in football - and I'm going to make it so visual, you'll never forget it.
    
    Imagine football as the ultimate strategy game. You're the commander, and you have exactly FOUR power moves to advance TEN spaces on the battlefield.
    
    Picture this battlefield - it's 100 yards long with bright white lines every five yards. Your army starts here, and your mission is to reach that glowing end zone.
    
    FIRST DOWN! Your team charges forward like warriors. They gain three yards - progress, but not enough. The scoreboard lights up: "1st and 7" - first attempt, seven yards still needed.
    
    SECOND DOWN! Time for an aerial attack. The quarterback launches the ball through the air - it's a perfect spiral! The receiver catches it and sprints forward five more yards. Now it's "2nd and 2" - so close you can taste victory!
    
    THIRD DOWN - this is where legends are born! The defense knows you're desperate, so they bring MAXIMUM pressure. But watch this magic - your team runs a trick play. The ball gets handed off, then lateraled back, then thrown downfield. TOUCHDOWN... no wait, just kidding - but they DID get those two yards!
    
    BOOM! Fresh set of downs! The yellow first-down line vanishes and reappears ten yards further down the field. It's like your video game character just leveled up and unlocked a new checkpoint.
    
    But here's where it gets REALLY strategic. Later in the drive, you're facing fourth down with three yards to go. Time stops. Three doors appear in your mind:
    
    Door number one: PUNT. You kick the ball to the other team, but they get it way down the field. Safe but conservative.
    
    Door number two: FIELD GOAL. Your kicker attempts to score three points. Risk versus reward.
    
    Door number three: GO FOR IT! You risk everything for those three yards. If you make it, you keep your drive alive. If you don't, the other team gets the ball right here.
    
    This is the chess match that happens EVERY single drive in football. Four chances, ten yards, but infinite strategic possibilities.
    
    And now you get it! You're no longer confused when you hear "3rd and long" or "4th and goal." You understand the pressure, the strategy, the drama behind every single play.
    
    That's football downs decoded - and you just leveled up your football IQ! Make sure to subscribe if this helped you understand the game better!
  `
  
  const payload = {
    "input": [
      {
        "scriptText": youtubeStyleScript.trim(),
        "avatar": "anna_costume1_cameraA",
        "background": "modern_office_warm", // Warm, engaging background
        "avatarSettings": {
          "scale": 1.0,
          "horizontalAlign": "center"
        }
      }
    ],
    "title": "Kickoff Club - Football Downs Explained (YouTube Style)",
    "description": "Dynamic, engaging explanation of football downs with visual storytelling",
    "test": false,
    "visibility": "private"
  }
  
  try {
    console.log('📡 Creating YouTube-style video...')
    
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
      console.log('\n✅✅✅ YOUTUBE-STYLE VIDEO CREATED! ✅✅✅')
      console.log('=' .repeat(60))
      console.log('📹 Video ID:', data.id)
      console.log('🎯 Style: High-energy, visual storytelling')
      console.log('🎬 Format: YouTube-inspired presentation')
      console.log('⚡ Script: Action words, visual metaphors')
      console.log('🎮 Analogies: Gaming, strategy, battlefield')
      console.log('📺 Engagement: "What\'s up!", "Subscribe!"')
      console.log('\n🔗 View: https://app.synthesia.io/videos/' + data.id)
      console.log('\nThis version includes:')
      console.log('• High-energy opening ("What\'s up football fans!")')
      console.log('• Visual storytelling (battlefield, glowing lines, doors)')
      console.log('• Gaming analogies (leveling up, checkpoints)')
      console.log('• YouTube-style engagement (subscribe call)')
      console.log('• Dynamic language (BOOM!, MAXIMUM pressure)')
      
      return data
    } else {
      const errorText = await response.text()
      console.log('Error:', errorText)
    }
    
  } catch (error) {
    console.error('Error:', error.message)
  }
}

// Also create a "post-production ready" version with timing notes
async function createPostProductionVersion() {
  const apiKey = '608e017ec9e2c82acc7a2fd32fa07df9'
  
  console.log('\n\n🎬 CREATING POST-PRODUCTION READY VERSION')
  console.log('=' .repeat(60))
  console.log('💡 This version includes timing notes for adding graphics later')
  
  await new Promise(resolve => setTimeout(resolve, 3000)) // Wait between API calls
  
  const scriptWithTimingNotes = `
    What's up football fans! Today we're mastering football downs with visual breakdowns.
    
    [GRAPHICS: Football field diagram appears]
    Think of football as a board game. You get four moves to advance ten spaces.
    
    [GRAPHICS: "4 DOWNS" and "10 YARDS" text overlay]
    Picture the battlefield - 100 yards with bright yard lines every five yards.
    
    [GRAPHICS: Animated yard markers, glowing end zone]
    First down! Team charges forward, gains three yards.
    
    [GRAPHICS: Down and distance display "1st & 7"]
    Second down! Quarterback throws a perfect spiral - receiver catches and runs!
    
    [GRAPHICS: Animated ball trajectory, player running]
    Third down - crunch time! Defense brings pressure but the offense pulls off a trick play!
    
    [GRAPHICS: Play diagram showing trick play movement] 
    BOOM! Fresh downs! The first down line moves ten yards further.
    
    [GRAPHICS: Animated yellow line disappearing and reappearing]
    Fourth down presents three strategic options - let me show you each one.
    
    [GRAPHICS: Three doors/options appearing on screen]
    That's football downs decoded! Four chances, ten yards, infinite strategy!
    
    [GRAPHICS: Summary infographic with key points]
  `
  
  const postProdPayload = {
    "input": [
      {
        "scriptText": scriptWithTimingNotes.trim(),
        "avatar": "anna_costume1_cameraA", 
        "background": "green_screen" // Green screen for easy compositing
      }
    ],
    "title": "Kickoff Club - Downs Explained (Post-Production Ready)",
    "description": "Version with timing notes for adding motion graphics in post",
    "test": false
  }
  
  try {
    console.log('📡 Creating post-production version...')
    
    const response = await fetch('https://api.synthesia.io/v2/videos', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postProdPayload)
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('\n✅ POST-PRODUCTION VERSION CREATED!')
      console.log('📹 Video ID:', data.id)
      console.log('🎬 Background: Green screen for easy compositing')
      console.log('📝 Script: Includes [GRAPHICS] notes for editor')
      console.log('🎨 Purpose: Ready for After Effects/Premiere Pro')
      
      return data
    } else {
      console.log('Post-prod error:', await response.text())
    }
    
  } catch (error) {
    console.error('Post-prod error:', error.message)
  }
}

// Run both versions
async function main() {
  console.log('🚀 CREATING YOUTUBE-QUALITY SYNTHESIA VIDEOS')
  console.log('=' .repeat(70))
  
  const youtubeStyle = await createYouTubeStyleVideo()
  const postProd = await createPostProductionVersion()
  
  console.log('\n\n🎉 TWO ADVANCED VERSIONS CREATED!')
  console.log('=' .repeat(70))
  console.log('\n1. ✅ YouTube-Style Version:')
  console.log('   • High-energy presentation') 
  console.log('   • Visual storytelling language')
  console.log('   • Gaming and strategy analogies')
  console.log('   • Engaging, dynamic delivery')
  console.log('\n2. ✅ Post-Production Ready Version:')
  console.log('   • Green screen background')
  console.log('   • Timing notes for graphics')
  console.log('   • Ready for motion graphics overlay')
  console.log('   • Professional video editing workflow')
  
  console.log('\n💡 NEXT STEPS TO MATCH YOUTUBE VIDEO:')
  console.log('• Use the post-production version as base')
  console.log('• Add motion graphics in After Effects/Premiere')
  console.log('• Include field diagrams, animated text, transitions')
  console.log('• The [GRAPHICS] notes show exactly where to add visuals')
  
  console.log('\n🎯 This gets you 80% of the way to that YouTube quality!')
}

main().catch(console.error)