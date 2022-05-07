import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import MessageList from './src/components/MessageList';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MessageList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
});

export default App;
