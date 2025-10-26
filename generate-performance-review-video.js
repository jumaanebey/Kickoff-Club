// Generate Performance Review Excellence Video
import { VideoScriptGenerator } from './src/utils/videoScriptGenerator.js'

class PerformanceReviewScriptGenerator extends VideoScriptGenerator {
  constructor() {
    super()
    this.brandTone = {
      opening: "Excel in your performance review",
      style: "professional, encouraging, actionable",
      tempo: "confident and supportive",
      targetLength: 120 // Slightly longer for workplace content
    }
  }

  generatePerformanceReviewVideo() {
    const lessonData = {
      id: "performance-review-excellence",
      title: "Performance Review Excellence",
      subtitle: "Preparation Tips for Career Success",
      duration: 120,
      script: {
        hook: "Ready to ace your next performance review? Let's turn this conversation into a career catalyst.",
        sections: [
          {
            timestamp: "0:03-0:20",
            title: "Preparation is Key",
            content: "Start preparing weeks before your review. Document your achievements throughout the year - specific projects, metrics, positive feedback. Create a 'wins folder' where you save emails, reports, and recognition. This isn't bragging; it's professional preparation.",
            onScreen: "Checklist animation with document icons and achievement badges"
          },
          {
            timestamp: "0:20-0:45",
            title: "Showcase Your Impact",
            content: "Use the STAR method: Situation, Task, Action, Result. Instead of saying 'I worked on the marketing campaign,' say 'I led the Q3 campaign that increased leads by 30% and generated $2M in revenue.' Numbers and specific outcomes make your contributions clear and memorable.",
            onScreen: "STAR method breakdown with before/after comparison visuals"
          },
          {
            timestamp: "0:45-1:05", 
            title: "Address Challenges Honestly",
            content: "Don't hide from areas needing improvement. Frame challenges as learning opportunities. 'In Q2, I struggled with time management on the Johnson project. I've since implemented new tools and completed a productivity course, which improved my delivery time by 25%.'",
            onScreen: "Growth mindset visual with problem-solution arrows"
          },
          {
            timestamp: "1:05-1:30",
            title: "Set Future Goals",
            content: "Come with a development plan. Identify 2-3 specific skills or responsibilities you want to grow. Ask for resources, mentoring, or stretch assignments. Show you're invested in your growth and the company's success. This positions you as promotable.",
            onScreen: "Goal-setting roadmap with career progression pathway"
          },
          {
            timestamp: "1:30-1:50", 
            title: "The Conversation Flow",
            content: "Listen actively, ask clarifying questions, and take notes. If feedback surprises you, ask for specific examples. End by summarizing key points and next steps. Follow up with an email recap within 24 hours. This shows professionalism and commitment.",
            onScreen: "Professional meeting visual with note-taking and follow-up reminders"
          },
          {
            timestamp: "1:50-2:00",
            title: "Your Career Success",
            content: "Performance reviews aren't evaluations - they're career conversations. Approach them with confidence, preparation, and growth mindset. You've got this!",
            onScreen: "Success celebration with professional development pathway"
          }
        ]
      },
      preview: {
        "What you'll learn": [
          "How to document and present achievements effectively",
          "STAR method for showcasing impact",
          "Setting development goals that advance your career"
        ]
      }
    }

    return this.generateScript(lessonData)
  }

  // Override visual generation for professional content
  createVisualPrompt(section) {
    const baseStyle = "Professional, clean, modern corporate style with confident colors. "
    const workplaceContext = "Business meeting and career development graphics. "
    
    return `${baseStyle}${workplaceContext}${section.onScreen}. Use blues, greens, and professional color scheme. Avoid casual elements. Focus on success and growth imagery.`
  }

  selectBackgroundColor(sectionTitle) {
    const colorMap = {
      'Preparation is Key': 'professional blue gradient',
      'Showcase Your Impact': 'success green gradient', 
      'Address Challenges Honestly': 'growth purple gradient',
      'Set Future Goals': 'opportunity gold gradient',
      'The Conversation Flow': 'confidence navy gradient',
      'Your Career Success': 'achievement blue to green gradient'
    }
    
    return colorMap[sectionTitle] || 'professional gradient background'
  }

  // Override for professional animations
  suggestAnimations(sectionTitle) {
    const animationMap = {
      'Preparation is Key': ['checklist completion', 'document organization'],
      'Showcase Your Impact': ['metric growth charts', 'achievement unlocking'],
      'Address Challenges Honestly': ['problem-solution flow', 'learning curve visual'],
      'Set Future Goals': ['career pathway animation', 'goal milestone markers'],
      'The Conversation Flow': ['conversation bubbles', 'professional handshake'],
      'Your Career Success': ['career ladder climb', 'success celebration']
    }
    
    return animationMap[sectionTitle] || ['professional transitions', 'business graphics']
  }

  // Format for Synthesia with professional settings
  formatForSynthesia(lesson) {
    return {
      templateId: "professional-business", 
      avatar: "james-business", // Professional male avatar
      background: "corporate-office",
      script: this.generateVoiceover(lesson).fullScript,
      customizations: {
        logoUrl: "/assets/company-logo.png",
        brandColors: ["#1E40AF", "#059669"], // Professional blue and green
        fontSize: "large",
        subtitle: true,
        pace: "moderate" // Professional speaking pace
      }
    }
  }
}

// Generate the performance review video script
console.log('💼 Generating Performance Review Excellence Video Script...\n')
console.log('='.repeat(60))

const performanceGenerator = new PerformanceReviewScriptGenerator()
const videoScript = performanceGenerator.generatePerformanceReviewVideo()

console.log('📋 VIDEO METADATA:')
console.log(JSON.stringify(videoScript.metadata, null, 2))

console.log('\n🎤 COMPLETE VOICEOVER SCRIPT:')
console.log('='.repeat(40))
console.log(videoScript.voiceover.fullScript)

console.log('⏱️  SCRIPT ANALYSIS:')
console.log(`- Estimated words: ${videoScript.voiceover.estimatedWords}`)
console.log(`- Estimated duration: ${videoScript.voiceover.estimatedDuration} seconds`)
console.log(`- Target duration: 120 seconds`)

console.log('\n🎨 VISUAL DIRECTIONS:')
console.log('='.repeat(40))
videoScript.visualDirections.forEach((visual, index) => {
  console.log(`${index + 1}. ${visual.title} (${visual.timestamp})`)
  console.log(`   Visual: ${visual.visualDescription}`)
  console.log(`   Background: ${visual.backgroundColor}`)
  console.log(`   Animations: ${visual.animations.join(', ')}`)
  console.log('')
})

console.log('🤖 SYNTHESIA API FORMAT:')
console.log('='.repeat(40))
console.log(JSON.stringify(videoScript.synthesia, null, 2))

console.log('\n✅ Performance Review video script generation complete!')
console.log('Ready to send to Synthesia for professional video creation.')

export default videoScript