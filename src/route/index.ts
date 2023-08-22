import { Router } from "express";
import auth from "./auth";
import todos from "./todos";

import { verifyJwt } from "../middlewares/verifyJwt";

const router = Router();
router.use("/auth", auth);
router.use("/todos", verifyJwt, todos);

export default router;
