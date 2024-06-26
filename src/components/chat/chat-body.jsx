/* eslint-disable react/prop-types */
import { useNavigationWithTransition } from "../../hooks/use-navigation";

export const ChatBody = ({ messages, lastMessageRef,typingStatus }) => {
  const {handleNavigation} = useNavigationWithTransition()

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    handleNavigation("/",{
      state: {
        userName: localStorage.getItem("userName"),
      },
      
    });
  };
  return (
    <>
   <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages?.map((message) =>
        message.name === localStorage.getItem("userName") ? (
          <div className="message__chats" key={message?.id}>
            <p className="sender__name">You</p>
            <div className="message__sender">
              <p>{message?.text}</p>
            </div>
          </div>
        ) : (
          <div className="message__chats" key={message?.id}>
            <p>{message?.name}</p>
            <div className="message__recipient">
              <p>{message?.text}</p>
            </div>
          </div>
        ))}

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
   
  );
};

