import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import React from 'react';

const Button = ({Icon, text, onClick}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onClick={onClick}
      activeOpacity={0.8}>
      <Text style={styles.text}>{text}</Text>
      {Icon && <Icon />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'skyblue',
  },
});

export default Button;
