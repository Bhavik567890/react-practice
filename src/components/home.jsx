import { useState } from "react";
import { useSocket } from "../context/socket-context";
import { useNavigationWithTransition } from "../hooks/use-navigation";
import { useLocation } from "react-router-dom";
export const Home = () => {
  console.log(6);
  const [userName, setUserName] = useState("");
  const { socket } = useSocket();
  console.log(socket, 7);
  const { isPending, handleNavigation } = useNavigationWithTransition();
  const { state } = useLocation();

  console.log(state, 12);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userName) return;
    localStorage.setItem("userName", userName);
    if (socket) {
      socket?.emit("newUser", { userName, socketID: socket.id });
      handleNavigation("/chat", {
        state,
      });
    }
  };

  return (
    <form className="home__container" onSubmit={handleSubmit}>
      <h2 className="home__header">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="username__input"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className="home__cta" disabled={isPending}>
        SIGN IN
      </button>
    </form>
  );
};
