const express = require("express");
const app = express();

// to build server with socket io
const http = require("http");
const cors = require("cors");

const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    // which server is going to be calling to our socket.io
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const users = [];

const userJoin = (id, username, room) => {
  const user = { id, username, room };

  users.push(user);
  return user;
};

const userLeave = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);
    console.log(`User with ID: ${user.id} joined room: ${user.room}`);

    socket.emit("message", "Chatty: Welcome to ChatCord!");
  });

  socket.on("send_user_data", (data) => {
    socket.to(data.room_id).emit("enter_chat_notification", data.user);
  });

  socket.on("send_message", (messageData) => {
    socket.to(messageData.room).emit("receive_message", messageData);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("Server running on port 3001");
});
