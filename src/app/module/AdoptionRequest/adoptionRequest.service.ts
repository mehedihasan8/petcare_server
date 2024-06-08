import { AdoptionRequest } from "../../../../prisma/generated/client";
import { paginationHelper } from "../../../helpers/paginationHelpers";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/apiError";
import { TPaginationOptions } from "../../interface/pagination";

const createAdoptionRequest = async (
  userId: string,
  payload: AdoptionRequest
) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
  });

  await prisma.pet.findUniqueOrThrow({
    where: {
      id: payload.petId,
    },
  });

  const isRequested = await prisma.adoptionRequest.findUnique({
    where: {
      userId,
    },
  });

  if (isRequested) {
    throw new ApiError(409, "You Are Already Requested This Pet");
  }

  payload.userId = userId;
  const result = await prisma.adoptionRequest.create({
    data: payload,
  });
  return result;
};

const getAllAdoptionRequest = async (options: TPaginationOptions) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);

  const result = await prisma.adoptionRequest.findMany({
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      pet: true,
    },
  });

  return {
    meta: {
      page,
      limit,
      total: result.length,
    },
    data: result,
  };
};

const getMyAdoptionRequest = async (
  userId: string,
  options: TPaginationOptions
) => {
  const { page, limit, skip } = paginationHelper.calculatePagination(options);

  const result = await prisma.adoptionRequest.findMany({
    where: {
      userId,
    },
    skip,
    take: limit,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      pet: true,
    },
  });

  return {
    meta: {
      page,
      limit,
      total: result.length,
    },
    data: result,
  };
};

const updateAdoptionRequest = async (
  id: string,
  data: Partial<AdoptionRequest>
) => {
  await prisma.adoptionRequest.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.adoptionRequest.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

export const AdoptionRequestService = {
  createAdoptionRequest,
  getAllAdoptionRequest,
  updateAdoptionRequest,
  getMyAdoptionRequest,
};
