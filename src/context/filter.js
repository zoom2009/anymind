import React, {createContext, useContext, useState} from 'react';

const FilterContext = createContext({
  user: '',
  channel: '',
  setUser: () => {},
  setChannel: () => {},
});

const FilterProvider = ({children}) => {
  const [user, setUser] = useState('');
  const [channel, setChannel] = useState('');

  return (
    <FilterContext.Provider value={{user, channel, setUser, setChannel}}>
      {children}
    </FilterContext.Provider>
  );
};

const useFilter = () => useContext(FilterContext);

export {FilterProvider, useFilter};
