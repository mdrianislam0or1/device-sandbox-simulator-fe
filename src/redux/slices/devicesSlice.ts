import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { CanvasDevice, Device, DevicesState, Preset } from '../../types'

const demoDevices: Device[] = [
  {
    id: 1,
    type: 'light',
    name: 'Light',
    settings: { power: false, brightness: 70, temperature: 'warm' },
  },
  {
    id: 2,
    type: 'fan',
    name: 'Fan',
    settings: { power: false, speed: 64 },
  },
]

const initialState: DevicesState = {
  devices: demoDevices,
  presets: [],
  canvasDevices: [],
  selectedDevice: null,
}

const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setDevices: (state, action: PayloadAction<Device[]>) => {
      if (action.payload && action.payload.length > 0) {
        state.devices = action.payload
      }
    },

    setCanvasDevices: (state, action: PayloadAction<CanvasDevice[]>) => {
      state.canvasDevices = action.payload
      state.selectedDevice = null
    },

    setPresets: (state, action: PayloadAction<Preset[]>) => {
      state.presets = action.payload
    },

    addDeviceToCanvas: (
      state,
      action: PayloadAction<{ device: Device; position?: { x: number; y: number } }>
    ) => {
      const { device, position } = action.payload
      const newDevice: CanvasDevice = {
        ...device,
        id: Date.now(),
        position: position || { x: 400, y: 250 },
      }
      state.canvasDevices.push(newDevice)
      state.selectedDevice = newDevice
    },

    updateDevice: (
      state,
      action: PayloadAction<{ id: number; updates: Partial<CanvasDevice> }>
    ) => {
      const { id, updates } = action.payload
      const deviceIndex = state.canvasDevices.findIndex((d: { id: number }) => d.id === id)
      if (deviceIndex !== -1) {
        state.canvasDevices[deviceIndex] = {
          ...state.canvasDevices[deviceIndex],
          ...updates,
        }
        if (state.selectedDevice?.id === id) {
          state.selectedDevice = {
            ...state.selectedDevice,
            ...updates,
          }
        }
      }
    },

    removeDevice: (state, action: PayloadAction<number>) => {
      const id = action.payload
      state.canvasDevices = state.canvasDevices.filter((d: { id: number }) => d.id !== id)
      if (state.selectedDevice?.id === id) {
        state.selectedDevice = null
      }
    },

    setSelectedDevice: (state, action: PayloadAction<CanvasDevice | null>) => {
      state.selectedDevice = action.payload
    },

    clearCanvas: state => {
      state.canvasDevices = []
      state.selectedDevice = null
    },

    loadPreset: (state, action: PayloadAction<Preset>) => {
      const preset = action.payload
      state.canvasDevices = preset.devices.map(d => ({
        ...d,
      }))
      state.selectedDevice = null
    },
  },
})

export const {
  setDevices,
  setCanvasDevices,
  setPresets,
  addDeviceToCanvas,
  updateDevice,
  removeDevice,
  setSelectedDevice,
  clearCanvas,
  loadPreset,
} = devicesSlice.actions

export default devicesSlice.reducer
