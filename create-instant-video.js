// Instant Video Creation - Working Solution
import fs from 'fs'
import { scriptGenerator } from './src/utils/videoScriptGenerator.js'

// Generate the video script
const scriptData = scriptGenerator.generateFirstVideo()

console.log('🎬 INSTANT VIDEO CREATION')
console.log('=' .repeat(60))
console.log(`✅ Script Ready: "${scriptData.metadata.title}"`)
console.log(`⏱️  Duration: ${scriptData.voiceover.estimatedDuration} seconds`)

// Create browser-based video recorder
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Kickoff Club - AI Video Creator</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .container {
            width: 90%;
            max-width: 1200px;
            padding: 40px;
        }
        h1 {
            font-size: 48px;
            margin-bottom: 30px;
            text-align: center;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        .video-area {
            background: rgba(255,255,255,0.1);
            border-radius: 20px;
            padding: 40px;
            backdrop-filter: blur(10px);
            margin-bottom: 30px;
        }
        .script-display {
            font-size: 28px;
            line-height: 1.8;
            min-height: 200px;
            text-align: center;
            margin: 30px 0;
            padding: 20px;
            background: rgba(255,255,255,0.05);
            border-radius: 10px;
        }
        .controls {
            display: flex;
            justify-content: center;
            gap: 20px;
            flex-wrap: wrap;
        }
        button {
            padding: 15px 30px;
            font-size: 18px;
            font-weight: bold;
            border: none;
            border-radius: 10px;
            background: white;
            color: #667eea;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        #webcam, #recordedVideo {
            width: 100%;
            max-width: 800px;
            margin: 20px auto;
            display: block;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        }
        .recording-indicator {
            display: none;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
            font-size: 20px;
        }
        .recording-indicator.active {
            display: flex;
        }
        .record-dot {
            width: 15px;
            height: 15px;
            background: #ff0000;
            border-radius: 50%;
            animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.3; }
            100% { opacity: 1; }
        }
        .timer {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎬 Kickoff Club Video Creator</h1>
        
        <div class="video-area">
            <div id="scriptDisplay" class="script-display">
                Click "Start Teleprompter" to begin
            </div>
            
            <video id="webcam" autoplay muted playsinline style="display: none;"></video>
            <video id="recordedVideo" controls style="display: none;"></video>
            
            <div class="timer" id="timer"></div>
            
            <div class="recording-indicator" id="recordingIndicator">
                <div class="record-dot"></div>
                <span>Recording in progress...</span>
            </div>
            
            <div class="controls">
                <button onclick="startTeleprompter()">📝 Start Teleprompter</button>
                <button onclick="startWebcam()">📷 Start Webcam</button>
                <button onclick="startRecording()" id="recordBtn">🔴 Record Video</button>
                <button onclick="stopRecording()" id="stopBtn" disabled>⏹️ Stop Recording</button>
                <button onclick="downloadVideo()" id="downloadBtn" disabled>💾 Download Video</button>
            </div>
        </div>
    </div>

    <script>
        // Full script content
        const fullScript = \`${scriptData.voiceover.fullScript.replace(/`/g, '\\`')}\`;
        const sections = fullScript.split(/\\[.*?\\]/g).filter(s => s.trim());
        let currentSection = 0;
        let teleprompterInterval;
        let mediaRecorder;
        let recordedChunks = [];
        let stream;
        let timerInterval;
        let seconds = 0;
        
        // Teleprompter function
        function startTeleprompter() {
            currentSection = 0;
            showNextSection();
            
            function showNextSection() {
                const display = document.getElementById('scriptDisplay');
                
                if (currentSection < sections.length) {
                    display.style.opacity = '0';
                    setTimeout(() => {
                        display.textContent = sections[currentSection].trim();
                        display.style.opacity = '1';
                        display.style.transition = 'opacity 0.5s';
                        currentSection++;
                        
                        // Auto-advance every 15 seconds
                        teleprompterInterval = setTimeout(showNextSection, 15000);
                    }, 300);
                } else {
                    display.textContent = "🎉 Video Complete! Great job!";
                    currentSection = 0;
                }
            }
        }
        
        // Webcam functions
        async function startWebcam() {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ 
                    video: { width: 1280, height: 720 },
                    audio: true 
                });
                const video = document.getElementById('webcam');
                video.srcObject = stream;
                video.style.display = 'block';
                document.getElementById('recordBtn').disabled = false;
            } catch (err) {
                alert('Please allow camera and microphone access');
                console.error(err);
            }
        }
        
        // Recording functions
        function startRecording() {
            if (!stream) {
                alert('Please start webcam first');
                return;
            }
            
            recordedChunks = [];
            mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'video/webm;codecs=vp9'
            });
            
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
                document.getElementById('webcam').style.display = 'none';
                document.getElementById('downloadBtn').disabled = false;
            };
            
            mediaRecorder.start();
            
            // Start teleprompter automatically
            startTeleprompter();
            
            // Update UI
            document.getElementById('recordBtn').disabled = true;
            document.getElementById('stopBtn').disabled = false;
            document.getElementById('recordingIndicator').classList.add('active');
            
            // Start timer
            seconds = 0;
            updateTimer();
            timerInterval = setInterval(() => {
                seconds++;
                updateTimer();
            }, 1000);
        }
        
        function stopRecording() {
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.stop();
                clearTimeout(teleprompterInterval);
                clearInterval(timerInterval);
                
                // Update UI
                document.getElementById('recordBtn').disabled = false;
                document.getElementById('stopBtn').disabled = true;
                document.getElementById('recordingIndicator').classList.remove('active');
            }
        }
        
        function updateTimer() {
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            document.getElementById('timer').textContent = 
                \`Recording Time: \${minutes}:\${secs.toString().padStart(2, '0')}\`;
        }
        
        function downloadVideo() {
            const video = document.getElementById('recordedVideo');
            if (video.src) {
                const a = document.createElement('a');
                a.href = video.src;
                a.download = 'kickoff-club-${scriptData.metadata.title.toLowerCase().replace(/\s+/g, '-')}.webm';
                a.click();
            }
        }
        
        // Auto-focus
        window.onload = () => {
            document.getElementById('scriptDisplay').textContent = 
                "Ready to create your video! Start with the teleprompter or webcam.";
        };
    </script>
</body>
</html>
`

