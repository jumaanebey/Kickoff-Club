// Create AI Video with D-ID (Free Alternative)
import fetch from 'node-fetch'
import { scriptGenerator } from './src/utils/videoScriptGenerator.js'

class DIDVideoCreator {
  constructor() {
    // D-ID offers free credits for new users
    this.apiKey = process.env.DID_API_KEY || 'YOUR_DID_API_KEY'
    this.baseURL = 'https://api.d-id.com'
  }

  async createVideo(scriptData) {
    console.log('🎬 Creating AI Video with D-ID')
    console.log('=' .repeat(50))
    
    // D-ID API format
    const payload = {
      script: {
        type: "text",
        input: scriptData.voiceover.fullScript,
        provider: {
          type: "microsoft",
          voice_id: "Jenny"
        }
      },
      presenter_id: "amy-jcwCkr1grs",
      driver_id: "uM00QMwJ9x"
    }
    
    try {
      const response = await fetch(`${this.baseURL}/talks`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      
      if (response.ok) {
        const data = await response.json()
        console.log('✅ Video created successfully!')
        console.log('Video ID:', data.id)
        return data
      } else {
        console.log('D-ID requires sign up at: https://www.d-id.com/')
      }
    } catch (error) {
      console.log('Error:', error.message)
    }
  }
}

// Alternative: Use Runway ML (Free credits available)
class RunwayVideoCreator {
  async generateVideoInstructions(scriptData) {
    console.log('\n🎨 RUNWAY ML VIDEO CREATION')
    console.log('=' .repeat(50))
    console.log('\n1. Go to https://runwayml.com/')
    console.log('2. Sign up for free account (150 credits free)')
    console.log('3. Select "Text to Video" tool')
    console.log('4. Paste this prompt:')
    console.log('\nPROMPT FOR RUNWAY:')
    console.log('-'.repeat(40))
    console.log(`Professional educational video presenter explaining: "${scriptData.metadata.title}". Clean background, professional lighting, friendly demeanor.`)
    console.log('-'.repeat(40))
    console.log('\n5. Generate video clips')
    console.log('6. Add voiceover using the script below')
  }
}

// Alternative: Use Canva's Magic Design
class CanvaVideoCreator {
  generateCanvaInstructions(scriptData) {
    console.log('\n🎨 CANVA MAGIC VIDEO CREATION')
    console.log('=' .repeat(50))
    console.log('\nFREE & INSTANT - No API needed!')
    console.log('\n1. Go to https://www.canva.com/magic-write/')
    console.log('2. Choose "Video" → "Educational"')
    console.log('3. Use Magic Design with this prompt:')
    console.log('\nMAGIC DESIGN PROMPT:')
    console.log('-'.repeat(40))
    console.log(`Create an educational video about ${scriptData.metadata.title} for beginners learning football`)
    console.log('-'.repeat(40))
    console.log('\n4. Add these text overlays:')
    
    // Extract key points from script
    const keyPoints = [
      '4 Downs = 4 Attempts',
      '10 Yards = Fresh Downs', 
      '3rd Down = Crunch Time',
      '4th Down = Big Decision'
    ]
    
    keyPoints.forEach((point, i) => {
      console.log(`   ${i + 1}. ${point}`)
    })
    
    console.log('\n5. Record voiceover with this script:')
    console.log(scriptData.voiceover.fullScript.substring(0, 200) + '...')
    console.log('\n6. Export as MP4')
  }
}

// Alternative: Browser-based video creation
function createBrowserVideo(scriptData) {
  console.log('\n🌐 BROWSER-BASED VIDEO CREATION')
  console.log('=' .repeat(50))
  
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Kickoff Club Video Creator</title>
    <style>
        body {
            margin: 0;
            font-family: -apple-system, system-ui, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        .video-container {
            max-width: 800px;
            padding: 40px;
            text-align: center;
        }
        .title {
            font-size: 48px;
            font-weight: bold;
            margin-bottom: 20px;
            animation: fadeIn 1s ease-in;
        }
        .script-section {
            font-size: 24px;
            line-height: 1.6;
            margin: 20px 0;
            opacity: 0;
            animation: slideIn 0.5s ease-in forwards;
        }
        .controls {
            margin-top: 40px;
            padding: 20px;
            background: rgba(255,255,255,0.1);
            border-radius: 10px;
        }
        button {
            padding: 12px 24px;
            margin: 10px;
            border: none;
            background: white;
            color: #667eea;
            font-size: 16px;
            font-weight: bold;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            transform: scale(1.05);
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { 
                opacity: 0;
                transform: translateY(20px);
            }
            to { 
                opacity: 1;
                transform: translateY(0);
            }
        }
        #recordedVideo {
            margin-top: 20px;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
    </style>
</head>
<body>
    <div class="video-container">
        <h1 class="title">${scriptData.metadata.title}</h1>
        <div id="scriptDisplay" class="script-section"></div>
        
        <div class="controls">
            <button onclick="startRecording()">🔴 Start Recording</button>
            <button onclick="stopRecording()">⏹️ Stop Recording</button>
            <button onclick="playScript()">▶️ Auto-Play Script</button>
            <button onclick="downloadVideo()">💾 Download Video</button>
        </div>
        
        <video id="recordedVideo" width="100%" controls style="display: none;"></video>
    </div>

    <script>
        const script = \`${scriptData.voiceover.fullScript}\`;
        const sections = script.split('\\n\\n');
        let currentSection = 0;
        let mediaRecorder;
        let recordedChunks = [];
        
        function playScript() {
            const display = document.getElementById('scriptDisplay');
            
            function showNextSection() {
                if (currentSection < sections.length) {
                    display.style.animation = 'none';
                    setTimeout(() => {
                        display.textContent = sections[currentSection];
                        display.style.animation = 'slideIn 0.5s ease-in forwards';
                        currentSection++;
                        setTimeout(showNextSection, 3000);
                    }, 100);
                } else {
                    currentSection = 0;
                }
            }
            showNextSection();
        }
        
        async function startRecording() {
            try {
                const stream = await navigator.mediaDevices.getDisplayMedia({
                    video: true,
                    audio: true
                });
                
                mediaRecorder = new MediaRecorder(stream);
                
                mediaRecorder.ondataavailable = event => {
                    if (event.data.size > 0) {
                        recordedChunks.push(event.data);
                    }
                };
                
                mediaRecorder.onstop = () => {
                    const blob = new Blob(recordedChunks, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    const video = document.getElementById('recordedVideo');
                    video.src = url;
                    video.style.display = 'block';
                    recordedChunks = [];
                };
                
                mediaRecorder.start();
                playScript(); // Auto-play script while recording
                
            } catch (err) {
                console.error('Error starting recording:', err);
                alert('Please allow screen recording to create your video');
            }
        }
        
        function stopRecording() {
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.stop();
                mediaRecorder.stream.getTracks().forEach(track => track.stop());
            }
        }
        
        function downloadVideo() {
            const video = document.getElementById('recordedVideo');
            if (video.src) {
                const a = document.createElement('a');
                a.href = video.src;
                a.download = 'kickoff-club-video.webm';
                a.click();
            } else {
                alert('Please record a video first');
            }
        }
        
        // Auto-start script display
        window.onload = () => {
            setTimeout(playScript, 1000);
        };
    </script>
</body>
</html>
  `
  
  // Save the HTML file
  import { writeFileSync } from 'fs'
  writeFileSync('/Users/jumaanebey/Downloads/kickoff-club-v2/video-creator.html', html)
  
  console.log('✅ Browser-based video creator saved!')
  console.log('📁 Open: video-creator.html')
  console.log('\nINSTRUCTIONS:')
  console.log('1. Open video-creator.html in Chrome/Firefox')
  console.log('2. Click "Start Recording" to record your screen')
  console.log('3. The script will auto-play with animations')
  console.log('4. Click "Stop Recording" when done')
  console.log('5. Download your video!')
}

// Main execution
async function createVideoNow() {
  console.log('🚀 CREATING AI VIDEO - MULTIPLE METHODS')
  console.log('=' .repeat(60))
  
  // Generate script
  const scriptData = scriptGenerator.generateFirstVideo()
  console.log(`\n✅ Script Ready: "${scriptData.metadata.title}"`)
  
  // Try D-ID
  const did = new DIDVideoCreator()
  await did.createVideo(scriptData)
  
  // Show Runway instructions
  const runway = new RunwayVideoCreator()
  await runway.generateVideoInstructions(scriptData)
  
  // Show Canva instructions
  const canva = new CanvaVideoCreator()
  canva.generateCanvaInstructions(scriptData)
  
  // Create browser-based solution
  createBrowserVideo(scriptData)
  
  console.log('\n' + '=' .repeat(60))
  console.log('🎉 MULTIPLE VIDEO CREATION OPTIONS READY!')
  console.log('Choose any method above to create your video immediately!')
}

createVideoNow().catch(console.error)