import { configureStore } from '@reduxjs/toolkit'

import authReducer from './features/auth/authSlice'
import { apiService } from './api/apiService'

export const store = configureStore({
    reducer: {
        [apiService.reducerPath]: apiService.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiService.middleware),
})

