import { z } from "zod";

const createAdoptionRequestValidation = z.object({
  body: z.object({
    petId: z.string({
      required_error: "petId is required!",
    }),
    petOwnershipExperience: z.string({
      required_error: "PetOwnershipExperience is required!",
    }),
  }),
});

const updateAdoptionRequestValidation = z.object({
  body: z.object({
    status: z.enum(["APPROVED", "PENDING"]),
  }),
});

export const AdoptionRequestValidation = {
  createAdoptionRequestValidation,
  updateAdoptionRequestValidation,
};
