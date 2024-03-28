import { Pet, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createPet = async (payload: Pet) => {
  const result = await prisma.pet.create({
    data: payload,
  });
  return result;
};

export const PetService = {
  createPet,
};
