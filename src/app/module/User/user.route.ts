import express from "express";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";
import validationRequest from "../../middlewares/validationRequest";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

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

router.get("/profile", auth(UserRole.USER), userController.findProfile);

export const UserRoutes = router;
