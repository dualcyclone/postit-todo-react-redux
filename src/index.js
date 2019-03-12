import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import enablePersistence from './main/store/persistence'
import reducer from './main/store/reducer'
import App from './components/App'
import './index.css'

const store = createStore(reducer)

enablePersistence(store)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
