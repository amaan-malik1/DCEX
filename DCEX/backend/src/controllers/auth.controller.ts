import type { Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { googleClient } from "../lib/google.js";
import { prismaClient } from "../lib/prisma.js";
import { Keypair } from "@solana/web3.js";
import { generateAccessToken, generateRefreshToken } from "../lib/jwt.js";

dotenv.config();

export const googleLoginClient = async (req: Request, res: Response) => {
  const url = googleClient.generateAuthUrl({
    access_type: "offline",
    scope: ["profile", "email"],
  });

  res.redirect(url);
};

export const googleOAuthLogin = async (req: Request, res: Response) => {
  try {
    const code = req.query.code as string;
    if (!code) {
      return res.status(400).json({ message: "Authorization code missing" });
    }

    //exchange code for token
    const { tokens } = await googleClient.getToken(code);
    googleClient.setCredentials(tokens);

    //google client id
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    if (!GOOGLE_CLIENT_ID) {
      throw new Error("GOOGLE_CLIENT_ID is not defined");
    }

    // Get user info
    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token!,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email) {
      return res.status(401).json({ message: "Invalid Google token" });
    }

    const { email, name, picture, sub } = payload;

    //finding user and if not present then data to DB
    let user = await prismaClient.user.findUnique({
      where: {
        username: email,
      },
    });

    if (!user) {
      //generating keypair for the user
      const keypair = Keypair.generate();
      const pubKey = keypair.publicKey.toBase58();
      const secretKey = keypair.secretKey.toBase64();

      user = await prismaClient.user.create({
        data: {
          username: email,
          name,
          profileImg: picture,
          provider: "Google",
          googleId: sub,
          solWallets: {
            create: {
              publicKey: pubKey,
              privateKey: secretKey,
            },
          },
          inrWallet: {
            create: {
              balance: 0,
            },
          },
        },
      });
    }

    //generate token
    const accessToken = generateAccessToken(user!.id);
    const refreshToken = generateRefreshToken(user!.id);

    //saving refresh token into DB
    await prismaClient.user.update({
      where: { id: user.id },
      data: {
        refreshToken,
      },
    });

    //secure cookie
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.redirect("http://localhost:5173/dashboard");
  } catch (error) {
    console.error("Google OAuth Error:", error);
    return res.status(500).json({ message: "OAuth failed" });
  }
};

export const getRefreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({
      message: "Not refresh token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as {
      userId: string;
    };

    const user = await prismaClient.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || !user.refreshToken !== token) {
      return res.status(403).json({
        message: "Invalid refresh token",
      });
    }

    const newAccessToken = generateAccessToken(user.id);
    const newRefreshToken = generateRefreshToken(user.id);

    await prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken: newRefreshToken,
      },
    });

    res.cookie("accessToken ", newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.cookie("refreshToken ", newRefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.json({
      message: "Token refreshed",
    });
  } catch (error) {
    console.log("Error while refreshing token: ", error);
    res.json({
      message: "Internal server error",
    });
  }
};
