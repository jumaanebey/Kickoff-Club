// Comprehensive Pro Football Knowledge Assessment Test
// Adaptive test that adjusts difficulty based on user responses

export const assessmentCategories = {
  'basic-rules': {
    name: 'Basic Rules & Gameplay',
    description: 'Fundamental pro football rules and how the game works',
    icon: '📋',
    weight: 0.3
  },
  'positions': {
    name: 'Player Positions',
    description: 'Understanding what each position does',
    icon: '👥',
    weight: 0.25
  },
  'strategy': {
    name: 'Game Strategy',
    description: 'Strategic concepts and decision making',
    icon: '🧠',
    weight: 0.25
  },
  'advanced': {
    name: 'Advanced Concepts',
    description: 'Complex rules, situations, and analysis',
    icon: '⚡',
    weight: 0.2
  }
}

export const assessmentQuestions = {
  // BASIC RULES - Easy Level
  'basic-easy-1': {
    id: 'basic-easy-1',
    category: 'basic-rules',
    difficulty: 'easy',
    question: 'How many downs does a team get to advance the ball 10 yards?',
    options: ['3 downs', '4 downs', '5 downs', '6 downs'],
    correct: 1,
    explanation: 'A team gets 4 downs (attempts) to advance the ball at least 10 yards to earn a new set of downs.',
    points: 5,
    concepts: ['downs', 'first-down', 'basic-rules']
  },
  'basic-easy-2': {
    id: 'basic-easy-2',
    category: 'basic-rules',
    difficulty: 'easy',
    question: 'How many points is a touchdown worth?',
    options: ['3 points', '6 points', '7 points', '8 points'],
    correct: 1,
    explanation: 'A touchdown is worth 6 points. Teams can then attempt an extra point (1 point) or two-point conversion (2 points).',
    points: 5,
    concepts: ['touchdown', 'scoring', 'points']
  },
  'basic-easy-3': {
    id: 'basic-easy-3',
    category: 'basic-rules',
    difficulty: 'easy',
    question: 'How long is a pro football field from goal line to goal line?',
    options: ['80 yards', '100 yards', '110 yards', '120 yards'],
    correct: 1,
    explanation: 'A pro football field is 100 yards long from goal line to goal line, with 10-yard end zones on each end.',
    points: 5,
    concepts: ['field', 'dimensions', 'goal-line']
  },

  // BASIC RULES - Medium Level
  'basic-med-1': {
    id: 'basic-med-1',
    category: 'basic-rules',
    difficulty: 'medium',
    question: 'What happens if a team fails to gain 10 yards in 4 downs?',
    options: [
      'They get 2 more downs',
      'The other team gets the ball where the play ended',
      'They must punt the ball',
      'The game stops for a timeout'
    ],
    correct: 1,
    explanation: 'If a team fails to gain 10 yards in 4 downs, they turn the ball over to the other team at the spot where the last play ended.',
    points: 8,
    concepts: ['turnover-on-downs', 'possession-change']
  },
  'basic-med-2': {
    id: 'basic-med-2',
    category: 'basic-rules',
    difficulty: 'medium',
    question: 'What is the difference between a safety and a touchback?',
    options: [
      'No difference, same thing',
      'Safety = 2 points for defense, Touchback = ball at 25-yard line',
      'Safety = fumble, Touchback = interception',
      'Safety = injury timeout, Touchback = punt return'
    ],
    correct: 1,
    explanation: 'A safety gives 2 points to the defense when offense is tackled in their own end zone. A touchback brings the ball out to the 25-yard line.',
    points: 8,
    concepts: ['safety', 'touchback', 'end-zone', 'scoring']
  },

  // POSITIONS - Easy Level
  'pos-easy-1': {
    id: 'pos-easy-1',
    category: 'positions',
    difficulty: 'easy',
    question: 'Which position throws the passes?',
    options: ['Running Back', 'Wide Receiver', 'Quarterback', 'Tight End'],
    correct: 2,
    explanation: 'The quarterback is responsible for throwing passes, though occasionally other players might throw trick plays.',
    points: 5,
    concepts: ['quarterback', 'passing', 'positions']
  },
  'pos-easy-2': {
    id: 'pos-easy-2',
    category: 'positions',
    difficulty: 'easy',
    question: 'How many players are on the field for each team during a play?',
    options: ['9 players', '10 players', '11 players', '12 players'],
    correct: 2,
    explanation: 'Each team has exactly 11 players on the field during every play. Having 12+ players results in a penalty.',
    points: 5,
    concepts: ['roster', 'players-on-field', 'penalty']
  },

  // POSITIONS - Medium Level  
  'pos-med-1': {
    id: 'pos-med-1',
    category: 'positions',
    difficulty: 'medium',
    question: 'What is the main difference between a cornerback and a safety?',
    options: [
      'Cornerbacks play offense, safeties play defense',
      'Cornerbacks cover receivers closely, safeties provide deep help',
      'Cornerbacks rush the QB, safeties cover running backs',
      'No difference, they do the same job'
    ],
    correct: 1,
    explanation: 'Cornerbacks typically cover wide receivers man-to-man, while safeties provide deep coverage help and run support.',
    points: 8,
    concepts: ['cornerback', 'safety', 'coverage', 'secondary']
  },
  'pos-med-2': {
    id: 'pos-med-2',
    category: 'positions',
    difficulty: 'medium',
    question: 'Which offensive line position snaps the ball to the quarterback?',
    options: ['Left Guard', 'Center', 'Right Tackle', 'Left Tackle'],
    correct: 1,
    explanation: 'The center is responsible for snapping the ball to the quarterback and often calls out blocking assignments.',
    points: 8,
    concepts: ['center', 'offensive-line', 'snap', 'blocking']
  },

  // STRATEGY - Easy Level
  'strat-easy-1': {
    id: 'strat-easy-1',
    category: 'strategy',
    difficulty: 'easy',
    question: 'When is a team most likely to punt?',
    options: [
      'On 1st down',
      '4th down when far from the end zone',
      'After scoring a touchdown',
      'During halftime'
    ],
    correct: 1,
    explanation: 'Teams usually punt on 4th down when they are too far from the end zone to attempt a field goal and don\'t want to risk turning the ball over.',
    points: 5,
    concepts: ['punting', 'fourth-down', 'field-position']
  },

  // STRATEGY - Medium Level
  'strat-med-1': {
    id: 'strat-med-1',
    category: 'strategy',
    difficulty: 'medium',
    question: 'What is "play action" and why is it effective?',
    options: [
      'When players celebrate after scoring',
      'QB fakes a handoff then throws a pass, fooling the defense',
      'Running the same play twice in a row',
      'Using sign language to call plays'
    ],
    correct: 1,
    explanation: 'Play action involves the QB faking a handoff to freeze defenders, then throwing a pass. It works because it makes defenders think run initially.',
    points: 8,
    concepts: ['play-action', 'deception', 'passing', 'strategy']
  },
  'strat-med-2': {
    id: 'strat-med-2',
    category: 'strategy',
    difficulty: 'medium',
    question: 'Why might a team call timeout just before the opponent kicks a field goal?',
    options: [
      'They are tired and need a break',
      'To "ice" the kicker and make them nervous',
      'They want to substitute players',
      'The play clock is running out'
    ],
    correct: 1,
    explanation: 'Teams call timeout to "ice" the kicker - making them wait longer and potentially become more nervous about the kick.',
    points: 8,
    concepts: ['icing-kicker', 'timeout', 'psychology', 'special-teams']
  },

  // ADVANCED - Hard Level
  'adv-hard-1': {
    id: 'adv-hard-1',
    category: 'advanced',
    difficulty: 'hard',
    question: 'In what situation can a team score on a conversion attempt and have it count as 1 point for the other team?',
    options: [
      'This can never happen',
      'If the defense intercepts and returns it to the other end zone',
      'If there\'s a penalty on the attempt',
      'If the kicker misses wide left'
    ],
    correct: 1,
    explanation: 'On a 2-point conversion, if the defense intercepts or recovers a fumble and returns it to the other end zone, they score 1 point (not 2).',
    points: 12,
    concepts: ['conversion-safety', 'defensive-conversion', 'special-scoring']
  },
  'adv-hard-2': {
    id: 'adv-hard-2',
    category: 'advanced',
    difficulty: 'hard',
    question: 'What is the "tuck rule" and why was it controversial?',
    options: [
      'Players must tuck in their jerseys',
      'QBs must tuck the ball when running',
      'An incomplete pass vs fumble rule that affected playoff games',
      'A rule about celebrating in the end zone'
    ],
    correct: 2,
    explanation: 'The tuck rule said if a QB loses the ball while bringing it back toward their body after starting a throwing motion, it\'s an incomplete pass, not a fumble.',
    points: 12,
    concepts: ['tuck-rule', 'fumble-vs-incomplete', 'controversial-calls']
  },

  // More Easy Questions
  'basic-easy-4': {
    id: 'basic-easy-4',
    category: 'basic-rules',
    difficulty: 'easy',
    question: 'How many quarters are in a regulation pro football game?',
    options: ['2 quarters', '3 quarters', '4 quarters', '5 quarters'],
    correct: 2,
    explanation: 'A regulation pro football game consists of 4 quarters, each lasting 15 minutes.',
    points: 5,
    concepts: ['quarters', 'game-time', 'basic-rules']
  },
  'basic-easy-5': {
    id: 'basic-easy-5',
    category: 'basic-rules',
    difficulty: 'easy',
    question: 'How many points is a field goal worth?',
    options: ['1 point', '2 points', '3 points', '6 points'],
    correct: 2,
    explanation: 'A field goal is worth 3 points when the ball is kicked through the uprights.',
    points: 5,
    concepts: ['field-goal', 'scoring', 'points']
  },
  'pos-easy-3': {
    id: 'pos-easy-3',
    category: 'positions',
    difficulty: 'easy',
    question: 'What position is primarily responsible for carrying the ball?',
    options: ['Quarterback', 'Running Back', 'Wide Receiver', 'Tight End'],
    correct: 1,
    explanation: 'The running back is the position primarily responsible for carrying the ball on rushing plays.',
    points: 5,
    concepts: ['running-back', 'rushing', 'positions']
  },
  'pos-easy-4': {
    id: 'pos-easy-4',
    category: 'positions',
    difficulty: 'easy',
    question: 'Which position catches passes from the quarterback?',
    options: ['Running Back', 'Wide Receiver', 'Offensive Line', 'Punter'],
    correct: 1,
    explanation: 'Wide receivers are the primary position responsible for catching passes from the quarterback.',
    points: 5,
    concepts: ['wide-receiver', 'passing', 'positions']
  },

  // More Medium Questions
  'basic-med-3': {
    id: 'basic-med-3',
    category: 'basic-rules',
    difficulty: 'medium',
    question: 'What happens when a player steps out of bounds while carrying the ball?',
    options: [
      'The play continues',
      'The play is immediately dead where they went out',
      'The team loses a down',
      'It becomes a fumble'
    ],
    correct: 1,
    explanation: 'When a player carrying the ball steps out of bounds, the play is immediately dead at the spot where they went out of bounds.',
    points: 8,
    concepts: ['out-of-bounds', 'dead-ball', 'ball-carrier']
  },
  'pos-med-3': {
    id: 'pos-med-3',
    category: 'positions',
    difficulty: 'medium',
    question: 'What is the primary responsibility of a linebacker?',
    options: [
      'Kick field goals and extra points',
      'Defend against both run and pass plays',
      'Snap the ball to the quarterback',
      'Return punts and kickoffs'
    ],
    correct: 1,
    explanation: 'Linebackers are versatile defenders who must defend against both running plays and passing plays, making them key players in the defense.',
    points: 8,
    concepts: ['linebacker', 'defense', 'versatility']
  },
  'strat-med-3': {
    id: 'strat-med-3',
    category: 'strategy',
    difficulty: 'medium',
    question: 'What is a "pick-six" in pro football?',
    options: [
      'A six-yard rushing play',
      'An interception returned for a touchdown',
      'A field goal from 60+ yards',
      'Six penalties in one play'
    ],
    correct: 1,
    explanation: 'A "pick-six" is when a defensive player intercepts a pass and returns it all the way for a touchdown, worth 6 points.',
    points: 8,
    concepts: ['interception', 'touchdown', 'pick-six', 'defense']
  },
  'strat-med-4': {
    id: 'strat-med-4',
    category: 'strategy',
    difficulty: 'medium',
    question: 'When might a team attempt an onside kick?',
    options: [
      'At the start of each half',
      'When they need to recover the ball quickly',
      'After every touchdown',
      'When leading by 14+ points'
    ],
    correct: 1,
    explanation: 'Teams attempt onside kicks when they need to recover the ball quickly, usually when trailing late in the game and needing more possessions.',
    points: 8,
    concepts: ['onside-kick', 'strategy', 'special-teams', 'game-situation']
  },

  // More Hard Questions
  'adv-hard-3': {
    id: 'adv-hard-3',
    category: 'advanced',
    difficulty: 'hard',
    question: 'What is the "coffin corner" in punting strategy?',
    options: [
      'Punting the ball into the end zone',
      'Punting the ball to the corner of the field near the goal line',
      'A type of penalty',
      'A defensive formation'
    ],
    correct: 1,
    explanation: 'The "coffin corner" refers to punting the ball to the corner of the field near the opponent\'s goal line, making it difficult to return while avoiding a touchback.',
    points: 12,
    concepts: ['coffin-corner', 'punting-strategy', 'field-position', 'special-teams']
  },
  'adv-hard-4': {
    id: 'adv-hard-4',
    category: 'advanced',
    difficulty: 'hard',
    question: 'What is "intentional grounding" and when is it called?',
    options: [
      'When a QB throws the ball away to avoid a sack with no receiver nearby',
      'When a player deliberately fumbles',
      'When a team takes a knee',
      'When a receiver drops a pass on purpose'
    ],
    correct: 0,
    explanation: 'Intentional grounding is called when a quarterback throws the ball away to avoid a sack without a receiver in the area and while still in the pocket.',
    points: 12,
    concepts: ['intentional-grounding', 'penalty', 'quarterback', 'pocket-presence']
  },
  'adv-hard-5': {
    id: 'adv-hard-5',
    category: 'advanced',
    difficulty: 'hard',
    question: 'What is the difference between a "hard count" and a "silent count"?',
    options: [
      'Hard count is louder than silent count',
      'Hard count varies cadence to draw offsides; silent count uses visual signals',
      'They are the same thing',
      'Hard count is used on defense, silent count on offense'
    ],
    correct: 1,
    explanation: 'A hard count varies the snap count cadence to try to draw the defense offsides, while a silent count uses visual signals instead of audible calls, typically in loud environments.',
    points: 12,
    concepts: ['hard-count', 'silent-count', 'snap-cadence', 'quarterback-techniques']
  },
  'adv-hard-6': {
    id: 'adv-hard-6',
    category: 'strategy',
    difficulty: 'hard',
    question: 'In what situation would a team use a "pooch punt"?',
    options: [
      'When they want maximum distance',
      'When they want to pin the opponent inside the 20 without a touchback',
      'When the punter is injured',
      'Only on 4th and long'
    ],
    correct: 1,
    explanation: 'A pooch punt is a shorter, higher punt designed to land inside the 20-yard line and be downed before reaching the end zone, avoiding a touchback.',
    points: 12,
    concepts: ['pooch-punt', 'field-position', 'special-teams', 'strategy']
  },
  'adv-hard-7': {
    id: 'adv-hard-7',
    category: 'positions',
    difficulty: 'hard',
    question: 'What is the role of a "nickel back" in defensive formations?',
    options: [
      'A fifth offensive lineman',
      'A third cornerback who enters in passing situations',
      'A backup quarterback',
      'A special teams player only'
    ],
    correct: 1,
    explanation: 'A nickel back is a third cornerback who enters the game in nickel defense (5 defensive backs) to provide extra coverage against passing plays.',
    points: 12,
    concepts: ['nickel-back', 'defensive-formations', 'pass-coverage', 'defensive-backs']
  },
  'adv-hard-8': {
    id: 'adv-hard-8',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is a "bootleg" play and why is it effective?',
    options: [
      'An illegal play involving extra equipment',
      'QB rolls out opposite the play fake, often finding receivers crossing behind linebackers',
      'A running play up the middle',
      'A type of punt formation'
    ],
    correct: 1,
    explanation: 'A bootleg involves the QB rolling out opposite to a play fake, often finding receivers crossing behind linebackers who bite on the fake.',
    points: 12,
    concepts: ['bootleg', 'play-action', 'misdirection', 'quarterback-mobility']
  },

  // Situational Questions
  'situation-1': {
    id: 'situation-1',
    category: 'strategy',
    difficulty: 'medium',
    question: 'Your team is down by 3 points with 2 minutes left. You have 4th and 1 at midfield. What should you do?',
    options: [
      'Punt and hope for good field position',
      'Go for it - you need points anyway',
      'Attempt a 67-yard field goal',
      'Take a knee and accept the loss'
    ],
    correct: 1,
    explanation: 'Being down 3 with little time left, you need to score. Going for it on 4th and 1 gives you the best chance to continue the drive for a field goal or touchdown.',
    points: 10,
    concepts: ['game-situation', 'fourth-down-decision', 'clock-management']
  },
  'situation-2': {
    id: 'situation-2',
    category: 'strategy',
    difficulty: 'hard',
    question: 'Your team is up by 4 points with 1:30 left. The opponent has no timeouts. What should you prioritize?',
    options: [
      'Throw deep passes to score more points',
      'Run the ball and keep the clock moving',
      'Take a knee immediately',
      'Attempt a field goal'
    ],
    correct: 1,
    explanation: 'With a 4-point lead and the opponent having no timeouts, running the ball keeps the clock moving and prevents the opponent from getting the ball back easily.',
    points: 12,
    concepts: ['clock-management', 'game-situation', 'ball-control', 'protect-lead']
  },

  // Additional Hard Questions for Expert Tier
  'adv-hard-9': {
    id: 'adv-hard-9',
    category: 'advanced',
    difficulty: 'hard',
    question: 'What is the difference between "man coverage" and "zone coverage"?',
    options: [
      'Man coverage covers receivers, zone coverage covers areas',
      'They are the same thing',
      'Man coverage is only for running plays',
      'Zone coverage uses more players'
    ],
    correct: 0,
    explanation: 'In man coverage, each defender covers a specific receiver. In zone coverage, defenders are responsible for specific areas of the field.',
    points: 12,
    concepts: ['man-coverage', 'zone-coverage', 'defensive-schemes', 'pass-coverage']
  },
  'adv-hard-10': {
    id: 'adv-hard-10',
    category: 'positions',
    difficulty: 'hard',
    question: 'What is the "Mike" linebacker and why is this position important?',
    options: [
      'The fastest linebacker who covers receivers',
      'The middle linebacker who calls defensive plays and sets the formation',
      'A linebacker who only plays on special teams',
      'The linebacker who rushes the quarterback most'
    ],
    correct: 1,
    explanation: 'The "Mike" linebacker is typically the middle linebacker who serves as the quarterback of the defense, calling plays and adjustments.',
    points: 12,
    concepts: ['mike-linebacker', 'defensive-captain', 'play-calling', 'linebacker-roles']
  },
  'adv-hard-11': {
    id: 'adv-hard-11',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is a "RPO" (Run-Pass Option) and how does it work?',
    options: [
      'A play where the QB randomly picks run or pass',
      'A play where the QB reads a defender to decide whether to hand off or throw',
      'A play that always results in a run',
      'A defensive formation'
    ],
    correct: 1,
    explanation: 'An RPO gives the quarterback the option to either hand the ball off or throw a quick pass based on how a specific defender reacts.',
    points: 12,
    concepts: ['RPO', 'read-option', 'quarterback-reads', 'modern-offense']
  },
  'adv-hard-12': {
    id: 'adv-hard-12',
    category: 'advanced',
    difficulty: 'hard',
    question: 'When can a team attempt a "fair catch kick" and what is it worth?',
    options: [
      'After any fair catch, worth 2 points',
      'After a fair catch, can attempt a free kick for 3 points',
      'Only in overtime, worth 1 point',
      'This is not a real rule'
    ],
    correct: 1,
    explanation: 'After a fair catch, a team can attempt a free kick (like a field goal) without the defense rushing. It\'s worth 3 points but rarely attempted.',
    points: 12,
    concepts: ['fair-catch-kick', 'free-kick', 'rare-rules', 'special-teams']
  },
  'adv-hard-13': {
    id: 'adv-hard-13',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is "Cover 2" defense and what is its weakness?',
    options: [
      'Two safeties deep, weakness is short middle coverage',
      'Two cornerbacks, weakness is the sidelines',
      'Two linebackers, weakness is running plays',
      'Two defensive ends, weakness is passing'
    ],
    correct: 0,
    explanation: 'Cover 2 uses two safeties to protect deep areas, but this creates a weakness in the intermediate middle of the field.',
    points: 12,
    concepts: ['cover-2', 'defensive-coverage', 'safety-positions', 'coverage-holes']
  },
  'adv-hard-14': {
    id: 'adv-hard-14',
    category: 'positions',
    difficulty: 'hard',
    question: 'What is the difference between a "Sam" and "Will" linebacker?',
    options: [
      'Sam is stronger side, Will is weaker side',
      'Sam covers passes, Will stops runs',
      'They are the same position',
      'Sam is offense, Will is defense'
    ],
    correct: 0,
    explanation: 'The Sam linebacker typically plays on the strong side (tight end side), while the Will linebacker plays on the weak side of the formation.',
    points: 12,
    concepts: ['sam-linebacker', 'will-linebacker', 'strong-side', 'weak-side']
  },
  'adv-hard-15': {
    id: 'adv-hard-15',
    category: 'advanced',
    difficulty: 'hard',
    question: 'What is "audiblizing" and when might a quarterback do this?',
    options: [
      'Calling timeout to discuss strategy',
      'Changing the play at the line based on the defensive look',
      'Throwing the ball away to avoid a sack',
      'Taking a knee to run out the clock'
    ],
    correct: 1,
    explanation: 'Audiblizing is when a quarterback changes the called play at the line of scrimmage based on what he sees in the defensive alignment.',
    points: 12,
    concepts: ['audible', 'pre-snap-reads', 'quarterback-adjustments', 'play-calling']
  },
  'adv-hard-16': {
    id: 'adv-hard-16',
    category: 'strategy',
    difficulty: 'hard',
    question: 'In a "bunch formation," what advantage does the offense gain?',
    options: [
      'More blockers for running plays',
      'Receivers can run crossing routes and picks',
      'Better protection for the quarterback',
      'Easier handoffs to running backs'
    ],
    correct: 1,
    explanation: 'Bunch formations group receivers close together, allowing for crossing routes, pick plays, and confusion in defensive coverage.',
    points: 12,
    concepts: ['bunch-formation', 'receiver-routes', 'pick-plays', 'formation-advantages']
  },
  'adv-hard-17': {
    id: 'adv-hard-17',
    category: 'advanced',
    difficulty: 'hard',
    question: 'What is the "neutral zone" and what happens if players enter it early?',
    options: [
      'The area between the 40-yard lines',
      'The space between the offensive and defensive lines before the snap',
      'The end zone during field goals',
      'The sideline area'
    ],
    correct: 1,
    explanation: 'The neutral zone is the space between the offensive and defensive lines. Entering it before the snap results in an offside or neutral zone infraction penalty.',
    points: 12,
    concepts: ['neutral-zone', 'offside', 'pre-snap-violations', 'line-of-scrimmage']
  },
  'adv-hard-18': {
    id: 'adv-hard-18',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is a "mesh route" and why is it effective against zone coverage?',
    options: [
      'Two receivers run parallel routes that cross in the middle',
      'A single receiver runs back and forth',
      'Multiple receivers run to the same spot',
      'A play where receivers block for each other'
    ],
    correct: 0,
    explanation: 'A mesh route has two receivers cross paths, creating confusion for zone defenders about who to cover and potentially creating picks.',
    points: 12,
    concepts: ['mesh-route', 'crossing-routes', 'zone-beaters', 'receiver-concepts']
  },
  'adv-hard-19': {
    id: 'adv-hard-19',
    category: 'positions',
    difficulty: 'hard',
    question: 'What is a "rover" safety and how does it differ from free safety?',
    options: [
      'Rover is smaller and faster than free safety',
      'Rover plays closer to the line and covers tight ends/backs, free safety stays deep',
      'They are the same position with different names',
      'Rover only plays on special teams'
    ],
    correct: 1,
    explanation: 'A rover safety is a hybrid position that plays closer to the line of scrimmage, often covering tight ends or running backs, while the free safety stays deep.',
    points: 12,
    concepts: ['rover-safety', 'free-safety', 'hybrid-positions', 'safety-roles']
  },
  'adv-hard-20': {
    id: 'adv-hard-20',
    category: 'advanced',
    difficulty: 'hard',
    question: 'What is the "coffin corner" punt and why is it difficult to execute?',
    options: [
      'A punt that bounces into the end zone',
      'A punt aimed at the corner of the field near the goal line to avoid touchbacks',
      'A punt that goes out of bounds at midfield',
      'A punt returned for a touchdown'
    ],
    correct: 1,
    explanation: 'The coffin corner punt aims for the corner near the goal line, requiring precise placement to avoid going into the end zone for a touchback.',
    points: 12,
    concepts: ['coffin-corner', 'punt-placement', 'field-position', 'punting-precision']
  }
}

