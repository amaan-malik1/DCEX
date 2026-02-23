import express from "express";
import authRouter from "./routes/authRoute.js";

const app = express();
app.use(express.json());

//routes
app.use('/api/auth', authRouter);

app.listen(3000);