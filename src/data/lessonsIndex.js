// Lesson data imports
import howDownsWork from './lessons/how-downs-work.json'
import scoringTouchdowns from './lessons/scoring-touchdowns.json' 
import quarterback101 from './lessons/quarterback-101.json'

// Progression data imports
import badgesData from './progression/badges.json'
import levelsData from './progression/levels.json'

// All lessons organized by category
export const lessons = {
  'basic-rules': [
    howDownsWork,
    scoringTouchdowns
  ],
  'positions': [
    quarterback101
  ],
  'strategy': [
    // Future lessons: field-goals, red-zone-strategy, clock-management
  ],
  'advanced': [
    // Future lessons: defensive-schemes, play-calling, situational-football
  ]
}

// Flatten all lessons into a single array for easier access
export const allLessons = Object.values(lessons).flat()

// Get lesson by ID
export const getLessonById = (id) => {
  return allLessons.find(lesson => lesson.id === id)
}

// Get lessons by category
export const getLessonsByCategory = (category) => {
  return lessons[category] || []
}

// Get lessons by difficulty
export const getLessonsByDifficulty = (difficulty) => {
  return allLessons.filter(lesson => lesson.difficulty === difficulty)
}

// Get next lesson in sequence
export const getNextLesson = (currentLessonId) => {
  const currentLesson = getLessonById(currentLessonId)
  if (!currentLesson) return null
  
  const categoryLessons = lessons[currentLesson.category]
  const currentIndex = categoryLessons.findIndex(lesson => lesson.id === currentLessonId)
  
  if (currentIndex < categoryLessons.length - 1) {
    return categoryLessons[currentIndex + 1]
  }
  
  // If at end of category, get first lesson of next category
  const categories = Object.keys(lessons)
  const currentCategoryIndex = categories.indexOf(currentLesson.category)
  
  if (currentCategoryIndex < categories.length - 1) {
    const nextCategory = categories[currentCategoryIndex + 1]
    return lessons[nextCategory][0]
  }
  
  return null // No more lessons
}

// Check if lesson prerequisites are met
export const checkPrerequisites = (lessonId, completedLessons = []) => {
  const lesson = getLessonById(lessonId)
  if (!lesson) return false
  
  if (!lesson.prerequisites || lesson.prerequisites.length === 0) {
    return true
  }
  
  return lesson.prerequisites.every(prereq => completedLessons.includes(prereq))
}

// Export progression data
export const badges = badgesData.badges
export const levels = levelsData.levels
export const pointSources = levelsData.pointSources
export const streakSystem = levelsData.streakSystem
export const rarityLevels = badgesData.rarityLevels

// Utility functions for progression
export const getBadgeById = (id) => {
  return badges.find(badge => badge.id === id)
}

export const getLevelByPoints = (points) => {
  return levels
    .slice()
    .reverse()
    .find(level => points >= level.pointsRequired) || levels[0]
}

export const getNextLevel = (currentPoints) => {
  const currentLevel = getLevelByPoints(currentPoints)
  const currentIndex = levels.findIndex(level => level.id === currentLevel.id)
  
  if (currentIndex < levels.length - 1) {
    return levels[currentIndex + 1]
  }
  
  return null // Max level reached
}