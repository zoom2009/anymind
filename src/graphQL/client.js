import {ApolloClient, InMemoryCache} from '@apollo/client';

const url = 'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql';

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
  defaultOptions,
});

export default client;
