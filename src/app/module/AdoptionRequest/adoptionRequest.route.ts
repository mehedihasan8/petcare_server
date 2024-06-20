import express from "express";
import validationRequest from "../../middlewares/validationRequest";
import { AdoptionRequestValidation } from "./adoptionRequest.validation";
import { AdoptionRequestController } from "./adoptionRequest.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../../prisma/generated/client";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.CUSTOMER),
  validationRequest(AdoptionRequestValidation.createAdoptionRequestValidation),
  AdoptionRequestController.createAdoptionRequest
);

router.get(
  "/",
  auth(UserRole.ADMIN),
  AdoptionRequestController.getAllAdoptionRequest
);

router.get(
  "/my",
  auth(UserRole.CUSTOMER),
  AdoptionRequestController.getMyAdoptionRequest
);

router.put(
  "/:requestId",
  auth(UserRole.ADMIN),
  validationRequest(AdoptionRequestValidation.updateAdoptionRequestValidation),
  AdoptionRequestController.updateAdoptionRequest
);

export const AdoptionRequestRoutes = router;
