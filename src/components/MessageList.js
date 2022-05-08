import {FlatList, Text, StyleSheet, View} from 'react-native';
import React, {useRef} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import useAppState from 'react-native-appstate-hook';
import Message from './Message';
import Button from './Button';
import {useFilter} from '../context/filter';
import MessageInput from './MessageInput';
import handdleMessageInput from '../functions/handleMessageInput';

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

const MessageList = () => {
  const {channel} = useFilter();
  const messageInputRef = useRef();

  // --- handle message input ---
  useAppState({
    onChange: handdleMessageInput(messageInputRef),
  });

  // --- handle api ---
  const readmore = type => () => {
    if (type === 'new') {
      alert('load more new');
    } else if (type === 'old') {
      alert('load more old');
    }
  };

  const sendMessage = () => {
    const text = messageInputRef.current.getText();
    if (text) {
      // not empty text will call api
      console.log('text:', text);
    }
  };

  const renderItem = props => <Message {...props} />;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{channel} Channel</Text>
      </View>
      <View style={styles.listContainer}>
        <Button
          Icon={() => <AntDesign color="white" size={20} name="arrowup" />}
          text="Read More"
          onPress={readmore('old')}
          customContainerStyle={{marginVertical: 15}}
        />
        <FlatList
          bounces={false}
          keyExtractor={item => item.messageId}
          data={mockMessageList}
          renderItem={renderItem}
          contentContainerStyle={{flexGrow: 1}}
        />
        <Button
          Icon={() => <AntDesign color="white" size={20} name="arrowdown" />}
          text="Read More"
          onPress={readmore('new')}
          customContainerStyle={{marginVertical: 30}}
        />
      </View>
      <View style={{flex: 1}} />
      <MessageInput ref={messageInputRef} />
      <Button
        Icon={() => <Feather color="white" size={20} name="send" />}
        text="Send Message"
        onPress={sendMessage}
        customContainerStyle={{marginVertical: 10, marginLeft: 5}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    flex: 1,
  },
  titleContainer: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 16,
    paddingLeft: 5,
    paddingVertical: 5,
  },
  listContainer: {
    paddingHorizontal: 5,
  },
});

export default MessageList;
