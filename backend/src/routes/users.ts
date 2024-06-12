import { Router } from "express";
import * as UsersController from "../controllers/users";

const router = Router();

router.post("/", UsersController.getByEmail);
router.post("/resetpassword", UsersController.resetpassword);

export default router;
