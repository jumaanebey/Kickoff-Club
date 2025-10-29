/**
 * Admin Unlock Endpoint
 * Secure server-side endpoint for admin access grants
 *
 * Protected by admin API key - not exposed to client
 * Use for testing, support, or manual access grants
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { email, adminKey } = req.body
    const serverAdminKey = process.env.ADMIN_UNLOCK_KEY

    if (!serverAdminKey) {
      console.error('ADMIN_UNLOCK_KEY not configured')
      return res.status(500).json({ error: 'Admin unlock not configured' })
    }

    // Verify admin key
    if (!adminKey || adminKey !== serverAdminKey) {
      console.warn('Invalid admin unlock attempt')
      return res.status(401).json({ error: 'Unauthorized' })
    }

    // Grant access
    console.log(`🔓 Admin unlock granted for: ${email}`)

    return res.status(200).json({
      success: true,
      message: 'Access granted',
      email
    })

  } catch (error) {
    console.error('Admin unlock error:', error)
    return res.status(500).json({ error: 'Unlock failed' })
  }
}
