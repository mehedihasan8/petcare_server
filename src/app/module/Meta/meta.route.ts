import express from "express";
import { MetaController } from "./meta.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "../../../../prisma/generated/client";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.ADMIN, UserRole.CUSTOMER),
  MetaController.getMeta
);

export const MetaRoutes = router;
