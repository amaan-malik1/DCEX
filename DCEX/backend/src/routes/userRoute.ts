import { Router } from "express";
import { getTokens } from "../controllers/userController.js";
import { protectRoute } from "../middleware/authProtect.js";
const userRouter = Router();

userRouter.get("/wallet/tokens", protectRoute, getTokens);

/// other apis

export default userRouter;
