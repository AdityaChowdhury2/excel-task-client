import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    loading: false,
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoading: (state) => {
            state.loading = true;
        },
        loggedInUser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },
        userLoggedInError: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
    },
});

export const { userLoading, loggedInUser, userLoggedInError } = authSlice.actions

export default authSlice.reducer