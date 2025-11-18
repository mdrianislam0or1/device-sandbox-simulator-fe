import type { CanvasDevice } from '../../types'
import './LightController.css'

interface LightControllerProps {
  device: CanvasDevice
  onUpdate: (updates: Partial<CanvasDevice>) => void
}

export const LightController = ({ device, onUpdate }: LightControllerProps) => {
  const colors = [
    { id: 'warm', color: '#FFE5B4' },
    { id: 'neutral', color: '#F0F8FF' },
    { id: 'cool', color: '#87CEEB' },
    { id: 'pink', color: '#FFB6C1' },
  ]

  const getCardOpacity = () => {
    const brightness = device.settings?.brightness
    const power = device.settings?.power

    if (!power || brightness === 0 || brightness == null) {
      return 0.4
    }

    return 0.4 + (brightness / 100) * 0.6
  }

  const cardOpacity = getCardOpacity()
  const isMaxBrightness = device.settings.power && device.settings.brightness === 100
  const toggleActiveColor = isMaxBrightness ? '#1A1A1A' : '#2B7FFF'
  const sliderThumbBorder = isMaxBrightness ? '#1A1A1A' : '#2B7FFF'

  return (
    <div className="light-controller">
      <div className="light-controller__power">
        <span className="light-controller__label">Power</span>
        <button
          onClick={() =>
            onUpdate({
              settings: {
                ...device.settings,
                power: !device.settings.power,
              },
            })
          }
          className="light-controller__toggle"
          style={{
            background: device.settings.power ? toggleActiveColor : '#CBCED4',
          }}
        >
          <div
            className="light-controller__toggle-thumb"
            style={{
              transform: device.settings.power ? 'translateX(14px)' : 'translateX(2px)',
            }}
          />
        </button>
      </div>

      <div className="light-controller__colors">
        <label className="light-controller__label">Color Temperature</label>
        <div className="light-controller__color-grid">
          {colors.map(({ id, color }) => (
            <button
              key={id}
              onClick={() =>
                onUpdate({
                  settings: {
                    ...device.settings,
                    temperature: id as 'warm' | 'neutral' | 'cool' | 'pink',
                  },
                })
              }
              className={`light-controller__color-btn ${
                device.settings.temperature === id ? 'light-controller__color-btn--active' : ''
              }`}
              style={{
                background: color,
                opacity: device.settings.temperature === id ? 1 : cardOpacity,
                borderColor: device.settings.temperature === id ? '#2B7FFF' : '#4A5565',
                boxShadow:
                  device.settings.temperature === id ? '0px 0px 0px 2px #2B7FFF80' : 'none',
              }}
            />
          ))}
        </div>
      </div>

      <div className="light-controller__brightness">
        <div className="light-controller__brightness-header">
          <label className="light-controller__label">Brightness</label>
          <span className="light-controller__brightness-value">{device.settings.brightness}%</span>
        </div>
        <div className="light-controller__slider-container">
          <div className="light-controller__slider-bg" />
          <div
            className="light-controller__slider-active"
            style={{
              width: `${device.settings.brightness}%`,
              background: isMaxBrightness ? '#1A1A1A' : '#2B7FFF',
            }}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={device.settings.brightness || 70}
            onChange={e =>
              onUpdate({
                settings: {
                  ...device.settings,
                  brightness: Number.parseInt(e.target.value),
                },
              })
            }
            className="light-controller__slider-input"
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
