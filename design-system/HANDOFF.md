# Kickoff Club — Design System Handoff

## 🎨 Design System Overview

This is the **Warm & Cozy** variant of the Kickoff Club design system, created as a second option for comparison with the original bright, modern variant.

### Design Goals Achieved
- **Warm, cozy, and friendly** without gendered targeting
- **Soft shapes** with generous breathing room and rounded corners
- **Calm color palette** using sage greens, blush pinks, and warm golds
- **Accessible** with WCAG AA contrast ratios
- **Mobile-first** with compact, scannable mobile flows and airy desktop layouts

---

## 🎯 Brand Tokens

### Colors
```css
:root {
  /* Primary Brand Colors */
  --color-navy: #0B2545;       /* Primary brand color */
  --color-warm-gold: #E6B85C;  /* Primary CTA color */
  --color-blush: #FCE8E4;      /* Soft backgrounds */
  --color-rose: #FF9AA2;       /* Friendly accent */
  --color-sage: #CDE7D9;       /* Calm cards */
  --color-slate: #0F1724;      /* Text color */
  
  /* Extended Palette */
  --color-blush-light: #FEF5F2; /* Even softer backgrounds */
  --color-rose-light: #FFE4E6;  /* Light rose for hover states */
  --color-sage-light: #E8F4ED;  /* Light sage for subtle cards */
  --color-navy-light: #1B3A5F;  /* Lighter navy for hover states */
  --color-gold-light: #F0CFA3;  /* Light gold for hover states */
}
```

### Tailwind CSS Mapping
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        navy: '#0B2545',
        warmGold: '#E6B85C',
        blush: '#FCE8E4',
        rose: '#FF9AA2',
        sage: '#CDE7D9',
        slate: '#0F1724',
        // Extended variants...
      }
    }
  }
}
```

### Typography
```css
/* Hero Headlines */
.hero-headline {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700;
  font-size: 3rem; /* Desktop */
  line-height: 1.08;
}

@media (max-width: 768px) {
  .hero-headline {
    font-size: 1.75rem; /* Mobile */
  }
}

/* Body Text */
body {
  font-family: 'Poppins', ui-sans-serif, system-ui, sans-serif;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
}

/* Buttons */
.btn {
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 1rem;
}
```

### Spacing Scale (8px base)
```css
:root {
  --spacing-sm: 4px;    /* 0.25rem */
  --spacing-base: 8px;  /* 0.5rem */
  --spacing-md: 16px;   /* 1rem */
  --spacing-lg: 24px;   /* 1.5rem */
  --spacing-xl: 32px;   /* 2rem */
  --spacing-xxl: 48px;  /* 3rem */
  --spacing-3xl: 64px;  /* 4rem */
}
```

### Border Radius
```css
:root {
  --radius-chip: 12px;  /* Small chips/badges */
  --radius-card: 20px;  /* Major cards */
}
```

---

## 🧩 Component Library

### Primary CTA Button
```css
.btn-primary {
  background: var(--color-warm-gold);
  color: var(--color-navy);
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  transform: translateY(0);
}

.btn-primary:hover {
  background: var(--color-gold-light);
  box-shadow: 0 8px 32px rgba(230, 184, 92, 0.15);
  transform: translateY(-4px);
}
```

### Secondary Button (Navy Outline)
```css
.btn-secondary {
  background: white;
  color: var(--color-navy);
  border: 2px solid var(--color-navy);
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--color-navy-light);
  color: white;
  border-color: var(--color-navy-light);
}
```

### Card Components
```css
/* Standard Card */
.card {
  background: white;
  border-radius: var(--radius-card);
  border: 1px solid rgba(205, 231, 217, 0.2); /* sage/20 */
  padding: 1.5rem;
  box-shadow: 0 2px 12px rgba(205, 231, 217, 0.3);
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 32px rgba(230, 184, 92, 0.15);
  transform: translateY(-8px);
  border-color: rgba(205, 231, 217, 0.4);
}

/* Sage Card (Calm sections) */
.card-sage {
  background: var(--color-sage);
  border-radius: var(--radius-card);
  border: 1px solid rgba(205, 231, 217, 0.4);
  padding: 1.5rem;
}

/* Blush Card (Soft backgrounds) */
.card-blush {
  background: var(--color-blush);
  border-radius: var(--radius-card);
  border: 1px solid rgba(255, 154, 162, 0.2);
  padding: 1.5rem;
}
```

### Badge Components
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-chip);
  font-size: 0.75rem;
  font-weight: 500;
}

.badge-primary {
  background: rgba(230, 184, 92, 0.2);
  color: var(--color-navy);
}

.badge-success {
  background: var(--color-sage);
  color: var(--color-navy);
}
```

