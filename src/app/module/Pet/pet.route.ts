import express from "express";
import validationRequest from "../../middlewares/validationRequest";
import { PetValidation } from "./pet.validation";
import { PetController } from "./pet.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../../prisma/generated/client";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.CUSTOMER),
  validationRequest(PetValidation.createPetValidation),
  PetController.createPet
);

router.get("/", PetController.getAllPet);
router.get("/:id", PetController.getSinglePet);

router.put(
  "/:petId",
  auth(UserRole.CUSTOMER),
  validationRequest(PetValidation.updatePetValidation),
  PetController.updatePet
);

export const PetRoutes = router;
