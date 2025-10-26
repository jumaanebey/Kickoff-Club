// Generate our first AI video script
import { scriptGenerator } from './src/utils/videoScriptGenerator.js'

console.log('🎬 Generating First Kickoff Club Video Script...\n')
console.log('='.repeat(60))

// Generate the complete script package
const firstVideoScript = scriptGenerator.generateFirstVideo()

console.log('📋 VIDEO METADATA:')
console.log(JSON.stringify(firstVideoScript.metadata, null, 2))

console.log('\n🎤 COMPLETE VOICEOVER SCRIPT:')
console.log('='.repeat(40))
console.log(firstVideoScript.voiceover.fullScript)

console.log('⏱️  SCRIPT ANALYSIS:')
console.log(`- Estimated words: ${firstVideoScript.voiceover.estimatedWords}`)
console.log(`- Estimated duration: ${firstVideoScript.voiceover.estimatedDuration} seconds`)
console.log(`- Target duration: 90 seconds`)

console.log('\n🎨 VISUAL DIRECTIONS:')
console.log('='.repeat(40))
firstVideoScript.visualDirections.forEach((visual, index) => {
  console.log(`${index + 1}. ${visual.title} (${visual.timestamp})`)
  console.log(`   Visual: ${visual.visualDescription}`)
  console.log(`   AI Prompt: ${visual.aiPrompt}`)
  console.log(`   Background: ${visual.backgroundColor}`)
  console.log(`   Animations: ${visual.animations.join(', ')}`)
  console.log('')
})

console.log('🤖 SYNTHESIA API FORMAT:')
console.log('='.repeat(40))
console.log(JSON.stringify(firstVideoScript.synthesia, null, 2))

console.log('\n📹 PICTORY API FORMAT:')
console.log('='.repeat(40))
console.log(JSON.stringify(firstVideoScript.pictory, null, 2))

console.log('\n✅ Script generation complete!')
console.log('Ready to send to AI video generation platforms.')

// Export for easy copying
export default firstVideoScript