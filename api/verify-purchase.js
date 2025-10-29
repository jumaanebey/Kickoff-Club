/**
 * Server-Side Purchase Verification
 * Verifies if a user has valid Whop membership
 *
 * This endpoint can be called from the client to verify purchase status
 * without relying solely on localStorage.
 *
 * Setup:
 * 1. Get Whop API key from dashboard
 * 2. Add to .env.local as WHOP_API_KEY
 * 3. Add WHOP_PRODUCT_ID for your product
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, userId, whopMembershipId } = req.body

    // Check if Whop API is configured
    const whopApiKey = process.env.WHOP_API_KEY
    const whopProductId = process.env.WHOP_PRODUCT_ID

    if (!whopApiKey || !whopProductId) {
      console.warn('Whop API not configured - falling back to client-side verification')

      // Fallback: allow client-side verification for MVP
      // In production, this should be required
      return res.status(200).json({
        verified: false,
        fallbackMode: true,
        message: 'Server-side verification not configured - using client-side verification'
      })
    }

    // Verify with Whop API
    let verified = false
    let membershipData = null

    if (whopMembershipId) {
      // Verify specific membership ID
      try {
        const response = await fetch(
          `https://api.whop.com/v2/memberships/${whopMembershipId}`,
          {
            headers: {
              'Authorization': `Bearer ${whopApiKey}`,
              'Content-Type': 'application/json'
            }
          }
        )

        if (response.ok) {
          membershipData = await response.json()
          verified = membershipData.valid && membershipData.product === whopProductId
        }
      } catch (error) {
        console.error('Error verifying membership:', error)
      }
    } else if (email) {
      // Check if user has any active membership for this product
      try {
        const response = await fetch(
          `https://api.whop.com/v2/memberships?product=${whopProductId}&user_email=${email}`,
          {
            headers: {
              'Authorization': `Bearer ${whopApiKey}`,
              'Content-Type': 'application/json'
            }
          }
        )

        if (response.ok) {
          const data = await response.json()
          const activeMemberships = data.data.filter(m => m.valid)
          verified = activeMemberships.length > 0

          if (verified) {
            membershipData = activeMemberships[0]
          }
        }
      } catch (error) {
        console.error('Error checking memberships:', error)
      }
    }

    return res.status(200).json({
      verified,
      membershipId: membershipData?.id || null,
      expiresAt: membershipData?.expires_at || null,
      productId: whopProductId
    })

  } catch (error) {
    console.error('Purchase verification error:', error)
    return res.status(500).json({
      error: 'Verification failed',
      verified: false
    })
  }
}
