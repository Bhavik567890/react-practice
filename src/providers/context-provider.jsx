/* eslint-disable react/prop-types */
import { AuthProvider } from "../context/auth-context";
import { PeerProvider } from "../context/peer-context";
import { SocketProvider } from "../context/socket-context";

export const ContextProvider = ({ children }) => {
  return (
    <PeerProvider>
      <AuthProvider>
        <SocketProvider>{children}</SocketProvider>
      </AuthProvider>
    </PeerProvider>
  );
};
