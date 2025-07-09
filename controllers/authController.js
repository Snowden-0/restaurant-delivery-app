import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  findUserByUsername,
  createUser,
  revokeUserAccess,
} from "../services/authService.js";

//-------------------SIGNUP FUNCTION-------------------
export const signup = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists." });
    }

    const newUser = await createUser(username, password);
    res
      .status(201)
      .json({ message: "User created successfully!", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error during signup.", error: error.message });
  }
};
//---------------------LOGIN FUNCTION---------------------
export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful!", token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error during login.", error: error.message });
  }
};

//-------------------------REVOKE FUNCTION-------------------------
export const revoke = async (req, res) => {
  try {
    // req.user.id is available because the 'protect' middleware ran first
    const userId = req.user.id;
    await revokeUserAccess(userId);
    res
      .status(200)
      .json({
        message:
          "User access has been successfully revoked. Please log in again.",
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error during revocation.",
        error: error.message,
      });
  }
};
