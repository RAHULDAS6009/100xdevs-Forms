import express, { Request, Response } from "express";
import { jwtSecret, middleware } from "./middleware";
import cors from "cors";
import client from "@repo/db-config/client";
import jwt, { JwtPayload, PrivateKey, Secret } from "jsonwebtoken";
const app = express();
const port = 5000;

app.use(express.json());

app.use(cors());

app.post("/signup", async (req: Request, res: Response) => {
  try {
    const user = await client.user.create({
      data: {
        email: req.body.email,
        password: req.body.password,
      },
    });

    res.json({
      msg: "user created ",
      userId: user.id,
    });
  } catch (error) {
    res.json({ msg: "something went wrong" });
  }
});

app.post("/signin", async (req: Request, res: Response) => {
  try {
    const user = await client.user.findFirst({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      res.json({
        msg: "User not found",
      });
    }

    if (user?.password !== req.body.password) {
      res.json({ msg: "password not match" });
    }
    const token = jwt.sign(user?.id as String, jwtSecret as Secret);

    res.json({
      msg: "user is authenticated ",
      token,
    });
  } catch (error) {
    res.json({ msg: "something went wrong" });
  }
});

app.post("/form", middleware, (req: Request, res: Response) => {
  res.json({ msg: "Hello world from form" });
});

app.post("/form/:id", middleware, (req: Request, res: Response) => {});

app.get("/forms", middleware, (req: Request, res: Response) => {});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
