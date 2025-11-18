import React, { useState } from 'react'
import type { Device } from '../../../types'
import './DeviceItem.css'

interface DeviceItemProps {
  device: Device
}

export const DeviceItem = ({ device }: DeviceItemProps) => {
  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    setIsActive(prev => !prev)
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('device', JSON.stringify(device))
  }

  return (
    <div
      onClick={handleClick}
      draggable
      onDragStart={handleDragStart}
      className={`device-item ${isActive ? 'device-item--active' : ''}`}
    >
      {isActive && <div className="device-item__indicator"></div>}

      <img
        src={device.type === 'light' ? 'images/Icon.png' : 'images/fan.png'}
        className="device-item__icon"
        alt={device.type}
      />

      <span className="device-item__name">{device.name}</span>
    </div>
  )
}
