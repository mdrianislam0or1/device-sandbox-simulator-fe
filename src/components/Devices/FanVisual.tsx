import type { DeviceSettings } from '../../types'
import './FanVisual.css'

interface FanVisualProps {
  settings: DeviceSettings
}

export const FanVisual = ({ settings }: FanVisualProps) => {
  const { power, speed = 64 } = settings
  // const rotationDuration = power ? Math.max(0.5, 3 - speed / 50) : 0

  const rotationDuration = power ? Math.max(0.12, 3 - speed / 35) : 0

  return (
    <div className="fan-visual-wrapper">
      <div
        className="fan-visual-container"
        style={{
          animation: power ? `spin ${rotationDuration}s linear infinite` : 'none',
        }}
      >
        {/*top blade*/}
        <img
          src="/images/vertical.png"
          alt="top blade"
          className="fan-blade fan-blade-top"
          style={{
            opacity: power ? 1 : 0.6,
          }}
        />

        {/*bottom blade*/}
        <img
          src="/images/vertical.png"
          alt="bottom blade"
          className="fan-blade fan-blade-bottom"
          style={{
            opacity: power ? 1 : 0.6,
          }}
        />

        {/*left blade*/}
        <img
          src="/images/horizontal.png"
          alt="left blade"
          className="fan-blade fan-blade-left"
          style={{
            opacity: power ? 1 : 0.6,
          }}
        />

        {/*right blade*/}
        <img
          src="/images/horizontal.png"
          alt="right blade"
          className="fan-blade fan-blade-right"
          style={{
            opacity: power ? 1 : 0.6,
          }}
        />

        {/*fan center circle*/}
        <div className="fan-center">
          {/*outer Gradient Ring*/}
          <div className="fan-ring-outer">
            {/*middle ring*/}
            <div className="fan-ring-middle">
              {/*inner circle*/}
              <div className="fan-ring-inner" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}
