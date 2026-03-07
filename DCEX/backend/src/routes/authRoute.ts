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

// OAuth
authRouter.get("/google", googleLoginClient);
authRouter.get("/google/callback", googleOAuthLogin);

// Current User
authRouter.get("/me", protectRoute, async (req: Request, res: Response) => {
  try {
    const user = await prismaClient.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        username: true,
        name: true,
        profileImg: true,
        solWallets: {
          select: {
            publicKey: true,
          },
        },
        inrWallet: {
          select: {
            balance: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      user,
    });
  } catch (error) {
    console.error("Error while fetching user: ", error);
    res.status(500).json({ message: "Failed to fetch user" });
  }
});

// Refresh
authRouter.post("/refresh", getRefreshToken);

// Logout
authRouter.post("/logout", logoutUser);

export default authRouter;
