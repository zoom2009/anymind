import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import React from 'react';

const Button = ({Icon, text, onPress, customContainerStyle = {}}) => {
  return (
    <TouchableOpacity
      style={[styles.container, customContainerStyle]}
      onPress={onPress}
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#3498db',
    alignSelf: 'flex-start',
    borderRadius: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginRight: 5,
  },
});

export default Button;
