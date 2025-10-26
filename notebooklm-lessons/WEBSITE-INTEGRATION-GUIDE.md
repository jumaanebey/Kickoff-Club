# Website Integration Guide
## Adding NotebookLM Videos to Kickoff Club

---

## 🎯 Goal

Replace the placeholder videos in your Kickoff Club website with your real NotebookLM-generated football lesson videos.

---

## 📋 What You Need

### Files Ready
- ✅ 7 lesson videos from NotebookLM (MP4 format)
- ✅ Your Kickoff Club website code (`/Downloads/kickoff-club-v2/`)

### Knowledge Required
- Basic file management
- Running npm commands
- (Optional) Video hosting account

---

## 🗂️ Step 1: Organize Your Video Files

### Create Proper Folder Structure

```bash
cd /Users/jumaanebey/Downloads/kickoff-club-v2
mkdir -p public/assets/lessons
mkdir -p public/assets/thumbnails
mkdir -p public/assets/captions
```

### Move Videos to Public Folder

```bash
# Copy your downloaded NotebookLM videos
cp ~/Downloads/01-how-downs-work.mp4 public/assets/lessons/how-downs-work.mp4
cp ~/Downloads/02-scoring-touchdowns.mp4 public/assets/lessons/scoring-touchdowns.mp4
cp ~/Downloads/03-field-layout-basics.mp4 public/assets/lessons/field-layout-basics.mp4
cp ~/Downloads/04-understanding-penalties.mp4 public/assets/lessons/understanding-penalties.mp4
cp ~/Downloads/05-quarterback-101.mp4 public/assets/lessons/quarterback-101.mp4
cp ~/Downloads/06-special-teams-basics.mp4 public/assets/lessons/special-teams-basics.mp4
cp ~/Downloads/07-timeouts-and-clock.mp4 public/assets/lessons/timeouts-and-clock.mp4
```

---

## 🎨 Step 2: Create Video Thumbnails

### Option A: Extract Frame from Video (Quick)

Use FFmpeg or online tools to grab a frame from each video:

**Online tool (easiest):**
1. Go to: https://www.kapwing.com/tools/video-to-image
2. Upload each video
3. Select a good frame (around 5-10 seconds in)
4. Download as JPG
5. Save to `public/assets/thumbnails/[lesson-name].jpg`

**OR using FFmpeg (if installed):**
```bash
# Extract thumbnail at 5 seconds into each video
ffmpeg -i public/assets/lessons/how-downs-work.mp4 -ss 00:00:05 -vframes 1 public/assets/thumbnails/how-downs-work.jpg
ffmpeg -i public/assets/lessons/scoring-touchdowns.mp4 -ss 00:00:05 -vframes 1 public/assets/thumbnails/scoring-touchdowns.jpg
# ... repeat for all videos
```

### Option B: Create Custom Thumbnails (Better)

Use Canva or Figma to create branded thumbnails:

