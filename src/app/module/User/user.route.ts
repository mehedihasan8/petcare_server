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

router.put(
  "/profile/pass-change",
  auth(UserRole.ADMIN, UserRole.CUSTOMER),
  validationRequest(userValidation.changePasswordValidation),
  userController.changePassword
);

router.get(
  "/profile",
  auth(UserRole.ADMIN, UserRole.CUSTOMER),
  userController.findProfile
);

router.get("/users", auth(UserRole.ADMIN), userController.findAllUser);

router.put(
  "/profile",
  auth(UserRole.ADMIN, UserRole.CUSTOMER),
  validationRequest(userValidation.updateUserValidation),
  userController.updateUser
);

router.put(
  "/change-status/:id",
  auth(UserRole.ADMIN),
  validationRequest(userValidation.updateUserValidation),
  userController.updateUserStatus
);

router.put(
  "/change-role/:id",
  auth(UserRole.ADMIN),
  validationRequest(userValidation.updateUserRoleValidation),
  userController.updateUserRole
);

export const UserRoutes = router;