// Assessment Test Configuration
export const assessmentConfig = {
  totalQuestions: 10, // Quick assessment by default
  timeLimit: 600, // 10 minutes for quick assessment
  passingScore: 70, // 70% to pass
  categories: assessmentCategories,
  adaptiveScoring: true,
  showExplanations: true,
  allowRetake: true,
  retakeDelay: 24 * 60 * 60 * 1000, // 24 hours
  certificateEligible: 80, // 80% for certificate
  
  // Assessment modes
  modes: {
    beginner: {
      totalQuestions: 8,
      timeLimit: 480, // 8 minutes
      name: 'Beginner Level',
      description: 'Perfect for pro football newcomers - basic rules and concepts',
      difficulty: ['easy'],
      passingScore: 60,
      unlocks: 'intermediate',
      tier: 1
    },
    intermediate: {
      totalQuestions: 12,
      timeLimit: 720, // 12 minutes  
      name: 'Intermediate Level',
      description: 'For fans who know the basics - strategy and positions',
      difficulty: ['easy', 'medium'],
      passingScore: 65,
      unlocks: 'advanced',
      tier: 2,
      requiresUnlock: true
    },
    advanced: {
      totalQuestions: 15,
      timeLimit: 900, // 15 minutes
      name: 'Advanced Level', 
      description: 'Test your deep pro football knowledge and complex situations',
      difficulty: ['medium', 'hard'],
      passingScore: 70,
      unlocks: 'expert',
      tier: 3,
      requiresUnlock: true
    },
    expert: {
      totalQuestions: 20,
      timeLimit: 1200, // 20 minutes
      name: 'Expert Level',
      description: 'The ultimate challenge - prove you\'re a pro football expert',
      difficulty: ['hard'],
      passingScore: 75,
      tier: 4,
      requiresUnlock: true,
      isMaxLevel: true
    }
  }
}

