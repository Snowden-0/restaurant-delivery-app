import jwt from "jsonwebtoken";
import { findUserById } from "../services/authService.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Check if the user is still active in the database
      const currentUser = await findUserById(decoded.id);

      if (!currentUser || !currentUser.is_active) {
        return res
          .status(401)
          .json({ message: "Not authorized, user has been revoked." });
      }
      req.user = currentUser;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
