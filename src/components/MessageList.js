import {FlatList, Text, StyleSheet, View, Keyboard} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import useAppState from 'react-native-appstate-hook';
import * as R from 'ramda';
import Toast from 'react-native-simple-toast';
import Message from './Message';
import Button from './Button';
import {useFilter} from '../context/filter';
import MessageInput from './MessageInput';
import handdleMessageInput from '../functions/handleMessageInput';
import {
  GET_LASTEST_MESSAGES,
  GET_READ_MORE_MESSAAGES,
} from '../graphQL/queries';
import client from '../graphQL/client';
import {POST_MESSAGE} from '../graphQL/mutations';
import getMessageForReadmore from '../functions/getMessageForReadmore';

const renderItem = props => <Message {...props} />;

const MessageList = () => {
  const {channel, user} = useFilter();
  const messageInputRef = useRef();
  const [messages, setMessages] = useState([]);

  const clearKeyboard = () => {
    messageInputRef.current.setText('');
    Keyboard.dismiss();
  };

  // --- handle api ---
  const readmore = type => () => {
    const isOld = type === 'old';
    const {messageId} = getMessageForReadmore({
      isOld,
      messages,
    });
    client
      .query(
        GET_READ_MORE_MESSAAGES({
          channelId: channel,
          messageId: messageId,
          old: isOld,
        }),
      )
      .then(data => {
        let newMessages;
        const moreMessages = R.pathOr([], ['data', 'fetchMoreMessages'], data);
        if (moreMessages.length === 0) {
          Toast.show('No more messages found');
        }
        if (isOld) {
          newMessages = [...messages, ...moreMessages];
        } else {
          newMessages = [...moreMessages, ...messages];
        }
        // make sure not dup message
        newMessages = R.uniqWith((a, b) => a.messageId === b.messageId)(
          newMessages,
        );
        setMessages(newMessages);
      });
  };

  const sendMessage = () => {
    const text = messageInputRef.current.getText();
    if (text) {
      // not empty text will call api
      client
        .mutate(POST_MESSAGE({channelId: channel, text, userId: user}))
        .then(data => {
          const postMessage = R.path(['data', 'postMessage'], data);
          setMessages(prev => [postMessage, ...prev]);
          clearKeyboard();
        })
        .catch(error => {
          const date = new Date();
          const postMessage = {
            messageId: `${date.getTime()}`,
            text,
            datetime: date,
            userId: user,
            isFail: true,
          };
          setMessages(prev => [postMessage, ...prev]);
          clearKeyboard();
        });
    }
  };

  // --- handle message input ---
  useAppState({
    onChange: handdleMessageInput(messageInputRef),
  });

  const fetchLastestMessages = async channelIn => {
    client.query(GET_LASTEST_MESSAGES(channelIn)).then(data => {
      const lastestMessages = R.pathOr(
        [],
        ['data', 'fetchLatestMessages'],
        data,
      );
      setMessages(lastestMessages);
    });
  };

  useEffect(() => {
    fetchLastestMessages(channel);
  }, [channel]);

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
          customContainerStyle={{marginTop: 15}}
        />
        {messages.length === 0 && (
          <Text style={styles.empty}>This Channel is empty messages.</Text>
        )}
        <FlatList
          bounces={false}
          keyExtractor={item => item.messageId}
          data={messages}
          renderItem={renderItem}
          contentContainerStyle={styles.listContentContainer}
          inverted
        />
        <Button
          Icon={() => <AntDesign color="white" size={20} name="arrowdown" />}
          text="Read More"
          onPress={readmore('new')}
          customContainerStyle={{marginBottom: 15}}
        />
      </View>
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
    flex: 1,
  },
  empty: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 80,
  },
  listContentContainer: {
    flexGrow: 1,
    paddingTop: 15,
    paddingBottom: 30,
  },
});

export default MessageList;
