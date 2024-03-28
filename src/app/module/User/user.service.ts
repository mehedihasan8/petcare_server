import { User } from "@prisma/client";
import bcrypt from "bcrypt";

import { PrismaClient } from "@prisma/client";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../errors/apiError";
import httpStatus from "http-status";
const prisma = new PrismaClient();

const createUser = async (payload: User) => {
  const alreadyExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (alreadyExist) {
    throw new ApiError(httpStatus.CONFLICT, "User already exist!");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 12);
  payload.password = hashedPassword;

  const result = await prisma.user.create({
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const userLogin = async (payload: Partial<User>) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password as string,
    user.password
  );

  if (!isCorrectPassword) {
    throw new ApiError(httpStatus.FORBIDDEN, "Password incorrect!");
  }

  const token = jwtHelpers.generateToken(
    {
      email: user.email,
      role: user.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const { password, ...removedPassword } = user;
  const result = { ...removedPassword, token };

  return result;
};

export const userService = {
  createUser,
  userLogin,
};
