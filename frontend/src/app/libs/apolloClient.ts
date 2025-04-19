import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from '@apollo/client';

export function createApolloClient(): ApolloClient<NormalizedCacheObject> {
  const uri = process.env.CRAFT_CMS_GRAPHQL_ENDPOINT;
  const token = process.env.CRAFT_CMS_GRAPHQL_TOKEN;

  // Throw errors if required environment variables are not set
  if (!uri) {
    throw new Error('CRAFT_CMS_GRAPHQL_ENDPOINT is not defined');
  }

  if (!token) {
    throw new Error('CRAFT_CMS_GRAPHQL_TOKEN is not defined');
  }

  // Create and return Apollo Client
  return new ApolloClient({
    link: new HttpLink({
      uri, // URL for your GraphQL endpoint
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Authorization header with token
      },
    }),
    cache: new InMemoryCache(), // In-memory caching for the Apollo Client
  });
}