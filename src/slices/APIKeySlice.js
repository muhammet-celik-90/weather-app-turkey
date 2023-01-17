import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: ' ',
}

export const APIKeySlice = createSlice({
  name: 'APIKey',
  initialState,
  reducers: {
    APIKey: (state, action) => {
      state.value = action.payload
    },
  },
})

export const { APIKey } = APIKeySlice.actions

export default APIKeySlice.reducer