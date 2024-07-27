import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'

import { articlesReducer } from './articlesReducer'

const rootReducer = combineReducers({
  id: articlesReducer,
})

const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk
  ),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store
