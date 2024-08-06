import { Router } from "express";

import Courses from "@routes/courses";
import Teacher from "@routes/teachers";
import Students from "@routes/students";
import Users from "@routes/users";
import Login from "@routes/login";
import File from "@routes/file";

const router = Router();

router.use("/courses", Courses);
router.use("/students", Students);
router.use("/teachers", Teacher);
router.use("/users", Users);
router.use("/login", Login);
router.use("/files", File);

export default router;
