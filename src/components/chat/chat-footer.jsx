/* eslint-disable react/prop-types */
import { useState } from "react";
import { useSocket } from "../../context/socket-context";

export const ChatFooter = () => {
  const [message, setMessage] = useState("");
  const { socket } = useSocket();
  console.log(socket, 8);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!message) return;

    socket.emit("message", {
      text: message,
      userName: localStorage.getItem("userName"),
      id: `${socket?.id}${Math.random()}`,
      socketID: socket?.id,
    });
    setMessage("");
  };
  const handleTyping = () =>
    socket?.emit("typing", `${localStorage.getItem("userName")} is typing`);
  return (
    <div className="chat__footer">
      <form className="form"  onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
        <button type="submit" className="sendBtn">
          SEND
        </button>
      </form>
    </div>
  );
};
