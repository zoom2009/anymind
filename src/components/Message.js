import {StyleSheet, Image, Text, View} from 'react-native';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {getMessageDateTime} from '../functions/date';
import {useFilter} from '../context/filter';

const statusSize = 16;
const offset = 10;

const Success = () => (
  <View style={styles.statusWrapper}>
    <View style={[styles.statusContainer, {backgroundColor: '#2ecc71'}]}>
      <Entypo size={statusSize - 5} color="white" name="check" />
    </View>
    <Text style={styles.textStatus}>Sent</Text>
  </View>
);

const Fail = () => (
  <View style={styles.statusWrapper}>
    <View style={[styles.statusContainer, {backgroundColor: '#c0392b'}]}>
      <AntDesign size={statusSize - 5} color="white" name="exclamation" />
    </View>
    <Text style={styles.textStatus}>Error</Text>
  </View>
);

const Message = ({item}) => {
  const {user} = useFilter();
  const {messageId, text, datetime, userId, isFail = false} = item;
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
        {!isFail ? <Success /> : <Fail />}
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  datetime: {
    fontSize: 12,
  },
  statusWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: statusSize,
    height: statusSize,
    borderRadius: statusSize,
    marginLeft: 2,
  },
  textStatus: {
    fontSize: 14,
    color: '#555',
    marginLeft: 2,
  },
});

export default Message;
