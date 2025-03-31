import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
} from '@apollo/client';

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: new HttpLink({
    uri: process.env.CRAFT_CMS_GRAPHQL_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CRAFT_CMS_GRAPHQL_TOKEN}`,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
