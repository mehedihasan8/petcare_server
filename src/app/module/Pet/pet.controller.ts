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
    message: "Pet added successfully",
    data: result,
  });
});

const getAllPet = catchAsync(async (req, res) => {
  const filters = pick(req.query, petFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await PetService.getAllPet(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pets retrieved successfully",
    data: result,
  });
});

const getSinglePet = catchAsync(async (req, res) => {
  const result = await PetService.getSinglePet(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pet retrieved successfully",
    data: result,
  });
});

const updatePet = catchAsync(async (req, res) => {
  const result = await PetService.updatePet(req.params.petId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Pet profile updated successfully",
    data: result,
  });
});

export const PetController = {
  createPet,
  getAllPet,
  getSinglePet,
  updatePet,
};
