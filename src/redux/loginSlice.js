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

    if (!userData.user.email || !userData.user.password) {
      message.error('Email и пароль не могут быть пустыми')
      return rejectWithValue('Email и пароль не могут быть пустыми')
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

const getInitialAuthState = () => {
  const savedLogin = localStorage.getItem('login')
  if (savedLogin) {
    const user = JSON.parse(savedLogin)
    return {
      isAuthenticated: true,
      user,
      token: user.token,
    }
  }
  return {
    isAuthenticated: false,
    user: null,
    token: null,
  }
}

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loading: false,
    user: null,
    token: null,
    error: null,
    ...getInitialAuthState(),
  },
  reducers: {
    logout(state) {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('login')
      message.success('Вы вышли из системы')
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
        state.isAuthenticated = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout } = loginSlice.actions

export default loginSlice.reducer