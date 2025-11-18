import type { DeviceSettings } from '../../types'
import './LightVisual.css'

interface LightVisualProps {
  settings: DeviceSettings
  isSelected: boolean
}

export const LightVisual = ({ settings }: LightVisualProps) => {
  const { power, brightness = 70, temperature = 'warm' } = settings

  const colors: Record<string, string> = {
    warm: '#FFD580',
    neutral: '#FFFFFF',
    cool: '#B3E5FC',
    pink: '#FFB3D9',
  }

  const filamentColors: Record<string, { gradient: string; shadow: string }> = {
    warm: {
      gradient: 'linear-gradient(180deg, #FFE5B4 0%, #FFFFFF 100%)',
      shadow: '#FFE5B4',
    },
    neutral: {
      gradient: 'linear-gradient(180deg, #FFFFFF 0%, #F0F0F0 100%)',
      shadow: '#FFFFFF',
    },
    cool: {
      gradient: 'linear-gradient(180deg, #B3E5FC 0%, #FFFFFF 100%)',
      shadow: '#B3E5FC',
    },
    pink: {
      gradient: 'linear-gradient(180deg, #FFB3D9 0%, #FFFFFF 100%)',
      shadow: '#FFB3D9',
    },
  }

  const glowSize = power ? brightness * 6 : 0

  return (
    <div className="light-visual">
      {power && (
        <div
          className="light-visual__glow"
          style={{
            width: `${glowSize}px`,
            height: `${glowSize}px`,
            background: `radial-gradient(circle, ${colors[temperature]}80, transparent)`,
          }}
        />
      )}

      <div className="light-visual__holder">
        <img
          src="/images/cap_top.png"
          alt="cap top"
          className="light-visual__cap light-visual__cap--top"
        />
        <img
          src="/images/cap_bottom.png"
          alt="cap bottom"
          className="light-visual__cap light-visual__cap--bottom"
        />
      </div>

      <div
        className="light-visual__bulb"
        style={{
          background: power
            ? colors[temperature]
            : 'radial-gradient(112.05% 89.64% at 30% 30%, #4A5568 0%, #2D3748 50%, #1A202C 100%)',
          boxShadow: power ? `0 0 40px ${colors[temperature]}` : '0px 0px 20px 0px #00000080 inset',
          opacity: power ? brightness / 100 : 1,
        }}
      >
        {power && (
          <div
            className="light-visual__filament"
            style={{
              background: filamentColors[temperature].gradient,
              boxShadow: `0px 0px 10px 0px ${filamentColors[temperature].shadow}`,
            }}
          />
        )}
      </div>
    </div>
  )
}
