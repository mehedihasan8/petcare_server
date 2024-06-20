import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { MetaService } from "./meta.service";
import { TUser } from "../User/user.interface";
import { Request } from "express";

const getMeta = catchAsync(async (req: Request & { user?: TUser }, res) => {
  const result = await MetaService.getMeta(req.user!);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Meta retrieved successfully",
    data: result,
  });
});

export const MetaController = {
  getMeta,
};
