/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  articles: [],
  loading: false,
  error: null,
  total: 0,
  currentPage: Number(localStorage.getItem('currentPage')) || 1,
  currentSlug: null,
}

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ page = Number(localStorage.getItem('currentPage')), limit = 5 }, { rejectWithValue }) => {
    const offset = (page - 1) * limit
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles?limit=${limit}&offset=${offset}`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${JSON.parse(localStorage.getItem('login'))?.token }`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Не удалось загрузить статьи')
      }

      const data = await response.json()
      return { articles: data.articles, total: data.articlesCount }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchArticleSlug = createAsyncThunk(
  'articles/fetchArticleSlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${JSON.parse(localStorage.getItem('login'))?.token }`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Не удалось загрузить статью')
      }

      const data = await response.json()
      return data.article
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload
      localStorage.setItem('currentPage', action.payload)
    },
    setCurrentSlug(state, action) {
      state.currentSlug = action.payload.slug
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.loading = false
        state.articles = action.payload.articles
        state.total = action.payload.total
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(fetchArticleSlug.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchArticleSlug.fulfilled, (state, action) => {
        state.loading = false
        state.currentSlug = action.payload
      })
      .addCase(fetchArticleSlug.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { setCurrentPage, setCurrentSlug } = articlesSlice.actions

export default articlesSlice.reducer