import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { AppProvider } from 'providers/AppProvider'
import { GlobalStyle } from 'styles/globalStyle'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <GlobalStyle />
      <ToastContainer />
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
