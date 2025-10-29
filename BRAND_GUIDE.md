# Kickoff Club - Brand Style Guide

## 🎨 Brand Identity

### Mission
Make football accessible and fun for complete beginners. No gatekeeping, no judgment—just simple, bite-sized lessons that make sense.

### Brand Voice
- **Friendly**: Like explaining to a friend, not lecturing
- **Encouraging**: Celebrate progress, never condescending
- **Clear**: Simple language, no unnecessary jargon
- **Fun**: Use emojis, casual tone, relatable examples
- **Inclusive**: Everyone's welcome, no silly questions

### Tagline
"Love the vibe. Learn the game."

---

## 🎨 Logo

### Primary Logo
- **File**: `/public/logo.svg`
- **Usage**: Website header, social profiles, marketing
- **Minimum size**: 120px width
- **Clear space**: 20px around logo

### Logo with Text
- **File**: `/public/logo-text.svg`
- **Usage**: Hero sections, presentations, letterhead
- **Minimum size**: 200px width

### Favicon
- **File**: `/public/favicon.svg`
- **Usage**: Browser tab icon
- **Size**: 32x32px

---

## 🎨 Color Palette

### Primary Colors

**Sage Green** - Fresh & Approachable
- HEX: `#cde7d9`
- RGB: `205, 231, 217`
- Usage: Backgrounds, accents, success states

**Navy** - Professional & Trustworthy
- HEX: `#0b2545`
- RGB: `11, 37, 69`
- Usage: Headers, text, primary buttons

**Warm Gold** - Energetic & Premium
- HEX: `#e6b85c`
- RGB: `230, 184, 92`
- Usage: CTAs, highlights, badges

### Secondary Colors

**Blush** - Friendly & Welcoming
- HEX: `#fce8e4`
- RGB: `252, 232, 228`
- Usage: Soft backgrounds, hover states

**Rose** - Playful & Fun
- HEX: `#ff9aa2`
- RGB: `255, 154, 162`
- Usage: Accents, notifications, badges

### Usage Guidelines

**Do:**
- Use Navy for main text
- Use Sage for positive/success elements
- Use Warm Gold sparingly for important CTAs
- Maintain 4.5:1 contrast ratio for accessibility

