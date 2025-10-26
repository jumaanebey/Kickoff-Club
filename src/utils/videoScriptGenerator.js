// Video Script Generator for AI Video Creation
// Converts lesson content to AI video generation scripts

export class VideoScriptGenerator {
  constructor() {
    this.brandTone = {
      opening: "Love the vibe. Learn the game.",
      style: "conversational, encouraging, no gatekeeping",
      tempo: "engaging but not rushed",
      targetLength: 90 // seconds
    }
  }

  // Generate a complete AI video script from lesson data
  generateScript(lessonData) {
    const script = {
      metadata: this.generateMetadata(lessonData),
      voiceover: this.generateVoiceover(lessonData),
      visualDirections: this.generateVisuals(lessonData),
      synthesia: this.formatForSynthesia(lessonData),
      pictory: this.formatForPictory(lessonData)
    }

    return script
  }

  generateMetadata(lesson) {
    return {
      title: lesson.title,
      duration: lesson.duration,
      targetAudience: "Football newcomers, inclusive of all genders",
      tone: "Warm, encouraging, judgment-free",
      brandMessage: this.brandTone.opening,
      keyLearningGoals: lesson.preview["What you'll learn"] || []
    }
  }

  generateVoiceover(lesson) {
    let fullScript = ""
    
    // Hook (0-3 seconds)
    fullScript += `[HOOK - 0:00-0:03]\n`
    fullScript += `${lesson.script.hook}\n\n`

    // Main content sections
    lesson.script.sections.forEach((section, index) => {
      fullScript += `[${section.title.toUpperCase()} - ${section.timestamp}]\n`
      fullScript += `${this.enhanceWithBrandTone(section.content)}\n\n`
    })

    // Closing
    fullScript += `[CLOSING - Final 5 seconds]\n`
    fullScript += `You just learned ${lesson.title.toLowerCase()}! That wasn't so scary, right? Keep the momentum going - there's so much more to discover.\n\n`

    return {
      fullScript,
      estimatedWords: this.countWords(fullScript),
      estimatedDuration: this.estimateDuration(fullScript)
    }
  }

