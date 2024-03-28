import httpStatus from "http-status";
import { userService } from "./user.service";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUser(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created successfully!",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await userService.userLogin(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Login successfully!",
    data: result,
  });
});

export const userController = {
  createUser,
  loginUser,
};
