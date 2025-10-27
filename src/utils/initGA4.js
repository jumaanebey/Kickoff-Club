/**
 * Initialize Google Analytics 4
 * Dynamically loads the gtag.js script with the measurement ID from environment variables
 */
export function initGA4() {
  const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID

  // Skip if no measurement ID is configured
  if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
    if (import.meta.env.DEV) {
      console.info('[GA4] No measurement ID configured. Analytics disabled.')
    }
    return
  }

  try {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []
    function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag

    // Initialize gtag
    gtag('js', new Date())
    gtag('config', measurementId, {
      send_page_view: true,
      cookie_flags: 'SameSite=None;Secure'
    })

    // Load the gtag.js script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    document.head.appendChild(script)

    if (import.meta.env.DEV) {
      console.info('[GA4] Initialized with measurement ID:', measurementId)
    }
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('[GA4] Initialization failed:', error)
    }
  }
}
