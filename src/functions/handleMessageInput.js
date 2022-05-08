import AsyncStorage from '@react-native-async-storage/async-storage';

const handdleMessageInput = messageInputRef => async newState => {
  if (newState === 'inactive' || newState === 'background') {
    const text = messageInputRef.current.getText();
    if (text) {
      await AsyncStorage.setItem('text-message', text);
    }
  } else {
    const text = await AsyncStorage.getItem('text-message');
    messageInputRef.current.setText(text);
  }
};

export default handdleMessageInput;
