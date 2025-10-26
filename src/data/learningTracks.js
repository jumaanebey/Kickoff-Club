// Learning Tracks - Structured pathways through lessons
export const learningTracks = {
  'fundamentals': {
    id: 'fundamentals',
    title: 'Football Fundamentals',
    subtitle: 'Start here to learn the basics',
    difficulty: 'beginner',
    description: 'Master the essential concepts that make football work. Perfect for complete beginners.',
    duration: '15 minutes',
    lessonsCount: 3,
    badge: 'fundamentals-graduate',
    color: 'sage',
    icon: '🏈',
    lessons: [
      {
        lessonId: 'how-downs-work',
        order: 1,
        title: 'How Downs Work',
        isRequired: true,
        unlocksConcepts: ['downs', 'first-down', 'punt']
      },
      {
        lessonId: 'scoring-touchdowns', 
        order: 2,
        title: 'Scoring Touchdowns',
        prerequisites: ['how-downs-work'],
        isRequired: true,
        unlocksConcepts: ['touchdown', 'extra-point', '2-point-conversion']
      },
      {
        lessonId: 'quarterback-101',
        order: 3,
        title: 'Quarterback Basics',
        prerequisites: ['how-downs-work'],
        isRequired: true,
        unlocksConcepts: ['quarterback', 'audible', 'pocket']
      }
    ],
    finalChallenge: {
      type: 'scenario',
      title: 'Rookie Game Situations',
      description: 'Test your fundamental knowledge in real game scenarios'
    },
    nextTracks: ['offensive-strategy', 'positions-deep-dive']
  },

  'offensive-strategy': {
    id: 'offensive-strategy',
    title: 'Offensive Strategy',
    subtitle: 'How teams move the ball and score',
    difficulty: 'intermediate',
    description: 'Dive deeper into offensive concepts, play calling, and strategic decision-making.',
    duration: '25 minutes',
    lessonsCount: 5,
    badge: 'offensive-coordinator',
    color: 'warmGold',
    icon: '⚡',
    prerequisites: ['fundamentals'],
    lessons: [
      {
        lessonId: 'offensive-formations',
        order: 1,
        title: 'Offensive Formations',
        isRequired: true,
        unlocksConcepts: ['i-formation', 'shotgun', 'spread']
      },
      {
        lessonId: 'running-vs-passing',
        order: 2,
        title: 'Run vs Pass Concepts',
        prerequisites: ['offensive-formations'],
        isRequired: true,
        unlocksConcepts: ['run-game', 'passing-tree', 'play-action']
      },
      {
        lessonId: 'red-zone-offense',
        order: 3,
        title: 'Red Zone Offense',
        prerequisites: ['scoring-touchdowns', 'running-vs-passing'],
        isRequired: true,
        unlocksConcepts: ['red-zone', 'goal-line', 'fade-route']
      },
      {
        lessonId: 'two-minute-drill',
        order: 4,
        title: 'Two-Minute Drill',
        prerequisites: ['red-zone-offense'],
        isRequired: false,
        unlocksConcepts: ['hurry-up', 'spike-play', 'timeout-management']
      },
      {
        lessonId: 'trick-plays',
        order: 5,
        title: 'Trick Plays & Special Situations',
        prerequisites: ['two-minute-drill'],
        isRequired: false,
        unlocksConcepts: ['reverse', 'flea-flicker', 'halfback-pass']
      }
    ],
    finalChallenge: {
      type: 'scenario',
      title: 'Offensive Coordinator Challenge',
      description: 'Call plays in crucial game situations like a real coordinator'
    },
    nextTracks: ['defensive-concepts', 'advanced-strategy']
  },

  'positions-deep-dive': {
    id: 'positions-deep-dive',
    title: 'Player Positions',
    subtitle: 'What each position does and why',
    difficulty: 'intermediate',
    description: 'Understand the role and responsibilities of every position on the field.',
    duration: '30 minutes',
    lessonsCount: 6,
    badge: 'position-expert',
    color: 'blush',
    icon: '👥',
    prerequisites: ['fundamentals'],
    lessons: [
      {
        lessonId: 'quarterback-101',
        order: 1,
        title: 'Quarterback Mastery',
        isRequired: true,
        unlocksConcepts: ['pocket-presence', 'pre-snap-reads', 'audibles']
      },
      {
        lessonId: 'offensive-line',
        order: 2,
        title: 'Offensive Line Protection',
        prerequisites: ['quarterback-101'],
        isRequired: true,
        unlocksConcepts: ['pass-blocking', 'run-blocking', 'blitz-pickup']
      },
      {
        lessonId: 'receivers-routes',
        order: 3,
        title: 'Receivers & Route Running',
        prerequisites: ['quarterback-101'],
        isRequired: true,
        unlocksConcepts: ['route-tree', 'separation', 'contested-catch']
      },
      {
        lessonId: 'running-backs',
        order: 4,
        title: 'Running Back Skills',
        prerequisites: ['offensive-line'],
        isRequired: false,
        unlocksConcepts: ['vision', 'cutback', 'pass-protection']
      },
      {
        lessonId: 'defensive-positions',
        order: 5,
        title: 'Defensive Positions Overview',
        prerequisites: ['receivers-routes'],
        isRequired: true,
        unlocksConcepts: ['coverage', 'rush', 'tackle']
      },
      {
        lessonId: 'special-teams',
        order: 6,
        title: 'Special Teams Units',
        prerequisites: ['defensive-positions'],
        isRequired: false,
        unlocksConcepts: ['punt-coverage', 'kickoff-return', 'field-goal-unit']
      }
    ],
    finalChallenge: {
      type: 'identification',
      title: 'Position Recognition Challenge',
      description: 'Identify player positions and their roles in various formations'
    },
    nextTracks: ['defensive-concepts', 'advanced-strategy']
  },

  'defensive-concepts': {
    id: 'defensive-concepts',
    title: 'Defensive Strategy',
    subtitle: 'How defenses stop the offense',
    difficulty: 'intermediate',
    description: 'Learn defensive schemes, coverage concepts, and how defenses adapt to stop offenses.',
    duration: '20 minutes',
    lessonsCount: 4,
    badge: 'defensive-coordinator',
    color: 'rose',
    icon: '🛡️',
    prerequisites: ['fundamentals', 'positions-deep-dive'],
    lessons: [
      {
        lessonId: 'defensive-formations',
        order: 1,
        title: 'Defensive Formations',
        isRequired: true,
        unlocksConcepts: ['4-3-defense', '3-4-defense', 'nickel-defense']
      },
      {
        lessonId: 'coverage-concepts',
        order: 2,
        title: 'Coverage Concepts',
        prerequisites: ['defensive-formations'],
        isRequired: true,
        unlocksConcepts: ['man-coverage', 'zone-coverage', 'blitz']
      },
      {
        lessonId: 'pass-rush',
        order: 3,
        title: 'Pass Rush Techniques',
        prerequisites: ['coverage-concepts'],
        isRequired: true,
        unlocksConcepts: ['bull-rush', 'spin-move', 'stunt']
      },
      {
        lessonId: 'red-zone-defense',
        order: 4,
        title: 'Red Zone Defense',
        prerequisites: ['pass-rush'],
        isRequired: false,
        unlocksConcepts: ['goal-line-stand', 'red-zone-coverage']
      }
    ],
    finalChallenge: {
      type: 'scenario',
      title: 'Defensive Coordinator Challenge',
      description: 'Call defensive plays to stop various offensive situations'
    },
    nextTracks: ['advanced-strategy']
  },

  'advanced-strategy': {
    id: 'advanced-strategy',
    title: 'Advanced Strategy',
    subtitle: 'Pro-level concepts and situational football',
    difficulty: 'advanced',
    description: 'Master complex strategies, advanced concepts, and situational decision-making.',
    duration: '35 minutes',
    lessonsCount: 7,
    badge: 'football-strategist',
    color: 'navy',
    icon: '🧠',
    prerequisites: ['offensive-strategy', 'defensive-concepts'],
    lessons: [
      {
        lessonId: 'situational-football',
        order: 1,
        title: 'Situational Football Mastery',
        isRequired: true,
        unlocksConcepts: ['game-management', 'field-position', 'leverage']
      },
      {
        lessonId: 'play-calling-psychology',
        order: 2,
        title: 'Play Calling Psychology',
        prerequisites: ['situational-football'],
        isRequired: true,
        unlocksConcepts: ['tendency-breaking', 'misdirection', 'chess-match']
      },
      {
        lessonId: 'analytics-football',
        order: 3,
        title: 'Analytics in Football',
        prerequisites: ['play-calling-psychology'],
        isRequired: false,
        unlocksConcepts: ['epa', 'win-probability', 'down-efficiency']
      },
      {
        lessonId: 'playoff-football',
        order: 4,
        title: 'Playoff Football Differences',
        prerequisites: ['analytics-football'],
        isRequired: true,
        unlocksConcepts: ['playoff-intensity', 'single-elimination', 'pressure-moments']
      },
      {
        lessonId: 'weather-conditions',
        order: 5,
        title: 'Weather & Environmental Factors',
        prerequisites: ['playoff-football'],
        isRequired: false,
        unlocksConcepts: ['wind-game', 'cold-weather', 'dome-vs-outdoor']
      },
      {
        lessonId: 'coaching-decisions',
        order: 6,
        title: 'Critical Coaching Decisions',
        prerequisites: ['weather-conditions'],
        isRequired: true,
        unlocksConcepts: ['4th-down-decisions', 'challenge-flags', 'timeout-usage']
      },
      {
        lessonId: 'nfl-evolution',
        order: 7,
        title: 'Evolution of Football Strategy',
        prerequisites: ['coaching-decisions'],
        isRequired: false,
        unlocksConcepts: ['rule-changes', 'modern-offense', 'defensive-evolution']
      }
    ],
    finalChallenge: {
      type: 'comprehensive',
      title: 'Head Coach Challenge',
      description: 'Make coaching decisions in a simulated playoff game scenario'
    },
    nextTracks: ['expert-analysis']
  },

  'expert-analysis': {
    id: 'expert-analysis',
    title: 'Expert Analysis',
    subtitle: 'Watch football like a coach',
    difficulty: 'expert',
    description: 'Develop the ability to analyze games, predict plays, and understand the nuances only experts see.',
    duration: '40 minutes',
    lessonsCount: 5,
    badge: 'football-analyst',
    color: 'purple',
    icon: '📊',
    prerequisites: ['advanced-strategy'],
    lessons: [
      {
        lessonId: 'film-study-basics',
        order: 1,
        title: 'How to Study Game Film',
        isRequired: true,
        unlocksConcepts: ['all-22-film', 'tendency-analysis', 'formation-recognition']
      },
      {
        lessonId: 'predictive-analysis',
        order: 2,
        title: 'Predicting Plays',
        prerequisites: ['film-study-basics'],
        isRequired: true,
        unlocksConcepts: ['down-distance-tendencies', 'personnel-packages', 'field-position-influence']
      },
      {
        lessonId: 'advanced-metrics',
        order: 3,
        title: 'Advanced Metrics Deep Dive',
        prerequisites: ['predictive-analysis'],
        isRequired: false,
        unlocksConcepts: ['dvoa', 'pff-grades', 'air-yards', 'pressure-rate']
      },
      {
        lessonId: 'broadcast-analysis',
        order: 4,
        title: 'Understanding Broadcast Analysis',
        prerequisites: ['advanced-metrics'],
        isRequired: false,
        unlocksConcepts: ['commentator-insight', 'replay-analysis', 'stat-interpretation']
      },
      {
        lessonId: 'fantasy-implications',
        order: 5,
        title: 'Fantasy Football Applications',
        prerequisites: ['broadcast-analysis'],
        isRequired: false,
        unlocksConcepts: ['matchup-analysis', 'target-share', 'game-script', 'weather-impact']
      }
    ],
    finalChallenge: {
      type: 'analysis',
      title: 'Expert Analyst Challenge',
      description: 'Provide expert analysis on real game situations and predict outcomes'
    },
    nextTracks: [] // Final track
  }
}

