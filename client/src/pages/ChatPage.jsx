import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Chat from "../components/Chat";
import NavBar from "../components/NavBar";
import ParticipantList from "../components/ParticipantList";

import styles from "./ChatPage.module.scss";

import io from "socket.io-client";
const socket = io.connect("http://localhost:3001");

const ChatPage = () => {
  // This room_id can be auto generated id, but at the moment, it is hard-coded
  const [room, setRoom] = useState("room_id");
  const [userDataList, setUserDataList] = useState([]);

  console.log("here");
  const { user } = useAuth0();

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
    });

    socket.emit("join_room", { username: user.nickname, room });
    socket.emit("send_user_data", { username: user.nickname, room });

    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    socket.on("enter_chat_notification", (data) => {
      setUserDataList((prev) => [...prev, data]);
    });

    return () => {
      socket.off("enter_chat_notification");
    };
  }, [socket]);

  if (!user) {
    return null;
  }

  return (
    <div className={styles.chat_page}>
      <NavBar socket={socket} />
      <Chat socket={socket} room_id={room} user={user} />
      <ParticipantList userDataList={userDataList} />
    </div>
  );
};

export default ChatPage;
