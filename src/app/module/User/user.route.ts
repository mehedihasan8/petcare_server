import express from "express";
import { userController } from "./user.controller";
import { userValidation } from "./user.validation";
import validationRequest from "../../middlewares/validationRequest";

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

export const UserRoutes = router;
