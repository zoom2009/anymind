import React from 'react';
import {AppRegistry} from 'react-native';
import Root from './App';
import {ApolloProvider} from '@apollo/client';
import {FilterProvider} from './src/context/filter';
import {name as appName} from './app.json';
import client from './src/graphQL/client';

const App = () => (
  <ApolloProvider client={client}>
    <FilterProvider>
      <Root />
    </FilterProvider>
  </ApolloProvider>
);

AppRegistry.registerComponent(appName, () => App);
