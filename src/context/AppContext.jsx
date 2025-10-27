// Centralized state management with performance optimizations
import React, { createContext, useContext, useReducer, useMemo, useCallback, useEffect } from 'react'
import { loadProgress, saveProgress, checkBadgeProgress } from '../utils/progressTracker'

const AppContext = createContext()

// State shape for performance optimization
const initialState = {
  user: {
    progress: null,
    loading: true,
    lastSync: null
  },
  ui: {
    theme: 'light',
    reducedMotion: false,
    notifications: [],
    activeModal: null
  },
  learning: {
    currentLesson: null,
    adaptiveSettings: {
      difficulty: 'medium',
      preferredPace: 'normal',
      interests: []
    },
    sessionData: {
      startTime: null,
      lessonsViewed: [],
      totalTimeSpent: 0
    }
  },
  cache: {
    lessons: {},
    badges: {},
    lastUpdated: {}
  }
}

// Optimized reducer with action batching
const appReducer = (state, action) => {
  switch (action.type) {
    case 'BATCH_ACTIONS':
      return action.actions.reduce(appReducer, state)
      
    case 'LOAD_PROGRESS_SUCCESS':
      return {
        ...state,
        user: {
          ...state.user,
          progress: action.payload,
          loading: false,
          lastSync: Date.now()
        }
      }
      
    case 'UPDATE_PROGRESS':
      const newProgress = { ...state.user.progress, ...action.payload }
      return {
        ...state,
        user: {
          ...state.user,
          progress: newProgress,
          lastSync: Date.now()
        }
      }
      
    case 'SET_ADAPTIVE_SETTINGS':
      return {
        ...state,
        learning: {
          ...state.learning,
          adaptiveSettings: { ...state.learning.adaptiveSettings, ...action.payload }
        }
      }
      
    case 'START_SESSION':
      return {
        ...state,
        learning: {
          ...state.learning,
          sessionData: {
            startTime: Date.now(),
            lessonsViewed: [],
            totalTimeSpent: 0
          }
        }
      }
      
    case 'TRACK_LESSON_VIEW':
      return {
        ...state,
        learning: {
          ...state.learning,
          sessionData: {
            ...state.learning.sessionData,
            lessonsViewed: [...new Set([...state.learning.sessionData.lessonsViewed, action.payload])]
          }
        }
      }
      
    case 'CACHE_LESSON':
      return {
        ...state,
        cache: {
          ...state.cache,
          lessons: {
            ...state.cache.lessons,
            [action.payload.id]: {
              ...action.payload,
              cachedAt: Date.now()
            }
          }
        }
      }
      
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: [
            ...state.ui.notifications,
            { ...action.payload, id: Date.now(), timestamp: Date.now() }
          ]
        }
      }
      
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        ui: {
          ...state.ui,
          notifications: state.ui.notifications.filter(n => n.id !== action.payload)
        }
      }
      
    default:
      return state
  }
}

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Batch actions for performance
  const batchDispatch = useCallback((actions) => {
    dispatch({ type: 'BATCH_ACTIONS', actions })
  }, [])

  // Initialize app data
  useEffect(() => {
    const initializeApp = async () => {
      try {
        const progress = loadProgress()
        dispatch({ type: 'LOAD_PROGRESS_SUCCESS', payload: progress })
        dispatch({ type: 'START_SESSION' })
        
        // Check for accessibility preferences
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) {
          dispatch({ type: 'SET_UI_PREFERENCE', payload: { reducedMotion: true } })
        }
      } catch (error) {
        console.error('Failed to initialize app:', error)
      }
    }

    initializeApp()
  }, [])

  // Auto-save progress with debouncing
  useEffect(() => {
    if (!state.user.progress || state.user.loading) return

    const timeoutId = setTimeout(() => {
      saveProgress(state.user.progress)
    }, 1000) // 1 second debounce

    return () => clearTimeout(timeoutId)
  }, [state.user.progress, state.user.loading])

  // Performance-optimized selectors
  const selectors = useMemo(() => ({
    getUserStats: () => {
      if (!state.user.progress) return null
      return {
        level: state.user.progress.stats.currentLevel,
        points: state.user.progress.stats.totalPoints,
        streak: state.user.progress.stats.currentStreak,
        completedLessons: state.user.progress.lessons.completed.length
      }
    },
    
    getAdaptiveDifficulty: () => {
      const stats = selectors.getUserStats()
      if (!stats) return 'beginner'
      
      if (stats.completedLessons > 10 && stats.points > 500) return 'advanced'
      if (stats.completedLessons > 5) return 'intermediate'
      return 'beginner'
    },
    
    getPersonalizedRecommendations: () => {
      // ML-like recommendation logic based on user behavior
      const interests = state.learning.adaptiveSettings.interests
      const completedLessons = state.user.progress?.lessons.completed || []
      
      // Simple recommendation algorithm
      return interests.length > 0 ? interests : ['basic-rules', 'scoring', 'positions']
    }
  }), [state])

  // Action creators with optimizations
  const actions = useMemo(() => ({
    updateProgress: (updates) => {
      dispatch({ type: 'UPDATE_PROGRESS', payload: updates })
    },
    
    completeLesson: (lessonId) => {
      const currentProgress = state.user.progress
      if (!currentProgress.lessons.completed.includes(lessonId)) {
        const updatedProgress = {
          ...currentProgress,
          lessons: {
            ...currentProgress.lessons,
            completed: [...currentProgress.lessons.completed, lessonId]
          },
          stats: {
            ...currentProgress.stats,
            totalPoints: currentProgress.stats.totalPoints + 50
          }
        }
        
        dispatch({ type: 'UPDATE_PROGRESS', payload: updatedProgress })
        dispatch({ type: 'TRACK_LESSON_VIEW', payload: lessonId })
        
        // Check for new badges
        const progressWithBadges = checkBadgeProgress(updatedProgress)
        if (progressWithBadges.newBadges?.length > 0) {
          progressWithBadges.newBadges.forEach(badge => {
            dispatch({
              type: 'ADD_NOTIFICATION',
              payload: {
                type: 'badge_earned',
                title: 'New Badge Earned!',
                message: badge.name,
                badge
              }
            })
          })
        }
      }
    },

    viewLesson: (lessonId) => {
      const currentProgress = state.user.progress
      if (!currentProgress.lessons.viewed.includes(lessonId)) {
        const updatedProgress = {
          ...currentProgress,
          lessons: {
            ...currentProgress.lessons,
            viewed: [...currentProgress.lessons.viewed, lessonId]
          }
        }
        dispatch({ type: 'UPDATE_PROGRESS', payload: updatedProgress })
      }
    },

    readLesson: (lessonId) => {
      const currentProgress = state.user.progress
      if (!currentProgress.lessons.read.includes(lessonId)) {
        const updatedProgress = {
          ...currentProgress,
          lessons: {
            ...currentProgress.lessons,
            read: [...currentProgress.lessons.read, lessonId]
          }
        }
        dispatch({ type: 'UPDATE_PROGRESS', payload: updatedProgress })
      }
    },

    setAdaptivePreferences: (preferences) => {
      dispatch({ type: 'SET_ADAPTIVE_SETTINGS', payload: preferences })
    },
    
    addNotification: (notification) => {
      dispatch({ type: 'ADD_NOTIFICATION', payload: notification })
    },
    
    removeNotification: (id) => {
      dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
    }
  }), [state.user.progress])

  const contextValue = useMemo(() => ({
    state,
    actions,
    selectors,
    batchDispatch
  }), [state, actions, selectors, batchDispatch])

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}