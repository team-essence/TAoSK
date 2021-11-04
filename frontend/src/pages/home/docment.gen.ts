import * as Types from '../../types/graphql.gen';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type usersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type usersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', name: string }> };


export const usersDocument = gql`
    query users {
  users {
    name
  }
}
    `;

/**
 * __useusersQuery__
 *
 * To run a query within a React component, call `useusersQuery` and pass it any options that fit your needs.
 * When your component renders, `useusersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useusersQuery({
 *   variables: {
 *   },
 * });
 */
export function useusersQuery(baseOptions?: Apollo.QueryHookOptions<usersQuery, usersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<usersQuery, usersQueryVariables>(usersDocument, options);
      }
export function useusersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<usersQuery, usersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<usersQuery, usersQueryVariables>(usersDocument, options);
        }
export type usersQueryHookResult = ReturnType<typeof useusersQuery>;
export type usersLazyQueryHookResult = ReturnType<typeof useusersLazyQuery>;
export type usersQueryResult = Apollo.QueryResult<usersQuery, usersQueryVariables>;