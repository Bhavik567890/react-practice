import { useState, useEffect } from "react";
import { PlinkoCanvas } from "./plinko-canvas";

export const Board = () => {
  const [paths, setPaths] = useState([]);
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState(0);

  useEffect(() => {
    const registerUser = async () => {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: "Player1" }),
      });
      const data = await response.json();
      setUser(data);
      setWallet(data?.wallet);
    };
    registerUser();
  }, []);

  const dropDisc = async () => {
    if (!user) return;
    const response = await fetch("http://localhost:5000/api/drop-disc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({ userId: user.id }),
    });
    const data = await response.json();
    console.log(data,35)
    setPaths((prevPaths) => [...prevPaths, data?.path]);
    if (data.win) {
      setWallet((prevWallet) => prevWallet + data?.score);
    }
  };

  const handleComplete = () => {
    // Handle completion of the disc drop if needed
  };

  return (
    <div className="board">
      <h2>Wallet: ${wallet}</h2>
      <button onClick={dropDisc}>Drop Disc</button>
      <PlinkoCanvas paths={paths} onComplete={handleComplete} />
    </div>
  );
};
