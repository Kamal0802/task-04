import connectDB from "./config/Database.mjs";
import express from "express";
import dotenv from "dotenv";
import UserRouter from "./routers/user.router.mjs";
import chatRouter from "./routers/chat.router.mjs";
import bodyParser from "body-parser";
import cors from "cors";
import { app, server } from "./utils/socket.mjs";

dotenv.config();
connectDB();

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use("/user", UserRouter);
app.use("/chat",chatRouter);

server.listen(process.env.PORT, () => {
  console.log("server is running");
});
