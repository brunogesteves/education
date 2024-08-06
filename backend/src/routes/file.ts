import { Router } from "express";
import * as FileController from "@controllers/file";
import { upload } from "@/utils/storageFile";

const router = Router();

router.post("/", upload.single("file"), FileController.upload);

export default router;
