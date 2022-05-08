import {StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';
import MessageList from './src/components/MessageList';
import Header from './src/components/Header';
import SideMenu from 'react-native-side-menu-updated';
import {useFilter} from './src/context/filter';
import FilterSidebar from './src/components/FilterSidebar';

const App = () => {
  const {isShowDrawer, toggleDrawer} = useFilter();
  const onChangeDrawer = show => {
    if (show !== isShowDrawer) {
      toggleDrawer(show);
    }
  };

  return (
    <SideMenu
      autoClosing={false}
      isOpen={isShowDrawer || false}
      onChange={onChangeDrawer}
      menu={<FilterSidebar />}>
      <SafeAreaView style={styles.container}>
        <Header />
        <MessageList />
      </SafeAreaView>
    </SideMenu>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
});

export default App;
