import {StyleSheet, View, TextInput} from 'react-native';
import React, {useState, useImperativeHandle, forwardRef} from 'react';

const MessageInput = ({}, ref) => {
  const [text, setText] = useState('');

  useImperativeHandle(ref, () => ({
    getText: () => text,
    setText: text => setText(text),
  }));
  return (
    <View>
      <TextInput
        style={styles.input}
        multiline
        onChangeText={setText}
        value={text}
        placeholder="Type your message here..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    backgroundColor: 'white',
    height: 70,
    marginHorizontal: 5,
    borderRadius: 8,
    padding: 5,
  },
});

export default forwardRef(MessageInput);
