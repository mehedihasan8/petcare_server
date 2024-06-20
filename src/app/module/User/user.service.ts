import bcrypt from "bcrypt";

import { jwtHelpers } from "../../../helpers/jwtHelpers";
import { JwtPayload, Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../errors/apiError";
import httpStatus from "http-status";
import prisma from "../../../shared/prisma";
import {
  User,
  UserRole,
  UserStatus,
} from "../../../../prisma/generated/client";
import { AuthUtils } from "./user.utils";
import { TChangePassword } from "./user.type";

const createUser = async (payload: User) => {
  const alreadyExist = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (alreadyExist) {
    throw new ApiError(httpStatus.CONFLICT, "Email is already exist!");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 12);
  payload.password = hashedPassword;

  const result = await prisma.user.create({
    data: payload,
    select: {
      id: true,
      role: true,
      photo: true,
      status: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const userLogin = async (payload: Partial<User>) => {
  const user = await prisma.user.findFirstOrThrow({
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
      userId: user.id,
      role: user.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const { password, ...removedPasswordAndRole } = user;
  const result = { ...removedPasswordAndRole, token };

  return result;
};

const changePassword = async (
  id: string | undefined,
  payload: TChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  // checking old password
  if (
    isUserExist.password &&
    !(await bcrypt.compare(oldPassword, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Old Password is incorrect");
  }

  // hash new password
  const hashPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: {
      id: isUserExist.id,
    },
    data: {
      password: hashPassword,
    },
  });
};

const findProfile = async (id: string) => {
  const result = await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      id: true,
      role: true,
      photo: true,
      status: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const findAllUser = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      role: true,
      photo: true,
      status: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const updateUser = async (id: string, data: Partial<User>) => {
  if (data.email) {
    const alreadyExist = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (alreadyExist) {
      throw new ApiError(httpStatus.CONFLICT, "Email is already exist");
    }
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data,
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

const updateUserStatus = async (id: string, status: UserStatus) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      status,
    },
    select: {
      id: true,
      name: true,
      status: true,
      role: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

const updateUserRole = async (id: string, role: UserRole) => {
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      role,
    },
    select: {
      id: true,
      name: true,
      status: true,
      role: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

export const userService = {
  createUser,
  userLogin,
  changePassword,
  findProfile,
  findAllUser,
  updateUser,
  updateUserStatus,
  updateUserRole,
};
