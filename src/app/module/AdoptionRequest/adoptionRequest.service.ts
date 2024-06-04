import { AdoptionRequest } from "../../../../prisma/generated/client";
import { paginationHelper } from "../../../helpers/paginationHelpers";
import prisma from "../../../shared/prisma";

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

  payload.userId = userId;
  const result = await prisma.adoptionRequest.create({
    data: payload,
  });
  return result;
};

const getAllAdoptionRequest = async () => {
  const result = await prisma.adoptionRequest.findMany({});
  return result;
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
};
