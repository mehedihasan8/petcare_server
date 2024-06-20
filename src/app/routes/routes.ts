import express from "express";
import { UserRoutes } from "../module/User/user.route";
import { PetRoutes } from "../module/Pet/pet.route";
import { AdoptionRequestRoutes } from "../module/AdoptionRequest/adoptionRequest.route";
import { MetaRoutes } from "../module/Meta/meta.route";

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
  {
    path: "/adoption-requests",
    routes: AdoptionRequestRoutes,
  },
  {
    path: "/meta",
    routes: MetaRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
