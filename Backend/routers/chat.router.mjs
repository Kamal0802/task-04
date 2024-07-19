import { Router } from "express";

import chatController from "../controllers/chat.controller.mjs";

import authMiddleWare from "../utils/authorization.mjs";

const { getChat, sendMessege } = chatController;

const chatRouter = Router();

chatRouter.get("/history/:userId", authMiddleWare, getChat);

chatRouter.post("/send", authMiddleWare, sendMessege);

export default chatRouter;
