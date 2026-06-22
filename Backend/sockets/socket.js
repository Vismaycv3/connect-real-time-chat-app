const userSocketMap = {};

export const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

let io;

const socketSetup = (socketIO) => {
  io = socketIO;

  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("addUser", (userId) => {
      userSocketMap[userId] = socket.id;

      console.log("Online Users:");
      console.log(userSocketMap);
    });

    socket.on("disconnect", () => {
      console.log("User Disconnected:", socket.id);

      for (const userId in userSocketMap) {
        if (userSocketMap[userId] === socket.id) {
          delete userSocketMap[userId];
          break;
        }
      }
    });
  });
};

export { io };

export default socketSetup;