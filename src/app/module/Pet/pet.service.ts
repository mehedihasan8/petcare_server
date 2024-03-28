import { Pet, PrismaClient } from "@prisma/client";
import { petSearchAbleFields } from "./pet.constant";
import { paginationHelper } from "../../../helpers/paginationHelpers";
import { TPetFilterRequest } from "./pet.interface";
import { TPaginationOptions } from "../../interface/pagination";
const prisma = new PrismaClient();

const createPet = async (payload: Pet) => {
  const result = await prisma.pet.create({
    data: payload,
  });
  return result;
};

const getAllPet = async (
  query: TPetFilterRequest,
  options: TPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(options);

  const { searchTerm, ...filterData } = query;

  const allCondition = [];

  // search term functionality---=>
  if (query.searchTerm) {
    allCondition.push({
      OR: petSearchAbleFields.map((field) => ({
        [field]: {
          contains: query.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // filter data functionality---=>
  if (filterData.age) {
    filterData.age = Number(filterData.age);
  }
  const petFilteredFields = Object.keys(filterData);
  if (petFilteredFields.length > 0) {
    allCondition.push({
      AND: petFilteredFields.map((field) => ({
        [field]: (filterData as any)[field],
      })),
    });
  }

  const result = await prisma.pet.findMany({
    where: {
      AND: allCondition,
    },
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
  });

  const total = await prisma.pet.count({
    where: {
      AND: allCondition,
    },
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const updatePet = async (id: string, data: Partial<Pet>) => {
  await prisma.pet.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.pet.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

export const PetService = {
  createPet,
  getAllPet,
  updatePet,
};
