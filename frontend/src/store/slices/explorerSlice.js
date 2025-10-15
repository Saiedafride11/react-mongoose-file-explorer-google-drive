import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  currentFolder: null,
}

const explorerSlice = createSlice({
  name: "explorer",
  initialState,
  reducers: {
    setCurrentFolder: (state, action) => {
      state.currentFolder = action.payload
    },
  },
})

export const { setCurrentFolder } = explorerSlice.actions
export default explorerSlice.reducer
