import chatModel from "../models/chat.model.mjs";

import { io, getReceiverSocketId } from "../utils/socket.mjs";

const sendMessege = async (req, res) => {
  const { receiver, content } = req.body;

  console.log(req.user.id);

  try {
    const message = new chatModel({
      sender: req.user.id,
      receiver,
      content,
    });

    await message.save();

     const receiverSocketId = getReceiverSocketId(receiver);
     console.log(receiverSocketId);
     if (receiverSocketId) {
       io.to(receiverSocketId).emit("sendMessage", message);
    }
    res.status(201).json(message);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

const getChat = async (req, res) => {
  try {
    const messages = await chatModel
      .find({
        $or: [
          { sender: req.user.id, receiver: req.params.userId },
          { sender: req.params.userId, receiver: req.user.id },
        ],
      })
      .sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error);
  }
};

export default { sendMessege, getChat };
