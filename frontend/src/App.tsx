import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from 'routes/AppRoutes'
import { AppProvider } from 'providers/AppProvider'
import { GlobalStyle } from 'styles/globalStyle'
import { ToastContainer } from 'react-toastify'

const App: FC = () => {
  return (
    <AppProvider>
      <GlobalStyle />
      <ToastContainer />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  )
}

export default App
