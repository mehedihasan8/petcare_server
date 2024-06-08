import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { AdoptionRequestService } from "./adoptionRequest.service";
import { Request } from "express";
import { pick } from "../../../shared/pick";
import { TUser } from "../User/user.interface";

const createAdoptionRequest = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const result = await AdoptionRequestService.createAdoptionRequest(
      req.user.userId,
      req.body
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Adoption request submitted successfully",
      data: result,
    });
  }
);

const getAllAdoptionRequest = catchAsync(async (req, res) => {
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await AdoptionRequestService.getAllAdoptionRequest(options);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Adoption requests retrieved successfully",
    data: result,
  });
});

const getMyAdoptionRequest = catchAsync(
  async (req: Request & { user?: TUser }, res) => {
    const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

    const result = await AdoptionRequestService.getMyAdoptionRequest(
      req?.user?.userId!,
      options
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Adoption requests retrieved successfully",
      data: result,
    });
  }
);

const updateAdoptionRequest = catchAsync(async (req, res) => {
  const result = await AdoptionRequestService.updateAdoptionRequest(
    req.params.requestId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Adoption request updated successfully",
    data: result,
  });
});

export const AdoptionRequestController = {
  createAdoptionRequest,
  getAllAdoptionRequest,
  updateAdoptionRequest,
  getMyAdoptionRequest,
};
