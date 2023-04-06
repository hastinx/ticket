import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react-dom/test-utils'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        username: '',
        token: '',
        id: 0,
        admin: 0
    },
    reducers: {
        login: (state, action) => {
            state.username = action.payload.username
            state.token = action.payload.token
            state.id = action.payload.id
            state.admin = action.payload.admin
            console.log(state.admin)
        },
        logout: (state, action) => {
            state.username = ''
            state.token = ''
            state.id = ''
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer