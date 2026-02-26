import express, { type Request, type Response } from "express";
import {
  getRefreshToken,
  googleLoginClient,
  googleOAuthLogin,
  logoutUser,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/authProtect.js";
import { prismaClient } from "../lib/prisma.js";

const authRouter = express.Router();

// 🔹 OAuth
authRouter.get("/google", googleLoginClient);
authRouter.get("/google/callback", googleOAuthLogin);

// 🔹 Current User
authRouter.get("/me", protectRoute, async (req: Request, res: Response) => {
  const user = await prismaClient.user.findUnique({
    where: { id: req.userId },
  });
  res.json({ user });
});

// 🔹 Refresh
authRouter.post("/refresh", getRefreshToken);

// 🔹 Logout
authRouter.post("/logout", logoutUser);

export default authRouter;
