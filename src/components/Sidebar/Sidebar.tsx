import { useEffect } from 'react'
import { useGetDevicesQuery, useGetPresetsQuery } from '../../redux/api/deviceApi'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { setDevices, setPresets } from '../../redux/slices/devicesSlice'
import { DeviceItem } from './DeviceItem/DeviceItem'
import PresetItem from './PresetItem/PresetItem'
import './Sidebar.css'

export const Sidebar = () => {
  const dispatch = useAppDispatch()
  const devices = useAppSelector(state => state.devices.devices)
  const presets = useAppSelector(state => state.devices.presets)

  const {
    data: apiDevices,
    isLoading: devicesLoading,
    isError: devicesError,
  } = useGetDevicesQuery()
  const { data: apiPresets, isLoading: presetsLoading } = useGetPresetsQuery()

  useEffect(() => {
    if (apiDevices && apiDevices.length > 0) {
      const sidebarDevices = apiDevices.map(device => ({
        id: device.id,
        type: device.type,
        name: device.name,
        settings: device.settings,
      }))
      dispatch(setDevices(sidebarDevices))
    }
  }, [apiDevices, dispatch])

  useEffect(() => {
    if (apiPresets) {
      dispatch(setPresets(apiPresets))
    }
  }, [apiPresets, dispatch])

  return (
    <div className="sidebar">
      <div className="sidebar__section">
        <h3 className="sidebar__title">Devices</h3>
        {devicesLoading ? (
          <p className="sidebar__loading">Loading devices...</p>
        ) : devicesError ? (
          <div className="sidebar__list">
            {devices.map(device => (
              <DeviceItem key={device.id} device={device} />
            ))}
          </div>
        ) : devices.length === 0 ? (
          <p className="sidebar__empty">No devices found</p>
        ) : (
          <div className="sidebar__list">
            {devices.map(device => (
              <DeviceItem key={device.id} device={device} />
            ))}
          </div>
        )}
      </div>

      <div className="sidebar__section">
        <h3 className="sidebar__title">Saved Presets</h3>
        {presetsLoading ? (
          <p className="sidebar__loading">Loading presets...</p>
        ) : presets.length === 0 ? (
          <p className="sidebar__empty">No presets saved</p>
        ) : (
          <div className="sidebar__list">
            {presets.map(preset => (
              <PresetItem key={preset.id} preset={preset} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
