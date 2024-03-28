import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { PetService } from "./pet.service";

const createPet = catchAsync(async (req, res) => {
  const result = await PetService.createPet(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pet Created successfully!",
    data: result,
  });
});

export const PetController = {
  createPet,
};
