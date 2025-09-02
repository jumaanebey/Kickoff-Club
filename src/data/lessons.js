export const lessons = [
  {
    id: 'scoring-90s',
    title: 'Scoring & Game Flow — 90s',
    duration: 90,
    video: '/assets/lesson-preview.mp4',
    thumb: '/assets/thumb-scoring.jpg',
    captions: '/assets/lesson-scoring.vtt',
    transcript: `0–3s: Hook - "Want to actually understand the score next time? 90 seconds — let’s go."
3–12s: What is a touchdown? - Touchdown gives 6 points...
12–28s: Score types — TD=6, XP=1 or 2, FG=3, Safety=2
... (shortened for prototype)`,
    storyboard: [
      'Hook: Title slate — "Why that touchdown mattered — 90s"',
      'Big picture: field + scoreboard graphic',
      'Score types: TD (6), PAT/XP (1), FG (3), Safety (2)',
      'Read the scoreboard: down & distance / quarter / clock',
    ],
    quiz: {
      question: 'How many points is a touchdown?',
      options: ['3', '6', '1', '2'],
      correctIndex: 1
    }
  }
]
