// Lesson data imports
import howDownsWork from './lessons/how-downs-work.json'
import scoringTouchdowns from './lessons/scoring-touchdowns.json' 
import quarterback101 from './lessons/quarterback-101.json'
import fieldLayoutBasics from './lessons/field-layout-basics.json'
import understandingPenalties from './lessons/understanding-penalties.json'
import timeoutsAndClock from './lessons/timeouts-and-clock.json'
import specialTeamsBasics from './lessons/special-teams-basics.json'
import offensivePositions from './lessons/offensive-positions.json'
import defensivePositions from './lessons/defensive-positions.json'
import nflSeasonsPlayoffs from './lessons/nfl-seasons-playoffs.json'

// All lessons organized by category
export const lessons = {
  'basic-rules': [
    howDownsWork,
    scoringTouchdowns,
    fieldLayoutBasics,
    nflSeasonsPlayoffs
  ],
  'positions': [
    quarterback101,
    offensivePositions,
    defensivePositions,
    specialTeamsBasics
  ],
  'strategy': [
    timeoutsAndClock
  ],
  'advanced-rules': [
    understandingPenalties
  ]
}

// Flatten all lessons into a single array for easier access
export const allLessons = Object.values(lessons).flat()

// Define which lessons are premium
const PREMIUM_LESSONS = [
  'quarterback-101',
  'offensive-positions',
  'defensive-positions',
  'special-teams-basics',
  'timeouts-and-clock',
  'understanding-penalties',
  'nfl-seasons-playoffs'
]

// Add isPremium flag to each lesson
allLessons.forEach(lesson => {
  lesson.isPremium = PREMIUM_LESSONS.includes(lesson.id)
})

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

// Progression data (inline for now)
export const pointSources = {
  lessonCompleted: 50,
  quizPassed: 25,
  perfectQuiz: 50,
  firstTry: 10,
  dailyLogin: 10,
  badgeEarned: 100,
  trackCompleted: 100,
  minGameCompleted: 20
}

export const levels = [
  { id: 'rookie-level', name: 'Rookie', pointsRequired: 0 },
  { id: 'fan-level', name: 'Fan', pointsRequired: 100 },
  { id: 'student-level', name: 'Student', pointsRequired: 300 },
  { id: 'expert-level', name: 'Expert', pointsRequired: 600 },
  { id: 'master-level', name: 'Master', pointsRequired: 1000 },
  { id: 'legend-level', name: 'Legend', pointsRequired: 2000 }
]

// Utility functions for progression
export const getBadgeById = (id) => {
  // This will be handled by achievements.js instead
  return null
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