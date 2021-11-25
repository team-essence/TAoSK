import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Providers } from 'providers/Providers'
import { GlobalStyle } from 'styles/globalStyle'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render(
  <React.StrictMode>
    <Providers>
      <GlobalStyle />
      <ToastContainer />
      <App />
    </Providers>
  </React.StrictMode>,
  document.getElementById('root'),
)
