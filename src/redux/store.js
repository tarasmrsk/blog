import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'

import articlesSlice from './articlesSlice'
import loginSlice from './loginSlice'
import favoriteArticle from './favoriteArticle'

const rootReducer = combineReducers({
  id: articlesSlice,
  login: loginSlice,
  like: favoriteArticle,
})

const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk
  ),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store

