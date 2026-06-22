import Message from "../models/message.js";

import {
  io,
  getReceiverSocketId,
} from "../sockets/socket.js";

const sendMessage = async (req, res) => {
  try {
    const { receiverId, text } = req.body;

    if (!receiverId || !text) {
      return res.status(400).json({
        message: "Receiver ID and text are required",
      });
    }

    const message = await Message.create({
      sender: req.user._id,
      receiver: receiverId,
      text,
    });

    const receiverSocketId =
      getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit(
        "newMessage",
        message
      );
    }

    res.status(201).json(message);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const senderId = req.user._id;
    const receiverId = req.params.userId;

    const messages = await Message.find({
      $or: [
        {
          sender: senderId,
          receiver: receiverId,
        },
        {
          sender: receiverId,
          receiver: senderId,
        },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export {
  sendMessage,
  getMessages,
};