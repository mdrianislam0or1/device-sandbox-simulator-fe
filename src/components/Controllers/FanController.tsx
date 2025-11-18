import type { CanvasDevice } from '../../types'
import './FanController.css'

interface FanControllerProps {
  device: CanvasDevice
  onUpdate: (updates: Partial<CanvasDevice>) => void
}

export const FanController = ({ device, onUpdate }: FanControllerProps) => {
  const isMaxSpeed = device.settings.power && device.settings.speed === 100
  const toggleActiveColor = isMaxSpeed ? '#030213' : '#2B7FFF'
  const sliderThumbBorder = isMaxSpeed ? '#030213' : '#2B7FFF'

  return (
    <div className="fan-controller">
      <div className="fan-controller__power">
        <span className="fan-controller__label">Power</span>
        <button
          onClick={() =>
            onUpdate({
              settings: {
                ...device.settings,
                power: !device.settings.power,
              },
            })
          }
          className="fan-controller__toggle"
          style={{
            background: device.settings.power ? toggleActiveColor : '#CBCED4',
          }}
        >
          <div
            className="fan-controller__toggle-thumb"
            style={{
              transform: device.settings.power ? 'translateX(16px)' : 'translateX(2px)',
            }}
          />
        </button>
      </div>

      <div className="fan-controller__speed">
        <div className="fan-controller__speed-header">
          <label className="fan-controller__label">Speed</label>
          <span className="fan-controller__speed-value">{device.settings.speed || 64}%</span>
        </div>
        <div className="fan-controller__slider-container">
          <div className="fan-controller__slider-bg" />
          <div
            className="fan-controller__slider-active"
            style={{
              width: `${device.settings.speed || 64}%`,
              background: isMaxSpeed ? '#030213' : '#2B7FFF',
            }}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={device.settings.speed || 64}
            onChange={e =>
              onUpdate({
                settings: {
                  ...device.settings,
                  speed: Number.parseInt(e.target.value),
                },
              })
            }
            className="fan-controller__slider-input"
            style={
              {
                '--slider-thumb-border': sliderThumbBorder,
              } as React.CSSProperties
            }
          />
        </div>
      </div>
    </div>
  )
}
