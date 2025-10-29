import crypto from 'crypto'

/**
 * Whop Webhook Handler
 * Automatically verifies purchases when users complete checkout
 *
 * Events handled:
 * - membership.created: User purchases access
 * - membership.deleted: User requests refund
 *
 * Setup in Whop Dashboard:
 * 1. Go to Settings > Webhooks
 * 2. Add webhook URL: https://your-domain.vercel.app/api/webhooks/whop
 * 3. Copy webhook secret to .env.local as WHOP_WEBHOOK_SECRET
 */

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Verify webhook signature
    const signature = req.headers['x-whop-signature']
    const webhookSecret = process.env.WHOP_WEBHOOK_SECRET

    if (!webhookSecret) {
      console.error('WHOP_WEBHOOK_SECRET not configured')
      return res.status(500).json({ error: 'Webhook not configured' })
    }

    // Verify the signature to ensure request is from Whop
    const payload = JSON.stringify(req.body)
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(payload)
      .digest('hex')

    if (signature !== expectedSignature) {
      console.error('Invalid webhook signature')
      return res.status(401).json({ error: 'Invalid signature' })
    }

    // Process the webhook event
    const { event, data } = req.body

    console.log(`Received Whop webhook: ${event}`, data)

    switch (event) {
      case 'membership.created':
        // User purchased - could store in database, send email, etc.
        console.log(`✅ New purchase: User ${data.user.email} purchased ${data.product.name}`)

        // For now, just log it - client will verify via localStorage/URL params
        // In production, you'd store this in a database with user ID/email
        return res.status(200).json({
          success: true,
          message: 'Purchase recorded',
          userId: data.user.id
        })

      case 'membership.deleted':
        // User refunded - revoke access
        console.log(`❌ Refund: User ${data.user.email} refunded ${data.product.name}`)

        return res.status(200).json({
          success: true,
          message: 'Refund processed',
          userId: data.user.id
        })

      case 'membership.updated':
        // Membership status changed
        console.log(`🔄 Update: User ${data.user.email} membership updated`)
        return res.status(200).json({ success: true })

      default:
        console.log(`Unhandled webhook event: ${event}`)
        return res.status(200).json({ success: true, message: 'Event received' })
    }

  } catch (error) {
    console.error('Webhook processing error:', error)
    return res.status(500).json({ error: 'Webhook processing failed' })
  }
}
