import express from "express";
import { UserRoutes } from "../module/User/user.route";
import { PetRoutes } from "../module/Pet/pet.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/",
    routes: UserRoutes,
  },
  {
    path: "/pets",
    routes: PetRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
