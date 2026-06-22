import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

function Chat() {
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  );

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://connect-real-time-chat-app-3to4.onrender.com/api/users",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMessages = async (userId) => {
    try {
      const res = await axios.get(
        `https://connect-real-time-chat-app-3to4.onrender.com/api/messages/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setMessages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    try {
      const res = await axios.post(
        "https://connect-real-time-chat-app-3to4.onrender.com/api/messages",
        {
          receiverId: selectedUser._id,
          text: newMessage,
        },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

     

      fetchMessages(selectedUser._id);

      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchMessages(selectedUser._id);
    }
  }, [selectedUser]);

  useEffect(() => {
    const newSocket = io("https://connect-real-time-chat-app-3to4.onrender.com");

    setSocket(newSocket);

    newSocket.emit(
      "addUser",
      userInfo._id
    );

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("newMessage", (message) => {
      console.log("Realtime Message:", message);

      setMessages((prev) => [
        ...prev,
        message,
      ]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket]);

 return (
  <div
    className="flex h-screen text-white"
    style={{
      background:
        "radial-gradient(circle at top, #1a1a1a, #0a0a0a)",
    }}
  >
    {/* Sidebar */}
    <div
      className="
      w-[300px]
      m-5
      mr-0
      rounded-[20px]
      border
      border-white/5
      bg-white/[0.03]
      backdrop-blur-sm
      flex
      flex-col
      "
    >
      <div className="p-6 border-b border-white/5">
        <h1 className="text-4xl font-bold text-lime-400">
          Connect
        </h1>

        <p className="text-gray-400 mt-2 text-sm">
          Real-Time Messaging
        </p>
      </div>

      <div className="p-5 border-b border-white/5">
        <p className="font-semibold">
          {userInfo.username}
        </p>

        <p className="text-gray-400 text-sm">
          {userInfo.email}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {users
          .filter(
            (user) => user._id !== userInfo._id
          )
          .map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`
                p-4
                mb-3
                rounded-[18px]
                cursor-pointer
                transition-all
                border
                ${
                  selectedUser?._id === user._id
                    ? "border-lime-400 bg-white/[0.05]"
                    : "border-white/5 bg-white/[0.03]"
                }
              `}
            >
              <div className="flex items-center gap-3">

                <div
                  className="
                  w-10
                  h-10
                  rounded-full
                  bg-[#1f1f1f]
                  flex
                  items-center
                  justify-center
                  "
                >
                  {user.username
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <p>{user.username}</p>

                  <p className="text-xs text-gray-500">
                    Online
                  </p>
                </div>

              </div>
            </div>
          ))}
      </div>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => {
            localStorage.removeItem("userInfo");
            window.location.href = "/login";
          }}
          className="
          w-full
          p-3
          rounded-[10px]
          bg-cyan-600
          hover:bg-cyan-700
          transition
          "
        >
          Logout
        </button>
      </div>
    </div>

    {/* Chat Area */}
    <div
      className="
      flex-1
      m-5
      rounded-[20px]
      border
      border-white/5
      bg-white/[0.03]
      backdrop-blur-sm
      flex
      flex-col
      "
    >
      {/* Header */}
      <div className="p-5 border-b border-white/5">

        {selectedUser ? (
          <div>
            <h2 className="text-2xl font-bold">
              {selectedUser.username}
            </h2>

            <p className="text-gray-400 text-sm">
              Online
            </p>
          </div>
        ) : (
          <h2 className="text-2xl font-bold">
            Select a User
          </h2>
        )}

      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">

        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex mb-4 ${
              message.sender === userInfo._id
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className="
              px-4
              py-3
              rounded-[14px]
              bg-[#1f1f1f]
              border
              border-white/5
              max-w-md
              "
            >
              {message.text}
            </div>
          </div>
        ))}

      </div>

      {/* Input */}
      {selectedUser && (
        <div className="p-5 border-t border-white/5">

          <div className="flex gap-3">

            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) =>
                setNewMessage(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              className="
              flex-1
              px-4
              py-3
              rounded-[10px]
              bg-[#1f1f1f]
              outline-none
              "
            />

            <button
              onClick={sendMessage}
              className="
              px-6
              rounded-[10px]
              bg-cyan-600
              hover:bg-cyan-700
              transition
              "
            >
              Send
            </button>

          </div>

        </div>
      )}
    </div>
  </div>
);
}

export default Chat;