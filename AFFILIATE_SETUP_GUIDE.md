# Affiliate Links Setup Guide

## Quick Start (30 minutes)

This guide shows you how to add affiliate links to Kickoff Club and start earning commission from recommendations.

---

## Step 1: Join Affiliate Programs

### Amazon Associates (Start Here)
**Best for:** Books, equipment, jerseys, DVDs

1. Go to https://affiliate-program.amazon.com/
2. Click "Sign Up" (free)
3. Enter your website: `kickoff-club-v2.vercel.app`
4. Fill out tax information
5. Get your **Affiliate ID** (looks like: `kickoffclub-20`)

**How to Create Links:**
- Find any product on Amazon
- Click "Get Link" under product
- Use the short link with your tag

**Example:**
```
https://www.amazon.com/dp/B00005JNOG?tag=kickoffclub-20
```

---

### Fanatics (Sports Gear)
**Best for:** Team jerseys, hats, fan gear

1. Go to https://www.fanatics.com/affiliates
2. Apply (usually approved in 1-2 days)
3. Access your affiliate dashboard
4. Generate links for any product

**Commission:** 5-8% per sale

---

### ESPN+ / Streaming
**Best for:** "Where to watch" recommendations

1. Search "ESPN+ affiliate program"
2. Apply through their network (usually Rakuten Advertising)
3. Get approved
4. Create links to subscription page

**Commission:** $5-15 per signup

---

### StubHub (Game Tickets)
**Best for:** "Attend a game" recommendations

1. https://www.stubhub.com/affiliates
2. Apply through Impact Radius
3. Commission on ticket sales

---

## Step 2: Add Links to Your Site

### Option A: In Lesson Content (Easiest)

Edit your lesson files in `/src/data/lessons/`:

**Before:**
```javascript
content: "Want to learn more? Check out this book..."
```

**After:**
```javascript
content: "Want to learn more? Check out <a href='https://amazon.com/...?tag=kickoffclub-20' target='_blank' rel='nofollow'>Football for Dummies</a>..."
```

---

### Option B: Use the AffiliateLink Component (Better)

I've created `/src/components/AffiliateLink.jsx` for you.

**Usage in lessons:**

```jsx
import AffiliateLink from './AffiliateLink'

// Inline link
<AffiliateLink
  href="https://amazon.com/...?tag=kickoffclub-20"
  platform="Amazon"
>
  Football for Dummies
</AffiliateLink>

// Button style
<AffiliateLink
  href="https://nfl.com/gamepass"
  platform="NFL"
  type="button"
>
  Try NFL Game Pass
</AffiliateLink>

// Card style (product recommendation)
<AffiliateLink
  href="https://fanatics.com/..."
  platform="Fanatics"
  type="card"
  description="Show your team pride with authentic gear"
  imageUrl="/images/jersey.jpg"
>
  Official NFL Jersey
</AffiliateLink>
```

---

### Option C: Add Resources Section (Recommended)

Add the `RecommendedResources` component to your platform:

**In `/src/components/SimplePlatform.jsx`:**

```jsx
import RecommendedResources from './RecommendedResources'

// Add after the lessons section (around line 800):
<RecommendedResources />
```

Then edit `/src/components/RecommendedResources.jsx` to add your affiliate links:

```javascript
const resources = [
  {
    title: 'NFL Game Pass',
    url: 'YOUR_AFFILIATE_LINK_HERE', // Replace this
    platform: 'NFL',
    description: 'Watch full game replays...',
  },
  // Add more...
]
```

---

## Step 3: Add Disclosure (REQUIRED by FTC)

### Update Privacy Policy

Create or edit `/src/pages/Privacy.jsx`:

```jsx
## Affiliate Disclosure

Kickoff Club participates in affiliate marketing programs.
This means we may earn a commission when you click on certain
links and make a purchase, at no additional cost to you.

We only recommend products and services we genuinely believe
will help you learn football. Your trust is important to us.
```