  enhanceWithBrandTone(content) {
    // Add encouraging, inclusive language
    return content
      .replace(/Don't worry/g, "No stress")
      .replace(/You should/g, "You might want to")
      .replace(/must/g, "can")
      .replace(/complicated/g, "nuanced")
      .replace(/difficult/g, "takes practice")
  }

  generateVisuals(lesson) {
    return lesson.script.sections.map((section) => ({
      timestamp: section.timestamp,
      title: section.title,
      visualDescription: section.onScreen,
      aiPrompt: this.createVisualPrompt(section),
      backgroundColor: this.selectBackgroundColor(section.title),
      animations: this.suggestAnimations(section.title)
    }))
  }

  createVisualPrompt(section) {
    const baseStyle = "Clean, modern, friendly educational style with soft colors. "
    const footballContext = "Football field graphics with warm, welcoming design. "
    
    return `${baseStyle}${footballContext}${section.onScreen}. Avoid intimidating or complex visuals. Use purple/pink gradient accents matching 'Love the vibe' brand.`
  }

  selectBackgroundColor(sectionTitle) {
    const colorMap = {
      'Big Picture': 'soft sage green gradient',
      '1st Down Explained': 'warm blush pink gradient', 
      '2nd & 3rd Down': 'gentle purple gradient',
      '4th Down Choices': 'soft gold gradient',
      'Reading Tip': 'light blue gradient',
      'Mental Model & Recap': 'purple to pink gradient'
    }
    
    return colorMap[sectionTitle] || 'soft gradient background'
  }

  suggestAnimations(sectionTitle) {
    const animationMap = {
      'Big Picture': ['fade in field diagram', 'gentle zoom on key elements'],
      '1st Down Explained': ['animated yard markers', 'smooth transition of down indicators'],
      '2nd & 3rd Down': ['split screen animations', 'icon morphing'],
      '4th Down Choices': ['branching path animation', 'decision tree visual'],
      'Reading Tip': ['scoreboard focus animation', 'highlight key numbers'],
      'Mental Model & Recap': ['summary animation', 'progress bar visual']
    }
    
    return animationMap[sectionTitle] || ['gentle transitions', 'soft emphasis']
  }

  // Format specifically for Synthesia API
  formatForSynthesia(lesson) {
    return {
      templateId: "educational-friendly", 
      avatar: "anna-casual", // Female avatar for inclusive approach
      background: "gradient-purple-pink",
      script: this.generateVoiceover(lesson).fullScript,
      customizations: {
        logoUrl: "/assets/kickoff-club-logo.png",
        brandColors: ["#9333EA", "#EC4899"], // Purple to pink
        fontSize: "large",
        subtitle: true
      }
    }
  }

  // Format for Pictory API
  formatForPictory(lesson) {
    return {
      videoName: lesson.title,
      language: "en",
      scenes: lesson.script.sections.map((section, index) => ({
        text: section.content,
        voiceOver: true,
        backgroundImage: "football-field-soft",
        textColor: "#2D1B69", // Dark purple
        fontSize: "medium",
        animation: "fade-in",
        duration: this.calculateSectionDuration(section.timestamp)
      }))
    }
  }

  calculateSectionDuration(timestamp) {
    // Extract duration from "0:03-0:12" format
    const [start, end] = timestamp.split('-')
    const startSeconds = this.timeToSeconds(start)
    const endSeconds = this.timeToSeconds(end) 
    return endSeconds - startSeconds
  }

  timeToSeconds(timeStr) {
    const [minutes, seconds] = timeStr.split(':').map(Number)
    return minutes * 60 + seconds
  }

  countWords(text) {
    return text.split(/\s+/).length
  }

  estimateDuration(text) {
    // Average speaking pace: 150-160 words per minute for educational content
    const wordsPerMinute = 150
    const words = this.countWords(text)
    return Math.round(words / wordsPerMinute * 60) // Return seconds
  }

  // Generate our first test script
  generateFirstVideo() {
    // Using the "How Downs Work" lesson as our first video
    const firstLesson = {
      id: "how-downs-work",
      title: "How Downs Work",
      subtitle: "The 4-Try System That Drives Every Play", 
      duration: 90,
      script: {
        hook: "Want to know why they keep saying '3rd and long'? Love the vibe. Learn the game. Ninety seconds — you'll totally get it.",
        sections: [
          {
            timestamp: "0:03-0:15",
            title: "Big Picture", 
            content: "Here's the deal: a 'down' is just one attempt to move the football forward. Teams get exactly four downs to move ten yards. That's it. Think of it like having four tries to walk across your living room.",
            onScreen: "Simple animated football field with '4 TRIES' and '10 YARDS' clearly labeled"
          },
          {
            timestamp: "0:15-0:35",
            title: "First Down Magic",
            content: "When you see '1st & 10' on screen, it means: first attempt, need ten yards. If they get those ten yards before using up all four tries, boom - they get four fresh attempts. It's like getting extra lives in a video game.",
            onScreen: "'1st & 10' scoreboard graphic with animated progress bar"
          },
          {
            timestamp: "0:35-0:55",
            title: "The Drama of 3rd Down",
            content: "Here's where it gets exciting. If they didn't get ten yards in two tries, it's 3rd down. This is crunch time! Coaches get creative - quick passes, trick plays, whatever it takes. You'll feel the tension.",
            onScreen: "Split screen showing different 3rd down scenarios: '3rd & 2' vs '3rd & 8'"
          },
          {
            timestamp: "0:55-1:20",
            title: "4th Down Decisions",
            content: "4th down? Decision time. Teams usually punt - kick it away safely. But sometimes they go for it anyway! Or try a field goal. The crowd goes wild because everyone knows: this is do-or-die.",
            onScreen: "Three branching arrows: PUNT, GO FOR IT, FIELD GOAL"
          },
          {
            timestamp: "1:20-1:30",
            title: "You've Got This",
            content: "That's it! Four tries, ten yards. Now when someone says '3rd and long', you'll know exactly why everyone's holding their breath. See? You're already getting it.",
            onScreen: "Celebration animation with 'YOU'VE GOT THIS!' and Kickoff Club logo"
          }
        ]
      },
      preview: {
        "What you'll learn": [
          "Why teams get exactly 4 chances",
          "How to read '1st & 10', '3rd & 2'", 
          "What happens on 4th down"
        ]
      }
    }

    return this.generateScript(firstLesson)
  }
}

// Create and export instance
export const scriptGenerator = new VideoScriptGenerator()