import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './Routes.js'
import { Provider } from 'react-redux'
import store from './store'
import './styles/index.css'

window.__POMODORO__ = {
  client: null
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Routes>
      </Routes>
    </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
)
