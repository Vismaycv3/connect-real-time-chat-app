import User from "../models/user.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login request received");

    const user = await User.findOne({ email });

    

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

   

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  res.status(200).json(req.user);
};

export {
  registerUser,
  loginUser,
  getProfile,
};