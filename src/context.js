"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [roomInfo, setRoomInfo] = useState({});
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const [socketState ,setSocketState] = useState(null);
  const socketRef = useRef();
  
  useEffect(()=>{
    const socket = io(process.env.NEXT_PUBLIC_API_URL);
    if(!socketRef.current){
      socketRef.current = socket;
      setSocketState(socket);
    }
  })

  return (
    <AppContext.Provider
      value={{
        roomInfo,
        setRoomInfo,
        currentUserInfo,
        setCurrentUserInfo,
        socketRef,
        socketState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
