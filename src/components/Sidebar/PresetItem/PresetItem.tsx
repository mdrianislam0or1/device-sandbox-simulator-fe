import React, { useState } from 'react'
import type { Preset } from '../../../types'
import './PresetItem.css'

interface PresetItemProps {
  preset: Preset
}

const PresetItem = ({ preset }: PresetItemProps) => {
  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    setIsActive(prev => !prev)
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('preset', JSON.stringify(preset))
  }

  return (
    <div
      onClick={handleClick}
      draggable
      onDragStart={handleDragStart}
      className={`preset-item ${isActive ? 'preset-item--active' : ''}`}
    >
      {isActive && <div className="preset-item__indicator"></div>}

      <img
        src={preset.devices[0]?.type === 'light' ? 'images/Icon.png' : 'images/fan.png'}
        className="preset-item__icon"
        alt={preset.devices[0]?.type || 'device'}
      />

      <span className="preset-item__name">{preset.name}</span>
    </div>
  )
}

export default PresetItem
