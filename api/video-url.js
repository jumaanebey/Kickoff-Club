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

  const { videoId, hasPurchased } = req.query

  // Validate videoId
  if (!videoId) {
    return res.status(400).json({ error: 'Video ID is required' })
  }

  // Check if lesson is premium and user hasn't purchased
  const isPremium = !FREE_LESSONS.includes(videoId)
  const userHasPurchased = hasPurchased === 'true'

  if (isPremium && !userHasPurchased) {
    return res.status(403).json({ error: 'Premium access required' })
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
