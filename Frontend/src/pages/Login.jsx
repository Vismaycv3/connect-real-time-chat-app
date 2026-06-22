import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "https://connect-real-time-chat-app-3to4.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem(
        "userInfo",
        JSON.stringify(res.data)
      );

      navigate("/chat");
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <div
    className="min-h-screen flex items-center justify-center text-white"
    style={{
      background:
        "radial-gradient(circle at top, #1a1a1a, #0a0a0a)",
    }}
  >
    <div
      className="
      w-full
      max-w-md
      p-10
      rounded-[20px]
      border
      border-white/5
      bg-white/[0.03]
      backdrop-blur-sm
      "
    >
      <div className="text-center mb-8">

        <h1 className="text-5xl font-bold text-lime-400">
          Connect
        </h1>

        <p className="text-gray-400 mt-3">
          Real-Time Messaging Platform
        </p>

      </div>

      <div className="space-y-4">

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="
          w-full
          px-4
          py-3
          rounded-[10px]
          bg-[#1f1f1f]
          text-white
          outline-none
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
          w-full
          px-4
          py-3
          rounded-[10px]
          bg-[#1f1f1f]
          text-white
          outline-none
          "
        />

        <button
          onClick={handleLogin}
          className="
          w-full
          py-3
          rounded-[10px]
          bg-cyan-600
          hover:bg-cyan-700
          transition
          "
        >
          Login
        </button>

      </div>

      <p className="text-center text-gray-400 mt-6">
        Don't have an account?{" "}
        <span
          className="
          text-lime-400
          cursor-pointer
          hover:underline
          "
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>

    </div>
  </div>
);
}

export default Login;