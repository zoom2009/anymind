import React, {createContext, useContext, useState} from 'react';

const FilterContext = createContext({
  user: '',
  channel: '',
  setUser: () => {},
  setChannel: () => {},
  isShowDrawer: false,
  toggleDrawer: () => {},
});

const FilterProvider = ({children}) => {
  const [user, setUser] = useState('Joyse');
  const [channel, setChannel] = useState('General');
  const [isShowDrawer, setIsShowDrawer] = useState(false);

  const toggleDrawer = show =>
    setIsShowDrawer(prev => {
      if (show !== undefined) return show;
      return !prev;
    });

  return (
    <FilterContext.Provider
      value={{user, channel, setUser, setChannel, isShowDrawer, toggleDrawer}}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => useContext(FilterContext);

export {FilterProvider, useFilter};
