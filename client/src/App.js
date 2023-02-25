import "./App.scss";

import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./components/Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [joinChat, setJoinChat] = useState(false);
  // This room_id can be auto generated id, but at the moment, it is hard-coded
  const [room, setRoom] = useState("room_id");

  const handleJoinChat = () => {
    setJoinChat(true);

    socket.emit("join_room", room);
  };

  return (
    <div className="App">
      {joinChat ? (
        <Chat socket={socket} room_id={room} />
      ) : (
        <button className="join-chat-btn" onClick={handleJoinChat}>
          Join Chat
        </button>
      )}
    </div>
  );
}

export default App;
