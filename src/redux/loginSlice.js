/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data, { rejectWithValue }) => {
    const userData = {
      user: {
        email: data.email,
        password: data.password,
      },
    }
  
    try {
      const response = await fetch('https://blog.kata.academy/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
  
      if (!response.ok) {
        throw new Error('Ошибка при входе. Проверьте Email и пароль')
      }
  
      const result = await response.json()
      const { username, email, token, image } = result.user
      
      console.log(result.user.token)

      localStorage.setItem(
        'login',
        JSON.stringify({
          username,
          email,
          token,
          image,
        })
      )

      message.success(`${username}, вход выполнен успешно!`)
      return result 
    } catch (error) {
      message.error(error.message)
      return rejectWithValue(error.message)
    }
  }
)

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loading: false,
    user: null,
    token: null,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('username')
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout } = loginSlice.actions

export default loginSlice.reducer