/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (data, { rejectWithValue }) => {
    const loginData = JSON.parse(localStorage.getItem('login'))
    const {token} = loginData

    try {
      const response = await fetch('https://blog.kata.academy/api/user', {
        method: 'PUT',
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: data.email,
            username: data.username,
            password: data.password,
            bio: data.bio || '',
            image: data.avatar || null,
          },
        }),
      })

      if (!response.ok) {
        throw new Error('Ошибка при обновлении данных пользователя')
      }

      const result = await response.json()
      localStorage.setItem('login', JSON.stringify({
        ...loginData,
        username: data.username,
        image: result.user.image,
      }))

      return result.user
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default profileSlice.reducer