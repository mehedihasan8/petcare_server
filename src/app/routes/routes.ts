import express from "express";
import { UserRoutes } from "../module/User/user.route";

const router = express.Router();

const moduleRoutes = [
  //   {
  //     path: "/auth",
  //     routes: "AuthRoutes--=>",
  //   },
  {
    path: "/",
    routes: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