// Skill Level Determination
export const skillLevels = {
  'beginner': {
    name: 'Pro Football Newcomer',
    range: [0, 40],
    description: 'You\'re just starting your pro football journey. Focus on basic rules and positions.',
    badge: '🌱',
    color: 'green',
    recommendations: ['fundamentals', 'basic-rules'],
    nextGoals: ['Learn the basic positions', 'Understand downs and scoring', 'Watch a complete game']
  },
  'developing': {
    name: 'Casual Fan',
    range: [41, 60],
    description: 'You understand the basics but could learn more strategic concepts.',
    badge: '📺',
    color: 'blue',
    recommendations: ['offensive-strategy', 'positions-deep-dive'],
    nextGoals: ['Master all position roles', 'Understand penalty calls', 'Learn play types']
  },
  'intermediate': {
    name: 'Knowledgeable Fan',
    range: [61, 75],
    description: 'You have solid pro football knowledge and can follow strategic elements.',
    badge: '🧠',
    color: 'purple',
    recommendations: ['defensive-concepts', 'advanced-strategy'],
    nextGoals: ['Predict play calls', 'Understand complex penalties', 'Analyze matchups']
  },
  'advanced': {
    name: 'Pro Football Strategist',
    range: [76, 89],
    description: 'You understand complex strategy and can analyze games deeply.',
    badge: '⚡',
    color: 'orange',
    recommendations: ['expert-analysis', 'coaching-decisions'],
    nextGoals: ['Master film study', 'Understand all rule nuances', 'Coach youth football']
  },
  'expert': {
    name: 'Pro Football Expert',
    range: [90, 100],
    description: 'You have expert-level knowledge rivaling coaches and analysts.',
    badge: '🏆',
    color: 'gold',
    recommendations: ['Create your own content', 'Mentor other learners'],
    nextGoals: ['Teach others', 'Write football analysis', 'Consider coaching career']
  }
}

