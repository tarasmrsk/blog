/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async (articleData, { rejectWithValue }) => {

    try {
      const response = await fetch('https://blog.kata.academy/api/articles', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${JSON.parse(localStorage.getItem('login'))?.token }`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      })

      if (!response.ok) {
        throw new Error('Ошибка при создании статьи')
      }

      const result = await response.json()
      return result
    } catch (error) {
      return rejectWithValue(error.message || 'Произошла ошибка при добавлении статьи')
    }
  }
)

export const updateArticle = createAsyncThunk(
  'articles/updateArticle',
  async ({ slug, articleData }, { rejectWithValue }) => {

    try {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Token ${JSON.parse(localStorage.getItem('login'))?.token }`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      })
    
      if (!response.ok) {
        throw new Error('Ошибка при обновлении статьи')
      }
    
      const result = await response.json()
      return result
    } catch (error) {
      return rejectWithValue(error.message || 'Произошла ошибка при обновлении статьи')
    }
  }
)

export const deleteArticle = createAsyncThunk(
  'articles/deleteArticle',
  async (slug, { rejectWithValue }) => {

    try {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${JSON.parse(localStorage.getItem('login'))?.token }`,
        },
      })
  
      if (!response.ok) {
        throw new Error('Ошибка при удалении статьи')
      }
  
      return slug
    } catch (error) {
      return rejectWithValue(error.message || 'Произошла ошибка при удалении статьи')
    }
  }
)

const actionSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createArticle.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.loading = false
        state.articles.push(action.payload)
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(updateArticle.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.loading = false
        const index = state.articles.findIndex(article => article.slug === action.payload.article.slug)
        if (index !== -1) {
          state.articles[index] = action.payload.article 
        }
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(deleteArticle.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.loading = false
        state.articles = state.articles.filter(article => article.slug !== action.payload)
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export default actionSlice.reducer