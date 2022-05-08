import {StyleSheet, Image, Text, View} from 'react-native';
import React from 'react';
import {getMessageDateTime} from '../functions/date';
import {useFilter} from '../context/filter';

const offset = 10;

const Message = ({item}) => {
  const {user} = useFilter();
  const {messageId, text, datetime, userId} = item;
  const isSelfMessage = user === userId;
  const avatarImage = `https://picsum.photos/seed/${userId}/50/50`;

  return (
    <View
      style={[
        styles.row,
        {flexDirection: isSelfMessage ? 'row-reverse' : 'row'},
      ]}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{uri: avatarImage}} />
        <Text style={styles.avatarText}>{userId}</Text>
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.datetimeContainer}>
        <Text style={styles.datetime}>{getMessageDateTime(datetime)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: offset,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  avatarText: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 5,
    color: '#555',
  },
  avatarContainer: {
    marginHorizontal: offset,
  },
  messageContainer: {
    backgroundColor: 'white',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexShrink: 1,
  },
  text: {
    fontSize: 16,
  },
  datetimeContainer: {
    marginHorizontal: offset,
  },
  datetime: {
    fontSize: 12,
  },
});

export default Message;
