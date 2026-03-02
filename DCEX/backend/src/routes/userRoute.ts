import { Router } from "express";
import { getTokens } from "../controllers/userController.js";
const userRouter = Router();

userRouter.get("/tokens/:address", getTokens);
userRouter.post("/tokens/", getTokens);

export default userRouter;
