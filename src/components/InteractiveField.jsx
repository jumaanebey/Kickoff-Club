import { useState } from 'react'

const InteractiveField = ({ scenario, onInteraction, className = '' }) => {
  const [selectedZone, setSelectedZone] = useState(null)
  const [hoveredZone, setHoveredZone] = useState(null)

  const fieldZones = [
    { id: 'endzone-left', x: 0, y: 10, width: 60, height: 280, label: 'End Zone', color: 'bg-sage-200' },
    { id: 'field-10', x: 60, y: 10, width: 40, height: 280, label: '10', color: 'bg-green-100' },
    { id: 'field-20', x: 100, y: 10, width: 40, height: 280, label: '20', color: 'bg-green-50' },
    { id: 'field-30', x: 140, y: 10, width: 40, height: 280, label: '30', color: 'bg-green-100' },
    { id: 'field-40', x: 180, y: 10, width: 40, height: 280, label: '40', color: 'bg-green-50' },
    { id: 'field-50', x: 220, y: 10, width: 40, height: 280, label: '50', color: 'bg-yellow-100' },
    { id: 'field-40r', x: 260, y: 10, width: 40, height: 280, label: '40', color: 'bg-green-50' },
    { id: 'field-30r', x: 300, y: 10, width: 40, height: 280, label: '30', color: 'bg-green-100' },
    { id: 'field-20r', x: 340, y: 10, width: 40, height: 280, label: '20', color: 'bg-green-50' },
    { id: 'field-10r', x: 380, y: 10, width: 40, height: 280, label: '10', color: 'bg-green-100' },
    { id: 'endzone-right', x: 420, y: 10, width: 60, height: 280, label: 'End Zone', color: 'bg-blush-200' }
  ]

  const handleZoneClick = (zone) => {
    setSelectedZone(zone.id)
    if (onInteraction) {
      onInteraction(zone)
    }
  }

  return (
    <div className={`interactive-field bg-gray-50 rounded-lg p-4 ${className}`}>
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-navy">
          {scenario?.title || 'Interactive Football Field'}
        </h3>
        {scenario?.instruction && (
          <p className="text-sm text-gray-600 mt-2">{scenario.instruction}</p>
        )}
      </div>

      <div className="relative mx-auto" style={{ width: '480px', height: '300px' }}>
        {/* Field background */}
        <div className="absolute inset-0 bg-green-200 rounded-lg border-2 border-white"></div>
        
        {/* Yard lines and zones */}
        {fieldZones.map(zone => (
          <div
            key={zone.id}
            className={`
              absolute cursor-pointer border border-white/50 flex items-center justify-center
              transition-all duration-200 text-xs font-bold
              ${zone.color} 
              ${selectedZone === zone.id ? 'ring-4 ring-warmGold ring-opacity-60' : ''}
              ${hoveredZone === zone.id ? 'bg-opacity-80 scale-105' : 'bg-opacity-40'}
              hover:bg-opacity-60 hover:scale-105
            `}
            style={{
              left: `${zone.x}px`,
              top: `${zone.y}px`,
              width: `${zone.width}px`,
              height: `${zone.height}px`
            }}
            onClick={() => handleZoneClick(zone)}
            onMouseEnter={() => setHoveredZone(zone.id)}
            onMouseLeave={() => setHoveredZone(null)}
          >
            <span className="text-navy font-bold text-sm">
              {zone.label}
            </span>
          </div>
        ))}

        {/* Goal posts */}
        <div className="absolute top-2 left-4 w-12 h-6 border-b-2 border-navy"></div>
        <div className="absolute top-2 right-4 w-12 h-6 border-b-2 border-navy"></div>
        
        {/* 50 yard line */}
        <div className="absolute top-10 left-240 w-0.5 h-280 bg-navy opacity-60"></div>
      </div>

      {/* Interactive feedback */}
      {selectedZone && (
        <div className="mt-4 p-3 bg-sage-100 rounded-lg">
          <p className="text-sm text-navy">
            <strong>Selected:</strong> {fieldZones.find(z => z.id === selectedZone)?.label} yard line
          </p>
          {scenario?.feedback?.[selectedZone] && (
            <p className="text-sm text-gray-600 mt-1">
              {scenario.feedback[selectedZone]}
            </p>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Click on different parts of the field to explore
        </p>
      </div>
    </div>
  )
}

export default InteractiveField