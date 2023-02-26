import React, { useEffect, useState } from "react";

import styles from "./Chat.module.scss";

const Chat = ({ socket, room_id, user }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [renderMessages, setRenderMessages] = useState([]);
  const [userDataList, setUserDataList] = useState([]);

  const sendMessage = () => {
    return new Promise((resolve, reject) => {
      if (currentMessage.trim()) {
        const minute = new Date().getMinutes();
        const messageData = {
          id: Math.floor(Math.random() * 100000),
          room: room_id,
          message: currentMessage,
          time: new Date().getHours() + ":" + String(minute).padStart(2, "0"),
        };

        socket.emit("send_message", messageData);
        setCurrentMessage("");
        setRenderMessages((prev) => [...prev, { sent: messageData }]);
      } else {
        reject(new Error("Message is empty."));
      }
    });
  };

  useEffect(() => {
    socket.on("enter_chat_notification", (data) => {
      setUserDataList((prev) => [...prev, data.user]);
    });

    socket.on("receive_message", (data) => {
      setRenderMessages((prev) => [...prev, { received: data }]);
    });

    return () => {
      socket.off("enter_chat_notification");
      socket.off("receive_message");
    };
  }, [socket]);

  return (
    <div className={styles.chat_container}>
      <div className={styles["chat-header"]}>
        <p>Live Chat</p>
      </div>
      <div className={styles["chat-body"]}>
        {renderMessages.map((message) => {
          const msg = message.received || message.sent;
          const className = message.received ? "received" : "sent";
          return (
            <div
              className={`${styles["message-container"]} ${styles[className]}`}
              key={msg.id}
            >
              <p className={`${styles.message} ${styles[className]}`}>
                {msg.message}
              </p>
              <p className={styles["message-time"]}>{msg.time}</p>
            </div>
          );
        })}
      </div>
      <div className={styles["chat-footer"]}>
        <div className={styles.profile_picture}>
          <img src={user.picture} alt="user profile picture" />
        </div>
        <input
          type="text"
          placeholder="Type message..."
          value={currentMessage}
          onChange={(event) => setCurrentMessage(event.target.value)}
        />
        <button onClick={() => sendMessage()}>Send &#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
