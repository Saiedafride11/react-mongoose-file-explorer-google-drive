import { configureStore } from "@reduxjs/toolkit"
import { fileApi } from "./api/fileApi"
import explorerReducer from "./slices/explorerSlice"

export const store = configureStore({
  reducer: {
    [fileApi.reducerPath]: fileApi.reducer,
    explorer: explorerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(fileApi.middleware),
})
