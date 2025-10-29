// Whop Configuration
export const WHOP_CONFIG = {
  // Your Whop checkout URL
  checkoutUrl: 'https://whop.com/kickoff-club-master-football-in-1-hour/kickoff-club-lifetime-access/',

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

// Get the Whop checkout URL
export const getCheckoutUrl = () => {
  return WHOP_CONFIG.checkoutUrl
}
