import {
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
} from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import users from '../constants/users';
import channels from '../constants/channels';
import {useFilter} from '../context/filter';

const FilterSidebar = () => {
  const {channel, setChannel, user, setUser} = useFilter();
  const onSelectChannel = channelIn => () => setChannel(channelIn);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>1. Choose your user</Text>
        <SelectDropdown
          data={users}
          defaultValue={user}
          buttonStyle={styles.dropdownButton}
          onSelect={setUser}
          renderDropdownIcon={isOpened => (
            <AntDesign name={isOpened ? 'up' : 'down'} color="#444" size={18} />
          )}
        />
        <Text style={[styles.title, {marginVertical: 20}]}>
          2. Choose your Channel
        </Text>
        {channels.map(channelIn => {
          const isSelected = channel === channelIn;
          return (
            <TouchableOpacity
              key={channelIn}
              activeOpacity={0.8}
              style={[
                styles.channelItem,
                {backgroundColor: isSelected ? 'white' : '#eee'},
              ]}
              onPress={onSelectChannel(channelIn)}>
              <Text
                style={[
                  styles.channelItemText,
                  {fontWeight: isSelected ? 'bold' : 'normal'},
                ]}>
                {`${channelIn} Channel`}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },
  dropdownButton: {
    width: '97.5%',
    alignSelf: 'center',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 10,
    marginLeft: 5,
  },
  channelItem: {
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#eee',
    paddingLeft: 10,
  },
  channelItemText: {
    fontSize: 14,
  },
});

export default FilterSidebar;
