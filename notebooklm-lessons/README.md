# Video Scripts for NotebookLM

This folder contains video scripts for the 3 remaining Kickoff Club lessons that need videos.

## Missing Videos

You currently have 7/10 lesson videos. These 3 need to be created:

1. ✅ **nfl-seasons-playoffs.md** — NFL Season & Playoff Structure
2. ✅ **offensive-positions.md** — Offensive Positions Explained
3. ✅ **defensive-positions.md** — Defensive Positions Explained

## How to Use with NotebookLM

### Step 1: Upload to NotebookLM
1. Go to [NotebookLM](https://notebooklm.google.com/)
2. Create a new notebook for each lesson
3. Upload the corresponding .md file as a source

### Step 2: Generate Audio
1. Click "Audio Overview" in NotebookLM
2. Let it generate a conversational audio summary
3. The AI hosts will discuss the content naturally based on your script

### Step 3: Convert to Video
Once you have the audio file:

**Option A: Use Video Editing Software**
- Import audio into your video editor (iMovie, DaVinci Resolve, etc.)
- Add visual elements based on "Visual Suggestions" in each script
- Export as MP4

**Option B: Use Online Tools**
- [Pictory.ai](https://pictory.ai/) — Auto-generates video from script
- [Descript](https://www.descript.com/) — Audio to video with stock footage
- [Canva Video](https://www.canva.com/create/videos/) — Simple video creation

### Step 4: Save to Project
Once your video is ready:
```bash
# Save the video file (rename appropriately)
mv ~/Downloads/your-video.mp4 public/assets/lessons/[lesson-id].mp4

# Example:
mv ~/Downloads/nfl-playoffs.mp4 public/assets/lessons/nfl-seasons-playoffs.mp4
```

## Video Specifications

Target the same specs as your existing videos:
- **Format:** MP4 (H.264)
- **Resolution:** 720p minimum (1080p preferred)
- **Duration:** ~2 minutes each
- **File size:** Try to keep under 30-40MB (compress if needed)
- **Aspect ratio:** 16:9

## Compression (if needed)

If your video files are too large:

```bash
# Using ffmpeg (if installed)
ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 2M output.mp4
```

Or use online tools:
- [Handbrake](https://handbrake.fr/) (free desktop app)
- [CloudConvert](https://cloudconvert.com/mp4-compressor) (online)

## Current Video Status

### ✅ Completed (7 videos, 212MB total)
- how-downs-work.mp4 (21MB)
- scoring-touchdowns.mp4 (16MB)
- field-layout-basics.mp4 (33MB)
- quarterback-101.mp4 (44MB)
- special-teams-basics.mp4 (33MB)
- timeouts-and-clock.mp4 (29MB)
- understanding-penalties.mp4 (36MB)

### ❌ Missing (3 videos needed)
- nfl-seasons-playoffs.mp4
- offensive-positions.mp4
- defensive-positions.mp4

## Tips for Best Results

1. **Keep it conversational** — NotebookLM works best with natural, conversational text
2. **Use the visual suggestions** — Each script includes ideas for graphics/animations
3. **Match the existing tone** — Your current videos are beginner-friendly and clear
4. **Test the audio first** — Listen to NotebookLM's output before creating video
5. **Compress if needed** — Keep files under 40MB for web performance

## Questions?

If you need help with:
- Converting audio to video
- Compressing files
- Adding visual elements
- Any technical issues

Just ask! I'm here to help get these final 3 videos ready for launch.
