"use client";
const { createContext, useContext, useState, useEffect } = require("react");

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [roomInfo, setRoomInfo] = useState({});
  const [currentUserInfo, setCurrentUserInfo] = useState({});

  

  return (
    <AppContext.Provider
      value={{ roomInfo, setRoomInfo, currentUserInfo, setCurrentUserInfo }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
