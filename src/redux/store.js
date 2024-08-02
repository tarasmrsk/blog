import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'

import { articlesReducer } from './articlesReducer'
// import profileReducer from './profileSlice'

const rootReducer = combineReducers({
  id: articlesReducer,
  // profile: profileReducer,
})

const store = createStore(rootReducer, compose(
  applyMiddleware(
    thunk
  ),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store

// import { configureStore } from '@reduxjs/toolkit'

// import profileReducer from './profileSlice' // Путь к вашему слайсу

// const store = configureStore({
//   reducer: {
//     profile: profileReducer,
//   },
// })

// export default store
