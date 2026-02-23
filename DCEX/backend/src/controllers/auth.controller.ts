import type { Request, Response } from "express";
import dotenv from "dotenv"
import { googleClient } from "../lib/google.js";
import { prismaClient } from "../lib/prisma.js";

dotenv.config();

export const googleLoginClient = async (req: Request, res: Response) => {
    const url = googleClient.generateAuthUrl({
        access_type: "offline",
        scope: ["profile", "email"]
    });

    res.redirect(url);
}

export const googleOAuthLogin = async (req: Request, res: Response) => {
    try {
        const code = req.query.code as string;
        if (!code) {
            return res.status(400).json({ message: "Authorization code missing" });
        }

        //exchange code for token
        const { tokens } = googleClient.getToken(code);
        googleClient.setCredentials(tokens);

        // Get user info
        const ticket = googleClient.verifyIdToken({
            idToken: tokens.id_token!,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(401).json({ message: "Invalid Google token" });
        }

        const { email, name } = payload;

        //finding user and if not present then data to DB
        const user = await prismaClient.user.findFirst({
            where: {
                username: email,
            }
        });

        if (!user) {
            await prismaClient.user.create({
                data: {
                    username: email,
                    provider: 'Google',
                    solWallets: {
                        create: {
                            publicKey: "",
                            privateKey: ""
                        }
                    },
                    inrWallet: {
                        create: {
                            ba
                        }
                    }

                }
            })
        }






    } catch (error) {

    }

}