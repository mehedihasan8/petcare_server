import httpStatus from "http-status";
import { userService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { Request, Response } from "express";
import { TUser } from "./user.interface";

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUser(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await userService.userLogin(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: result,
  });
});

const changePassword = catchAsync(
  async (req: Request & { user?: TUser }, res) => {
    const user = req.user;
    const { ...passwordData } = req.body;

    await userService.changePassword(user?.userId, passwordData);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Password changed successfully!",
      data: null,
    });
  }
);

const findProfile = catchAsync(async (req: Request & { user?: TUser }, res) => {
  const result = await userService.findProfile(req.user!.userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile retrieved successfully",
    data: result,
  });
});

const findAllUser = catchAsync(async (req, res) => {
  const result = await userService.findAllUser();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Users retrieved successfully",
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request & { user?: any }, res) => {
  const result = await userService.updateUser(req.user.userId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile updated successfully",
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req, res) => {
  const result = await userService.updateUserStatus(
    req.params.id,
    req.body.status
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Status updated successfully",
    data: result,
  });
});
const updateUserRole = catchAsync(async (req, res) => {
  const result = await userService.updateUserRole(req.params.id, req.body.role);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User Role updated successfully",
    data: result,
  });
});

export const userController = {
  createUser,
  loginUser,
  changePassword,
  findProfile,
  findAllUser,
  updateUser,
  updateUserStatus,
  updateUserRole,
};
