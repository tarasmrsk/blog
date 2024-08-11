/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { message } from 'antd'

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data, { rejectWithValue }) => {
    const userData = {
      user: {
        username: data.username,
        email: data.email,
        password: data.password,
      },
    }

    try {
      const response = await fetch('https://blog.kata.academy/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const errorData = await response.json()

        if (errorData.errors) {

          if (errorData.errors.username) {
            throw new Error('Username уже занят. Выберите другой Username')
          }
          if (errorData.errors.email) {
            throw new Error('Email уже уже занят. Выберите другой адрес электронной почты')
          }

        }

        throw new Error('Произошла ошибка при регистрации. Попробуйте еще раз.')
      }

      const result = await response.json()
      message.success('Пользователь успешно зарегистрирован!')
      return result
    } catch (error) {
      message.error(error.message)
      return rejectWithValue(error.message)
    }
  }
)

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default registrationSlice.reducer