### Add Footer Disclosure

In your footer component:

```jsx
<p className="text-xs text-secondary-500">
  Some links are affiliate links. We may earn a commission
  from purchases at no extra cost to you.
</p>
```

---

## Step 4: Where to Add Affiliate Links

### High-Converting Placements:

**1. End of Lessons**
```
"Congratulations! Want to dive deeper?
Check out [this book on Amazon]..."
```

**2. Resource Recommendations**
```
"To watch full games and study plays,
try [NFL Game Pass]..."
```

**3. Quiz Results**
```
"Great score! Ready for live football?
[Get tickets on StubHub]..."
```

**4. Email Follow-ups**
```
"Here's the book I mentioned: [link]"
```

---

## Step 5: Track Your Earnings

### Amazon Associates Dashboard
- Login: https://affiliate-program.amazon.com/
- Check: Clicks, conversions, earnings
- Payments: Monthly (minimum $10)

### Google Analytics (Optional)
Add event tracking to see which links get clicked:

```javascript
// Already included in AffiliateLink component
gtag('event', 'affiliate_click', {
  platform: 'Amazon',
  link_text: 'Football for Dummies'
})
```

---

## Best Practices

### ✅ DO:
- Only recommend products you genuinely believe in
- Always disclose affiliate relationships
- Use relevant products (football-related)
- Test links before publishing
- Update broken links regularly
- Track what converts best

### ❌ DON'T:
- Spam links everywhere
- Recommend products you haven't researched
- Hide affiliate disclosures
- Use misleading link text
- Over-promise product benefits

---

## Example Recommendations by Lesson

### Lesson 1: "Quarterback 101"
- Book: "The QB: The Making of Modern Quarterbacks"
- Streaming: NFL Game Pass (watch QB techniques)
- Gear: Official NFL football

### Lesson 2: "Understanding Downs"
- Book: "Football for Dummies"
- App: NFL Mobile App (free, watch plays)

### Lesson 3: "Reading the Field"
- Streaming: ESPN+ (watch analysis)
- Book: "Take Your Eye Off the Ball"

### Lesson 7: "Game Day Guide"
- Tickets: StubHub affiliate link
- Gear: Team jersey from Fanatics
- Food: Amazon tailgate supplies

---

## Quick Implementation Checklist

- [ ] Sign up for Amazon Associates
- [ ] Get your Amazon affiliate tag
- [ ] Test an affiliate link (buy something yourself to verify)
- [ ] Add disclosure to footer
- [ ] Add 3-5 product recommendations to RecommendedResources.jsx
- [ ] Add inline affiliate links to 2-3 lessons
- [ ] Create privacy policy page with affiliate disclosure
- [ ] Track clicks in first week
- [ ] Adjust based on what works

---

## Expected Earnings

**Conservative Estimates:**

- **100 students** × 10% click rate × 5% conversion × $20 average = **$10/month**
- **500 students** × 10% click rate × 5% conversion × $20 average = **$50/month**
- **1000 students** × 10% click rate × 5% conversion × $20 average = **$100/month**

**Best performing:**
- Amazon books: 2-5% conversion
- Streaming services: 5-10% conversion
- Game tickets: 1-3% conversion
- Team gear: 3-7% conversion

---

## Need Help?

**Amazon Associates Help:**
https://affiliate-program.amazon.com/help

**FTC Guidelines:**
https://www.ftc.gov/business-guidance/resources/disclosures-101-social-media-influencers

**Questions?**
Feel free to ask me to implement any of these options!

---

## Quick Start Code

Want me to set this up for you right now? I can:

1. ✅ Add RecommendedResources component to platform
2. ✅ Create affiliate link component (already done!)
3. ⬜ Add footer disclosure
4. ⬜ Create privacy policy page
5. ⬜ Add 5 example product recommendations

Just say "Set up affiliate links" and I'll do it all!
