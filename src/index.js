import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './Routes.js'
import './styles/index.css'

window.__POMODORO__ = {
  client: null
}

ReactDOM.render(
  <React.StrictMode>
    <Routes>
    </Routes>
  </React.StrictMode>,
  document.getElementById('root')
)
