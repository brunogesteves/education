import { Router } from "express";
import * as CoursesController from "controllers/courses";

const router = Router();

router.delete("/:id", CoursesController.remove);
router.post("/:name", CoursesController.create);
router.get("/", CoursesController.list);

export default router;
