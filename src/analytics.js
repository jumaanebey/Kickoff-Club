/*
  analytics.js — Google Analytics 4 event tracking
  Sends events to GA4 using gtag() and maintains dataLayer compatibility
*/

/**
 * Track an event to Google Analytics 4
 * @param {string} name - Event name (e.g., 'page_view', 'lesson_completed', 'quiz_passed')
 * @param {object} payload - Event parameters/properties
 */
export function trackEvent(name, payload = {}) {
  try {
    // Send to GA4 using gtag if available
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', name, payload)
    }

    // Also push to dataLayer for compatibility with other tools
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: name, ...payload })
    }
  } catch (e) {
    // Silently fail in production, don't break the app
    if (process.env.NODE_ENV === 'development') {
      console.error('[ANALYTICS ERROR]', e)
    }
  }

  // Log in development for debugging
  if (process.env.NODE_ENV === 'development') {
    console.info('[ANALYTICS]', name, payload)
  }
}

/**
 * Track page views
 * @param {string} path - Page path
 * @param {string} title - Page title
 */
export function trackPageView(path, title) {
  trackEvent('page_view', {
    page_path: path,
    page_title: title
  })
}

/**
 * Set user properties in GA4
 * @param {object} properties - User properties to set
 */
export function setUserProperties(properties = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('set', 'user_properties', properties)
    }
  } catch (e) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ANALYTICS ERROR]', e)
    }
  }
}
