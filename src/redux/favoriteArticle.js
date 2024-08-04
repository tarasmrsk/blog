/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const favoriteArticle = createAsyncThunk(
  'articles/favoriteArticle',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${JSON.parse(localStorage.getItem('login'))?.token }`,
          'Content-Type': 'application/json',
        },
      })
  
      if (!response.ok) {
        throw new Error('Не удалось лайкнуть статью')
      }
  
      const data = await response.json()
      return data.article 
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
  
export const unfavoriteArticle = createAsyncThunk(
  'articles/unfavoriteArticle',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${JSON.parse(localStorage.getItem('login'))?.token }`,
          'Content-Type': 'application/json',
        },
      })
  
      if (!response.ok) {
        throw new Error('Не удалось снять лайк со статьи')
      }
  
      const data = await response.json()
      return data.article
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)
  
const articlesSlice = createSlice({
  name: 'likes',
  initialState: {
    articles: [],
    currentArticle: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(favoriteArticle.fulfilled, (state, action) => {
        if (state.currentArticle && state.currentArticle.slug === action.payload.slug) {
          state.currentArticle = action.payload
        }
      })
      .addCase(unfavoriteArticle.fulfilled, (state, action) => {
        if (state.currentArticle && state.currentArticle.slug === action.payload.slug) {
          state.currentArticle = action.payload
        }
      })
      .addCase(favoriteArticle.rejected, (state, action) => {
        console.error(action.payload)
      })
      .addCase(unfavoriteArticle.rejected, (state, action) => {
        console.error(action.payload)
      })
  },
})
  
export default articlesSlice.reducer