import { Pet, PrismaClient } from "@prisma/client";
import { petSearchAbleFields } from "./pet.constant";
const prisma = new PrismaClient();

const createPet = async (payload: Pet) => {
  const result = await prisma.pet.create({
    data: payload,
  });
  return result;
};

const getAllPet = async (query) => {
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
        [field]: filterData[field],
      })),
    });
  }

  const result = await prisma.pet.findMany({
    where: {
      AND: allCondition,
    },
  });

  return result;
};

export const PetService = {
  createPet,
  getAllPet,
};
