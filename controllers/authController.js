import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser } from '../services/authService.js';

// Global constants for error messages
const ERR_USERNAME_PASSWORD_REQUIRED = 'Please fill in the required fields';
const ERR_EMAIL_EXISTS = 'Email already exists.';
const ERR_SIGNUP_SERVER = 'Server error during signup.';
const ERR_INVALID_CREDENTIALS = 'Invalid credentials.';
const ERR_LOGIN_SERVER = 'Server error during login.';

// Token configuration
const TOKEN_EXPIRATION = '1h';

export const signup = async (req, res) => {
  const { name, email, password, phone_number, address } = req.body;

  if (!name || !email || !password || !phone_number || !address) {
    return res.status(400).json({ message: ERR_USERNAME_PASSWORD_REQUIRED });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: ERR_EMAIL_EXISTS });
    }

    const newUser = await createUser(name, email, password, phone_number, address);
    return res.status(201).json({ message: 'User created successfully!', user: newUser });
  } catch (error) {
    return res.status(500).json({ message: ERR_SIGNUP_SERVER, error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: ERR_USERNAME_PASSWORD_REQUIRED });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: ERR_INVALID_CREDENTIALS });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: ERR_INVALID_CREDENTIALS });
    }

    // Create JWT
    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: TOKEN_EXPIRATION }
    );

    return res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    return res.status(500).json({ message: ERR_LOGIN_SERVER, error: error.message });
  }
};

export const getProfile = (req, res) => {
  return res.status(200).json({
    message: "Welcome to your profile!",
    user: req.user
  });
};