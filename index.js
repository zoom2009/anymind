import React from 'react';
import {AppRegistry} from 'react-native';
import Root from './App';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {name as appName} from './app.json';

const client = new ApolloClient({
  uri: 'localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => App);
