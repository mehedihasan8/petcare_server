import express from "express";
import validationRequest from "../../middlewares/validationRequest";
import { PetValidation } from "./pet.validation";
import { PetController } from "./pet.controller";

const router = express.Router();

router.post(
  "/",
  validationRequest(PetValidation.createPetValidation),
  PetController.createPet
);

export const PetRoutes = router;
