import { useSocket } from "../../context/socket-context";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChatBar } from "./chat-bar";
import { ChatBody } from "./chat-body";
import { ChatFooter } from "./chat-footer";

 export const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const { socket } = useSocket();
  const lastMessageRef = useRef(null);

  const handleMessageResponse = useCallback(
    (data) => {
      setMessages([...messages, data]);
    },
    [messages]
  );

  const handleTypingStatus = useCallback((status) => {
    setTypingStatus(status);
   
  }, []);
  useEffect(() => {
    if (socket) {
      socket?.on("messageResponse", handleMessageResponse);
    }

    return () => {
      socket?.off("messageResponse", handleMessageResponse);
    };
  }, [handleMessageResponse, messages, socket]);

  useEffect(() => {                   
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (socket) {
      socket?.on("typingResponse", handleTypingStatus);
    }
    return () => {
      socket.off("typingResponse", handleTypingStatus);
    };
  }, [handleTypingStatus, socket]);
  return (
    <div className="chat">
      <ChatBar />
      <div className="chat__main">
        <ChatBody
          typingStatus={typingStatus}
          messages={messages}
          lastMessageRef={lastMessageRef}
        />
        <ChatFooter />
      </div>
    </div>
  );
};