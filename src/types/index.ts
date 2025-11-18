export interface DeviceSettings {
  power: boolean
  brightness?: number
  temperature?: 'warm' | 'neutral' | 'cool' | 'pink'
  speed?: number
}

export interface Device {
  id: number
  type: 'light' | 'fan'
  name: string
  settings: DeviceSettings
}

export interface CanvasDevice extends Device {
  position: {
    x: number
    y: number
  }
}

export interface Preset {
  id: number
  name: string
  devices: CanvasDevice[]
}

export interface DevicesState {
  devices: Device[]
  presets: Preset[]
  canvasDevices: CanvasDevice[]
  selectedDevice: CanvasDevice | null
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface DeviceApiData {
  id: number
  type: 'light' | 'fan'
  name: string
  position_x: number
  position_y: number
  settings: {
    power: boolean
    brightness?: number
    temperature?: 'warm' | 'neutral' | 'cool' | 'pink'
    speed?: number
  }
  created_at: string
  updated_at: string
}

export interface PresetApiData {
  id: number
  name: string
  description: string
  devices: Array<{
    type: 'light' | 'fan'
    name: string
    settings: {
      power: boolean
      brightness?: number
      temperature?: 'warm' | 'neutral' | 'cool' | 'pink'
      speed?: number
    }
    position: {
      x: number
      y: number
    }
  }>
  created_at: string
  updated_at: string
}
