// Purchase Verification Utility
// Handles Whop purchase verification and status management

const PURCHASE_STATUS_KEY = 'kickoff-club-purchase-status'
const PURCHASE_DATE_KEY = 'kickoff-club-purchase-date'

/**
 * Check if user has purchased premium access
 */
export const hasPremiumAccess = () => {
  try {
    const status = localStorage.getItem(PURCHASE_STATUS_KEY)
    return status === 'purchased'
  } catch (error) {
    console.error('Error checking purchase status:', error)
    return false
  }
}

/**
 * Mark user as having purchased premium access
 */
export const setPurchaseStatus = (purchased = true) => {
  try {
    if (purchased) {
      localStorage.setItem(PURCHASE_STATUS_KEY, 'purchased')
      localStorage.setItem(PURCHASE_DATE_KEY, new Date().toISOString())
      console.log('✅ Premium access granted')
    } else {
      localStorage.removeItem(PURCHASE_STATUS_KEY)
      localStorage.removeItem(PURCHASE_DATE_KEY)
      console.log('❌ Premium access removed')
    }
    return true
  } catch (error) {
    console.error('Error setting purchase status:', error)
    return false
  }
}

/**
 * Get purchase date if user has purchased
 */
export const getPurchaseDate = () => {
  try {
    const date = localStorage.getItem(PURCHASE_DATE_KEY)
    return date ? new Date(date) : null
  } catch (error) {
    console.error('Error getting purchase date:', error)
    return null
  }
}

/**
 * Check URL for Whop success parameter
 * Whop can redirect back with ?whop_success=true or custom params
 */
export const checkWhopRedirect = () => {
  try {
    const urlParams = new URLSearchParams(window.location.search)

    // Check for common Whop success indicators
    const whopSuccess = urlParams.get('whop_success')
    const checkoutSuccess = urlParams.get('checkout_success')
    const purchased = urlParams.get('purchased')

    if (whopSuccess === 'true' || checkoutSuccess === 'true' || purchased === 'true') {
      console.log('🎉 Detected successful Whop purchase from URL')
      setPurchaseStatus(true)

      // Clean URL parameters
      window.history.replaceState({}, document.title, window.location.pathname)

      return true
    }

    return false
  } catch (error) {
    console.error('Error checking Whop redirect:', error)
    return false
  }
}

/**
 * Admin unlock with secret key (for testing)
 */
export const adminUnlock = (secretKey) => {
  // Simple secret key for testing - in production this would be more secure
  const ADMIN_KEY = 'kickoff-club-2024'

  if (secretKey === ADMIN_KEY) {
    setPurchaseStatus(true)
    console.log('🔓 Admin unlock successful')
    return true
  }

  console.log('❌ Invalid admin key')
  return false
}

/**
 * Clear all purchase data (for testing/debugging)
 */
export const clearPurchaseStatus = () => {
  setPurchaseStatus(false)
  console.log('🧹 Purchase status cleared')
}

/**
 * Get purchase info for debugging
 */
export const getPurchaseInfo = () => {
  return {
    hasPurchased: hasPremiumAccess(),
    purchaseDate: getPurchaseDate(),
    daysOwnedage: getPurchaseDate()
      ? Math.floor((new Date() - getPurchaseDate()) / (1000 * 60 * 60 * 24))
      : null
  }
}
