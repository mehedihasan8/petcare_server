import httpStatus from "http-status";
import { userService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { Request } from "express";

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

const findProfile = catchAsync(async (req: Request & { user?: any }, res) => {
  const result = await userService.findProfile(req.user.userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User profile retrieved successfully",
    data: result,
  });
});

export const userController = {
  createUser,
  loginUser,
  findProfile,
};
