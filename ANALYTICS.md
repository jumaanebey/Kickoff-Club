# Google Analytics 4 Setup

Kickoff Club uses Google Analytics 4 (GA4) to track user interactions and improve the learning experience.

## Setup Instructions

### 1. Create a Google Analytics 4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (gear icon in bottom left)
3. Under **Account**, select your account or create a new one
4. Under **Property**, click **Create Property**
5. Follow the setup wizard:
   - Enter property name: "Kickoff Club"
   - Select timezone and currency
   - Click **Next**
6. Fill in business details and click **Create**
7. Accept the Terms of Service

### 2. Get Your Measurement ID

1. In your new property, go to **Admin** > **Data Streams**
2. Click **Add stream** > **Web**
3. Enter your website URL
4. Click **Create stream**
5. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)

### 3. Configure Your Environment

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your Measurement ID:
   ```
   VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. For production (Vercel), add the environment variable:
   - Go to your Vercel project settings
   - Navigate to **Environment Variables**
   - Add: `VITE_GA4_MEASUREMENT_ID` with your Measurement ID
   - Deploy to apply changes

### 4. Verify It's Working

1. Start your dev server:
   ```bash
   npm run dev
   ```

2. Open your browser's Developer Console and check for:
   ```
   [ANALYTICS] page_view {page: 'home', userType: 'new', ...}
   ```

3. Go to Google Analytics:
   - Navigate to **Reports** > **Realtime**
   - You should see your activity in real-time!

## Events Being Tracked

The following events are automatically tracked:

### Navigation Events
- `page_view` - When users navigate between pages
- `navigation` - Custom navigation tracking with source/destination

### Learning Events
- `lesson_completed` - When a user completes a lesson quiz (75%+)
- `lesson_viewed` - When a user watches a video to completion
- `lesson_read` - When a user reads an article to completion
- `quiz_passed` - When a user passes a quiz
- `quiz_failed` - When a user fails a quiz

### Engagement Events
- `lessons_navigation` - Performance tracking for lesson navigation
- `badge_earned` - When a user earns a new badge
- `level_up` - When a user advances to a new level

## Event Parameters

Each event includes relevant parameters:

```javascript
trackEvent('lesson_completed', {
  lessonId: 'how-downs-work',
  score: 75,
  attempts: 1,
  timeSpent: 120
})
```

## Custom Events

To track custom events in your code:

```javascript
import { trackEvent } from './analytics'

// Track any event
trackEvent('button_clicked', {
  buttonName: 'start_learning',
  location: 'hero'
})

// Track page views
import { trackPageView } from './analytics'
trackPageView('/platform', 'Learning Platform')

// Set user properties
import { setUserProperties } from './analytics'
setUserProperties({
  user_level: 'intermediate',
  lessons_completed: 5
})
```

## Privacy & GDPR Compliance

- GA4 is configured with `cookie_flags: 'SameSite=None;Secure'`
- No personally identifiable information (PII) is sent
- Users can opt-out using browser settings or extensions
- Consider adding a cookie consent banner for GDPR compliance

## Testing in Development

In development mode:
- All events are logged to the browser console
- Events are still sent to GA4 if configured
- Use GA4's **DebugView** for detailed event inspection:
  1. Go to **Admin** > **DebugView**
  2. Install the [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/) extension
  3. Enable the extension and reload your site

## Production Deployment

The GA4 integration is production-ready:
- ✅ Gracefully handles missing measurement ID
- ✅ Errors are caught and logged (dev only)
- ✅ Works with Vercel environment variables
- ✅ Async script loading for performance
- ✅ Compatible with other analytics tools via dataLayer

## Troubleshooting

**Events not showing up in GA4?**
- Check that your Measurement ID is correct in `.env`
- Verify the script is loading in Network tab
- Check browser console for `[ANALYTICS]` messages
- Wait 24-48 hours for GA4 to start processing data
- Use **DebugView** for real-time debugging

**"import.meta.env is undefined" error?**
- Make sure you're using Vite's environment variables format
- Restart your dev server after changing `.env`

**GA4 shows 0 users?**
- GA4 takes time to process data (up to 24 hours)
- Use **Realtime** reports to see immediate activity
- Check that events are being sent in browser console

## Resources

- [GA4 Documentation](https://support.google.com/analytics/answer/10089681)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
