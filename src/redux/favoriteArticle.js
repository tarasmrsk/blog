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
      console.log(`Лайк поставлен ${data.article.favorited} статье :${data.article.title}`)
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
      console.log(`Лайк снят ${data.article.favorited} статье :${data.article.title}`)
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
    setArticles(state, action) {
      state.articles = action.payload.map(article => ({
        ...article,
        favorited: article.favorited || false
      }))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(favoriteArticle.fulfilled, (state, action) => {
        const index = state.articles.findIndex(article => article.slug === action.payload.slug)
        if (index !== -1) {
          state.articles[index] = action.payload
        }
      })
      .addCase(unfavoriteArticle.fulfilled, (state, action) => {
        const index = state.articles.findIndex(article => article.slug === action.payload.slug)
        if (index !== -1) {
          state.articles[index] = action.payload 
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