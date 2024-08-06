import { Request, Response } from "express";
const fs = require("fs");
import * as fileServices from "@services/file";
import { createJWT } from "@/utils/createJWT";

export const upload = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.body;
    const { destination, originalname } = req.file;
    if (fs.existsSync(destination)) {
      const addImage = await fileServices.addImage(
        originalname.replace(" ", "_"),
        userId
      );

      if (addImage) {
        const { id, name, role, document, email, image } = addImage;
        const tokenUpdated = createJWT(id, name, document, email, image, role);
        res.json({ tokenUpdated: tokenUpdated });
      }
    }
  } catch (error) {}
};
