import { Router } from "express";
import * as UsersController from "@controllers/users";
import { uploadUsers } from "@/utils/storageFile";

const router = Router();

router.post("/", UsersController.getByEmail);
router.get("/getUsers", UsersController.list);
router.post("/resetpassword", UsersController.resetPassword);
router.post(
  "/editor",
  uploadUsers.single("file"),
  UsersController.addUpdateEditor
);

export default router;
