import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'

import store from './redux/store'
import App from './components/App'

import './index.scss'

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
