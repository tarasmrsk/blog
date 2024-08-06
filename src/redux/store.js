import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'

import { articlesReducer } from './articlesReducer'
import loginSlice from './loginSlice'
import articlesSlice from './articlesSlice'

const rootReducer = combineReducers({
  id: articlesReducer,
  login: loginSlice,
  article: articlesSlice,
})

const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk
  ),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store