// Adaptive Question Selection Algorithm
export class AdaptiveAssessment {
  constructor(userProgress = {}, mode = 'beginner') {
    this.userProgress = userProgress
    this.mode = mode
    this.config = assessmentConfig.modes[mode] || assessmentConfig.modes.beginner
    this.currentQuestions = []
    this.responses = []
    this.currentDifficulty = this.estimateStartingDifficulty()
    this.categoryScores = {}
    this.timeStarted = null
    this.isComplete = false
    this.totalQuestions = this.config.totalQuestions
  }

  estimateStartingDifficulty() {
    const completedLessons = this.userProgress.lessons?.completed?.length || 0
    if (completedLessons < 3) return 'easy'
    if (completedLessons < 7) return 'medium'
    return 'hard'
  }

  generateQuestionSet() {
    const questions = []
    const questionPool = Object.values(assessmentQuestions)
    const allowedDifficulties = this.config.difficulty || ['easy', 'medium', 'hard']
    
    // Filter questions by allowed difficulties for this tier
    const tierQuestions = questionPool.filter(q => allowedDifficulties.includes(q.difficulty))
    
    // Select questions per category based on tier
    const questionsPerCategory = Math.floor(this.totalQuestions / Object.keys(assessmentCategories).length)
    
    for (const category of Object.keys(assessmentCategories)) {
      const categoryQuestions = tierQuestions.filter(q => q.category === category)
      const selectedQuestions = this.selectQuestionsForTier(categoryQuestions, questionsPerCategory)
      questions.push(...selectedQuestions)
    }
    
    // Fill remaining slots with appropriate difficulty
    const remainingSlots = this.totalQuestions - questions.length
    if (remainingSlots > 0) {
      const unusedQuestions = tierQuestions.filter(q => !questions.includes(q))
      const fillerQuestions = this.selectMixedQuestions(unusedQuestions, remainingSlots)
      questions.push(...fillerQuestions)
    }
    
    // Shuffle and trim to exact count
    this.currentQuestions = this.shuffleArray(questions).slice(0, this.totalQuestions)
    return this.currentQuestions
  }

