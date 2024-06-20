import { PrismaClient } from "../../../../prisma/generated/client";
import ApiError from "../../errors/apiError";
import { TUser } from "../User/user.interface";
const prisma = new PrismaClient();

const getMeta = async (user: TUser) => {
  let result: Record<string, unknown> = {};

  const userExist = await prisma.user.findUnique({
    where: {
      id: user.userId,
    },
  });

  if (!userExist) {
    throw new ApiError(404, "User not found");
  }

  result.totalPet = await prisma.pet.count({});
  result.totalUser = await prisma.user.count({});

  if (user.role === "ADMIN") {
    result.totalAdoptionRequest = await prisma.adoptionRequest.count({});
  }
  if (user.role === "CUSTOMER") {
    result.totalAdoptionRequest = await prisma.adoptionRequest.count({
      where: {
        userId: user?.userId,
      },
    });
  }

  return result;
};

export const MetaService = {
  getMeta,
};
