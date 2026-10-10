import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export type JwtPayload = {
  sub: string;
  email: string;
  role: string;
};

export const signToken = (payload: JwtPayload, expiresIn: string) => {
  const signOptions = { expiresIn: expiresIn as jwt.SignOptions["expiresIn"] };
  return jwt.sign(payload, env.JWT_SECRET, signOptions);
};

export const verifyToken = (token: string) => jwt.verify(token, env.JWT_SECRET) as JwtPayload;
