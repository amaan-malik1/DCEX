import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      message: "Not Authenticated",
    });
  }

  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      userId: string;
    };

    req.userId = decode.userId;
    next();
  } catch (error) {
    console.log("Error while authenticating: ", error);
    return res.status(403).json({ message: "Invalid token" });
  }
};
