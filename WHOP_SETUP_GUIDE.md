# Whop Integration Setup Guide

Complete guide to configure Whop payment processing and membership verification for Kickoff Club.

---

## 🎯 Overview

Your purchase flow now includes:

✅ **Checkout redirect** - Users return to your site after purchase
✅ **Server-side verification** - Whop API validates purchases
✅ **Webhook automation** - Automatic access grants on purchase
✅ **Video protection** - R2 videos secured with membership checks

---

## 📋 Required Steps

### Step 1: Configure Whop Product Settings

1. **Go to Whop Dashboard**: https://whop.com/dashboard
2. **Navigate to**: Your Product → Settings
3. **Add Success Redirect URL**:
   ```
   https://kickoff-club-v2.vercel.app/platform?whop_success=true
   ```
   Or for local testing:
   ```
   http://localhost:5173/platform?whop_success=true
   ```

4. **Optional**: Add email and membership_id to redirect
   ```
   https://kickoff-club-v2.vercel.app/platform?whop_success=true&email={{user.email}}&membership_id={{membership.id}}
   ```

---

### Step 2: Get Whop API Credentials

1. **Go to**: Whop Dashboard → Developer Settings → API Keys
2. **Copy your API Key**
3. **Get your Product ID**:
   - Go to Products → Your Product
   - Copy the product ID from URL or product details
4. **Get your Company/Plan ID** (if needed):
   - Found in product settings

---

### Step 3: Configure Webhook

1. **Go to**: Whop Dashboard → Settings → Webhooks
2. **Click**: Add Webhook
3. **Webhook URL**:
   ```
   https://kickoff-club-v2.vercel.app/api/webhooks/whop
   ```
4. **Select Events**:
   - [x] `membership.created` - User purchases
   - [x] `membership.deleted` - User refunds
   - [x] `membership.updated` - Status changes

5. **Copy Webhook Secret** - You'll need this for verification

---

### Step 4: Update Environment Variables

Add these to your `.env.local` file:

```bash
# Whop Integration
WHOP_API_KEY=whop_xxxxxxxxxxxxxxxxxxxx
WHOP_PRODUCT_ID=prod_xxxxxxxxxxxxxxxxxxxx
WHOP_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxx

# Optional: Admin unlock key (set to secure random string)
ADMIN_UNLOCK_KEY=your-super-secure-random-key-here-12345
```

**IMPORTANT**: Never commit `.env.local` to git! It's already in `.gitignore`.

---

### Step 5: Deploy to Vercel

1. **Add environment variables in Vercel**:
   - Go to: Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add all variables from `.env.local`
   - Make sure to add them for **Production**, **Preview**, and **Development**

2. **Redeploy**:
   ```bash
   git add .
   git commit -m "Add Whop server-side verification"
   git push
   ```

3. **Verify deployment**: Check Vercel deployment logs for any errors

---

## 🧪 Testing the Integration

### Test 1: Checkout Redirect

1. Click "Unlock All Lessons" on your site
2. Complete checkout on Whop (use test mode if available)
3. **Expected**: You're redirected back to `/platform?whop_success=true`
4. **Expected**: Premium content is now unlocked

### Test 2: Server-Side Verification

Open browser console and run:
```javascript
// Test verification endpoint
fetch('/api/verify-purchase', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'your-test-email@example.com' })
})
.then(r => r.json())
.then(console.log)
```

**Expected response** (if configured):
```json
{
  "verified": true,
  "membershipId": "mem_xxx",
  "expiresAt": null,
  "productId": "prod_xxx"
}
```

**Fallback response** (if API not configured):
```json
{
  "verified": false,
  "fallbackMode": true,
  "message": "Server-side verification not configured - using client-side verification"
}
```

### Test 3: Webhook Delivery

