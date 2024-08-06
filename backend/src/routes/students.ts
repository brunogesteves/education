import { Router } from "express";
import * as StudentsController from "@controllers/students";

const router = Router();

router.get("/:currentPage", StudentsController.list);
router.get("/unique/:studentId", StudentsController.uniqueStudent);
router.get("/results/:studentId/:courseId", StudentsController.getGrade);
router.get("/results/:studentId", StudentsController.getAllGrades);
router.get("/login/:email/:password", StudentsController.login);

router.post("/", StudentsController.create);
router.put("/", StudentsController.update);
router.put("/updategrade", StudentsController.updateGrade);
router.delete("/:studentId", StudentsController.remove);

export default router;
