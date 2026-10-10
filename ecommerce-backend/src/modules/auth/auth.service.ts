import { prisma } from "../../config/database.js";
import { AppError } from "../../errors/AppError.js";
import { hashPassword, comparePassword } from "../../utils/bcrypt.js";
import { signToken } from "../../utils/jwt.js";
import { env } from "../../config/env.js";

export const registerUser = async (payload: { name: string; email: string; password: string; phone?: string }) => {
  const existing = await prisma.user.findUnique({ where: { email: payload.email.toLowerCase() } });

  if (existing) {
    throw new AppError("User already exists", 409);
  }

  const created = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email.toLowerCase(),
      password: await hashPassword(payload.password),
      phone: payload.phone ?? null,
      role: "CUSTOMER",
      isVerified: true,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      isActive: true,
      createdAt: true,
    },
  });

  return created;
};

export const loginUser = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUnique({ where: { email: payload.email.toLowerCase() } });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const valid = await comparePassword(payload.password, user.password);

  if (!valid) {
    throw new AppError("Invalid email or password", 401);
  }

  if (!user.isActive) {
    throw new AppError("Account is inactive", 401);
  }

  const accessToken = signToken({ sub: user.id, email: user.email, role: user.role }, env.JWT_EXPIRES_IN);
  const refreshToken = signToken({ sub: user.id, email: user.email, role: user.role }, env.JWT_REFRESH_EXPIRES_IN);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isVerified: user.isVerified,
    },
    accessToken,
    refreshToken,
  };
};

export const getUserProfile = async (userId: string) =>
  prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      isActive: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

export const refreshAccessToken = async (refreshToken: string) => {
  const payload = JSON.parse(Buffer.from(refreshToken.split(".")[1] ?? "", "base64").toString("utf8"));
  const accessToken = signToken({ sub: payload.sub, email: payload.email, role: payload.role }, env.JWT_EXPIRES_IN);

  return { accessToken };
};
