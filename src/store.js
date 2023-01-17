import { configureStore } from '@reduxjs/toolkit'
import APIKeyReducer from './slices/APIKeySlice'

export const store = configureStore({
  reducer: {
    APIKey: APIKeyReducer
  },
})