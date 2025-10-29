import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// Configure R2 client
const s3Client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
})

// Free lessons that don't require purchase
const FREE_LESSONS = [
  'how-downs-work',
  'scoring-touchdowns',
  'field-layout-basics'
]

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { videoId, hasPurchased, membershipId, email } = req.query

  // Validate videoId
  if (!videoId) {
    return res.status(400).json({ error: 'Video ID is required' })
  }

  // Check if lesson is premium
  const isPremium = !FREE_LESSONS.includes(videoId)

  // If it's a free lesson, allow access
  if (!isPremium) {
    // Continue to generate signed URL below
  } else {
    // Premium lesson - verify purchase
    let accessGranted = false

    // Method 1: Server-side verification with Whop API (most secure)
    if (membershipId && process.env.WHOP_API_KEY) {
      try {
        const response = await fetch(
          `https://api.whop.com/v2/memberships/${membershipId}`,
          {
            headers: {
              'Authorization': `Bearer ${process.env.WHOP_API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        )

        if (response.ok) {
          const data = await response.json()
          accessGranted = data.valid && data.product === process.env.WHOP_PRODUCT_ID
          console.log(`✅ Verified membership ${membershipId}: ${accessGranted}`)
        }
      } catch (error) {
        console.error('Error verifying membership:', error)
      }
    }

    // Method 2: Fallback to client-side flag (less secure, for MVP)
    if (!accessGranted && hasPurchased === 'true') {
      console.warn('⚠️ Using client-side purchase flag - server verification not available')
      accessGranted = true
    }

    // Deny access if not verified
    if (!accessGranted) {
      return res.status(403).json({ error: 'Premium access required' })
    }
  }

  try {
    // Generate signed URL for the video
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: `${videoId}.mp4`,
    })

    // URL expires in 2 hours (7200 seconds)
    const expiresIn = parseInt(process.env.VIDEO_URL_EXPIRATION || '7200')
    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn })

    return res.status(200).json({
      url: signedUrl,
      expiresIn,
      videoId,
    })
  } catch (error) {
    console.error('Error generating signed URL:', error)
    return res.status(500).json({ error: 'Failed to generate video URL' })
  }
}