// Helper functions for working with tracks
export const getTrackById = (trackId) => {
  return learningTracks[trackId]
}

export const getAvailableTracks = (completedLessons = [], completedTracks = []) => {
  return Object.values(learningTracks).filter(track => {
    // Check if all prerequisites are met
    if (!track.prerequisites || track.prerequisites.length === 0) {
      return true
    }
    
    return track.prerequisites.every(prereq => completedTracks.includes(prereq))
  })
}

export const getTrackProgress = (track, completedLessons = []) => {
  const completedCount = track.lessons.filter(lesson => 
    completedLessons.includes(lesson.lessonId)
  ).length
  
  const requiredLessons = track.lessons.filter(lesson => lesson.isRequired)
  const completedRequired = requiredLessons.filter(lesson => 
    completedLessons.includes(lesson.lessonId)
  ).length
  
  return {
    totalLessons: track.lessons.length,
    completedLessons: completedCount,
    requiredLessons: requiredLessons.length,
    completedRequired,
    percentage: (completedCount / track.lessons.length) * 100,
    isComplete: completedRequired === requiredLessons.length,
    canTakeFinalChallenge: completedRequired === requiredLessons.length
  }
}

export const getNextLesson = (track, completedLessons = []) => {
  // Find the next uncompleted required lesson
  const nextRequired = track.lessons.find(lesson => 
    lesson.isRequired && !completedLessons.includes(lesson.lessonId)
  )
  
  if (nextRequired) return nextRequired
  
  // If all required are done, find next optional lesson
  return track.lessons.find(lesson => 
    !lesson.isRequired && !completedLessons.includes(lesson.lessonId)
  )
}

export const getDifficultyColor = (difficulty) => {
  const colors = {
    beginner: 'text-green-600 bg-green-100',
    intermediate: 'text-yellow-600 bg-yellow-100', 
    advanced: 'text-orange-600 bg-orange-100',
    expert: 'text-red-600 bg-red-100'
  }
  return colors[difficulty] || colors.beginner
}

export const getTrackColor = (colorName) => {
  const colors = {
    sage: 'bg-sage-500 border-sage-300 text-sage-800',
    warmGold: 'bg-warmGold bg-opacity-80 border-yellow-300 text-yellow-800',
    blush: 'bg-blush-200 border-rose-300 text-rose-800',
    rose: 'bg-rose-200 border-rose-300 text-rose-800',
    navy: 'bg-navy bg-opacity-90 border-blue-300 text-white',
    purple: 'bg-purple-200 border-purple-300 text-purple-800'
  }
  return colors[colorName] || colors.sage
}