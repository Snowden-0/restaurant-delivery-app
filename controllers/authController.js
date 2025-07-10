import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { findUserByUsername, createUser } from '../services/authService.js';

// Global constants for error messages
const ERR_USERNAME_PASSWORD_REQUIRED = 'Username and password are required.';
const ERR_USERNAME_EXISTS = 'Username already exists.';
const ERR_SIGNUP_SERVER = 'Server error during signup.';
const ERR_INVALID_CREDENTIALS = 'Invalid credentials.';
const ERR_LOGIN_SERVER = 'Server error during login.';

// Token configuration
const TOKEN_EXPIRATION = '1h';

export const signup = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: ERR_USERNAME_PASSWORD_REQUIRED });
  }

  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(409).json({ message: ERR_USERNAME_EXISTS });
    }

    const newUser = await createUser(username, password);
    res.status(201).json({ message: 'User created successfully!', user: newUser });
  } catch (error) {
    res.status(500).json({ message: ERR_SIGNUP_SERVER, error: error.message });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: ERR_USERNAME_PASSWORD_REQUIRED });
  }

  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: ERR_INVALID_CREDENTIALS });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: ERR_INVALID_CREDENTIALS });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: TOKEN_EXPIRATION }
    );

    res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    res.status(500).json({ message: ERR_LOGIN_SERVER, error: error.message });
  }
};

export const getProfile = (req, res) => {
  res.status(200).json({
    message: "Welcome to your profile!",
    user: req.user
  });
};