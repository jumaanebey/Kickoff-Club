import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useSimpleRouter } from '../App'
import { allLessons } from '../data/lessonsIndex'

// Lesson icons mapping
const lessonIcons = {
  'how-downs-work': '🏈',
  'scoring-touchdowns': '🎯',
  'field-layout-basics': '📏',
  'nfl-seasons-playoffs': '🏆',
  'quarterback-101': '🎯',
  'offensive-positions': '⚡',
  'defensive-positions': '🛡️',
  'special-teams-basics': '👟',
  'timeouts-and-clock': '⏱️',
  'understanding-penalties': '🚩'
}

const SimplePlatform = () => {
  const { state, actions } = useApp()
  const { navigate } = useSimpleRouter()
  const [selectedLesson, setSelectedLesson] = useState(null)

  // Use actual lesson data from lessonsIndex
  const lessons = allLessons.map(lesson => ({
    id: lesson.id,
    title: lesson.title,
    subtitle: lesson.subtitle,
    preview: lesson.preview,
    completed: state.user?.progress?.lessons?.completed?.includes(lesson.id) || false,
    hasVideo: true,
    difficulty: lesson.difficulty,
    duration: lesson.duration
  }))

  const completedCount = lessons.filter(l => l.completed).length
  const progressPercent = Math.round((completedCount / lessons.length) * 100)

  // Simple lesson content
  const getLessonContent = (id) => {
    const content = {
      'how-downs-work': {
        title: 'How Downs Work',
        content: `
          <h2>Understanding Downs: The Heart of Football 🏈</h2>
          <p>If you understand downs, you understand football. It's that simple - and that important!</p>

          <h3>What Are Downs?</h3>
          <p>A "down" is simply an attempt to move the ball forward. Every time the offense starts a play, that's one down. The offense gets <strong>4 downs (attempts) to move the ball 10 yards forward</strong>.</p>

          <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>💡 The Simple Rule</h4>
            <p><strong>4 chances to go 10 yards.</strong> If you succeed, you get 4 more chances. If you fail after 4 tries, the other team gets the ball.</p>
          </div>

          <h3>How It Works</h3>
          <ul>
            <li><strong>1st Down:</strong> You have 10 yards to go. If you gain 3 yards, now it's 2nd down and 7 yards to go.</li>
            <li><strong>2nd Down:</strong> If you gain 5 more yards, now it's 3rd down and 2 yards to go.</li>
            <li><strong>3rd Down:</strong> This is crucial! If you don't get those 2 yards, you face 4th down.</li>
            <li><strong>4th Down:</strong> Most teams punt (kick the ball away) to give the opponent bad field position instead of risking turnover.</li>
          </ul>

          <div style="background: #ecfdf5; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>🎯 Why This Matters</h4>
            <p>Downs create drama! "3rd and long" (needing many yards) is tense. "4th and inches" (needing less than a yard) means big decisions. This rhythm makes every play meaningful.</p>
          </div>

          <h3>What You'll Hear</h3>
          <ul>
            <li><strong>"1st and 10"</strong> - First down, 10 yards to go</li>
            <li><strong>"3rd and long"</strong> - Third down, lots of yards needed (usually 7+)</li>
            <li><strong>"4th and goal"</strong> - Fourth down at the goal line</li>
          </ul>
        `
      },
      'scoring-touchdowns': {
        title: 'Scoring Touchdowns',
        content: `
          <h2>How Teams Score Touchdowns 🏆</h2>
          <p>Touchdowns are the most exciting plays in football - here's how they work!</p>

          <h3>What Is a Touchdown?</h3>
          <p>A touchdown happens when a player carries the ball into the opponent's end zone OR catches a pass while standing in the end zone. The ball just needs to "break the plane" (cross the goal line) - even by an inch!</p>

          <div style="background: #fef3c7; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>⭐ Points Breakdown</h4>
            <p><strong>Touchdown = 6 points</strong><br/>Then you get a bonus attempt for 1 or 2 more points!</p>
          </div>

          <h3>Ways to Score a Touchdown</h3>
          <ul>
            <li><strong>Running:</strong> A player runs with the ball into the end zone</li>
            <li><strong>Passing:</strong> A receiver catches the ball while in the end zone (both feet must be in bounds!)</li>
            <li><strong>Fumble Recovery:</strong> Pick up a dropped ball in the end zone</li>
            <li><strong>Interception Return:</strong> Defense catches opponent's pass and runs it back</li>
          </ul>

          <h3>After the Touchdown: Extra Points</h3>
          <p>After scoring a touchdown, teams choose one of two options:</p>
          <ul>
            <li><strong>Extra Point (PAT):</strong> Kick the ball through the goalposts from the 15-yard line = 1 point (almost always successful)</li>
            <li><strong>2-Point Conversion:</strong> Run or pass the ball into the end zone from the 2-yard line = 2 points (risky but rewarding!)</li>
          </ul>

          <div style="background: #ecfdf5; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>🎯 Strategic Insight</h4>
            <p>Most teams kick the extra point (easy 7 total). They only "go for 2" when trailing late in the game or when the math says it's worth the risk!</p>
          </div>
        `
      },
      'understanding-penalties': {
        title: 'Understanding Penalties',
        content: `
          <h2>Penalties: Yellow Flags Explained 🚩</h2>
          <p>When you see a yellow flag fly, someone broke a rule. Here's what you need to know!</p>

          <h3>What Happens When There's a Penalty?</h3>
          <p>Referees throw a yellow flag on the field. Play continues until it ends, then refs explain the penalty. The team that got hurt by the foul can usually choose to accept it (moving the ball) or decline it (if the play went well for them anyway).</p>

          <div style="background: #fef3c7; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>⚡ Quick Guide</h4>
            <p><strong>5 yards</strong> = Minor penalty (false start, delay of game)<br/>
            <strong>10 yards</strong> = Medium penalty (holding, illegal block)<br/>
            <strong>15 yards</strong> = Major penalty (personal foul, roughing the passer)</p>
          </div>

          <h3>Most Common Penalties</h3>
          <ul>
            <li><strong>False Start (5 yards):</strong> Offensive player moves before the ball is snapped</li>
            <li><strong>Holding (10 yards):</strong> Grabbing/hooking a player to slow them down</li>
            <li><strong>Pass Interference (spot foul):</strong> Blocking a receiver from catching the ball</li>
            <li><strong>Offsides (5 yards):</strong> Being on wrong side of the ball when it's snapped</li>
            <li><strong>Roughing the Passer (15 yards):</strong> Hitting QB after they've thrown the ball</li>
            <li><strong>Delay of Game (5 yards):</strong> Not snapping the ball before play clock expires</li>
          </ul>

          <h3>What Refs Say</h3>
          <p>After a penalty, the referee makes hand signals and announces: <em>"Holding, offense, number 72. 10-yard penalty. Repeat 2nd down."</em></p>

          <div style="background: #ecfdf5; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>🎯 Why Penalties Matter</h4>
            <p>A penalty at the wrong time can kill a drive or extend the opponent's drive. "Drive-killing penalty" = stopping your own team's momentum. "Automatic first down" = some defensive penalties give offense a fresh set of downs!</p>
          </div>
        `
      },
      'special-teams-basics': {
        title: 'Special Teams Explained',
        content: `
          <h2>Special Teams: The Third Phase of Football ⚡</h2>
          <p>Special teams handle kicks - and they can change the game in one explosive play!</p>

          <h3>What Are Special Teams?</h3>
          <p>Any time there's a kick, special teams take the field. These are specialists who practice kicking, catching kicks, and covering/returning kicks. It's called the "third phase" (offense, defense, special teams).</p>

          <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>💡 Three Main Situations</h4>
            <p><strong>Kickoffs</strong> (starting drives), <strong>Punts</strong> (giving up the ball on 4th down), and <strong>Field Goals</strong> (scoring without a touchdown)</p>
          </div>

          <h3>Types of Special Teams Plays</h3>
          <ul>
            <li><strong>Kickoff:</strong> Starts each half and happens after scores. Kicker boots it deep, returner catches and runs it back.</li>
            <li><strong>Punt:</strong> On 4th down, instead of going for it, team kicks the ball away to pin opponent deep in their own territory.</li>
            <li><strong>Field Goal:</strong> Kicking the ball through the uprights from anywhere on the field = 3 points. Harder the farther you are!</li>
            <li><strong>Extra Point:</strong> The kick after a touchdown (from the 15-yard line) = 1 point.</li>
          </ul>

          <h3>Field Goal Distance</h3>
          <p>Field goals are measured from where the ball is kicked (7 yards behind line of scrimmage) plus the 10-yard end zone. So kicking from the opponent's 30-yard line = 47-yard field goal attempt!</p>

          <div style="background: #ecfdf5; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>🎯 Why Special Teams Win Games</h4>
            <p>A blocked punt returned for a TD. A 60-yard field goal as time expires. A kickoff return to the house. These game-changers happen multiple times per season - and they're all special teams!</p>
          </div>

          <h3>Key Players</h3>
          <ul>
            <li><strong>Kicker:</strong> Handles kickoffs, field goals, extra points</li>
            <li><strong>Punter:</strong> Punts on 4th down to flip field position</li>
            <li><strong>Long Snapper:</strong> Snaps the ball back to holder/punter (harder than it looks!)</li>
            <li><strong>Returner:</strong> Catches punts/kickoffs and runs them back</li>
          </ul>
        `
      },
      'field-layout-basics': {
        title: 'Field Layout Basics',
        content: `
          <h2>Understanding the Football Field 🏟️</h2>
          <p>The football field is a 120-yard battlefield with clear zones and markings - here's your map!</p>

          <h3>Field Dimensions</h3>
          <ul>
            <li><strong>100 yards long</strong> - From goal line to goal line</li>
            <li><strong>10-yard end zones</strong> - One at each end (where touchdowns happen)</li>
            <li><strong>53⅓ yards wide</strong> - Narrower than you might think!</li>
            <li><strong>120 yards total</strong> - Including both end zones</li>
          </ul>

          <div style="background: #fef3c7; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>📏 The Yard Lines</h4>
            <p>Every 5 yards has a white line. The <strong>50-yard line</strong> is midfield. Numbers count down as you approach each end zone (50, 40, 30, 20, 10, Goal).</p>
          </div>

          <h3>Important Field Zones</h3>
          <ul>
            <li><strong>Red Zone:</strong> Inside the opponent's 20-yard line. Offenses are expected to score here!</li>
            <li><strong>Midfield:</strong> The 50-yard line - great field position, either team could score</li>
            <li><strong>Own Territory:</strong> Your half of the field (backs against the wall)</li>
            <li><strong>Opponent Territory:</strong> Their half - you're threatening to score</li>
            <li><strong>End Zone:</strong> The promised land! Get the ball here = touchdown</li>
          </ul>

          <h3>The Markings</h3>
          <ul>
            <li><strong>Hash Marks:</strong> Short lines at each yard marking where the ball is placed</li>
            <li><strong>Sidelines:</strong> Out of bounds - step on the white and you're out</li>
            <li><strong>Goal Line:</strong> The line you must cross for a touchdown</li>
            <li><strong>Goal Posts:</strong> Yellow uprights at the back of each end zone (18.5 feet wide)</li>
          </ul>

          <div style="background: #ecfdf5; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>🎯 Field Position Matters</h4>
            <p>Starting at your own 20 = Long way to go. Starting at opponent's 40 = Already in field goal range! Coaches obsess over field position because it determines probability of scoring.</p>
          </div>
        `
      },
      'quarterback-101': {
        title: 'Quarterback 101',
        content: `
          <h2>The Quarterback: Field General 🎯</h2>
          <p>The QB is the most important player on the field - here's why and what they do!</p>

          <h3>What Does the Quarterback Do?</h3>
          <p>The quarterback is the leader of the offense. They receive the play call from coaches, adjust it at the line based on what the defense is showing, take the snap, and either hand off the ball, throw a pass, or run with it themselves.</p>

          <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>💡 Every Play Starts Here</h4>
            <p>The center snaps the ball between their legs to the QB, who stands directly behind them. This starts every offensive play!</p>
          </div>

          <h3>QB Responsibilities</h3>
          <ul>
            <li><strong>Read the Defense:</strong> Identify what coverage/blitz is coming before the snap</li>
            <li><strong>Call Audibles:</strong> Change the play at the line if needed ("Omaha! Omaha!")</li>
            <li><strong>Execute the Play:</strong> Hand off, throw accurately, or scramble when needed</li>
            <li><strong>Protect the Football:</strong> Don't throw interceptions or fumble - ever</li>
            <li><strong>Lead the Team:</strong> Communicate, motivate, command respect</li>
          </ul>

          <h3>Types of Quarterbacks</h3>
          <ul>
            <li><strong>Pocket Passer:</strong> Stays protected behind offensive line, throws with precision (Tom Brady, Peyton Manning)</li>
            <li><strong>Dual Threat:</strong> Can throw AND run effectively (Lamar Jackson, Josh Allen)</li>
            <li><strong>Scrambler:</strong> Extends plays with legs when pocket breaks down (Patrick Mahomes, Russell Wilson)</li>
            <li><strong>Game Manager:</strong> Won't lose the game, relies on running game and defense (Trent Dilfer style)</li>
          </ul>

          <div style="background: #ecfdf5; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>🎯 Why QBs Get Paid</h4>
            <p>Elite QBs can carry teams. They process information instantly, make split-second decisions under pressure, and deliver accurate throws with 300-pound defenders bearing down. It's the hardest job in sports - that's why great QBs make $40-50M per year!</p>
          </div>

          <h3>QB Stats to Know</h3>
          <ul>
            <li><strong>Completion %:</strong> How many passes they complete vs. attempt (65%+ is good)</li>
            <li><strong>Yards per Attempt:</strong> How far they throw on average (7.5+ is elite)</li>
            <li><strong>TD/INT Ratio:</strong> Touchdowns vs. Interceptions (want way more TDs!)</li>
            <li><strong>Passer Rating:</strong> Overall efficiency score (100+ is excellent, 158.3 is perfect)</li>
          </ul>
        `
      },
      'timeouts-and-clock': {
        title: 'Timeouts & Clock Management',
        content: `
          <h2>Mastering Time: The Chess Match ⏱️</h2>
          <p>Great teams don't just move the ball - they control the clock. Here's how time management wins games!</p>

          <h3>How the Game Clock Works</h3>
          <p>Each game has four 15-minute quarters (60 minutes total). But the clock doesn't run continuously - it stops for incomplete passes, out of bounds, penalties, timeouts, scores, and more. This is why games take 3+ hours!</p>

          <div style="background: #fef3c7; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>⏰ When the Clock Stops</h4>
            <p><strong>Incomplete pass</strong> (ball hits ground)<br/>
            <strong>Player runs out of bounds</strong><br/>
            <strong>Penalty</strong><br/>
            <strong>Timeout called</strong><br/>
            <strong>Score or turnover</strong><br/>
            <strong>Injury</strong><br/>
            <strong>Two-minute warning</strong> (automatic in each half)</p>
          </div>

          <h3>Timeouts: Your Most Valuable Resource</h3>
          <p>Each team gets <strong>3 timeouts per half</strong>. Once you use them, they're gone until halftime (then you get 3 more for the second half). Coaches must decide: Save them for the end? Or use them early to avoid delay penalties or bad plays?</p>

          <h3>Strategic Uses for Timeouts</h3>
          <ul>
            <li><strong>Stop the Clock:</strong> Preserve time when trailing late in the game</li>
            <li><strong>Ice the Kicker:</strong> Call timeout right before opponent's field goal to make them think/stress</li>
            <li><strong>Avoid Penalty:</strong> Can't get play off in time? Timeout prevents delay of game</li>
            <li><strong>Adjust Strategy:</strong> See something confusing? Regroup with a timeout</li>
          </ul>

          <div style="background: #f0f9ff; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>🚨 The Two-Minute Warning</h4>
            <p>At exactly 2:00 left in each half, the ref stops play for a "two-minute warning." This is an automatic timeout that gives both teams a chance to strategize for the final push.</p>
          </div>

          <h3>Clock Management Strategy</h3>
          <p><strong>When Winning:</strong> Run the ball (clock keeps running), take your time at the line, use all 40 seconds of play clock. Bleed that clock!</p>
          <p><strong>When Losing:</strong> Throw passes (incomplete stops clock), get out of bounds, spike the ball, use timeouts wisely. Every second matters!</p>

          <div style="background: #ecfdf5; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h4>🎯 Why This Wins Championships</h4>
            <p>Poor clock management loses games. Great QBs/coaches know exactly when to hurry, when to slow down, and when to burn a timeout. Watch how elite teams operate in the final 2 minutes - it's poetry!</p>
          </div>

          <h3>Play Clock vs. Game Clock</h3>
          <ul>
            <li><strong>Game Clock:</strong> The official time remaining in the quarter/game</li>
            <li><strong>Play Clock:</strong> 40 seconds (or 25 after certain stoppages) to snap the ball or get a delay penalty</li>
          </ul>
        `
      }
    }

    return content[id] || {
      title: 'Coming Soon',
      content: '<p>This lesson is being developed. Check back soon!</p>'
    }
  }

  if (selectedLesson) {
    const lesson = getLessonContent(selectedLesson)
    return (
      <div className="min-h-screen bg-gradient-to-br from-blush-50 to-sage-50">
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-blush-200 p-10">
            <button 
              onClick={() => setSelectedLesson(null)}
              className="flex items-center text-blush-600 hover:text-blush-700 mb-8 font-medium transition-colors duration-200"
            >
              ← Back to Library
            </button>
            
            <div className="prose prose-lg max-w-none prose-headings:text-secondary-100 prose-p:text-secondary-200 prose-li:text-secondary-200 prose-strong:text-secondary-100" dangerouslySetInnerHTML={{ __html: lesson.content }} />
            
            <div className="border-t border-blush-100 mt-10 pt-8 text-center">
              <p className="text-secondary-200 mb-4">Nice work reading through this! 🎉</p>
              <button 
                onClick={() => setSelectedLesson(null)}
                className="px-8 py-3 bg-gradient-to-r from-blush-500 to-sage-500 text-white rounded-xl font-semibold hover:from-blush-600 hover:to-sage-600 transition-all duration-200 transform hover:scale-105"
              >
                ✨ Continue Your Journey
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blush-50 to-sage-50">
      <div className="max-w-4xl mx-auto p-6">

        {/* Beautiful Lesson List */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-blush-200">
          <div className="p-8 border-b border-blush-100">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-secondary-100 mb-3">🎥 Football Video Lessons</h1>
              <p className="text-lg text-secondary-200">Watch bite-sized videos to master football fundamentals. Read the article if you prefer!</p>
            </div>
          </div>
        
          <div className="divide-y divide-blush-100">
            {lessons.map((lesson, index) => (
              <div key={lesson.id} className="p-8 hover:bg-blush-50/30 transition-colors duration-200 relative overflow-hidden">
                {/* Football field hash marks background */}
                <div className="absolute inset-y-0 right-0 w-24 opacity-5 pointer-events-none">
                  <div className="h-full flex flex-col justify-evenly">
                    <div className="h-px bg-secondary-300"></div>
                    <div className="h-px bg-secondary-300"></div>
                    <div className="h-px bg-secondary-300"></div>
                    <div className="h-px bg-secondary-300"></div>
                    <div className="h-px bg-secondary-300"></div>
                  </div>
                </div>

                <div className="flex items-center relative">
                  <div className="mr-6">
                    {lesson.completed ? (
                      <div className="w-14 h-14 bg-gradient-to-r from-sage-400 to-blush-400 text-white rounded-full flex items-center justify-center text-lg shadow-lg">
                        ✨
                      </div>
                    ) : (
                      <div className="w-14 h-14 bg-gradient-to-r from-blush-100 to-sage-100 text-blush-600 rounded-full flex items-center justify-center text-lg font-bold border-2 border-blush-200">
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-secondary-100 mb-2">{lesson.title}</h3>
                    <p className="text-secondary-200 mb-3">
                      {lesson.completed ? '✨ You nailed this one! • ' : ''}{lesson.subtitle}
                    </p>

                    {/* What you'll learn */}
                    {lesson.preview && lesson.preview["What you'll learn"] && (
                      <div className="mb-4 p-3 bg-primary-50/50 rounded-lg border border-primary-100">
                        <p className="text-xs font-semibold text-accent-600 mb-2">What you'll learn:</p>
                        <ul className="space-y-1">
                          {lesson.preview["What you'll learn"].map((item, idx) => (
                            <li key={idx} className="text-sm text-secondary-200 flex items-start">
                              <span className="text-accent-500 mr-2">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3">
                      {lesson.hasVideo && (
                        <button
                          onClick={() => navigate(`/lesson/${lesson.id}`)}
                          aria-label={`Watch video lesson about ${lesson.title}`}
                          className="px-6 py-2 bg-blush-500 text-white rounded-xl hover:bg-blush-600 transition-all duration-200 transform hover:scale-105 font-medium shadow-sm"
                        >
                          🎥 Watch Video
                        </button>
                      )}
                      <button
                        onClick={() => setSelectedLesson(lesson.id)}
                        aria-label={`Read article about ${lesson.title}`}
                        className="px-6 py-2 bg-white border-2 border-blush-300 text-blush-600 rounded-xl hover:bg-blush-50 hover:border-blush-400 transition-all duration-200 font-medium"
                      >
                        📖 Read Instead
                      </button>
                      <button
                        onClick={() => navigate('/assessment')}
                        aria-label="Take assessment quiz to test your knowledge"
                        className="px-6 py-2 bg-white border-2 border-accent-300 text-accent-600 rounded-xl hover:bg-accent-50 hover:border-accent-400 transition-all duration-200 font-medium"
                      >
                        📝 Take Quiz
                      </button>
                    </div>
                  </div>

                  {/* Large lesson icon on the right */}
                  <div className="ml-6 text-7xl opacity-20 hidden sm:block">
                    {lessonIcons[lesson.id] || '🏈'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimplePlatform