import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiResponse, CanvasDevice, DeviceApiData, Preset, PresetApiData } from '../../types'

const transformDeviceFromApi = (apiDevice: DeviceApiData): CanvasDevice => ({
  id: apiDevice.id,
  type: apiDevice.type,
  name: apiDevice.name,
  settings: apiDevice.settings,
  position: {
    x: apiDevice.position_x,
    y: apiDevice.position_y,
  },
})

const transformPresetFromApi = (apiPreset: PresetApiData): Preset => ({
  id: apiPreset.id,
  name: apiPreset.name,
  devices: apiPreset.devices.map((device, index) => ({
    id: apiPreset.id * 1000 + index, //unique
    type: device.type,
    name: device.name,
    settings: device.settings,
    position: device.position,
  })),
})

export const deviceApi = createApi({
  reducerPath: 'deviceApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost/device-simulator-backend/index.php',
  }),
  tagTypes: ['Device', 'Preset'],
  endpoints: builder => ({
    //get all devices
    getDevices: builder.query<CanvasDevice[], void>({
      query: () => '?resource=devices',
      transformResponse: (response: ApiResponse<DeviceApiData[]>) =>
        response.data.map(transformDeviceFromApi),
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Device' as const, id })),
              { type: 'Device', id: 'LIST' },
            ]
          : [{ type: 'Device', id: 'LIST' }],
    }),

    //get single device
    getDevice: builder.query<CanvasDevice, number>({
      query: id => `?resource=devices&id=${id}`,
      transformResponse: (response: ApiResponse<DeviceApiData>) =>
        transformDeviceFromApi(response.data),
      providesTags: (result, error, id) => [{ type: 'Device', id }],
    }),

    //get all presets
    getPresets: builder.query<Preset[], void>({
      query: () => '?resource=presets',
      transformResponse: (response: ApiResponse<PresetApiData[]>) =>
        response.data.map(transformPresetFromApi),
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Preset' as const, id })),
              { type: 'Preset', id: 'LIST' },
            ]
          : [{ type: 'Preset', id: 'LIST' }],
    }),

    //get single preset
    getPreset: builder.query<Preset, number>({
      query: id => `?resource=presets&id=${id}`,
      transformResponse: (response: ApiResponse<PresetApiData>) =>
        transformPresetFromApi(response.data),
      providesTags: (result, error, id) => [{ type: 'Preset', id }],
    }),

    //create preset
    createPreset: builder.mutation<
      Preset,
      { name: string; description?: string; devices: CanvasDevice[] }
    >({
      query: preset => ({
        url: '?resource=presets',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          name: preset.name,
          description:
            preset.description || `Custom preset with ${preset.devices.length} device(s)`,
          devices: preset.devices.map(device => ({
            type: device.type,
            name: device.name,
            settings: device.settings,
            position: {
              x: device.position.x,
              y: device.position.y,
            },
          })),
        },
      }),
      transformResponse: (response: ApiResponse<PresetApiData>) =>
        transformPresetFromApi(response.data),
      invalidatesTags: [{ type: 'Preset', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetDevicesQuery,
  useGetDeviceQuery,
  useGetPresetsQuery,
  useGetPresetQuery,
  useCreatePresetMutation,
} = deviceApi
