/* This code snippet is creating a `SocketProvider` component and a custom hook `useSocket` using
React's Context API. Here's a breakdown of what each part of the code is doing: */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { socketInstance } from "../config";
import { Loader } from "../components/loader/loader";


const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const socket = useRef(socketInstance);

  useEffect(() => {
    socketInstance.connect();
    const onConnect = () => {
      socket.current= socketInstance;
      setIsSocketConnected(true);
    };

    const onDisconnect = () => {
      socketInstance.disconnect();
      socket.current = null;

      setIsSocketConnected(false);
    };
    socketInstance.on("connect", onConnect);
    socketInstance.on("disconnect", onDisconnect);

    return () => {
      socketInstance.off("connect", onConnect);
      socketInstance.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket:socket.current }}>
      {isSocketConnected ? children : <Loader/>}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
