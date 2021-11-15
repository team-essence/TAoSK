import { env } from 'env/dotEnv'
import { ApolloClient, InMemoryCache, split, createHttpLink } from '@apollo/client'

import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/link-ws'

const httpLink = createHttpLink({ uri: `${env.getHttpApiEndpoint()}/graphql` })

// const wsLink = new WebSocketLink({
//   uri: `${env.getWsApiEndpoint()}/graphql`,
//   options: { reconnect: true },
// })

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
  },
  // wsLink,
  httpLink,
)

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink,
})
