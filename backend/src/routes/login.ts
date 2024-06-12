import { Router } from "express";
import * as AuthController from "../controllers/login";

const router = Router();

router.post("/", AuthController.login);

export default router;
