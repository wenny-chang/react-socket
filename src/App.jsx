import { useState, useEffect } from "react";
import "./App.css";
import { socket } from "./utils";

function App() {
  const [msg, setMsg] = useState("");
  const [room, setRoom] = useState("");
  const sendMessage = () => socket.emit("send_message", { message: msg });

  useEffect(() => {
    try {
      socket.on("receive_message", (data) => {
        alert(data.message);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const ConnectRoom = () => {
    socket.emit("join_room", room, (response) => {
      console.log(response.status);
      alert(response.msg);
    });
  };
  return (
    <div className="App">
      <div className="typeMessage">
        <input
          type="text"
          placeholder="WriteYour Message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
        <input
          type="text"
          placeholder="Room"
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={ConnectRoom}>Connect Room</button>
      </div>
    </div>
  );
}

export default App;
