/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  articles: [],
  loading: false,
  error: null,
  total: 0,
  currentPage: 1,
  currentSlug: null,
}

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async ({ page = 1, limit = 5 }, { rejectWithValue }) => {
    const offset = (page - 1) * limit

    try {
      const response = await fetch(`https://blog.kata.academy/api/articles?limit=${limit}&offset=${offset}`)

      if (!response.ok) {
        throw new Error('Не удалось загрузить статьи')
      }

      const data = await response.json()
      console.log(data)
      return { articles: data.articles, total: data.articlesCount }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setCurrentSlug(state, action) {
      state.currentSlug = action.payload.slug
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload.page
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
  },
})

export const { setCurrentSlug, setCurrentPage } = articlesSlice.actions

export default articlesSlice.reducer
