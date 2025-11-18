import { configureStore } from '@reduxjs/toolkit'
import { deviceApi } from './api/deviceApi'
import devicesReducer from './slices/devicesSlice'

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
    [deviceApi.reducerPath]: deviceApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(deviceApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
