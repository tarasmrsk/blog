/* eslint-disable default-param-last */
const initialState = {
  articles: [],
  loading: false,
  error: null,
  total: 0, 
  currentPage: 1,
  currentSlug: null,
}

export const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'FETCH_ARTICLES_REQUEST':
    return {
      ...state,
      loading: true,
      error: null,
    }
  case 'FETCH_ARTICLES_SUCCESS':
    return {
      ...state,
      loading: false,
      articles: action.payload.articles,
      total: action.payload.total,
    }
  case 'FETCH_ARTICLES_FAILURE':
    return {
      ...state,
      loading: false,
      error: action.payload.error,
    }
  case 'FETCH_ARTICLE_SUCCESS': 
    return {
      ...state,
      loading: false,
      currentSlug: action.payload.article,
    }
  case 'SET_CURRENT_SLUG':
    return {
      ...state,
      currentSlug: action.payload.slug,
    }
  case 'SET_CURRENT_PAGE':
    return {
      ...state,
      currentPage: action.payload.page,
    }
  default:
    return state
  }
}

const fetchArticlesRequest = () => ({
  type: 'FETCH_ARTICLES_REQUEST',
})

const fetchArticlesSuccess = (articles, total) => ({
  type: 'FETCH_ARTICLES_SUCCESS',
  payload: { articles, total },
  loading: true,
})

const fetchArticleSuccess = (article) => ({ 
  type: 'FETCH_ARTICLE_SUCCESS',
  payload: { article },
})

const fetchArticlesFailure = (error) => ({
  type: 'FETCH_ARTICLES_FAILURE',
  payload: { error },
})

export const setCurrentPage = (page) => ({
  type: 'SET_CURRENT_PAGE',
  payload: { page },
})


export const fetchArticles = (page = 1, limit = 5) => async (dispatch) => {

  dispatch(fetchArticlesRequest())

  const offset = (page - 1) * limit

  try {
    const response = await fetch(`https://blog.kata.academy/api/articles?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${JSON.parse(localStorage.getItem('login'))?.token }`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Не удалось загрузить статьи')
    }
    
    const data = await response.json()
    const latestArticles = data.articles
    const totalArticles = data.articlesCount

    dispatch(fetchArticlesSuccess(latestArticles, totalArticles))
  } catch (error) {
    console.error('Ошибка:', error)
    dispatch(fetchArticlesFailure(error.message))
  }
}

export const fetchArticleSlug = (slug) => async (dispatch) => {

  dispatch(fetchArticlesRequest())

  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${JSON.parse(localStorage.getItem('login'))?.token }`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error('Не удалось загрузить статьи')
    }
    
    const data = await response.json()
    const {article} = data

    dispatch(fetchArticleSuccess(article))
  } catch (error) {
    console.error('Ошибка:', error)
    dispatch(fetchArticlesFailure(error.message))
  }
}