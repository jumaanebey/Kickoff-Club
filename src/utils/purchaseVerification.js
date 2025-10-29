// Purchase Verification Utility
// Handles Whop purchase verification and status management

const PURCHASE_STATUS_KEY = 'kickoff-club-purchase-status'
const PURCHASE_DATE_KEY = 'kickoff-club-purchase-date'
const MEMBERSHIP_ID_KEY = 'kickoff-club-membership-id'
const USER_EMAIL_KEY = 'kickoff-club-user-email'

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
    const membershipId = urlParams.get('membership_id')
    const userEmail = urlParams.get('email')

    if (whopSuccess === 'true' || checkoutSuccess === 'true' || purchased === 'true') {
      console.log('🎉 Detected successful Whop purchase from URL')
      setPurchaseStatus(true)

      // Store membership ID and email if provided
      if (membershipId) {
        localStorage.setItem(MEMBERSHIP_ID_KEY, membershipId)
      }
      if (userEmail) {
        localStorage.setItem(USER_EMAIL_KEY, userEmail)
      }

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
 * Verify purchase with server-side API call
 * More secure than localStorage alone
 */
export const verifyPurchaseServerSide = async (email = null, membershipId = null) => {
  try {
    // Use stored email/membershipId if not provided
    const userEmail = email || localStorage.getItem(USER_EMAIL_KEY)
    const storedMembershipId = membershipId || localStorage.getItem(MEMBERSHIP_ID_KEY)

    if (!userEmail && !storedMembershipId) {
      console.log('⚠️ No email or membership ID available for verification')
      return false
    }

    const response = await fetch('/api/verify-purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: userEmail,
        whopMembershipId: storedMembershipId
      })
    })

    if (!response.ok) {
      console.error('Server-side verification failed:', response.status)
      return false
    }

    const data = await response.json()

    // If fallback mode (API not configured), rely on client-side
    if (data.fallbackMode) {
      console.log('⚠️ Server-side verification not configured - using client-side only')
      return hasPremiumAccess()
    }

    // Update local storage with server verification result
    if (data.verified) {
      setPurchaseStatus(true)
      if (data.membershipId) {
        localStorage.setItem(MEMBERSHIP_ID_KEY, data.membershipId)
      }
      console.log('✅ Server-side verification successful')
      return true
    } else {
      console.log('❌ Server-side verification failed - no active membership found')
      return false
    }

  } catch (error) {
    console.error('Error during server-side verification:', error)
    // Fallback to client-side verification on error
    return hasPremiumAccess()
  }
}

/**
 * Admin unlock via server-side endpoint (secure)
 * Requires admin API key - not exposed to client
 */
export const adminUnlock = async (email) => {
  try {
    const response = await fetch('/api/admin/unlock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    })

    if (response.ok) {
      setPurchaseStatus(true)
      if (email) {
        localStorage.setItem(USER_EMAIL_KEY, email)
      }
      console.log('🔓 Admin unlock successful')
      return true
    } else {
      console.log('❌ Admin unlock failed - invalid credentials')
      return false
    }
  } catch (error) {
    console.error('Admin unlock error:', error)
    return false
  }
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
    daysOwned: getPurchaseDate()
      ? Math.floor((new Date() - getPurchaseDate()) / (1000 * 60 * 60 * 24))
      : null
  }
}
