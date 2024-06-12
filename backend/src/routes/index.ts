import { Router } from "express";

import Courses from "./courses";
import Teacher from "./teachers";
import Students from "./students";
import Users from "./users";
import Login from "./login";
import Files from "./files";

const router = Router();

router.use("/students", Students);
router.use("/courses", Courses);
router.use("/teachers", Teacher);
router.use("/users", Users);
router.use("/login", Login);
router.use("/files", Files);

export default router;
