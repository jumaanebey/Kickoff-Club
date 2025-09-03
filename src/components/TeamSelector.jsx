import React, { useState, useEffect } from 'react'
import { getProgressData, saveProgress } from '../utils/progressTracker'

const TeamSelector = () => {
  const [progress, setProgress] = useState(getProgressData())
  const [selectedTeam, setSelectedTeam] = useState(progress.user?.favoriteTeam || null)
  const [selectedDivision, setSelectedDivision] = useState('all')
  
  const nflTeams = {
    'AFC East': [
      { id: 'buf', name: 'Buffalo Bills', colors: ['#00338D', '#C60C30'], emoji: '🦬' },
      { id: 'mia', name: 'Miami Dolphins', colors: ['#008E97', '#FC4C02'], emoji: '🐬' },
      { id: 'ne', name: 'New England Patriots', colors: ['#002244', '#C60C30'], emoji: '🎖️' },
      { id: 'nyj', name: 'New York Jets', colors: ['#125740', '#FFFFFF'], emoji: '✈️' }
    ],
    'AFC North': [
      { id: 'bal', name: 'Baltimore Ravens', colors: ['#241773', '#9E7C0C'], emoji: '🐦‍⬛' },
      { id: 'cin', name: 'Cincinnati Bengals', colors: ['#FB4F14', '#000000'], emoji: '🐅' },
      { id: 'cle', name: 'Cleveland Browns', colors: ['#311D00', '#FF3C00'], emoji: '🟤' },
      { id: 'pit', name: 'Pittsburgh Steelers', colors: ['#FFB612', '#101820'], emoji: '⚙️' }
    ],
    'AFC South': [
      { id: 'hou', name: 'Houston Texans', colors: ['#03202F', '#A71930'], emoji: '🤠' },
      { id: 'ind', name: 'Indianapolis Colts', colors: ['#002C5F', '#A2AAAD'], emoji: '🐴' },
      { id: 'jax', name: 'Jacksonville Jaguars', colors: ['#101820', '#D7A22A'], emoji: '🐆' },
      { id: 'ten', name: 'Tennessee Titans', colors: ['#0C2340', '#4B92DB'], emoji: '⚔️' }
    ],
    'AFC West': [
      { id: 'den', name: 'Denver Broncos', colors: ['#FB4F14', '#002244'], emoji: '🐎' },
      { id: 'kc', name: 'Kansas City Chiefs', colors: ['#E31837', '#FFB81C'], emoji: '🏹' },
      { id: 'lv', name: 'Las Vegas Raiders', colors: ['#000000', '#A5ACAF'], emoji: '☠️' },
      { id: 'lac', name: 'Los Angeles Chargers', colors: ['#0080C6', '#FFC20E'], emoji: '⚡' }
    ],
    'NFC East': [
      { id: 'dal', name: 'Dallas Cowboys', colors: ['#041E42', '#869397'], emoji: '⭐' },
      { id: 'nyg', name: 'New York Giants', colors: ['#0B2265', '#A71930'], emoji: '🗽' },
      { id: 'phi', name: 'Philadelphia Eagles', colors: ['#004C54', '#A5ACAF'], emoji: '🦅' },
      { id: 'was', name: 'Washington Commanders', colors: ['#5A1414', '#FFB612'], emoji: '🛡️' }
    ],
    'NFC North': [
      { id: 'chi', name: 'Chicago Bears', colors: ['#0B162A', '#C83803'], emoji: '🐻' },
      { id: 'det', name: 'Detroit Lions', colors: ['#0076B6', '#B0B7BC'], emoji: '🦁' },
      { id: 'gb', name: 'Green Bay Packers', colors: ['#203731', '#FFB612'], emoji: '🧀' },
      { id: 'min', name: 'Minnesota Vikings', colors: ['#4F2683', '#FFC62F'], emoji: '⚔️' }
    ],
    'NFC South': [
      { id: 'atl', name: 'Atlanta Falcons', colors: ['#A71930', '#000000'], emoji: '🦅' },
      { id: 'car', name: 'Carolina Panthers', colors: ['#0085CA', '#101820'], emoji: '🐾' },
      { id: 'no', name: 'New Orleans Saints', colors: ['#D3BC8D', '#101820'], emoji: '⚜️' },
      { id: 'tb', name: 'Tampa Bay Buccaneers', colors: ['#D50A0A', '#34302B'], emoji: '🏴‍☠️' }
    ],
    'NFC West': [
      { id: 'ari', name: 'Arizona Cardinals', colors: ['#97233F', '#000000'], emoji: '🐦' },
      { id: 'lar', name: 'Los Angeles Rams', colors: ['#003594', '#FFA300'], emoji: '🐏' },
      { id: 'sf', name: 'San Francisco 49ers', colors: ['#AA0000', '#B3995D'], emoji: '⛏️' },
      { id: 'sea', name: 'Seattle Seahawks', colors: ['#002244', '#69BE28'], emoji: '🦅' }
    ]
  }
  
  const handleTeamSelect = (team) => {
    setSelectedTeam(team)
    
    // Save to progress
    const updatedProgress = { ...progress }
    if (!updatedProgress.user) {
      updatedProgress.user = {}
    }
    updatedProgress.user.favoriteTeam = team
    saveProgress(updatedProgress)
    setProgress(updatedProgress)
  }
  
  const getFilteredTeams = () => {
    if (selectedDivision === 'all') {
      return Object.entries(nflTeams).flatMap(([division, teams]) => 
        teams.map(team => ({ ...team, division }))
      )
    }
    return nflTeams[selectedDivision]?.map(team => ({ ...team, division: selectedDivision })) || []
  }
  
  const filteredTeams = getFilteredTeams()
  
  // Team-specific content recommendations
  const getTeamContent = (teamId) => {
    const teamContent = {
      kc: {
        highlight: "Patrick Mahomes' QB Mastery",
        lessons: ['quarterback-101', 'two-minute-drill'],
        fact: "The Chiefs have won 3 Super Bowls with Andy Reid as coach"
      },
      buf: {
        highlight: "Josh Allen's Dual-Threat Style",
        lessons: ['quarterback-101', 'red-zone-strategy'],
        fact: "The Bills Mafia is one of the most passionate fanbases in pro football"
      },
      dal: {
        highlight: "America's Team Legacy",
        lessons: ['offensive-line-basics', 'defensive-strategy'],
        fact: "The Cowboys have won 5 Super Bowls and have the most valuable franchise"
      },
      gb: {
        highlight: "The Frozen Tundra",
        lessons: ['cold-weather-strategy', 'quarterback-101'],
        fact: "Lambeau Field is the oldest continually occupied stadium in pro football"
      },
      // Add more team-specific content as needed
      default: {
        highlight: "Team History & Strategy",
        lessons: ['how-downs-work', 'scoring-touchdowns'],
        fact: "Every pro football team has a unique history and playing style"
      }
    }
    
    return teamContent[teamId] || teamContent.default
  }
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg border border-sage-200">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-secondary-100 mb-2">
          🏈 Choose Your Team
        </h3>
        <p className="text-secondary-300">
          Get personalized content and track your team's learning path
        </p>
      </div>
      
      {/* Current Team Display */}
      {selectedTeam && (
        <div 
          className="mb-6 p-4 rounded-lg border-2"
          style={{ 
            backgroundColor: selectedTeam.colors[0] + '15',
            borderColor: selectedTeam.colors[0]
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-3xl mr-3">{selectedTeam.emoji}</span>
              <div>
                <h4 className="font-bold text-navy">{selectedTeam.name}</h4>
                <p className="text-sm text-gray-600">Your favorite team</p>
              </div>
            </div>
            <div className="flex gap-2">
              {selectedTeam.colors.map((color, index) => (
                <div 
                  key={index}
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
          </div>
          
          {/* Team-specific content */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h5 className="font-bold text-sm text-navy mb-2">
              {getTeamContent(selectedTeam.id).highlight}
            </h5>
            <p className="text-xs text-gray-600 mb-3">
              💡 {getTeamContent(selectedTeam.id).fact}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 bg-white rounded-full text-gray-700">
                📚 Recommended lessons based on your team
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Division Filter */}
      <div className="mb-4">
        <select 
          value={selectedDivision}
          onChange={(e) => setSelectedDivision(e.target.value)}
          className="w-full border border-sage-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sage-500"
        >
          <option value="all">All Teams</option>
          <optgroup label="AFC">
            <option value="AFC East">AFC East</option>
            <option value="AFC North">AFC North</option>
            <option value="AFC South">AFC South</option>
            <option value="AFC West">AFC West</option>
          </optgroup>
          <optgroup label="NFC">
            <option value="NFC East">NFC East</option>
            <option value="NFC North">NFC North</option>
            <option value="NFC South">NFC South</option>
            <option value="NFC West">NFC West</option>
          </optgroup>
        </select>
      </div>
      
      {/* Team Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-96 overflow-y-auto">
        {filteredTeams.map((team) => {
          const isSelected = selectedTeam?.id === team.id
          
          return (
            <button
              key={team.id}
              onClick={() => handleTeamSelect(team)}
              className={`p-3 rounded-lg border-2 transition-all hover:shadow-md ${
                isSelected 
                  ? 'ring-2 ring-sage-500 shadow-lg' 
                  : 'hover:border-sage-300'
              }`}
              style={{
                borderColor: isSelected ? team.colors[0] : '#e5e7eb',
                backgroundColor: isSelected ? team.colors[0] + '10' : 'white'
              }}
            >
              <div className="text-2xl mb-1">{team.emoji}</div>
              <div className="text-xs font-medium text-gray-900">
                {team.name.split(' ').pop()}
              </div>
              {team.division && (
                <div className="text-xs text-gray-500 mt-1">
                  {team.division}
                </div>
              )}
            </button>
          )
        })}
      </div>
      
      {/* Team Learning Paths */}
      {selectedTeam && (
        <div className="mt-6 p-4 bg-sage-50 rounded-lg">
          <h4 className="font-bold text-navy mb-3">🎯 Your Team's Learning Path</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-white rounded">
              <span className="text-sm">Learn your team's offensive strategy</span>
              <span className="text-xs px-2 py-1 bg-sage-500 text-white rounded">Start</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white rounded">
              <span className="text-sm">Understand your rival teams</span>
              <span className="text-xs px-2 py-1 bg-gray-300 text-gray-600 rounded">Locked</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white rounded">
              <span className="text-sm">Master your team's signature plays</span>
              <span className="text-xs px-2 py-1 bg-gray-300 text-gray-600 rounded">Locked</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Fun Fact */}
      <div className="mt-6 p-3 bg-warmGold bg-opacity-10 rounded-lg border border-warmGold">
        <p className="text-xs text-gray-700">
          <strong>Did you know?</strong> Learning with your favorite team increases retention by 40%! 
          Team-specific examples help you connect concepts to real games you watch.
        </p>
      </div>
    </div>
  )
}

export default TeamSelector