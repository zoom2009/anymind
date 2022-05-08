import {FlatList, Text, StyleSheet, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Message from './Message';
import Button from './Button';
import {useFilter} from '../context/filter';

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
  const readmore = type => () => {
    if (type === 'new') {
      alert('load more new');
    } else if (type === 'old') {
      alert('load more old');
    }
  };

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
          renderItem={Message}
        />
        <Button
          Icon={() => <AntDesign color="white" size={20} name="arrowdown" />}
          text="Read More"
          onPress={readmore('new')}
          customContainerStyle={{marginVertical: 30}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
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