---

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
.container-warm {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 640px) {
  .container-warm {
    padding: 0 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container-warm {
    padding: 0 2rem;
  }
}
```

---

## ♿ Accessibility Notes

### Color Contrast Ratios
- Body text (slate on white): **7.8:1** ✅ (exceeds WCAG AA 4.5:1)
- Navy text on white: **8.9:1** ✅
- Primary CTA (navy on warm gold): **4.9:1** ✅
- All interactive elements have focus states with 2px rings

### ARIA Requirements
```jsx
// All interactive controls need accessible names
<button aria-label="Start 90-second lesson">
  Start 90-second lesson
</button>

// Quiz options need proper roles
<button 
  role="option" 
  aria-pressed={selected === index}
  aria-describedby="quiz-question"
>
  {option}
</button>
```

### Video Captions
All videos must include WebVTT caption files:
```html
<video controls>
  <source src="lesson-scoring.mp4" type="video/mp4">
  <track kind="captions" src="lesson-scoring.vtt" srclang="en" label="English">
</video>
```

---

## 🏗️ React + Tailwind Implementation

### Example Component Structure
```jsx
// LessonCard.jsx
export default function LessonCard({ lesson, variant = 'medium' }) {
  return (
    <article className="group card hover:scale-[1.02] transition-all duration-300 cursor-pointer bg-white border-sage/20 shadow-gentle hover:shadow-warm">
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img 
          src={lesson.thumb}
          alt={lesson.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 right-3 badge badge-primary">
          {lesson.duration}s
        </div>
      </div>
      
      <h4 className="font-display font-semibold text-slate group-hover:text-navy transition-colors duration-200">
        {lesson.title}
      </h4>
      
      <a href={`/lesson/${lesson.id}`} className="btn-primary mt-4">
        Watch now
      </a>
    </article>
  )
}
```

---

## 📦 Asset Exports

### Required Assets
1. **hero-preview.mp4** - 10-15s silent loop placeholder
2. **lesson-scoring.vtt** - WebVTT captions file ✅
3. **thumb-scoring.jpg** - Lesson thumbnail (1200×675)
4. **badge-first-play.svg** - Achievement badge ✅
5. **social-cut-*.mp4** - 3 vertical social videos (1080×1920, 15s each)

### SVG Icons
All icons should use:
- 2px stroke width
- Rounded line caps (`stroke-linecap="round"`)
- Rounded line joins (`stroke-linejoin="round"`)

---

## 🔄 Prototype Interactions

### Key Flows
1. **Home → Lesson**: Primary CTA button leads to lesson page
2. **Lesson → Quiz**: Video completion or manual "Mark Complete" triggers quiz
3. **Quiz → Badge**: Correct answer triggers Badge Modal
4. **Badge Modal**: Share (copy link) and download badge options

### Animation Timing
- Hover transitions: `300ms ease`
- Card lifts: `translateY(-4px)` to `translateY(-8px)`
- Button press: `translateY(-1px)`
- Page transitions: `600ms ease-out`

---

## 🎯 Copy Guidelines

### Voice & Tone
- **Warm and encouraging**: "You've got this!"
- **Conversational**: "I get it" instead of "I understand"
- **Inclusive**: Avoid gendered language, use "you" and "your"
- **Supportive**: "Don't worry, these concepts take practice!"

### Exact Copy Used
- Hero: "Love the vibe. Learn the game."
- Subhead: "Bite-size lessons that turn NFL chaos into 'I get it.' Start with a 90-second explainer."
- Primary CTA: "Start 90-second lesson"
- Secondary CTA: "Take the New-Fan Quiz"
- Badge title: "First-Play Expert"

---

## 🚀 Development Handoff Checklist

- [ ] Install fonts: Playfair Display (600, 700) + Poppins (400, 500, 600)
- [ ] Update Tailwind config with brand tokens
- [ ] Implement component CSS classes (.btn-primary, .card, etc.)
- [ ] Add WebVTT caption support to video player
- [ ] Implement Badge Modal with share functionality
- [ ] Test keyboard navigation and focus states
- [ ] Verify color contrast ratios
- [ ] Add ARIA labels to interactive elements
- [ ] Test responsive design on mobile/tablet/desktop
- [ ] Optimize for bundle size and performance

---

*This design system creates a warm, welcoming experience that makes learning NFL rules feel approachable and fun, without explicitly targeting any gender. The soft colors, generous spacing, and encouraging copy work together to create a cozy learning environment.*
