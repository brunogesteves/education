import { Router } from "express";
import * as TeachersController from "../controllers/teachers";

const router = Router();

router.get("/:currentPage", TeachersController.list);
router.get("/unique/:teacherId", TeachersController.getById);
router.post("/", TeachersController.create);
router.delete("/:teacherId", TeachersController.remove);
router.put("/", TeachersController.update);

export default router;
