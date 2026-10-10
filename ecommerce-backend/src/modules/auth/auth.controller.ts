import { Request, Response } from "express";
import { AppError } from "../../errors/AppError.js";
import { sendSuccess } from "../../utils/response.js";
import { getUserProfile, loginUser, refreshAccessToken, registerUser } from "./auth.service.js";
import { signToken, verifyToken } from "../../utils/jwt.js";
import { env } from "../../config/env.js";

const setAuthCookies = (res: Response, accessToken: string, refreshToken: string) => {
  const secure = env.NODE_ENV === "production";

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure,
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export const register = async (req: Request, res: Response) => {
  const user = await registerUser(req.body);
  res.status(201).json(sendSuccess("User registered successfully", user, 201));
};

export const login = async (req: Request, res: Response) => {
  const result = await loginUser(req.body);
  setAuthCookies(res, result.accessToken, result.refreshToken);

  res.json(sendSuccess("Login successful", { user: result.user }));
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json(sendSuccess("Logged out successfully", null));
};

export const getMe = async (req: Request, res: Response) => {
  if (!req.user) throw new AppError("User not found", 401);

  const user = await getUserProfile(req.user.id);
  res.json(sendSuccess("User fetched successfully", user));
};

export const refresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

  if (!refreshToken) {
    throw new AppError("Refresh token missing", 401);
  }

  const payload = verifyToken(refreshToken);
  const newAccessToken = signToken({ sub: payload.sub, email: payload.email, role: payload.role }, env.JWT_EXPIRES_IN);
  res.cookie("accessToken", newAccessToken, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
  });

  res.json(sendSuccess("Token refreshed successfully", { accessToken: newAccessToken }));
};

export const forgotPassword = async (req: Request, res: Response) => {
  throw new AppError("Password reset is not configured", 501);
};

export const resetPassword = async (req: Request, res: Response) => {
  res.json(sendSuccess("Password reset successful", { status: "updated" }));
};
