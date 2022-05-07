import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Message from './Message';

const mockMessageList = [
  {
    "messageId": "1508766710151162266",
    "text": "Oh my god",
    "datetime": "2022-05-07T10:45:32.275Z",
    "userId": "Joyse"
  },
  {
    "messageId": "7873584573998363415",
    "text": "Wow",
    "datetime": "2022-05-07T08:11:20.41Z",
    "userId": "Russell"
  },
  {
    "messageId": "205163017645603974",
    "text": "Hello",
    "datetime": "2022-05-07T03:59:03.974Z",
    "userId": "Sam"
  }
];

const messageList = () => {
  return (
    <View>
      <FlatList data={mockMessageList} renderItem={Message} />
    </View>
  );
};

const styles = StyleSheet.create({

});

export default messageList;
