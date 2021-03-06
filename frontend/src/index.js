import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

import theme from './app/theme'
import StoreProvider from 'app/store'
import apolloClient from 'app/apolloClient'

import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'

import App from 'App'
import Loading from 'components/atoms/Loading'

ReactDOM.render(
  <StoreProvider>
    <ApolloProvider client={apolloClient}>
      <ApolloHooksProvider client={apolloClient}>
        <MuiThemeProvider theme={theme}>
          <BrowserRouter basename='/'>
            <Suspense fallback={<Loading />}>
              <CssBaseline />
              <App />
            </Suspense>
          </BrowserRouter>
        </MuiThemeProvider>
      </ApolloHooksProvider>
    </ApolloProvider>
  </StoreProvider>,
  document.getElementById('root')
)
