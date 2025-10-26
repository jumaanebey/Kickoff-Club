// Advanced accessibility and SEO optimization hooks
import { useEffect, useState, useCallback, useRef } from 'react'

export const useAccessibility = () => {
  const [preferences, setPreferences] = useState({
    reduceMotion: false,
    highContrast: false,
    fontSize: 'normal', // small, normal, large, extra-large
    screenReader: false,
    keyboardNavigation: false
  })
  
  const [focusOutline, setFocusOutline] = useState(false)
  const announcementRef = useRef(null)

  // Detect accessibility preferences
  useEffect(() => {
    const detectPreferences = () => {
      const newPreferences = {
        reduceMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        highContrast: window.matchMedia('(prefers-contrast: high)').matches,
        screenReader: 'speechSynthesis' in window && navigator.userAgent.includes('JAWS|NVDA|ORCA|VoiceOver'),
        keyboardNavigation: false // Will be detected on first Tab usage
      }
      
      setPreferences(prev => ({ ...prev, ...newPreferences }))
      
      // Apply CSS custom properties for dynamic theming
      document.documentElement.style.setProperty(
        '--animation-duration',
        newPreferences.reduceMotion ? '0.01ms' : '200ms'
      )
      
      if (newPreferences.highContrast) {
        document.documentElement.classList.add('high-contrast')
      }
    }

    detectPreferences()
    
    // Listen for preference changes
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const contrastQuery = window.matchMedia('(prefers-contrast: high)')
    
    motionQuery.addEventListener('change', detectPreferences)
    contrastQuery.addEventListener('change', detectPreferences)
    
    return () => {
      motionQuery.removeEventListener('change', detectPreferences)
      contrastQuery.removeEventListener('change', detectPreferences)
    }
  }, [])
  
  // Keyboard navigation detection
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Tab') {
        setPreferences(prev => ({ ...prev, keyboardNavigation: true }))
        setFocusOutline(true)
      }
    }
    
    const handleMouseDown = () => {
      setFocusOutline(false)
    }
    
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleMouseDown)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])
  
  // Screen reader announcements
  const announce = useCallback((message, priority = 'polite') => {
    if (!announcementRef.current) {
      // Create announcement region if it doesn't exist
      const announcer = document.createElement('div')
      announcer.setAttribute('aria-live', priority)
      announcer.setAttribute('aria-atomic', 'true')
      announcer.className = 'sr-only'
      announcer.id = 'a11y-announcer'
      document.body.appendChild(announcer)
      announcementRef.current = announcer
    }
    
    // Clear and set new message
    announcementRef.current.textContent = ''
    setTimeout(() => {
      if (announcementRef.current) {
        announcementRef.current.textContent = message
      }
    }, 100)
  }, [])
  
  // Skip link functionality
  const addSkipLink = useCallback((targetId, linkText = 'Skip to main content') => {
    const existingSkipLink = document.getElementById('skip-link')
    if (existingSkipLink) return
    
    const skipLink = document.createElement('a')
    skipLink.id = 'skip-link'
    skipLink.href = `#${targetId}`
    skipLink.textContent = linkText
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent-600 focus:text-white focus:rounded-lg focus:shadow-lg'
    
    document.body.insertBefore(skipLink, document.body.firstChild)
  }, [])
  
  // Font size adjustment
  const adjustFontSize = useCallback((size) => {
    const sizeMap = {
      small: '0.875rem',
      normal: '1rem',
      large: '1.125rem',
      'extra-large': '1.25rem'
    }
    
    document.documentElement.style.setProperty('--base-font-size', sizeMap[size])
    setPreferences(prev => ({ ...prev, fontSize: size }))
    
    // Store preference
    localStorage.setItem('accessibility-font-size', size)
    
    announce(`Font size changed to ${size}`)
  }, [announce])
  
  // Load saved preferences
  useEffect(() => {
    const savedFontSize = localStorage.getItem('accessibility-font-size')
    if (savedFontSize) {
      adjustFontSize(savedFontSize)
    }
  }, [adjustFontSize])
  
  return {
    preferences,
    focusOutline,
    announce,
    addSkipLink,
    adjustFontSize,
    isAccessibilityUser: preferences.screenReader || preferences.keyboardNavigation
  }
}

// SEO and meta management hook
export const useSEO = () => {
  const [currentMeta, setCurrentMeta] = useState({
    title: '',
    description: '',
    keywords: [],
    canonicalUrl: '',
    ogImage: ''
  })
  
  const updateMeta = useCallback((metaData) => {
    const {
      title,
      description,
      keywords = [],
      canonicalUrl,
      ogImage,
      structuredData
    } = metaData
    
    // Update document title
    if (title) {
      document.title = `${title} | Kickoff Club - Learn football Football`
    }
    
    // Update or create meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let tag = document.querySelector(`meta[${attribute}="${name}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attribute, name)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }
    
    if (description) {
      updateMetaTag('description', description)
      updateMetaTag('og:description', description, 'property')
      updateMetaTag('twitter:description', description)
    }
    
    if (keywords.length > 0) {
      updateMetaTag('keywords', keywords.join(', '))
    }
    
    if (title) {
      updateMetaTag('og:title', title, 'property')
      updateMetaTag('twitter:title', title)
    }
    
    if (ogImage) {
      updateMetaTag('og:image', ogImage, 'property')
      updateMetaTag('twitter:image', ogImage)
    }
    
    // Update canonical URL
    if (canonicalUrl) {
      let canonicalTag = document.querySelector('link[rel="canonical"]')
      if (!canonicalTag) {
        canonicalTag = document.createElement('link')
        canonicalTag.rel = 'canonical'
        document.head.appendChild(canonicalTag)
      }
      canonicalTag.href = canonicalUrl
      
      updateMetaTag('og:url', canonicalUrl, 'property')
    }
    
    // Add structured data
    if (structuredData) {
      let structuredDataTag = document.querySelector('script[type="application/ld+json"]')
      if (!structuredDataTag) {
        structuredDataTag = document.createElement('script')
        structuredDataTag.type = 'application/ld+json'
        document.head.appendChild(structuredDataTag)
      }
      structuredDataTag.textContent = JSON.stringify(structuredData)
    }
    
    setCurrentMeta(metaData)
  }, [])
  
  return {
    currentMeta,
    updateMeta
  }
}

export default { useAccessibility, useSEO }