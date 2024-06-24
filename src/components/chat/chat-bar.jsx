import { useCallback, useEffect, useState } from "react";
import { useSocket } from "../../context/socket-context";

export const ChatBar = () => {
  const [users, setUsers] = useState([]);
  const { socket } = useSocket();

  const handleNewUserresponse = useCallback((data) => {
    setUsers(data);
  }, []);

  useEffect(() => {
    socket.on("newUserResponse", handleNewUserresponse);

    return () => {
      socket.off("newUserResponse", handleNewUserresponse);
    };
  }, [handleNewUserresponse, socket]);
  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>

      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
        <div className="chat__users">
          {users.map((o) => (
            <p key={o.socketID}>{o.userName}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
