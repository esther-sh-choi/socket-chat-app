import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Chat from "../components/Chat";

import styles from "./ChatPage.module.scss";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const ChatPage = () => {
  // This room_id can be auto generated id, but at the moment, it is hard-coded
  const [room, setRoom] = useState("room_id");

  const { user, logout } = useAuth0();

  if (!user) {
    return null;
  }

  useEffect(() => {
    socket.emit("join_room", room);
  }, []);

  return (
    <div>
      <Chat socket={socket} room_id={room} />
    </div>
  );
};

export default ChatPage;
