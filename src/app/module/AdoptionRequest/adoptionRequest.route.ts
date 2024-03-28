import express from "express";
import validationRequest from "../../middlewares/validationRequest";
import { AdoptionRequestValidation } from "./adoptionRequest.validation";
import { AdoptionRequestController } from "./adoptionRequest.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.USER),
  validationRequest(AdoptionRequestValidation.createAdoptionRequestValidation),
  AdoptionRequestController.createAdoptionRequest
);

router.get("/", AdoptionRequestController.getAllAdoptionRequest);

router.put(
  "/:requestId",
  auth(UserRole.USER),
  validationRequest(AdoptionRequestValidation.updateAdoptionRequestValidation),
  AdoptionRequestController.updateAdoptionRequest
);

export const AdoptionRequestRoutes = router;