// Save the HTML file
fs.writeFileSync('/Users/jumaanebey/Downloads/kickoff-club-v2/instant-video-creator.html', html)

console.log('\n✅ VIDEO CREATOR READY!')
console.log('=' .repeat(60))
console.log('\n📁 OPEN THIS FILE IN YOUR BROWSER:')
console.log('   instant-video-creator.html')
console.log('\n🎬 HOW TO CREATE YOUR VIDEO:')
console.log('1. Open the file in Chrome/Firefox/Safari')
console.log('2. Click "Start Webcam" and allow camera/mic access')
console.log('3. Click "Record Video" to begin')
console.log('4. The script will auto-scroll as teleprompter')
console.log('5. Click "Stop Recording" when done')
console.log('6. Download your video!')
console.log('\n🚀 This creates a REAL video file you can use immediately!')

// Also create a quick Canva template
console.log('\n' + '=' .repeat(60))
console.log('🎨 ALTERNATIVE: CANVA QUICK VIDEO (5 minutes)')
console.log('\n1. Go to: https://www.canva.com/create/videos/')
console.log('2. Search template: "Educational Explainer"')
console.log('3. Add these text slides:')

const keyPoints = [
  '⚡ ' + scriptData.metadata.title,
  '1️⃣ Four Downs = Four Attempts',
  '2️⃣ Ten Yards = Fresh Downs',
  '3️⃣ Third Down = Crunch Time',
  '4️⃣ Fourth Down = Big Decision'
]

keyPoints.forEach(point => {
  console.log(`   • ${point}`)
})

console.log('\n4. Record voiceover using built-in recorder')
console.log('5. Export and share!')

console.log('\n✨ Your video is ready to create NOW!')