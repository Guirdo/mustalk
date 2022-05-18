import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import getProfile from "../../utils/getProfile"
import { supabase } from "../../utils/supabaseClient"

const initialState = {
    isAuthenticated: false,
    user: null,
}

export const getUser = createAsyncThunk("auth/getUser", async () => {
    let profile = await getProfile(supabase.auth.user().id)
    return profile
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        },
        login: (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload
        }
    },
    extraReducers: {
        [getUser.fulfilled]: (state, action) => {
            state.user = action.payload
        },
        [getUser.rejected]: (state, action) => {
            state.user = null
        },
        [getUser.pending]: (state, action) => {
            state.user = null
        }
    }
})

export const { setAuthenticated, login } = authSlice.actions

export default authSlice.reducer
