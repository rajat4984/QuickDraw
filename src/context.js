"use client";
const { createContext, useContext, useState, useEffect } = require("react");

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [roomInfo, setRoomInfo] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  return (
    <AppContext.Provider value={{ roomInfo, setRoomInfo,currentUser,setCurrentUser}}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
