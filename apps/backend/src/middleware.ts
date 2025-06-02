import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const jwtSecret = "!!Rahul!!";
export const middleware = (req: Request, res: Response, next: NextFunction) => {
  //  middleware :-  Gateway to authenticate the user
  const header = req.header("authorization");
  const token = header?.split(" ")[1] || "";
  try {
    if (!token) {
      res.json({ msg: "No Authentication token" });
    }
    const payload = jwt.verify(token, jwtSecret);

    console.log(payload);
    if (payload) {
      req.userId = payload as string;
    } else {
      res.json({ msg: "user not verified" });
    }
    next();
  } catch (error) {
    res.json({ msg: "user not verified" });
  }
};
