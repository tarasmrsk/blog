const initialState = {
  articles: [],
  loading: false,
  error: null,
  total: 0, 
}

// eslint-disable-next-line import/prefer-default-export, default-param-last
export const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'FETCH_ARTICLES_REQUEST':
    return {
      ...state,
      error: null,
    }
  case 'FETCH_ARTICLES_SUCCESS':
    return {
      ...state,
      loading: true,
      articles: action.payload.articles,
      total: action.payload.total,
    }
  case 'FETCH_ARTICLES_FAILURE':
    return {
      ...state,
      loading: false,
      error: action.payload.error,
    }
  case 'SET_CURRENT_SLUG':
    return {
      ...state,
      currentSlug: action.payload.slug,
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

const fetchArticlesFailure = (error) => ({
  type: 'FETCH_ARTICLES_FAILURE',
  payload: { error },
})

export const fetchArticles = (page = 1, limit = 5) => async (dispatch) => {
  dispatch(fetchArticlesRequest())

  const offset = (page - 1) * limit

  try {
    const response = await fetch(`https://blog.kata.academy/api/articles?limit=${limit}&offset=${offset}`)

    if (!response.ok) {
      throw new Error('Не удалось загрузить статьи')
    }
    
    const data = await response.json()
    const latestArticles = data.articles
    const totalArticles = data.articlesCount

    // console.log(`Общее количество статей: ${totalArticles}`)
    
    dispatch(fetchArticlesSuccess(latestArticles, totalArticles))
  } catch (error) {
    console.error('Ошибка:', error)
    dispatch(fetchArticlesFailure(error.message))
  }
}