**Don't:**
- Use pure black (#000000) - use Navy instead
- Mix more than 3 brand colors in one component
- Use colors at less than 20% opacity

---

## 📝 Typography

### Font Family
**Inter** - Modern, highly readable, web-optimized
- Sans-serif
- Variable font (300-700 weights)
- Excellent at small sizes
- Great for UI/UX

### Font Sizes

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Hero Heading | 48-60px | 800 | 1.1 |
| H1 | 36-48px | 700 | 1.2 |
| H2 | 30-36px | 700 | 1.3 |
| H3 | 24-30px | 600 | 1.4 |
| Body | 16-18px | 400 | 1.6 |
| Small | 14px | 400 | 1.5 |
| Tiny | 12px | 500 | 1.4 |

### Typography Rules

**Do:**
- Use bold (600-700) for headings
- Use regular (400) for body text
- Use medium (500) for labels/buttons
- Maintain 1.5-1.6 line height for readability

**Don't:**
- Use thin weights (below 300)
- Use all caps for long text
- Stack more than 3 heading levels
- Use italic except for emphasis

---

## 🖼️ Imagery Style

### Photography
- **Tone**: Candid, natural, diverse
- **Subject**: Real people enjoying football
- **Avoid**: Stock photos that look staged
- **Style**: Bright, slightly warm color grading

### Icons
- **Style**: Rounded, friendly, minimal
- **Weight**: 2px stroke
- **Size**: 24x24px base (scale up proportionally)
- **Color**: Match context (Navy for dark, White for colored backgrounds)

### Illustrations
- **Style**: Simple, flat, geometric
- **Colors**: Use brand palette only
- **Mood**: Playful but not childish
- **Usage**: Empty states, onboarding, marketing

---

## 🎯 UI Components

### Buttons

**Primary Button**
```css
background: Navy (#0b2545)
color: White
padding: 12px 24px
border-radius: 12px
font-weight: 600
```

**Secondary Button**
```css
background: Sage (#cde7d9)
color: Navy (#0b2545)
padding: 12px 24px
border-radius: 12px
font-weight: 600
```

**CTA Button**
```css
background: Warm Gold (#e6b85c)
color: Navy (#0b2545)
padding: 16px 32px
border-radius: 12px
font-weight: 700
```

### Cards
```css
background: White
border: 1px solid Sage-200
border-radius: 16px
padding: 24px
shadow: 0 2px 8px rgba(11, 37, 69, 0.08)
```

### Badges
```css
background: Blush (#fce8e4)
color: Rose (#ff9aa2)
padding: 4px 12px
border-radius: 20px
font-size: 12px
font-weight: 600
```

---

## 📱 Social Media

### Profile Picture
- Use logo.svg
- 400x400px minimum
- PNG format with transparent background

### Cover Photos

**Facebook**: 820x312px
**Twitter/X**: 1500x500px
**LinkedIn**: 1584x396px

### Post Graphics

**Instagram Square**: 1080x1080px
**Instagram Story**: 1080x1920px
**Twitter/X**: 1200x675px

**Template Style:**
- Navy background
- Logo in top-left
- Headline in white, 48-60px
- Accent color for highlights
- CTA in bottom-right

---

## ✍️ Writing Style

### Tone Examples

**❌ Don't Say:**
"In American football, the offensive unit attempts to advance the pigskin..."

**✅ Do Say:**
"The offense tries to move the ball down the field..."

**❌ Don't Say:**
"Utilize our comprehensive educational modules to master..."

**✅ Do Say:**
"Use our bite-sized lessons to learn..."

### Vocabulary

**Use:**
- Learn (not "master" or "study")
- Simple (not "easy" - respects the challenge)
- Fun (not "entertaining" - too formal)
- You'll (contractions feel friendly)
- Let's (inclusive, team feeling)

**Avoid:**
- Jargon without explanation
- Overly technical terms
- Corporate speak
- Condescending phrases

---

## 🏈 Football-Specific Guidelines

### Terminology
- **First use**: Explain in plain English
- **Subsequent uses**: Use correct term
- **Example**: "The quarterback (QB) is like the team's leader..."

### Emojis
Use sparingly and meaningfully:
- 🏈 Football/game references
- ✨ Achievements/success
- 📖 Reading/learning
- 🎥 Videos
- ⚡ Quick/exciting
- 🎯 Goals/objectives

---

## 📄 Document Templates

### Email Signature
```
Jumaane Bey
Founder, Kickoff Club
Love the vibe. Learn the game.

🏈 kickoff-club-v2.vercel.app
📧 hello@kickoffclub.com
```

### Business Card (Standard 3.5" x 2")

**Front:**
- Logo (top-left)
- "Kickoff Club" (center, Navy, bold)
- "Master Football Fundamentals" (below, smaller)
- Website (bottom)

**Back:**
- Sage background
- "3 Free Lessons"
- "$24 for All 10"
- "Lifetime Access"
- QR code to website

---

## ✅ Brand Checklist

Before publishing any material, check:

- [ ] Uses approved colors only
- [ ] Inter font throughout
- [ ] Logo has proper clear space
- [ ] Contrast ratio meets WCAG AA (4.5:1)
- [ ] Tone is friendly and encouraging
- [ ] No jargon without explanation
- [ ] Mobile-responsive (if digital)
- [ ] Includes CTA
- [ ] Brand voice consistent

---

## 🚫 What Not to Do

**Never:**
- Use Comic Sans or other playful fonts
- Make jokes about people not knowing football
- Use aggressive sports clichés
- Show only one type of person
- Use red/green together (accessibility)
- Stretch or distort the logo
- Use unapproved color combinations

**Always:**
- Welcome everyone
- Explain clearly
- Celebrate progress
- Show diversity
- Maintain professionalism
- Test for accessibility

---

## 📞 Questions?

For brand usage questions or custom assets:
- Email: hello@kickoffclub.com
- Review this guide before starting
- When in doubt, keep it simple

**Last Updated**: October 2025
**Version**: 1.0
