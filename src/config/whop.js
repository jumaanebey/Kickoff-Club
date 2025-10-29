// Whop Configuration
export const WHOP_CONFIG = {
  // Your Whop checkout URL with redirect
  checkoutUrl: 'https://whop.com/kickoff-club-master-football',

  // Whop API Configuration (for reference only)
  companyId: 'biz_lBLiYG00mYjgmd', // Your company ID from URL
  planId: 'prod_FBKXhWTc5LUc1', // Your product ID

  // Product details
  productName: 'Kickoff Club - Lifetime Access',
  price: 24,

  // Free lessons (accessible without purchase)
  freeLessons: [
    'how-downs-work',
    'scoring-touchdowns',
    'field-layout-basics'
  ],

  // Premium lessons (require purchase)
  premiumLessons: [
    'quarterback-101',
    'offensive-positions',
    'defensive-positions',
    'special-teams-basics',
    'timeouts-and-clock',
    'understanding-penalties',
    'nfl-seasons-playoffs'
  ]
}

// Check if a lesson is premium
export const isPremiumLesson = (lessonId) => {
  return WHOP_CONFIG.premiumLessons.includes(lessonId)
}

// Check if user has access to a lesson
export const hasLessonAccess = (lessonId, userHasPurchased = false) => {
  // Free lessons are always accessible
  if (WHOP_CONFIG.freeLessons.includes(lessonId)) {
    return true
  }

  // Premium lessons require purchase
  return userHasPurchased
}

// Get the Whop checkout URL with redirect
export const getCheckoutUrl = () => {
  const baseUrl = WHOP_CONFIG.checkoutUrl
  const redirectUrl = encodeURIComponent(`${window.location.origin}/platform?whop_success=true`)
  return `${baseUrl}?redirect_url=${redirectUrl}`
}