  selectQuestionsForTier(questions, count) {
    const allowedDifficulties = this.config.difficulty || ['easy', 'medium', 'hard']
    const selected = []
    
    // For each allowed difficulty, try to get some questions
    for (const difficulty of allowedDifficulties) {
      const difficultyQuestions = questions.filter(q => q.difficulty === difficulty)
      const toTake = Math.min(Math.ceil(count / allowedDifficulties.length), difficultyQuestions.length)
      const randomQuestions = this.shuffleArray(difficultyQuestions).slice(0, toTake)
      selected.push(...randomQuestions)
      
      if (selected.length >= count) break
    }
    
    return selected.slice(0, count)
  }

  selectMixedFromCategory(questions, count) {
    const difficulties = ['easy', 'medium', 'hard']
    const selected = []
    
    // Prioritize easier questions for quick assessment
    const priorityOrder = this.mode === 'quick' ? ['easy', 'medium', 'hard'] : ['medium', 'easy', 'hard']
    
    for (const difficulty of priorityOrder) {
      const difficultyQuestions = questions.filter(q => q.difficulty === difficulty)
      const toTake = Math.min(Math.ceil(count / priorityOrder.length), difficultyQuestions.length)
      const randomQuestions = this.shuffleArray(difficultyQuestions).slice(0, toTake)
      selected.push(...randomQuestions)
      
      if (selected.length >= count) break
    }
    
    return selected.slice(0, count)
  }

  selectQuestionsByDifficulty(questions, targetDifficulty, count) {
    const filtered = questions.filter(q => q.difficulty === targetDifficulty)
    return this.shuffleArray(filtered).slice(0, Math.min(count, filtered.length))
  }

  selectMixedQuestions(questions, count) {
    const difficulties = ['easy', 'medium', 'hard']
    const selected = []
    
    for (let i = 0; i < count && questions.length > 0; i++) {
      const targetDifficulty = this.adaptDifficulty(this.responses.length)
      const candidates = questions.filter(q => q.difficulty === targetDifficulty)
      
      if (candidates.length > 0) {
        const question = candidates[Math.floor(Math.random() * candidates.length)]
        selected.push(question)
        questions.splice(questions.indexOf(question), 1)
      }
    }
    
    return selected
  }

  getDifficultyTarget(category) {
    const categoryProgress = this.getCategoryProgress(category)
    if (categoryProgress < 0.3) return 'easy'
    if (categoryProgress < 0.7) return 'medium'
    return 'hard'
  }

  getCategoryProgress(category) {
    const relevantLessons = this.userProgress.lessons?.completed || []
    const categoryLessons = this.getCategoryLessons(category)
    const completed = relevantLessons.filter(lesson => categoryLessons.includes(lesson)).length
    return completed / Math.max(categoryLessons.length, 1)
  }

