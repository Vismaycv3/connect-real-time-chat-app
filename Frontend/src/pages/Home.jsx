import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen text-white"
      style={{
        background:
          "radial-gradient(circle at top, #1a1a1a, #0a0a0a)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Navbar */}
        <div className="flex justify-between items-center py-8">

          <h1 className="text-4xl font-bold text-lime-400">
            Connect
          </h1>

          <div className="flex gap-4">
            <button
              onClick={() => navigate("/login")}
              className="
                px-5
                py-2
                rounded-[10px]
                bg-[#1f1f1f]
                hover:bg-[#252525]
                transition
              "
            >
              Login
            </button>

            <button
              onClick={() => navigate("/register")}
              className="
                px-5
                py-2
                rounded-[10px]
                bg-cyan-600
                hover:bg-cyan-700
                transition
              "
            >
              Register
            </button>
          </div>

        </div>

        {/* Hero Section */}
        <div className="text-center mt-28">

          <p className="text-lime-400 text-lg font-semibold">
            Real-Time Messaging Platform
          </p>

          <h1 className="text-6xl font-bold mt-4 leading-tight">
            Chat Instantly.
            <br />
            Stay Connected.
          </h1>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg leading-8">
            A modern chat application built using
            React, Node.js, MongoDB, JWT and
            Socket.IO for seamless real-time
            communication.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="
              mt-10
              px-8
              py-4
              rounded-[12px]
              bg-cyan-600
              hover:bg-cyan-700
              transition
            "
          >
            Get Started
          </button>

        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">

          <div
            className="
              p-8
              rounded-[20px]
              bg-white/[0.03]
              border
              border-white/5
            "
          >
            <h3 className="text-2xl font-bold text-lime-400">
              Real-Time Chat
            </h3>

            <p className="text-gray-400 mt-4 leading-7">
              Instant messaging powered by
              Socket.IO with seamless updates
              and low-latency communication.
            </p>
          </div>

          <div
            className="
              p-8
              rounded-[20px]
              bg-white/[0.03]
              border
              border-white/5
            "
          >
            <h3 className="text-2xl font-bold text-lime-400">
              Authentication
            </h3>

            <p className="text-gray-400 mt-4 leading-7">
              Secure login system using JWT
              authentication and encrypted
              password storage.
            </p>
          </div>

          <div
            className="
              p-8
              rounded-[20px]
              bg-white/[0.03]
              border
              border-white/5
            "
          >
            <h3 className="text-2xl font-bold text-lime-400">
              MongoDB Storage
            </h3>

            <p className="text-gray-400 mt-4 leading-7">
              Store messages and user data
              securely with MongoDB Atlas
              cloud database.
            </p>
          </div>

        </div>

        {/* About Section */}
        <div
          className="
            mt-20
            p-10
            rounded-[20px]
            bg-white/[0.03]
            border
            border-white/5
            text-center
          "
        >
          <h2 className="text-4xl font-bold text-lime-400">
            About Connect
          </h2>

          <p className="text-gray-400 mt-6 leading-8 max-w-3xl mx-auto">
            Connect is a real-time messaging
            platform developed to demonstrate
            modern full-stack development using
            React, Node.js, Express, MongoDB,
            JWT Authentication and Socket.IO.
          </p>

          <p className="mt-8 text-lg">
            Developed by{" "}
            <span className="text-cyan-400 font-semibold">
              Vismay CV
            </span>
          </p>
        </div>

        {/* Footer */}
        <footer
          className="
            mt-20
            py-8
            text-center
            text-gray-500
            border-t
            border-white/5
          "
        >
          © 2026 Connect • Made by Vismay CV
        </footer>

      </div>
    </div>
  );
}

export default Home;