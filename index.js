require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: "http://localhost:5173" });

app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/user.route"));

const userSockets = {};

io.on("connection", (socket) => {
  socket.on("authenticate", (userId) => {
    userSockets[userId] = socket;
    console.log(`Пользователь ${userId} успешно аутентифицирован`);
  });
  socket.on("sendPrivateMessage", ({ senderId, recipientId, message }) => {
    const recipientSocket = userSockets[recipientId];
    if (recipientSocket) {
      recipientSocket.emit("privateMessage", { message });
    } else {
      console.log(`Пользователь ${recipientId} не в сети`);
    }
  });

  socket.on("disconnect", () => {
    const userId = getUserIdBySocket(socket);
    delete userSockets[userId];
  });
});

function getUserIdBySocket(socket) {
  for (const userId in userSockets) {
    if (userSockets[userId] === socket) {
      return userId;
    }
  }
  return null;
}

mongoose
  .connect(
    process.env.MONGODB,

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Успешно соединились с сервером MongoDB"))
  .catch(() => console.log("Ошибка при соединении с сервером MongoDB"));

httpServer.listen(process.env.PORT, () => {
  console.log(`Сервер запущен успешно на порте ${process.env.PORT}`);
});
