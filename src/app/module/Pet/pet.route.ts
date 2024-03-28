import express from "express";
import validationRequest from "../../middlewares/validationRequest";
import { PetValidation } from "./pet.validation";
import { PetController } from "./pet.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.USER),
  validationRequest(PetValidation.createPetValidation),
  PetController.createPet
);

export const PetRoutes = router;
