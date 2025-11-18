/* eslint-disable @typescript-eslint/no-explicit-any */
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCreatePresetMutation, useGetDevicesQuery } from '../../redux/api/deviceApi'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  addDeviceToCanvas,
  clearCanvas,
  loadPreset,
  removeDevice,
  setCanvasDevices,
  setSelectedDevice,
  updateDevice,
} from '../../redux/slices/devicesSlice'
import type { Device, Preset } from '../../types'
import { Toast } from '../../ui/Toast'
import { FanController } from '../Controllers/FanController'
import { LightController } from '../Controllers/LightController'
import { FanVisual } from '../Devices/FanVisual'
import { LightVisual } from '../Devices/LightVisual'
import { SavePresetModal } from '../Modals/SavePresetModal'
import './TestingCanvas.css'

export const TestingCanvas = () => {
  const dispatch = useAppDispatch()
  const canvasDevices = useAppSelector(state => state.devices.canvasDevices)
  const selectedDevice = useAppSelector(state => state.devices.selectedDevice)

  const [dragOver, setDragOver] = useState(false)
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [showToast, setShowToast] = useState(false)

  const { data: apiDevices, isLoading } = useGetDevicesQuery()
  const [createPresetApi] = useCreatePresetMutation()

  useEffect(() => {
    if (apiDevices && canvasDevices.length === 0) {
      const devicesWithPositions = apiDevices.filter(d => d.position.x !== 0 || d.position.y !== 0)
      if (devicesWithPositions.length > 0) {
        dispatch(setCanvasDevices(devicesWithPositions))
      }
    }
  }, [apiDevices, dispatch, canvasDevices.length])

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragOver(false)

    const deviceData = e.dataTransfer.getData('device')
    const presetData = e.dataTransfer.getData('preset')

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (deviceData) {
      const device: Device = JSON.parse(deviceData)
      dispatch(
        addDeviceToCanvas({
          device,
          position: { x, y },
        })
      )
    } else if (presetData) {
      const preset: Preset = JSON.parse(presetData)
      dispatch(loadPreset(preset))
    }
  }

  const handleUpdateDevice = (id: number, updates: any) => {
    dispatch(updateDevice({ id, updates }))
  }

  const handleRemoveDevice = (id: number) => {
    dispatch(removeDevice(id))
  }

  const handleSavePreset = async (name: string) => {
    try {
      await createPresetApi({
        name,
        description: `Custom preset with ${canvasDevices.length} device(s)`,
        devices: canvasDevices,
      }).unwrap()
      setShowToast(true)
    } catch (error) {
      console.error('Failed to save preset:', error)
    }
  }

  const handleClearCanvas = () => {
    dispatch(clearCanvas())
  }

  if (isLoading) {
    return (
      <div className="testing-canvas testing-canvas--loading">
        <p className="testing-canvas__loading-text">Loading devices...</p>
      </div>
    )
  }

  return (
    <div className="testing-canvas">
      <Toast message="Preset saved" isVisible={showToast} onClose={() => setShowToast(false)} />

      <div className="testing-canvas__header">
        <h2 className="testing-canvas__title">Testing Canvas</h2>

        <div className="testing-canvas__buttons">
          <button
            onClick={handleClearCanvas}
            disabled={canvasDevices.length === 0}
            className="testing-canvas__btn testing-canvas__btn--clear"
          >
            Clear
          </button>

          <button
            onClick={() => setShowSaveModal(true)}
            disabled={canvasDevices.length === 0}
            className="testing-canvas__btn testing-canvas__btn--save"
          >
            Save Preset
          </button>
        </div>
      </div>

      <div className="testing-canvas__container">
        <div
          className={`testing-canvas__canvas ${
            dragOver ? 'testing-canvas__canvas--drag-over' : ''
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {canvasDevices.length === 0 ? (
            <div className="testing-canvas__empty">
              <div className="testing-canvas__empty-content">
                <p className="testing-canvas__empty-text">Drag anything here</p>
              </div>
            </div>
          ) : (
            canvasDevices.map(device => (
              <div
                key={device.id}
                className="testing-canvas__device"
                style={{
                  left: device.position.x - 100,
                  top: device.position.y - 100,
                }}
                onClick={() => dispatch(setSelectedDevice(device))}
              >
                <div className="testing-canvas__device-content">
                  {device.type === 'light' ? (
                    <LightVisual
                      settings={device.settings}
                      isSelected={selectedDevice?.id === device.id}
                    />
                  ) : (
                    <FanVisual settings={device.settings} />
                  )}

                  <button
                    onClick={e => {
                      e.stopPropagation()
                      handleRemoveDevice(device.id)
                    }}
                    className="testing-canvas__remove-btn"
                  >
                    <Trash2 className="testing-canvas__remove-icon" />
                  </button>
                </div>
              </div>
            ))
          )}

          {selectedDevice && (
            <div className="testing-canvas__controller">
              {selectedDevice.type === 'light' ? (
                <LightController
                  device={selectedDevice}
                  onUpdate={updates => handleUpdateDevice(selectedDevice.id, updates)}
                />
              ) : (
                <FanController
                  device={selectedDevice}
                  onUpdate={updates => handleUpdateDevice(selectedDevice.id, updates)}
                />
              )}
            </div>
          )}
        </div>
      </div>

      <SavePresetModal
        isOpen={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        onSave={handleSavePreset}
      />
    </div>
  )
}
