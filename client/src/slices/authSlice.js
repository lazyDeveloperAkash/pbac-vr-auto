import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api/axios'

export const login = createAsyncThunk('auth/login', async (payload, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/auth/login', payload)
    localStorage.setItem('token', data.token)
    return data.user
  } catch (e) {
    return rejectWithValue(e.response?.data?.message || 'Login failed')
  }
})

export const me = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get('/auth/me')
    return data.user
  } catch (e) {
    return rejectWithValue('Failed to fetch profile')
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle', error: null },
  reducers: {
    logout: (state) => { state.user = null; localStorage.removeItem('token') },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => { s.status = 'loading'; s.error = null })
      .addCase(login.fulfilled, (s, a) => { s.status = 'succeeded'; s.user = a.payload })
      .addCase(login.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload })
      .addCase(me.fulfilled, (s, a) => { s.user = a.payload })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