  getCategoryLessons(category) {
    const categoryMap = {
      'basic-rules': ['how-downs-work', 'scoring-touchdowns', 'field-layout-basics', 'nfl-seasons-playoffs'],
      'positions': ['offensive-positions', 'defensive-positions', 'quarterback-101', 'special-teams-basics'],
      'strategy': ['timeouts-and-clock', 'understanding-penalties'],
      'advanced': ['understanding-penalties', 'special-teams-basics']
    }
    return categoryMap[category] || []
  }

  adaptDifficulty(responseCount) {
    if (responseCount < 5) return this.currentDifficulty
    
    const recentResponses = this.responses.slice(-5)
    const correctRate = recentResponses.filter(r => r.correct).length / recentResponses.length
    
    if (correctRate > 0.8 && this.currentDifficulty !== 'hard') {
      this.currentDifficulty = this.currentDifficulty === 'easy' ? 'medium' : 'hard'
    } else if (correctRate < 0.4 && this.currentDifficulty !== 'easy') {
      this.currentDifficulty = this.currentDifficulty === 'hard' ? 'medium' : 'easy'
    }
    
    return this.currentDifficulty
  }

  recordResponse(questionId, selectedAnswer, timeSpent) {
    const question = this.currentQuestions.find(q => q.id === questionId)
    if (!question) return false

    const isCorrect = selectedAnswer === question.correct
    const response = {
      questionId,
      question: question.question,
      selectedAnswer,
      correctAnswer: question.correct,
      correct: isCorrect,
      timeSpent,
      difficulty: question.difficulty,
      category: question.category,
      points: isCorrect ? question.points : 0,
      timestamp: Date.now()
    }

    this.responses.push(response)
    
    // Update category scores
    if (!this.categoryScores[question.category]) {
      this.categoryScores[question.category] = { correct: 0, total: 0, points: 0 }
    }
    this.categoryScores[question.category].total++
    if (isCorrect) {
      this.categoryScores[question.category].correct++
      this.categoryScores[question.category].points += question.points
    }

    return response
  }

  calculateResults() {
    const totalQuestions = this.responses.length
    const correctAnswers = this.responses.filter(r => r.correct).length
    const totalPoints = this.responses.reduce((sum, r) => sum + r.points, 0)
    const percentage = Math.round((correctAnswers / totalQuestions) * 100)
    
    // Calculate category breakdowns
    const categoryResults = {}
    for (const [category, data] of Object.entries(this.categoryScores)) {
      categoryResults[category] = {
        ...data,
        percentage: Math.round((data.correct / data.total) * 100),
        categoryInfo: assessmentCategories[category]
      }
    }
    
    // Determine skill level
    const skillLevel = this.determineSkillLevel(percentage)
    
    // Calculate time taken
    const timeElapsed = this.timeStarted ? Date.now() - this.timeStarted : 0
    
    // Check if passed and what unlocks next
    const configPassingScore = this.config.passingScore || assessmentConfig.passingScore
    const passed = percentage >= configPassingScore
    const unlocksNext = passed && this.config.unlocks
    
    this.isComplete = true
    
    return {
      totalQuestions,
      correctAnswers,
      percentage,
      totalPoints,
      skillLevel,
      categoryResults,
      timeElapsed,
      passed,
      passingScore: configPassingScore,
      certificateEligible: percentage >= assessmentConfig.certificateEligible,
      responses: this.responses,
      recommendations: this.generateRecommendations(skillLevel, categoryResults),
      retakeEligible: true,
      completedAt: new Date().toISOString(),
      tier: this.config.tier,
      unlocksNext,
      nextTier: this.config.unlocks,
      isMaxLevel: this.config.isMaxLevel
    }
  }

