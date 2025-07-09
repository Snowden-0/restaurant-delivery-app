import express from "express";
import { signup, login, revoke } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/revoke", protect, revoke);
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    message: "Welcome to your profile!",
    user: {
      id: req.user.id,
      username: req.user.username,
      is_active: req.user.is_active,
    },
  });
});

export default router;
