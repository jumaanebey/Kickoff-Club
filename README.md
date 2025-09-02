# Kickoff Club — Prototype

## Run locally
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:5173`

## What this prototype includes
- Homepage, lesson player, quiz, mock purchase flow, analytics stubs, email templates, social scripts, captions (.vtt).

## TODOs for production
- Replace placeholder video and images.
- Integrate SendGrid/Postmark for emails.
- Integrate Stripe for payments (v1.1).
- Replace analytics.js with GA4/Posthog and wire dashboard.

## QA checklist (run after scaffold)
- [ ] `npm install` completes without errors.
- [ ] `npm run dev` opens app and homepage loads.
- [ ] Click Start 90s → Lesson loads + video controls present + captions loaded.
- [ ] Submit the quiz: correct answer triggers badge + console `quiz_passed` event.
- [ ] Click Buy Crash Course: mock purchase flow completes + `course_purchased` logged.
- [ ] Email templates exist in `/content/emails`.
- [ ] `window.dataLayer` pushes visible for key events in console.
