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
  },

  // Additional EASY questions for better rotation
  'basic-easy-6': {
    id: 'basic-easy-6',
    category: 'basic-rules',
    difficulty: 'easy',
    question: 'What is the line of scrimmage?',
    options: ['The goal line', 'The line where the ball is placed to start a play', 'The 50-yard line', 'The sideline'],
    correct: 1,
    explanation: 'The line of scrimmage is an imaginary line where the ball is placed at the start of each play. Both teams line up on opposite sides of it.',
    points: 5,
    concepts: ['line-of-scrimmage', 'basic-rules', 'field-positioning']
  },
  'basic-easy-7': {
    id: 'basic-easy-7',
    category: 'basic-rules',
    difficulty: 'easy',
    question: 'How many points is an extra point (PAT) worth after a touchdown?',
    options: ['1 point', '2 points', '3 points', '6 points'],
    correct: 0,
    explanation: 'An extra point kick (Point After Touchdown) is worth 1 point. Teams can also attempt a 2-point conversion instead.',
    points: 5,
    concepts: ['extra-point', 'PAT', 'scoring', 'conversion']
  },
  'basic-easy-8': {
    id: 'basic-easy-8',
    category: 'basic-rules',
    difficulty: 'easy',
    question: 'What happens when the ball carrier is tackled?',
    options: ['The play continues', 'The play is over', 'They get a penalty', 'Automatic first down'],
    correct: 1,
    explanation: 'When the ball carrier is tackled and their knee or body touches the ground while being contacted by a defender, the play is over.',
    points: 5,
    concepts: ['tackle', 'down-by-contact', 'basic-rules']
  },
  'basic-easy-9': {
    id: 'basic-easy-9',
    category: 'basic-rules',
    difficulty: 'easy',
    question: 'How many minutes long is each quarter in pro football?',
    options: ['10 minutes', '12 minutes', '15 minutes', '20 minutes'],
    correct: 2,
    explanation: 'Each quarter in the NFL is 15 minutes long, for a total of 60 minutes of regulation time.',
    points: 5,
    concepts: ['quarter-length', 'game-time', 'basic-rules']
  },
  'basic-easy-10': {
    id: 'basic-easy-10',
    category: 'basic-rules',
    difficulty: 'easy',
    question: 'What color flag do referees throw when there is a penalty?',
    options: ['Red flag', 'Yellow flag', 'Blue flag', 'White flag'],
    correct: 1,
    explanation: 'Referees throw a yellow penalty flag to indicate that a penalty has occurred during a play.',
    points: 5,
    concepts: ['penalty-flag', 'referees', 'penalties']
  },
  'pos-easy-5': {
    id: 'pos-easy-5',
    category: 'positions',
    difficulty: 'easy',
    question: 'What position kicks field goals and extra points?',
    options: ['Punter', 'Kicker', 'Quarterback', 'Tight End'],
    correct: 1,
    explanation: 'The kicker (also called placekicker) is responsible for kicking field goals and extra points.',
    points: 5,
    concepts: ['kicker', 'field-goal', 'special-teams']
  },
  'pos-easy-6': {
    id: 'pos-easy-6',
    category: 'positions',
    difficulty: 'easy',
    question: 'Which position primarily blocks for the quarterback and running back?',
    options: ['Wide Receiver', 'Defensive Line', 'Offensive Line', 'Linebacker'],
    correct: 2,
    explanation: 'The offensive line consists of five players who block to protect the quarterback and create running lanes.',
    points: 5,
    concepts: ['offensive-line', 'blocking', 'protection']
  },
  'pos-easy-7': {
    id: 'pos-easy-7',
    category: 'positions',
    difficulty: 'easy',
    question: 'What position punts the ball on 4th down?',
    options: ['Kicker', 'Punter', 'Quarterback', 'Running Back'],
    correct: 1,
    explanation: 'The punter kicks the ball away to the other team on 4th down when the team decides not to go for it or attempt a field goal.',
    points: 5,
    concepts: ['punter', 'punting', 'special-teams', 'fourth-down']
  },
  'pos-easy-8': {
    id: 'pos-easy-8',
    category: 'positions',
    difficulty: 'easy',
    question: 'How many offensive linemen are typically on the field?',
    options: ['3 linemen', '4 linemen', '5 linemen', '7 linemen'],
    correct: 2,
    explanation: 'There are typically 5 offensive linemen: center, two guards, and two tackles.',
    points: 5,
    concepts: ['offensive-line', 'formation', 'positions']
  },
  'strat-easy-2': {
    id: 'strat-easy-2',
    category: 'strategy',
    difficulty: 'easy',
    question: 'What is a "sack" in football?',
    options: [
      'When a running back drops the ball',
      'When the quarterback is tackled behind the line of scrimmage',
      'When a receiver catches a touchdown',
      'When a team scores a safety'
    ],
    correct: 1,
    explanation: 'A sack occurs when the quarterback is tackled behind the line of scrimmage before throwing a pass.',
    points: 5,
    concepts: ['sack', 'quarterback', 'defensive-play']
  },
  'strat-easy-3': {
    id: 'strat-easy-3',
    category: 'strategy',
    difficulty: 'easy',
    question: 'What is an interception?',
    options: [
      'When the offensive team catches a pass',
      'When the defensive team catches a pass meant for the offense',
      'When a player runs out of bounds',
      'When a field goal is blocked'
    ],
    correct: 1,
    explanation: 'An interception occurs when a defensive player catches a pass that was intended for an offensive receiver.',
    points: 5,
    concepts: ['interception', 'turnover', 'defense']
  },
  'strat-easy-4': {
    id: 'strat-easy-4',
    category: 'strategy',
    difficulty: 'easy',
    question: 'What is a fumble?',
    options: [
      'When a player drops or loses control of the ball',
      'When a quarterback throws a bad pass',
      'When a kicker misses a field goal',
      'When a team takes a timeout'
    ],
    correct: 0,
    explanation: 'A fumble occurs when a player loses possession of the ball before being down. Either team can recover it.',
    points: 5,
    concepts: ['fumble', 'turnover', 'possession']
  },
  'strat-easy-5': {
    id: 'strat-easy-5',
    category: 'strategy',
    difficulty: 'easy',
    question: 'What does "1st and 10" mean?',
    options: [
      'First quarter with 10 minutes left',
      'First down and 10 yards to gain a new first down',
      '1 player and 10 coaches',
      'First touchdown worth 10 points'
    ],
    correct: 1,
    explanation: '"1st and 10" means it\'s first down and the team needs to gain 10 yards to earn a new set of downs.',
    points: 5,
    concepts: ['down-and-distance', 'first-down', 'basic-terminology']
  },
  'basic-easy-11': {
    id: 'basic-easy-11',
    category: 'basic-rules',
    difficulty: 'easy',
    question: 'Which team kicks off to start the game?',
    options: [
      'The visiting team always',
      'The home team always',
      'The team that wins the coin toss decides',
      'Both teams kick at the same time'
    ],
    correct: 2,
    explanation: 'A coin toss before the game determines which team gets to choose whether to kick off, receive, or defer to the second half.',
    points: 5,
    concepts: ['kickoff', 'coin-toss', 'game-start']
  },
  'basic-easy-12': {
    id: 'basic-easy-12',
    category: 'basic-rules',
    difficulty: 'easy',
    question: 'What is the end zone?',
    options: [
      'The center of the field',
      'The area at each end of the field where touchdowns are scored',
      'The bench area',
      'The 50-yard line'
    ],
    correct: 1,
    explanation: 'The end zone is the 10-yard area at each end of the field. Getting the ball into the opponent\'s end zone scores a touchdown.',
    points: 5,
    concepts: ['end-zone', 'touchdown', 'field-layout']
  },
  'pos-easy-9': {
    id: 'pos-easy-9',
    category: 'positions',
    difficulty: 'easy',
    question: 'What does a defensive lineman primarily try to do?',
    options: [
      'Catch passes from the quarterback',
      'Tackle ball carriers and pressure the quarterback',
      'Kick field goals',
      'Return punts'
    ],
    correct: 1,
    explanation: 'Defensive linemen try to tackle ball carriers, pressure or sack the quarterback, and stop running plays.',
    points: 5,
    concepts: ['defensive-line', 'pass-rush', 'run-defense']
  },

  // Additional MEDIUM questions
  'basic-med-4': {
    id: 'basic-med-4',
    category: 'basic-rules',
    difficulty: 'medium',
    question: 'What is a "two-point conversion" and when might a team attempt one?',
    options: [
      'Worth 2 points, attempted instead of an extra point kick after a touchdown',
      'A 2-yard field goal',
      'When a team scores 2 touchdowns in a row',
      'A penalty worth 2 yards'
    ],
    correct: 0,
    explanation: 'After a touchdown, a team can attempt to run or pass the ball into the end zone from the 2-yard line for 2 points instead of kicking for 1.',
    points: 8,
    concepts: ['two-point-conversion', 'scoring', 'strategy']
  },
  'basic-med-5': {
    id: 'basic-med-5',
    category: 'basic-rules',
    difficulty: 'medium',
    question: 'What happens if the game is tied at the end of regulation?',
    options: [
      'The game ends in a tie',
      'They play sudden-death overtime',
      'They play an additional 10-minute overtime period',
      'They have a field goal competition'
    ],
    correct: 2,
    explanation: 'In the NFL, if the game is tied after regulation, teams play a 10-minute overtime period with modified sudden-death rules.',
    points: 8,
    concepts: ['overtime', 'tie-game', 'overtime-rules']
  },
  'basic-med-6': {
    id: 'basic-med-6',
    category: 'basic-rules',
    difficulty: 'medium',
    question: 'What is "pass interference"?',
    options: [
      'When the quarterback throws an incomplete pass',
      'When a defender illegally contacts a receiver before the ball arrives',
      'When two receivers run into each other',
      'When a pass is intercepted'
    ],
    correct: 1,
    explanation: 'Pass interference occurs when a player illegally hinders an eligible receiver\'s opportunity to catch a forward pass.',
    points: 8,
    concepts: ['pass-interference', 'penalty', 'passing-rules']
  },
  'basic-med-7': {
    id: 'basic-med-7',
    category: 'basic-rules',
    difficulty: 'medium',
    question: 'How many timeouts does each team get per half?',
    options: ['2 timeouts', '3 timeouts', '4 timeouts', '5 timeouts'],
    correct: 1,
    explanation: 'Each team gets 3 timeouts per half. Unused timeouts from the first half do not carry over to the second half.',
    points: 8,
    concepts: ['timeouts', 'clock-management', 'game-rules']
  },
  'basic-med-8': {
    id: 'basic-med-8',
    category: 'basic-rules',
    difficulty: 'medium',
    question: 'What is a "false start" penalty?',
    options: [
      'When the defense jumps offside',
      'When an offensive player moves before the snap',
      'When a play starts late',
      'When a player starts running before catching the ball'
    ],
    correct: 1,
    explanation: 'A false start occurs when an offensive player makes a sudden movement before the snap, trying to draw the defense offside. It results in a 5-yard penalty.',
    points: 8,
    concepts: ['false-start', 'penalty', 'pre-snap-violation']
  },
  'pos-med-4': {
    id: 'pos-med-4',
    category: 'positions',
    difficulty: 'medium',
    question: 'What is the primary difference between a tight end and a wide receiver?',
    options: [
      'Tight ends only block, receivers only catch',
      'Tight ends line up next to the line and both block and catch; receivers line up wider',
      'They are the same position',
      'Tight ends play defense'
    ],
    correct: 1,
    explanation: 'Tight ends line up next to the offensive line and both block and catch passes, while wide receivers line up wider and primarily catch passes.',
    points: 8,
    concepts: ['tight-end', 'wide-receiver', 'position-differences']
  },
  'pos-med-5': {
    id: 'pos-med-5',
    category: 'positions',
    difficulty: 'medium',
    question: 'What is a "fullback" and how is it different from a running back?',
    options: [
      'Fullbacks are the same as running backs',
      'Fullbacks are typically bigger and focus more on blocking',
      'Fullbacks play defense',
      'Fullbacks only catch passes'
    ],
    correct: 1,
    explanation: 'Fullbacks are typically larger than running backs and primarily block for the running back, though they can also carry the ball or catch passes.',
    points: 8,
    concepts: ['fullback', 'running-back', 'blocking-back']
  },
  'pos-med-6': {
    id: 'pos-med-6',
    category: 'positions',
    difficulty: 'medium',
    question: 'What does a "nose tackle" do in a 3-4 defense?',
    options: [
      'Kicks field goals',
      'Lines up over the center and occupies blockers',
      'Covers wide receivers',
      'Returns kickoffs'
    ],
    correct: 1,
    explanation: 'In a 3-4 defense, the nose tackle lines up directly over the center and is responsible for occupying blockers to free up linebackers.',
    points: 8,
    concepts: ['nose-tackle', '3-4-defense', 'defensive-line']
  },
  'pos-med-7': {
    id: 'pos-med-7',
    category: 'positions',
    difficulty: 'medium',
    question: 'What is the "strong safety" versus "free safety" distinction?',
    options: [
      'Strong safety is stronger and bigger',
      'Strong safety plays closer to the line on the strong side; free safety plays deep center field',
      'They are the same position',
      'Strong safety plays offense'
    ],
    correct: 1,
    explanation: 'The strong safety typically plays closer to the line of scrimmage on the strong side (tight end side), while the free safety plays deep in center field.',
    points: 8,
    concepts: ['strong-safety', 'free-safety', 'safety-positions']
  },
  'strat-med-5': {
    id: 'strat-med-5',
    category: 'strategy',
    difficulty: 'medium',
    question: 'What is a "screen pass" and why is it used?',
    options: [
      'A pass thrown behind a screen',
      'A short pass behind the line with blockers, used to counter aggressive pass rush',
      'A pass to a receiver on the sideline',
      'A pass that is tipped by a defender'
    ],
    correct: 1,
    explanation: 'A screen pass is thrown to a receiver or running back behind the line of scrimmage with blockers in front, designed to slow down aggressive pass rushers.',
    points: 8,
    concepts: ['screen-pass', 'offensive-strategy', 'counter-rush']
  },
  'strat-med-6': {
    id: 'strat-med-6',
    category: 'strategy',
    difficulty: 'medium',
    question: 'What is "prevent defense" and when is it used?',
    options: [
      'A defense that prevents all scoring',
      'A deep zone defense used late in games to prevent long passes',
      'A defense that only stops running plays',
      'A defense used only in practice'
    ],
    correct: 1,
    explanation: 'Prevent defense uses deep zone coverage to prevent long passes and touchdowns, typically used when protecting a lead late in the game.',
    points: 8,
    concepts: ['prevent-defense', 'zone-coverage', 'game-situation']
  },
  'strat-med-7': {
    id: 'strat-med-7',
    category: 'strategy',
    difficulty: 'medium',
    question: 'What is a "draw play"?',
    options: [
      'When the game ends in a tie',
      'A delayed handoff that looks like a pass play initially',
      'When players draw on the chalkboard',
      'A pass play down the sideline'
    ],
    correct: 1,
    explanation: 'A draw play starts like a pass play to draw the defense upfield, then the quarterback hands off to a running back who runs through the gaps.',
    points: 8,
    concepts: ['draw-play', 'misdirection', 'running-strategy']
  },
  'strat-med-8': {
    id: 'strat-med-8',
    category: 'strategy',
    difficulty: 'medium',
    question: 'What does it mean to "blitz"?',
    options: [
      'When a receiver runs very fast',
      'When extra defenders rush the quarterback',
      'When a team scores quickly',
      'When it\'s snowing during a game'
    ],
    correct: 1,
    explanation: 'A blitz is when the defense sends extra pass rushers (linebackers or defensive backs) to pressure the quarterback.',
    points: 8,
    concepts: ['blitz', 'pass-rush', 'defensive-pressure']
  },
  'strat-med-9': {
    id: 'strat-med-9',
    category: 'strategy',
    difficulty: 'medium',
    question: 'Why might a team "take a knee" late in the game?',
    options: [
      'Because they are tired',
      'To run out the clock when winning',
      'To score points',
      'To get a penalty'
    ],
    correct: 1,
    explanation: 'A team takes a knee (quarterback kneels down immediately) to safely run time off the clock when winning and preserving possession matters more than gaining yards.',
    points: 8,
    concepts: ['victory-formation', 'clock-management', 'game-situation']
  },
  'strat-med-10': {
    id: 'strat-med-10',
    category: 'strategy',
    difficulty: 'medium',
    question: 'What is the "two-minute warning"?',
    options: [
      'A warning that the game will end in 2 minutes',
      'An automatic timeout at the 2-minute mark of each half',
      'When coaches get 2 minutes to argue a call',
      'A 2-minute halftime break'
    ],
    correct: 1,
    explanation: 'The two-minute warning is an automatic timeout that occurs when 2 minutes remain in the second and fourth quarters.',
    points: 8,
    concepts: ['two-minute-warning', 'automatic-timeout', 'game-clock']
  },
  'basic-med-9': {
    id: 'basic-med-9',
    category: 'basic-rules',
    difficulty: 'medium',
    question: 'What is "holding" and what is the penalty?',
    options: [
      'Holding the ball too long; loss of down',
      'Illegally grabbing or restraining an opponent; 10-yard penalty',
      'Holding onto a timeout; no penalty',
      'Holding the football after a tackle; 5 yards'
    ],
    correct: 1,
    explanation: 'Holding is when a player illegally grabs, tackles, or restrains an opponent who doesn\'t have the ball. It results in a 10-yard penalty.',
    points: 8,
    concepts: ['holding', 'penalty', 'illegal-contact']
  },
  'basic-med-10': {
    id: 'basic-med-10',
    category: 'basic-rules',
    difficulty: 'medium',
    question: 'What is "offsides"?',
    options: [
      'When a player is on the wrong sideline',
      'When a player crosses the line of scrimmage before the snap',
      'When a team has too many players',
      'When a pass is thrown sideways'
    ],
    correct: 1,
    explanation: 'Offsides occurs when a defensive player crosses the line of scrimmage before the ball is snapped, resulting in a 5-yard penalty.',
    points: 8,
    concepts: ['offsides', 'penalty', 'line-of-scrimmage']
  },

  // Additional HARD questions for expert rotation
  'adv-hard-21': {
    id: 'adv-hard-21',
    category: 'advanced',
    difficulty: 'hard',
    question: 'What is a "bracket coverage"?',
    options: [
      'A type of offensive formation',
      'When two defenders cover one receiver (one high, one low)',
      'A special teams formation',
      'A blocking scheme'
    ],
    correct: 1,
    explanation: 'Bracket coverage involves two defenders covering one receiver, typically with one playing underneath and one playing over the top.',
    points: 12,
    concepts: ['bracket-coverage', 'double-coverage', 'defensive-scheme']
  },
  'adv-hard-22': {
    id: 'adv-hard-22',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is a "tampa 2" defense and what makes it unique?',
    options: [
      'Two safeties cover the deep halves; the middle linebacker drops into deep middle coverage',
      'Two cornerbacks play man coverage',
      'Two defensive ends rush every play',
      'A defense only used in Tampa Bay'
    ],
    correct: 0,
    explanation: 'Tampa 2 is a Cover 2 variation where the middle linebacker drops deep into the middle zone, requiring exceptional speed and range.',
    points: 12,
    concepts: ['tampa-2', 'cover-2', 'zone-coverage', 'linebacker-coverage']
  },
  'adv-hard-23': {
    id: 'adv-hard-23',
    category: 'positions',
    difficulty: 'hard',
    question: 'What is a "hybrid linebacker" or "nickel linebacker"?',
    options: [
      'A linebacker who plays both offense and defense',
      'A smaller, faster linebacker who can cover tight ends and running backs',
      'A linebacker who only plays special teams',
      'The backup middle linebacker'
    ],
    correct: 1,
    explanation: 'A hybrid/nickel linebacker is typically smaller and faster, designed to match up against pass-catching tight ends and running backs in nickel packages.',
    points: 12,
    concepts: ['hybrid-linebacker', 'nickel-package', 'matchup-defense']
  },
  'adv-hard-24': {
    id: 'adv-hard-24',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is the "west coast offense" known for?',
    options: [
      'Running the ball exclusively',
      'Short, horizontal passing game with timing routes',
      'Deep passing only',
      'Never punting'
    ],
    correct: 1,
    explanation: 'The West Coast offense emphasizes short, quick, horizontal passing routes with precise timing to control the ball and move the chains.',
    points: 12,
    concepts: ['west-coast-offense', 'passing-scheme', 'timing-routes']
  },
  'adv-hard-25': {
    id: 'adv-hard-25',
    category: 'advanced',
    difficulty: 'hard',
    question: 'What is the "A-gap" in football terminology?',
    options: [
      'The gap between the center and guard',
      'The space between wide receivers',
      'The area behind the offensive line',
      'A gap in the defensive coverage'
    ],
    correct: 0,
    explanation: 'The A-gap is the space between the center and guard on either side. It\'s labeled alphabetically outward (A, B, C gaps).',
    points: 12,
    concepts: ['A-gap', 'gap-assignments', 'line-play', 'run-blocking']
  },
  'adv-hard-26': {
    id: 'adv-hard-26',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is "cover 3" defense?',
    options: [
      'Three defenders covering three receivers',
      'Three deep zones (corners and safety) with four underneath zones',
      'Three linebackers blitzing',
      'Three defensive backs on the field'
    ],
    correct: 1,
    explanation: 'Cover 3 uses three deep zone defenders (two corners and one safety) to protect deep, with four defenders covering underneath zones.',
    points: 12,
    concepts: ['cover-3', 'zone-defense', 'deep-coverage']
  },
  'adv-hard-27': {
    id: 'adv-hard-27',
    category: 'positions',
    difficulty: 'hard',
    question: 'What is an "edge rusher"?',
    options: [
      'A defensive end or outside linebacker who specializes in rushing the passer from the edge',
      'A running back who runs to the outside',
      'A cornerback who plays on the edge of coverage',
      'A wide receiver who lines up on the edge'
    ],
    correct: 0,
    explanation: 'An edge rusher is a pass rusher (DE or OLB) who attacks the quarterback from the outside edge of the offensive line.',
    points: 12,
    concepts: ['edge-rusher', 'pass-rush', 'defensive-end', 'outside-linebacker']
  },
  'adv-hard-28': {
    id: 'adv-hard-28',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is a "slant route"?',
    options: [
      'When a receiver runs straight down the field',
      'A quick route where the receiver cuts inside at a 45-degree angle',
      'When a receiver runs to the sideline',
      'A route that curves backward'
    ],
    correct: 1,
    explanation: 'A slant route has the receiver take a few steps forward then cut sharply inside at roughly a 45-degree angle for a quick pass.',
    points: 12,
    concepts: ['slant-route', 'quick-passing', 'route-concepts']
  },
  'adv-hard-29': {
    id: 'adv-hard-29',
    category: 'advanced',
    difficulty: 'hard',
    question: 'What is "gap integrity" in run defense?',
    options: [
      'Making sure all offensive gaps are blocked',
      'Each defender maintaining responsibility for their assigned gap',
      'The distance between offensive linemen',
      'A type of running play'
    ],
    correct: 1,
    explanation: 'Gap integrity means each defender maintains responsibility for their assigned gap, preventing running backs from finding holes.',
    points: 12,
    concepts: ['gap-integrity', 'run-defense', 'gap-responsibility']
  },
  'adv-hard-30': {
    id: 'adv-hard-30',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is "motion" before the snap and why use it?',
    options: [
      'When players move around randomly',
      'When an offensive player moves parallel to the line before the snap to reveal defensive coverage',
      'When the quarterback moves in the pocket',
      'When coaches signal plays'
    ],
    correct: 1,
    explanation: 'Pre-snap motion involves moving an offensive player parallel to the line of scrimmage to help identify man vs zone coverage and create mismatches.',
    points: 12,
    concepts: ['pre-snap-motion', 'coverage-identification', 'offensive-strategy']
  },
  'adv-hard-31': {
    id: 'adv-hard-31',
    category: 'positions',
    difficulty: 'hard',
    question: 'What is a "3-technique" defensive tackle?',
    options: [
      'A defensive tackle who uses three different moves',
      'A defensive tackle lined up on the outside shoulder of the guard',
      'The third-string defensive tackle',
      'A defensive tackle who weighs 300+ pounds'
    ],
    correct: 1,
    explanation: 'A 3-technique defensive tackle aligns on the outside shoulder of the offensive guard, typically a penetrating pass-rush position.',
    points: 12,
    concepts: ['3-technique', 'defensive-line-techniques', 'alignment']
  },
  'adv-hard-32': {
    id: 'adv-hard-32',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is a "rub route" or "pick play"?',
    options: [
      'When receivers intentionally cross paths to obstruct defenders',
      'When a receiver falls down',
      'When the quarterback scrambles',
      'A running play'
    ],
    correct: 0,
    explanation: 'A rub/pick route uses receiver routes that cross to legally obstruct defenders and free up another receiver, though illegal picks can draw flags.',
    points: 12,
    concepts: ['rub-route', 'pick-play', 'receiver-concepts', 'route-combinations']
  },
  'adv-hard-33': {
    id: 'adv-hard-33',
    category: 'advanced',
    difficulty: 'hard',
    question: 'What is "leverage" in defensive play?',
    options: [
      'Using mechanical advantage to move blockers',
      'Positioning yourself between the ball carrier and their goal',
      'Having more defenders than blockers',
      'The height difference between players'
    ],
    correct: 1,
    explanation: 'Leverage in defense means positioning yourself with proper angle between the ball carrier and where they want to go, forcing them back inside or to help.',
    points: 12,
    concepts: ['leverage', 'defensive-fundamentals', 'pursuit-angles']
  },
  'adv-hard-34': {
    id: 'adv-hard-34',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is a "stunt" or "twist" on the defensive line?',
    options: [
      'When defensive linemen spin move',
      'When defensive linemen cross paths to confuse blocking assignments',
      'When defensive linemen celebrate a sack',
      'A penalty for twisting a player'
    ],
    correct: 1,
    explanation: 'A stunt/twist involves defensive linemen crossing paths and switching gaps to create confusion in pass protection and free up a rusher.',
    points: 12,
    concepts: ['stunt', 'twist', 'line-games', 'pass-rush-strategy']
  },
  'adv-hard-35': {
    id: 'adv-hard-35',
    category: 'positions',
    difficulty: 'hard',
    question: 'What is the "X receiver" versus "Z receiver" distinction?',
    options: [
      'X is taller, Z is faster',
      'X lines up on the line of scrimmage, Z lines up off the line',
      'They are the same position',
      'X plays offense, Z plays defense'
    ],
    correct: 1,
    explanation: 'The X receiver lines up on the line of scrimmage (typically split end), while the Z receiver lines up off the line (flanker).',
    points: 12,
    concepts: ['X-receiver', 'Z-receiver', 'receiver-alignment', 'formation']
  },
  'adv-hard-36': {
    id: 'adv-hard-36',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is "gap exchange" in run defense?',
    options: [
      'When offensive linemen switch who they block',
      'When defenders intentionally switch gap responsibilities based on the play',
      'Trading players between teams',
      'A type of running play'
    ],
    correct: 1,
    explanation: 'Gap exchange occurs when defenders read a play and intelligently switch their gap responsibilities to maintain sound defense against the actual play.',
    points: 12,
    concepts: ['gap-exchange', 'run-defense', 'defensive-adjustments']
  },
  'adv-hard-37': {
    id: 'adv-hard-37',
    category: 'advanced',
    difficulty: 'hard',
    question: 'What is a "chip block"?',
    options: [
      'Blocking with poker chips',
      'A quick block by a receiver or back before releasing into a route',
      'Blocking someone to the ground',
      'A penalty for blocking below the waist'
    ],
    correct: 1,
    explanation: 'A chip block is when a receiver or running back delivers a quick block on a pass rusher before releasing into their route.',
    points: 12,
    concepts: ['chip-block', 'pass-protection', 'blocking-techniques']
  },
  'adv-hard-38': {
    id: 'adv-hard-38',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is "cover 6" defense?',
    options: [
      'Six defensive backs on the field',
      'A split coverage with Cover 4 on one side and Cover 2 on the other',
      'Six defenders in the box',
      'Covering six receivers'
    ],
    correct: 1,
    explanation: 'Cover 6 (also called quarter-quarter-half) uses Cover 4 (quarters) on one side and Cover 2 on the other, often based on field position or formation.',
    points: 12,
    concepts: ['cover-6', 'split-coverage', 'combination-coverage']
  },
  'adv-hard-39': {
    id: 'adv-hard-39',
    category: 'positions',
    difficulty: 'hard',
    question: 'What is a "move tight end"?',
    options: [
      'A tight end who changes teams frequently',
      'A tight end who moves around the formation and excels at receiving',
      'A tight end who only blocks',
      'A tight end who runs the ball'
    ],
    correct: 1,
    explanation: 'A move tight end is typically more athletic and receiving-focused, often moved around the formation to create mismatches against linebackers and safeties.',
    points: 12,
    concepts: ['move-tight-end', 'receiving-tight-end', 'matchup-weapon']
  },
  'adv-hard-40': {
    id: 'adv-hard-40',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is the "run-pass option" (RPO) concept?',
    options: [
      'The coach chooses run or pass',
      'The quarterback reads a defender to decide whether to hand off or throw',
      'Running then passing on the same play',
      'A defensive strategy'
    ],
    correct: 1,
    explanation: 'RPO gives the quarterback a run play with a quick pass option, reading a specific defender to decide whether to hand off or throw based on their action.',
    points: 12,
    concepts: ['RPO', 'run-pass-option', 'quarterback-reads', 'modern-offense']
  },
  'adv-hard-41': {
    id: 'adv-hard-41',
    category: 'advanced',
    difficulty: 'hard',
    question: 'What is "press coverage" versus "off coverage"?',
    options: [
      'Press coverage is aggressive, off coverage is passive',
      'Press coverage plays physical at the line; off coverage gives a cushion',
      'They are the same thing',
      'Press coverage is only used on first down'
    ],
    correct: 1,
    explanation: 'Press coverage has the cornerback lined up close to disrupt the receiver at the line, while off coverage gives the receiver space with a cushion.',
    points: 12,
    concepts: ['press-coverage', 'off-coverage', 'cornerback-techniques']
  },
  'adv-hard-42': {
    id: 'adv-hard-42',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is a "naked bootleg"?',
    options: [
      'A bootleg with no protection',
      'A bootleg where the QB rolls out with no extra blockers, opposite the play fake',
      'An illegal play',
      'A trick play with no receivers'
    ],
    correct: 1,
    explanation: 'A naked bootleg has the QB roll out opposite the play action without pulling blockers, relying on misdirection to freeze defenders.',
    points: 12,
    concepts: ['naked-bootleg', 'bootleg', 'play-action', 'quarterback-mobility']
  },
  'adv-hard-43': {
    id: 'adv-hard-43',
    category: 'positions',
    difficulty: 'hard',
    question: 'What is a "nose-to-nose" technique for offensive linemen?',
    options: [
      'Blocking face-to-face',
      'Aligning directly across from the defender (0-technique or head-up)',
      'A coaching drill',
      'An illegal blocking technique'
    ],
    correct: 1,
    explanation: 'Nose-to-nose (0-technique or head-up) means the offensive lineman is aligned directly across from a defender, as opposed to shaded to one side.',
    points: 12,
    concepts: ['alignment', 'offensive-line-techniques', '0-technique']
  },
  'adv-hard-44': {
    id: 'adv-hard-44',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is "bunch formation" strategy?',
    options: [
      'Putting all receivers on one side',
      'Grouping multiple receivers close together to create picks and confusion',
      'Bunching offensive linemen together',
      'A defensive strategy'
    ],
    correct: 1,
    explanation: 'Bunch formation groups 2-3 receivers close together to create natural picks, spacing issues for man coverage, and confusion in zone coverage.',
    points: 12,
    concepts: ['bunch-formation', 'receiver-spacing', 'formation-strategy']
  },
  'adv-hard-45': {
    id: 'adv-hard-45',
    category: 'advanced',
    difficulty: 'hard',
    question: 'What is a "spy" in defensive football?',
    options: [
      'A coach watching film',
      'A defender assigned to shadow and contain a mobile quarterback',
      'A safety playing deep',
      'A cornerback in man coverage'
    ],
    correct: 1,
    explanation: 'A spy (usually a linebacker or safety) is assigned to watch and contain a mobile quarterback, staying disciplined to prevent scrambles.',
    points: 12,
    concepts: ['spy', 'QB-spy', 'mobile-quarterback-defense', 'containment']
  },
  'adv-hard-46': {
    id: 'adv-hard-46',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is "tempo" offense?',
    options: [
      'Playing music during the game',
      'Running plays quickly without huddle to tire the defense and prevent substitutions',
      'Slow, methodical offense',
      'Only passing plays'
    ],
    correct: 1,
    explanation: 'Tempo offense (no-huddle, hurry-up) runs plays quickly to keep the defense from substituting personnel and to tire them out physically and mentally.',
    points: 12,
    concepts: ['tempo-offense', 'no-huddle', 'hurry-up', 'pace']
  },
  'adv-hard-47': {
    id: 'adv-hard-47',
    category: 'positions',
    difficulty: 'hard',
    question: 'What is a "gunner" on special teams?',
    options: [
      'The player who snaps the ball',
      'A fast player who runs down the field on punts to tackle the returner',
      'The kicker',
      'A defensive back'
    ],
    correct: 1,
    explanation: 'Gunners are fast players who line up outside on punt coverage, tasked with getting downfield quickly to tackle the punt returner.',
    points: 12,
    concepts: ['gunner', 'punt-coverage', 'special-teams']
  },
  'adv-hard-48': {
    id: 'adv-hard-48',
    category: 'advanced',
    difficulty: 'hard',
    question: 'What is "leverage block" in offensive line play?',
    options: [
      'Using proper pad level and hand placement to control a defender',
      'Blocking with a lever',
      'An illegal block',
      'Blocking below the waist'
    ],
    correct: 0,
    explanation: 'A leverage block uses proper pad level, hand placement, and body positioning to gain mechanical advantage and control over a defender.',
    points: 12,
    concepts: ['leverage-block', 'blocking-technique', 'offensive-line']
  },
  'adv-hard-49': {
    id: 'adv-hard-49',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is a "wheel route"?',
    options: [
      'Running in circles',
      'When a back runs up the sideline in a curved pattern',
      'A route shaped like a wheel',
      'A defensive coverage'
    ],
    correct: 1,
    explanation: 'A wheel route has a running back or receiver start toward the flat then break upfield along the sideline, creating a wheel-like pattern.',
    points: 12,
    concepts: ['wheel-route', 'route-concepts', 'running-back-routes']
  },
  'adv-hard-50': {
    id: 'adv-hard-50',
    category: 'advanced',
    difficulty: 'hard',
    question: 'What is "pattern-matching" coverage?',
    options: [
      'Matching uniforms with the opposing team',
      'A hybrid coverage that starts as zone but matches man-to-man based on route patterns',
      'Man coverage only',
      'Zone coverage only'
    ],
    correct: 1,
    explanation: 'Pattern-matching (or match coverage) is a hybrid technique where defenders start in zone but match receivers man-to-man based on their routes entering their zone.',
    points: 12,
    concepts: ['pattern-matching', 'match-coverage', 'hybrid-coverage', 'route-recognition']
  },
  'adv-hard-51': {
    id: 'adv-hard-51',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is a "comeback route"?',
    options: [
      'When a player returns from injury',
      'A route where the receiver runs downfield then breaks back toward the quarterback',
      'A running play',
      'When a team comes back from behind'
    ],
    correct: 1,
    explanation: 'A comeback route has the receiver run 10-15 yards downfield, then plant and break back toward the quarterback at roughly 45 degrees.',
    points: 12,
    concepts: ['comeback-route', 'route-concepts', 'receiver-techniques']
  },
  'adv-hard-52': {
    id: 'adv-hard-52',
    category: 'positions',
    difficulty: 'hard',
    question: 'What is a "jack linebacker" in modern defenses?',
    options: [
      'The backup linebacker',
      'A hybrid defensive end/outside linebacker who can rush or drop into coverage',
      'The middle linebacker',
      'A linebacker who only plays special teams'
    ],
    correct: 1,
    explanation: 'A jack linebacker is a versatile hybrid player who can line up as a defensive end to rush the passer or drop into coverage like a traditional linebacker.',
    points: 12,
    concepts: ['jack-linebacker', 'hybrid-defender', 'versatile-defender']
  },
  'adv-hard-53': {
    id: 'adv-hard-53',
    category: 'advanced',
    difficulty: 'hard',
    question: 'What is a "double move" route?',
    options: [
      'Running the same route twice',
      'A route with two fakes to deceive the defender',
      'Two receivers running the same route',
      'Moving the line of scrimmage twice'
    ],
    correct: 1,
    explanation: 'A double move route uses an initial fake (like a hitch or slant) to get the defender to bite, then breaks in a different direction for the actual route.',
    points: 12,
    concepts: ['double-move', 'route-concepts', 'deception']
  },
  'adv-hard-54': {
    id: 'adv-hard-54',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is "quarters coverage" (Cover 4)?',
    options: [
      'Four defenders covering four receivers',
      'Four deep zone defenders each covering a quarter of the deep field',
      'Coverage used only in the fourth quarter',
      'Four linebackers covering passes'
    ],
    correct: 1,
    explanation: 'Quarters coverage (Cover 4) uses four deep defenders (two corners, two safeties) each responsible for a quarter of the deep field.',
    points: 12,
    concepts: ['cover-4', 'quarters-coverage', 'deep-zone', 'zone-defense']
  },
  'adv-hard-55': {
    id: 'adv-hard-55',
    category: 'advanced',
    difficulty: 'hard',
    question: 'What is "outside zone" blocking scheme?',
    options: [
      'Blocking defenders on the sideline',
      'Linemen stepping laterally to create running lanes outside',
      'Zone coverage by the defense',
      'Blocking only on outside plays'
    ],
    correct: 1,
    explanation: 'Outside zone blocking has offensive linemen step laterally toward the sideline, working in tandem to create running lanes as the back reads the blocks.',
    points: 12,
    concepts: ['outside-zone', 'zone-blocking', 'run-scheme', 'offensive-line']
  },
  'adv-hard-56': {
    id: 'adv-hard-56',
    category: 'positions',
    difficulty: 'hard',
    question: 'What is a "slot corner" or "slot cornerback"?',
    options: [
      'A cornerback who lines up in the slot to cover slot receivers',
      'The third-string cornerback',
      'A cornerback who only plays on the outside',
      'A cornerback position that doesn\'t exist'
    ],
    correct: 0,
    explanation: 'A slot corner is a cornerback who specializes in covering slot receivers from the inside, requiring different skills than outside cornerbacks.',
    points: 12,
    concepts: ['slot-corner', 'nickel-corner', 'slot-coverage']
  },
  'adv-hard-57': {
    id: 'adv-hard-57',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is "inside zone" blocking scheme?',
    options: [
      'Blocking only on inside runs',
      'Linemen stepping inside to create cutback lanes with double teams',
      'Zone coverage inside the numbers',
      'Defensive blocking scheme'
    ],
    correct: 1,
    explanation: 'Inside zone blocking has linemen step inside, often creating double teams and then one lineman peeling off to the second level, creating cutback opportunities.',
    points: 12,
    concepts: ['inside-zone', 'zone-blocking', 'double-teams', 'run-scheme']
  },
  'adv-hard-58': {
    id: 'adv-hard-58',
    category: 'advanced',
    difficulty: 'hard',
    question: 'What is a "seam route"?',
    options: [
      'A route along the stitching of the football',
      'A vertical route up the middle between zones',
      'A route to the sideline',
      'A running play'
    ],
    correct: 1,
    explanation: 'A seam route targets the vertical "seam" between zone defenders, typically run by tight ends or slot receivers up the middle of the field.',
    points: 12,
    concepts: ['seam-route', 'route-concepts', 'zone-beaters']
  },
  'adv-hard-59': {
    id: 'adv-hard-59',
    category: 'strategy',
    difficulty: 'hard',
    question: 'What is a "power run" blocking scheme?',
    options: [
      'Running with more power',
      'A gap scheme with a pulling guard and fullback leading',
      'Only used by powerful running backs',
      'A passing play'
    ],
    correct: 1,
    explanation: 'Power run is a gap blocking scheme where a guard pulls around to lead block, often with a fullback also leading, creating power at the point of attack.',
    points: 12,
    concepts: ['power-run', 'gap-scheme', 'pulling-guard', 'lead-blocking']
  },
  'adv-hard-60': {
    id: 'adv-hard-60',
    category: 'positions',
    difficulty: 'hard',
    question: 'What is a "big nickel" defensive package?',
    options: [
      'Five defensive backs with a safety replacing a linebacker for better run support',
      'A nickel defense with larger players',
      'Six defensive backs',
      'A defensive line package'
    ],
    correct: 0,
    explanation: 'Big nickel uses five defensive backs but replaces a linebacker with a strong safety rather than a corner, providing better run defense while maintaining pass coverage.',
    points: 12,
    concepts: ['big-nickel', 'defensive-package', 'personnel-grouping', 'hybrid-defense']
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