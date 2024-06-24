/* This code snippet is creating a `SocketProvider` component and a custom hook `useSocket` using
React's Context API. Here's a breakdown of what each part of the code is doing: */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const Authcontext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    setIsLoggedIn(true);
    setUserRole("employee");
  }, []);

  const handleToggleAuth = (role) => {
    setIsLoggedIn(true);
    localStorage.setItem("isauthenticated", true);
    setUserRole(role);
  };

  return (
    <Authcontext.Provider value={{ handleToggleAuth, isLoggedIn, userRole }}>
      {children}
    </Authcontext.Provider>
  );
};

export const useAuth = () => {
  return useContext(Authcontext);
};