**Template specs:**
- Size: 1920x1080px (16:9 ratio)
- Brand colors: Purple (#9333EA) and Pink (#EC4899)
- Include lesson title
- Add "Kickoff Club" branding
- Use football field or relevant graphics

**Save as:**
- `how-downs-work.jpg`
- `scoring-touchdowns.jpg`
- etc.

Place in `public/assets/thumbnails/`

---

## 🎬 Step 3: Update Lesson Data Files

Your lesson data lives in JSON files. Update the video paths:

### Example: Update how-downs-work.json

Open: `src/data/lessons/how-downs-work.json`

Find these lines:
```json
"videoUrl": "/assets/lessons/how-downs-work.mp4",
"thumbnailUrl": "/assets/thumbnails/how-downs-work.jpg",
"captionsUrl": "/assets/captions/how-downs-work.vtt"
```

**Make sure they match your actual file names!**

### Do This For All 7 Lesson Files:

1. `src/data/lessons/how-downs-work.json` ✓
2. `src/data/lessons/scoring-touchdowns.json` ✓
3. `src/data/lessons/field-layout-basics.json` ✓
4. `src/data/lessons/understanding-penalties.json` ✓
5. `src/data/lessons/quarterback-101.json` ✓
6. `src/data/lessons/special-teams-basics.json` ✓
7. `src/data/lessons/timeouts-and-clock.json` ✓

---

## 🔤 Step 4: Add Captions (Optional but Recommended)

### Why Add Captions?
- Accessibility (required by law in many places)
- Better SEO
- Users watch with sound off
- Improves comprehension

### Option A: Auto-Generate with YouTube

1. Upload video to YouTube (as unlisted)
2. Let YouTube auto-generate captions
3. Download the VTT file
4. Save to `public/assets/captions/[lesson-name].vtt`

### Option B: Use Online Tool

**Free tools:**
- https://www.happyscribe.com (free trial)
- https://otter.ai (free tier)
- https://www.rev.com/captioning ($1.25/min)

### Option C: Extract from NotebookLM

If NotebookLM provides captions with the video:
1. Download caption file
2. Convert to VTT format if needed
3. Place in `public/assets/captions/`

---

## 🚀 Step 5: Test Locally

### Run Development Server

```bash
cd /Users/jumaanebey/Downloads/kickoff-club-v2
npm install
npm run dev
```

### Open in Browser

Go to: http://localhost:5173

### Test Each Lesson:

1. Click on a lesson card
2. **Check:**
   - [ ] Video loads and plays
   - [ ] Thumbnail displays correctly
   - [ ] Video controls work (play, pause, volume)
   - [ ] Captions appear (if added)
   - [ ] No 404 errors in browser console

3. **Repeat for all 7 lessons**

### Common Issues:

**Video doesn't play:**
- Check file path in JSON matches actual file
- Verify MP4 format (H.264 codec)
- Check browser console for errors

**Thumbnail doesn't show:**
- Verify JPG file exists in thumbnails folder
- Check path in JSON file
- Try hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

---

## ☁️ Step 6: Choose Video Hosting Strategy

### Option A: Self-Host (Simple, Good for Starting)

**Pros:**
- No external dependencies
- Complete control
- Free (uses your web hosting)

**Cons:**
- Larger deployment size
- Uses your bandwidth
- Slower for users far from your server

**Best for:** MVP, testing, small audience

**How to deploy:**
- Just include videos in your build
- Deploy to Vercel, Netlify, or any host
- Videos serve from same domain

---

### Option B: Use Vimeo (Recommended for Production)

**Pros:**
- Professional player
- Fast video delivery (CDN)
- Customizable player
- Privacy controls
- Analytics

**Cons:**
- $12-20/month (Plus plan needed for no ads)
- External dependency

**Setup:**

1. **Sign up:** https://vimeo.com/join
2. **Upload videos** (all 7 lessons)
3. **Set privacy:** "Hide from Vimeo.com" (unlisted)
4. **Get embed codes** for each video
5. **Update your lesson files** with Vimeo video IDs

**Example lesson JSON update:**
```json
{
  "videoUrl": "https://player.vimeo.com/video/YOUR_VIDEO_ID",
  "videoType": "vimeo"
}
```

---

### Option C: Use Cloudflare Stream (Best for Scale)

**Pros:**
- $1 per 1000 minutes of viewing
- Extremely fast (Cloudflare CDN)
- Automatic quality switching
- Built for video streaming

**Cons:**
- More complex setup
- Pay-per-view pricing (can add up)

**Best for:** High traffic, professional platform

---

### Option D: YouTube (Embedded Unlisted)

**Pros:**
- Free
- Extremely fast
- Reliable
- Good player

**Cons:**
- YouTube branding
- "Suggested videos" at end (can be disabled)
- Less professional feel

**Setup:**

1. Upload to YouTube as **Unlisted**
2. Get embed URL
3. Update lesson files:

```json
{
  "videoUrl": "https://www.youtube.com/embed/YOUR_VIDEO_ID",
  "videoType": "youtube"
}
```

---

## 📱 Step 7: Optimize for Performance

### Compress Videos (Reduce File Size)

**Before uploading, compress videos:**

**Online tool (easiest):**
- https://www.freeconvert.com/video-compressor
- Target: 720p, H.264, ~5-10 MB per 90-second video

**Using HandBrake (free desktop app):**
1. Download: https://handbrake.fr
2. Load video
3. Preset: "Web > Gmail Large 3 Minutes 720p30"
4. Click "Start"

**Settings to use:**
- Resolution: 1280x720 (720p)
- Frame rate: 30fps
- Codec: H.264
- Quality: RF 22-24
- Audio: AAC, 128kbps

### Expected File Sizes

For 90-second videos:
- 🟢 **Excellent:** 5-10 MB
- 🟡 **Good:** 10-20 MB
- 🔴 **Too large:** 20+ MB (compress more)

---

## 🌐 Step 8: Deploy Your Website

### Option A: Deploy to Vercel (Recommended)

**Why Vercel?**
- Free tier
- Fast CDN
- Automatic deployments
- Perfect for React/Vite apps

**Steps:**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from your project folder
cd /Users/jumaanebey/Downloads/kickoff-club-v2
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? kickoff-club
# - Directory? ./
# - Build command? npm run build
# - Output directory? dist
```

**Your site will be live at:** `https://kickoff-club.vercel.app`

**Custom domain (optional):**
```bash
vercel --prod
vercel domains add yourdomain.com
```

---

### Option B: Deploy to Netlify

```bash
# Build your site
npm run build

# Drag and drop the 'dist' folder to Netlify
# Or use Netlify CLI:
npm install -g netlify-cli
netlify deploy --prod
```

---

### Option C: Traditional Web Host

If using cPanel, FTP, or traditional hosting:

```bash
# Build production version
npm run build

# Upload contents of 'dist' folder to your web host
# Using FTP client (FileZilla, Cyberduck, etc.)
# Upload to: public_html/ or www/
```

---

## ✅ Post-Deployment Checklist

### Test Your Live Site

- [ ] All 7 lesson pages load
- [ ] Videos play on desktop
- [ ] Videos play on mobile (iOS Safari, Android Chrome)
- [ ] Thumbnails display
- [ ] Page loads quickly (< 3 seconds)
- [ ] No console errors
- [ ] Quiz functionality works
- [ ] Navigation works between lessons

### Performance Check

Use these tools:
- **PageSpeed Insights:** https://pagespeed.web.dev
- **GTmetrix:** https://gtmetrix.com

**Target scores:**
- Performance: 80+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 90+

---

## 🎨 Customization Ideas

### Enhance the Video Player

**Add these features:**

1. **Custom play button overlay**
   - Kickoff Club branded play button
   - Shows before video starts

2. **Progress tracking**
   - Mark lessons as "completed" when watched
   - Save progress to localStorage

3. **Playback speed control**
   - Let users watch at 1.25x, 1.5x, 2x

4. **Keyboard shortcuts**
   - Space = play/pause
   - Arrow keys = skip forward/back

---

## 📊 Analytics Setup

### Track Video Performance

**Google Analytics 4:**

Add event tracking to your video player:

```javascript
// When video starts
gtag('event', 'video_start', {
  video_title: 'How Downs Work',
  video_url: '/assets/lessons/how-downs-work.mp4'
});

// When video completes
gtag('event', 'video_complete', {
  video_title: 'How Downs Work'
});
```

**Track these metrics:**
- Video start rate (thumbnail clicks vs. plays)
- Completion rate (how many finish the video)
- Average watch time
- Drop-off points (where users stop watching)

---

## 🚨 Troubleshooting Common Issues

### Video Won't Play on iPhone

**Problem:** MP4 plays on desktop but not iOS Safari

**Solution:**
- Ensure H.264 codec (not H.265/HEVC)
- Use MP4 container
- Test with: https://video-dev.github.io/can-i-play/

### Video Stutters/Buffers

**Problem:** Video playback is choppy

**Solutions:**
- Compress video more (see Step 7)
- Use video hosting (Vimeo/Cloudflare)
- Enable CDN on your host
- Check video bitrate (shouldn't exceed 5000 kbps)

### Large Initial Page Load

**Problem:** Homepage loads slowly

**Solutions:**
- Use lazy loading for videos
- Load thumbnails only, video on click
- Implement video hosting solution
- Optimize thumbnail images (use WebP format)

---

## 🔄 Updating Videos Later

When you want to replace or update a video:

1. **Generate new video** in NotebookLM
2. **Download** and compress
3. **Replace file** in `public/assets/lessons/`
4. **Keep same filename** (no code changes needed)
5. **Redeploy** (or just replace file on host)
6. **Clear CDN cache** if using one

---

## 📱 Social Media Integration

### Create Short Clips for Promotion

**From your videos, create:**

**Instagram/TikTok (9:16 vertical):**
- 15-30 second highlights
- One concept per clip
- "Learn football in 30 seconds"

**Twitter/X:**
- 30-60 second clips
- "Quick football fact" series

**YouTube Shorts:**
- 60 second versions
- Tease full lesson
- Link to website

**Tools to create clips:**
- Kapwing.com
- Descript.com
- Adobe Express

---

## 🎯 Next Steps

### After Your Videos Are Live

1. **Announce launch** on social media
2. **Collect user feedback** (add feedback form)
3. **Monitor analytics** (which lessons are popular?)
4. **Create more content** (add advanced lessons)
5. **Build email list** (offer "Complete Course" download)
6. **Consider monetization** (if appropriate)

### Future Enhancements

- **Interactive quizzes** after each video
- **Progress tracking** across lessons
- **Certificates** upon completion
- **Community features** (comments, forums)
- **Mobile app** version
- **Multiple languages** (Spanish, etc.)

---

## 📚 Resources

### Documentation
- Vite deployment: https://vitejs.dev/guide/build.html
- Vercel docs: https://vercel.com/docs
- Netlify docs: https://docs.netlify.com

### Video Tools
- HandBrake (compression): https://handbrake.fr
- FFmpeg (command-line): https://ffmpeg.org
- Kapwing (online editing): https://kapwing.com

### Hosting Options
- Vimeo: https://vimeo.com
- Cloudflare Stream: https://cloudflare.com/products/cloudflare-stream
- Mux: https://mux.com

---

## 🎉 Congratulations!

You now have:
- ✅ 7 professional football lesson videos
- ✅ Complete workflow for creating more
- ✅ Website integration guide
- ✅ Deployment instructions
- ✅ Performance optimization tips

**Your Kickoff Club platform is ready to launch!**

---

*Generated for Kickoff Club - Love the vibe. Learn the game.™*

**Questions or issues? Check the NotebookLM Workflow Guide or your lesson JSON files for reference.**
