import {StyleSheet, Text, Image, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {useFilter} from '../context/filter';

const size = 36;
const hitSlop = {left: 20, right: 20, top: 20, bottom: 20};

const Header = () => {
  const {user} = useFilter();
  const avatarImage = `https://picsum.photos/seed/${user}/50/50`;
  const {toggleDrawer} = useFilter();
  const toggle = () => toggleDrawer();

  return (
    <View style={styles.container}>
      <TouchableOpacity hitSlop={hitSlop} onPress={toggle} activeOpacity={0.8}>
        <Entypo name="menu" size={size} />
      </TouchableOpacity>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{uri: avatarImage}} />
        <Text style={styles.avatarText}>{user}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '2.5%',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: size,
    height: size,
    borderRadius: size,
    marginBottom: 2,
  },
  avatarText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Header;
