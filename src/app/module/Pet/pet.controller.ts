import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { PetService } from "./pet.service";
import { pick } from "../../../shared/pick";
import { petFilterableFields } from "./pet.constant";

const createPet = catchAsync(async (req, res) => {
  const result = await PetService.createPet(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pet Created successfully!",
    data: result,
  });
});

const getAllPet = catchAsync(async (req, res) => {
  // console.log("req.query--=>", req.query);
  const filters = pick(req.query, petFilterableFields);

  const result = await PetService.getAllPet(filters);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pets are retrieved successfully!",
    data: result,
  });
});

export const PetController = {
  createPet,
  getAllPet,
};
