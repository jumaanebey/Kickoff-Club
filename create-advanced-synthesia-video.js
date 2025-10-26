// Create Advanced Synthesia Video with Templates, Animations & Visual Elements
import fetch from 'node-fetch'

async function createAdvancedVideo() {
  const apiKey = '608e017ec9e2c82acc7a2fd32fa07df9'
  
  console.log('🎬 CREATING ADVANCED SYNTHESIA VIDEO')
  console.log('=' .repeat(60))
  console.log('🎨 Features: Templates, animations, text overlays, visual elements')
  
  // Advanced payload using templates and visual elements
  const advancedPayload = {
    "templateId": "educational_explainer_template", // Using educational template
    "title": "Kickoff Club - How Downs Work (Advanced)",
    "description": "Advanced video with animations and visual elements",
    "test": false,
    "visibility": "private",
    "templateData": {
      // Main avatar scene
      "avatar": "anna_costume1_cameraA",
      "background": "gradient_blue_purple",
      
      // Script with timing markers for animations
      "script": `
        [0:00] Ready to master football downs? Let's make this visual!
        
        [0:05] Picture a football field - that's your game board. The offense starts HERE.
        
        [0:10] They get FOUR chances to move TEN yards. Watch this yellow line appear.
        
        [0:15] First down! Team runs forward... gains three yards. Seven more to go!
        
        [0:22] Second down! Quick pass through the air... five more yards! Almost there!
        
        [0:28] Third down - CRUNCH TIME! Defense brings pressure but... he made it!
        
        [0:35] FRESH DOWNS! New yellow line appears ten yards ahead. It's like leveling up!
        
        [0:42] But on fourth down you have THREE choices. Let me show you...
        
        [0:48] That's football downs - four chances, ten yards, endless strategy!
      `,
      
      // Visual elements and animations
      "elements": [
        {
          "type": "text",
          "content": "4 DOWNS",
          "fontSize": 48,
          "color": "#FFD700",
          "position": { "x": 50, "y": 20 },
          "animation": {
            "entrance": "fade_in",
            "emphasis": "pop",
            "trigger": "4 DOWNS",
            "duration": 1.5
          }
        },
        {
          "type": "text", 
          "content": "10 YARDS",
          "fontSize": 48,
          "color": "#32CD32",
          "position": { "x": 50, "y": 80 },
          "animation": {
            "entrance": "slide_from_right",
            "emphasis": "shake",
            "trigger": "TEN yards",
            "duration": 2.0
          }
        },
        {
          "type": "shape",
          "shape": "rectangle",
          "width": 300,
          "height": 20,
          "color": "#FFFF00",
          "position": { "x": 25, "y": 60 },
          "animation": {
            "entrance": "slide_from_left", 
            "trigger": "yellow line",
            "duration": 1.0
          }
        },
        {
          "type": "text",
          "content": "1st DOWN",
          "fontSize": 36,
          "color": "#FF6347",
          "position": { "x": 10, "y": 30 },
          "animation": {
            "entrance": "bounce",
            "trigger": "First down",
            "duration": 1.5
          }
        },
        {
          "type": "text",
          "content": "2nd DOWN", 
          "fontSize": 36,
          "color": "#FF6347",
          "position": { "x": 10, "y": 30 },
          "animation": {
            "entrance": "bounce",
            "trigger": "Second down",
            "duration": 1.5
          }
        },
        {
          "type": "text",
          "content": "3rd DOWN - CRUNCH TIME!",
          "fontSize": 40,
          "color": "#FF0000",
          "position": { "x": 50, "y": 50 },
          "animation": {
            "entrance": "fade_in",
            "emphasis": "blink",
            "trigger": "CRUNCH TIME",
            "duration": 2.0,
            "blinkCount": 3
          }
        },
        {
          "type": "text",
          "content": "FRESH DOWNS!",
          "fontSize": 44,
          "color": "#00FF00",
          "position": { "x": 50, "y": 40 },
          "animation": {
            "entrance": "pop",
            "emphasis": "pop",
            "trigger": "FRESH DOWNS",
            "duration": 2.5,
            "scale": 150
          }
        },
        {
          "type": "text",
          "content": "PUNT",
          "fontSize": 32,
          "color": "#4169E1",
          "position": { "x": 15, "y": 70 },
          "animation": {
            "entrance": "slide_from_bottom",
            "trigger": "THREE choices",
            "delay": 0.5
          }
        },
        {
          "type": "text",
          "content": "FIELD GOAL",
          "fontSize": 32, 
          "color": "#4169E1",
          "position": { "x": 50, "y": 70 },
          "animation": {
            "entrance": "slide_from_bottom",
            "trigger": "THREE choices", 
            "delay": 1.0
          }
        },
        {
          "type": "text",
          "content": "GO FOR IT!",
          "fontSize": 32,
          "color": "#4169E1", 
          "position": { "x": 85, "y": 70 },
          "animation": {
            "entrance": "slide_from_bottom",
            "trigger": "THREE choices",
            "delay": 1.5
          }
        }
      ],
      
      // Brand customization
      "branding": {
        "logo": {
          "url": "https://example.com/kickoff-club-logo.png",
          "position": "bottom-right",
          "size": "small"
        },
        "colors": {
          "primary": "#9333EA",
          "secondary": "#EC4899"
        }
      }
    }
  }
  
  try {
    console.log('📡 Creating advanced video with template...')
    
    const response = await fetch('https://api.synthesia.io/v2/videos/from-template', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(advancedPayload)
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('\n✅✅✅ ADVANCED VIDEO CREATED! ✅✅✅')
      console.log('=' .repeat(60))
      console.log('📹 Video ID:', data.id)
      console.log('🎨 Features: Text overlays with animations')
      console.log('⚡ Effects: Pop, shake, blink, slide, bounce')
      console.log('🏈 Content: Visual football field elements')
      console.log('🎯 Template: Educational explainer format')
      console.log('\n🔗 View: https://app.synthesia.io/videos/' + data.id)
      
      return data
    } else {
      const errorText = await response.text()
      console.log('Template approach failed:', errorText)
      
      // Fallback to simpler approach with manual elements
      return await createSimpleAdvanced()
    }
    
  } catch (error) {
    console.error('Error:', error.message)
    return await createSimpleAdvanced()
  }
}

