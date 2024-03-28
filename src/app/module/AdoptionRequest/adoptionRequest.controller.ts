import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { AdoptionRequestService } from "./adoptionRequest.service";
import { Request } from "express";

const createAdoptionRequest = catchAsync(
  async (req: Request & { user?: any }, res) => {
    const result = await AdoptionRequestService.createAdoptionRequest(
      req.user.userId,
      req.body
    );
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "AdoptionRequest added successfully",
      data: result,
    });
  }
);

const getAllAdoptionRequest = catchAsync(async (req, res) => {
  const result = await AdoptionRequestService.getAllAdoptionRequest();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Adoption requests retrieved successfully",
    data: result,
  });
});

const updateAdoptionRequest = catchAsync(async (req, res) => {
  const result = await AdoptionRequestService.updateAdoptionRequest(
    req.params.requestId,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "AdoptionRequest profile updated successfully",
    data: result,
  });
});

export const AdoptionRequestController = {
  createAdoptionRequest,
  getAllAdoptionRequest,
  updateAdoptionRequest,
};
