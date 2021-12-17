import React, { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from 'routes/AppRoutes'
import { AppProvider } from 'providers/AppProvider'
import { GlobalStyle } from 'styles/globalStyle'
import { ToastContainer } from 'react-toastify'
import { isMobile } from 'react-device-detect'
import { MobileScreen } from 'pages/mobile/MobileScreen'
import { ContentWrapper } from 'components/ui/wrapper/ContentWrapper'

const App: FC = () => {
  return (
    <AppProvider>
      <GlobalStyle />
      <ToastContainer />
      {isMobile ? (
        <MobileScreen />
      ) : (
        <BrowserRouter>
          <ContentWrapper>
            <AppRoutes />
          </ContentWrapper>
        </BrowserRouter>
      )}
    </AppProvider>
  )
}

export default App
