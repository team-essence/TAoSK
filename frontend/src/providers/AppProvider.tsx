import React, { FC, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { ApolloProvider } from '@apollo/client'
import { AuthProvider } from 'providers/AuthProvider'
import { theme } from 'styles/theme'
import { client } from '../ApolloClient'

type Props = { children: ReactNode }

export const AppProvider: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <AuthProvider>{children}</AuthProvider>
      </ApolloProvider>
    </ThemeProvider>
  )
}