// Simpler approach if template method doesn't work
async function createSimpleAdvanced() {
  const apiKey = '608e017ec9e2c82acc7a2fd32fa07df9'
  
  console.log('\n🔄 Creating with manual scene approach...')
  
  // Multiple scenes with different visual focuses
  const scenesPayload = {
    "title": "Kickoff Club - How Downs Work (Visual)",
    "test": false,
    "input": [
      // Scene 1: Introduction with title
      {
        "scriptText": "Ready to master football downs? Let's make this visual! Picture a football field - that's your game board.",
        "avatar": "anna_costume1_cameraA",
        "background": "gradient_blue_purple",
        "elements": [
          {
            "type": "text",
            "text": "FOOTBALL DOWNS EXPLAINED",
            "fontSize": "large",
            "position": "top",
            "animation": "fade_in"
          }
        ]
      },
      // Scene 2: The four downs concept
      {
        "scriptText": "They get FOUR chances to move TEN yards. Watch as each down creates new opportunities and pressure.",
        "avatar": "anna_costume1_cameraA", 
        "background": "football_field_green",
        "elements": [
          {
            "type": "text",
            "text": "4 DOWNS = 4 CHANCES",
            "fontSize": "xlarge",
            "color": "yellow",
            "position": "center",
            "animation": "pop"
          }
        ]
      },
      // Scene 3: The progression
      {
        "scriptText": "First down - team runs forward, gains three yards. Second down - quick pass for five more. Third down - CRUNCH TIME! He made it!",
        "avatar": "anna_costume1_cameraA",
        "background": "stadium_lights",
        "elements": [
          {
            "type": "text", 
            "text": "1ST → 2ND → 3RD DOWN",
            "fontSize": "large",
            "color": "orange",
            "position": "bottom",
            "animation": "slide_left"
          }
        ]
      },
      // Scene 4: Fresh downs
      {
        "scriptText": "FRESH DOWNS! New target appears ten yards ahead. It's like leveling up in your favorite game!",
        "avatar": "anna_costume1_cameraA",
        "background": "victory_confetti",
        "elements": [
          {
            "type": "text",
            "text": "FRESH DOWNS UNLOCKED! 🎮",
            "fontSize": "xlarge", 
            "color": "green",
            "position": "center",
            "animation": "bounce"
          }
        ]
      }
    ]
  }
  
  try {
    const response = await fetch('https://api.synthesia.io/v2/videos', {
      method: 'POST',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(scenesPayload)
    })
    
    if (response.ok) {
      const data = await response.json()
      console.log('\n✅ VISUAL SCENES VERSION CREATED!')
      console.log('📹 Video ID:', data.id)
      console.log('🎬 Format: Multiple scenes with different backgrounds')
      console.log('🎨 Elements: Text overlays and animations')
      return data
    } else {
      console.log('Scenes approach error:', await response.text())
    }
    
  } catch (error) {
    console.error('Scenes error:', error.message)
  }
}

// Execute
createAdvancedVideo().then(result => {
  if (result) {
    console.log('\n🎉 ADVANCED VIDEO CREATED!')
    console.log('This version has animated text overlays and visual elements!')
    console.log('Much closer to that YouTube standard you showed me!')
  }
}).catch(console.error)