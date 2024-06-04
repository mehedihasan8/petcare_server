import express from "express";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";
import validationRequest from "../../middlewares/validationRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../../prisma/generated/client";

const router = express.Router();

router.post(
  "/register",
  validationRequest(userValidation.createUserValidation),
  userController.createUser
);

router.post(
  "/login",
  validationRequest(userValidation.loginUserValidation),
  userController.loginUser
);

router.get(
  "/profile",
  auth(UserRole.ADMIN, UserRole.CUSTOMER),
  userController.findProfile
);

router.put(
  "/profile",
  auth(UserRole.ADMIN, UserRole.CUSTOMER),
  validationRequest(userValidation.updateUserValidation),
  userController.updateUser
);

export const UserRoutes = router;