  determineSkillLevel(percentage) {
    for (const [level, config] of Object.entries(skillLevels)) {
      if (percentage >= config.range[0] && percentage <= config.range[1]) {
        return { level, ...config }
      }
    }
    return skillLevels.beginner
  }

  generateRecommendations(skillLevel, categoryResults) {
    const weakCategories = Object.entries(categoryResults)
      .filter(([cat, result]) => result.percentage < 60)
      .map(([cat]) => cat)
    
    const recommendations = {
      immediate: [],
      longTerm: skillLevel.recommendations || [],
      focus: weakCategories.map(cat => ({
        category: cat,
        name: assessmentCategories[cat].name,
        suggestion: `Focus on ${assessmentCategories[cat].description.toLowerCase()}`
      }))
    }
    
    // Add specific recommendations based on weak areas
    if (weakCategories.includes('basic-rules')) {
      recommendations.immediate.push('Complete the Pro Football Fundamentals track')
      recommendations.immediate.push('Review "How Downs Work" lesson')
    }
    
    if (weakCategories.includes('positions')) {
      recommendations.immediate.push('Study offensive and defensive positions')
      recommendations.immediate.push('Complete the Position Deep-Dive track')
    }
    
    if (weakCategories.includes('strategy')) {
      recommendations.immediate.push('Learn about game strategy and situational pro football')
      recommendations.immediate.push('Watch games with strategic commentary')
    }
    
    return recommendations
  }

  shuffleArray(array) {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  startAssessment() {
    this.timeStarted = Date.now()
    return this.generateQuestionSet()
  }

  getProgress() {
    return {
      completed: this.responses.length,
      total: this.currentQuestions.length,
      percentage: Math.round((this.responses.length / this.currentQuestions.length) * 100)
    }
  }

  getCurrentQuestion() {
    if (this.responses.length >= this.currentQuestions.length) return null
    return this.currentQuestions[this.responses.length]
  }

  canRetake(lastTaken) {
    if (!lastTaken) return true
    const timeSince = Date.now() - new Date(lastTaken).getTime()
    return timeSince >= assessmentConfig.retakeDelay
  }
}

// Tier Management Functions
export const getUnlockedTiers = (userProgress) => {
  const assessments = userProgress.assessments || {}
  const unlockedTiers = ['beginner'] // Always unlocked
  
  // Check each assessment result to see what was unlocked
  for (const assessment of Object.values(assessments)) {
    if (assessment.results?.unlocksNext && assessment.results?.passed) {
      const nextTier = assessment.results.nextTier
      if (nextTier && !unlockedTiers.includes(nextTier)) {
        unlockedTiers.push(nextTier)
      }
    }
  }
  
  return unlockedTiers
}

export const getHighestCompletedTier = (userProgress) => {
  const assessments = userProgress.assessments || {}
  let highestTier = 0
  
  for (const assessment of Object.values(assessments)) {
    if (assessment.results?.passed) {
      const tier = assessment.results.tier || 1
      highestTier = Math.max(highestTier, tier)
    }
  }
  
  return highestTier
}

export const canAccessTier = (tier, userProgress) => {
  const unlockedTiers = getUnlockedTiers(userProgress)
  return unlockedTiers.includes(tier)
}

export const getNextAvailableTier = (userProgress) => {
  const unlockedTiers = getUnlockedTiers(userProgress)
  const allTiers = Object.keys(assessmentConfig.modes)
  
  for (const tier of allTiers) {
    if (unlockedTiers.includes(tier)) {
      continue // Already unlocked
    }
    
    // Check if this tier's prerequisite is completed
    const tierConfig = assessmentConfig.modes[tier]
    if (!tierConfig.requiresUnlock) {
      return tier
    }
    
    // Find what unlocks this tier
    const prerequisiteTier = Object.keys(assessmentConfig.modes).find(t => 
      assessmentConfig.modes[t].unlocks === tier
    )
    
    if (prerequisiteTier && unlockedTiers.includes(prerequisiteTier)) {
      return tier
    }
  }
  
  return null // All tiers completed or no next tier available
}

export const getTierProgress = (userProgress) => {
  const unlockedTiers = getUnlockedTiers(userProgress)
  const totalTiers = Object.keys(assessmentConfig.modes).length
  const completedTiers = getHighestCompletedTier(userProgress)
  
  return {
    unlockedCount: unlockedTiers.length,
    completedCount: completedTiers,
    totalCount: totalTiers,
    unlockedTiers,
    nextTier: getNextAvailableTier(userProgress)
  }
}

// Export utilities
export const createAssessment = (userProgress, mode) => new AdaptiveAssessment(userProgress, mode)
export const getSkillLevel = (percentage) => {
  for (const [level, config] of Object.entries(skillLevels)) {
    if (percentage >= config.range[0] && percentage <= config.range[1]) {
      return { level, ...config }
    }
  }
  return skillLevels.beginner
}