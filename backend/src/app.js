const express = require("express");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");

const authRoutes = require("./routes/auth.routes");
const sensoresRoutes = require("./routes/sensores.routes");

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = socketIo(server, {
  cors: { origin: "*" },
});

/* RUTAS */
app.use("/", authRoutes);
app.use("/sensores", sensoresRoutes(io));

module.exports = { app, server, io };