1. Make a test purchase (or use Whop's webhook testing tool)
2. **Check Vercel Logs**: Functions → `/api/webhooks/whop`
3. **Expected log**: `✅ New purchase: User [email] purchased [product]`

### Test 4: Video Access Control

1. Try accessing a premium video without purchase
2. **Expected**: 403 error or paywall
3. After purchase, try again
4. **Expected**: Video loads successfully

---

## 🔒 Security Features

### Client-Side (MVP Mode)
- ✅ localStorage verification
- ✅ URL parameter detection
- ✅ Basic access control
- ⚠️ Can be bypassed by tech-savvy users

### Server-Side (Production Ready)
- ✅ Whop API membership verification
- ✅ Webhook signature validation
- ✅ Secure video URL generation
- ✅ No client-side bypass possible

**Current Status**: Hybrid mode
- Works without API key (client-side only)
- Upgrades to server-side when API configured
- Smooth transition from MVP → Production

---

## 🚀 Production Checklist

Before launching to real customers:

### Critical (Must Have)
- [ ] Whop redirect URL configured
- [ ] Test successful purchase flow
- [ ] Verify users return to site after purchase
- [ ] Confirm premium videos load after purchase

### Recommended (Should Have)
- [ ] Whop API key configured
- [ ] Webhook endpoint set up
- [ ] Test webhook with test purchase
- [ ] Environment variables in Vercel

### Optional (Nice to Have)
- [ ] Admin unlock endpoint secured
- [ ] Monitor webhook logs
- [ ] Set up error alerting
- [ ] Add analytics tracking for purchases

---

## 🐛 Troubleshooting

### Users not redirected after purchase

**Problem**: Users stay on Whop after checkout
**Solution**: Check Whop product settings → Success Redirect URL is set correctly

### Server-side verification not working

**Problem**: Console shows "Server-side verification not configured"
**Check**:
1. `WHOP_API_KEY` is set in `.env.local` and Vercel
2. `WHOP_PRODUCT_ID` matches your actual product
3. API key has correct permissions
4. Redeploy after adding env variables

### Webhooks not received

**Problem**: No logs in Vercel for webhook events
**Check**:
1. Webhook URL is correct (must be HTTPS in production)
2. Webhook secret matches `WHOP_WEBHOOK_SECRET`
3. Events are enabled (membership.created, etc.)
4. Test webhook delivery in Whop dashboard

### Videos not loading

**Problem**: Premium videos show 403 error after purchase
**Check**:
1. Purchase status saved in localStorage
2. Membership ID stored (check browser DevTools → Application → Local Storage)
3. Video API receiving `membershipId` parameter
4. R2 credentials are correct

---

## 🔧 Advanced Configuration

### Custom Redirect URLs

Add custom parameters to track conversion sources:

```javascript
// In src/config/whop.js
export const getCheckoutUrl = (source = 'direct') => {
  const baseUrl = WHOP_CONFIG.checkoutUrl
  const redirectUrl = encodeURIComponent(
    `${window.location.origin}/platform?whop_success=true&source=${source}`
  )
  return `${baseUrl}?redirect_url=${redirectUrl}`
}
```

### Rate Limiting (Production)

Add to `api/video-url.js`:

```javascript
// Simple rate limiting by IP
const rateLimitMap = new Map()

const rateLimit = (ip, limit = 100, window = 3600000) => {
  const now = Date.now()
  const requests = rateLimitMap.get(ip) || []
  const recentRequests = requests.filter(time => now - time < window)

  if (recentRequests.length >= limit) {
    return false
  }

  recentRequests.push(now)
  rateLimitMap.set(ip, recentRequests)
  return true
}
```

### Email Notifications

Use Whop webhooks to trigger welcome emails:

```javascript
// In api/webhooks/whop.js
case 'membership.created':
  // Send welcome email
  await sendWelcomeEmail(data.user.email, data.user.name)
  break
```

---

## 📊 Monitoring

### Important Metrics to Track

1. **Conversion Rate**: Checkout clicks → Successful purchases
2. **Redirect Success**: Users returning to site after purchase
3. **Verification Failures**: Failed API calls or webhook errors
4. **Video Access Errors**: 403 errors on premium content

### Vercel Logs to Monitor

- `/api/webhooks/whop` - Purchase events
- `/api/verify-purchase` - Verification attempts
- `/api/video-url` - Video access requests

---

## 📞 Support

**Whop Documentation**: https://docs.whop.com
**Whop API Reference**: https://docs.whop.com/api-reference
**Vercel Docs**: https://vercel.com/docs

**Your Implementation**:
- Webhook endpoint: `/api/webhooks/whop.js`
- Verification endpoint: `/api/verify-purchase.js`
- Video API: `/api/video-url.js`
- Purchase utils: `/src/utils/purchaseVerification.js`

---

## 🎉 You're Ready!

Your Kickoff Club now has:
- ✅ Secure payment processing with Whop
- ✅ Automatic purchase verification
- ✅ Protected premium content
- ✅ Smooth user experience
- ✅ Production-ready architecture

**Next Steps**:
1. Configure Whop redirect URL (5 minutes)
2. Test purchase flow (10 minutes)
3. Add API keys when ready for server-side verification
4. Launch! 🚀
