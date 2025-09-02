/*
  analytics.js — simple helper that logs and pushes to window.dataLayer.
  Replace or extend with GA4/Posthog/Segment as needed.
*/
export function trackEvent(name, payload = {}) {
  try {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: name, ...payload })
    }
  } catch (e) { /* ignore */ }
  console.info('[ANALYTICS]', name, payload)
}
