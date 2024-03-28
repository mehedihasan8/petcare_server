import { z } from "zod";

const createPetValidation = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required!",
    }),
    species: z.string({
      required_error: "Species is required!",
    }),
    breed: z.string({
      required_error: "Breed is required!",
    }),
    age: z
      .number()
      .int()
      .positive()
      .refine((age) => age > 0, {
        message: "Age is required and should be a positive integer!",
      }),
    size: z.string({
      required_error: "Size is required!",
    }),
    location: z.string({
      required_error: "Location is required!",
    }),
    description: z.string({
      required_error: "Description is required!",
    }),
    temperament: z.string({
      required_error: "Temperament is required!",
    }),
    medicalHistory: z.string({
      required_error: "Medical history is required!",
    }),
    adoptionRequirements: z.string({
      required_error: "Adoption requirements are required!",
    }),
  }),
});

export const PetValidation = {
  createPetValidation,
};
