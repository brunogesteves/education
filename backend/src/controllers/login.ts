import * as AuthServices from "@services/login";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const userData = await AuthServices.login(req.body);
    if (userData) {
      const passwordValidation = await bcrypt.compare(
        req.body.data.password,
        userData.password
      );

      if (passwordValidation) {
        const token = jwt.sign(
          {
            id: userData.id,
            name: userData.name,
            password: req.body.data.password,
            role: userData.role,
            image: userData.image,
            email: userData.email,
          },
          process.env.SECRET
        );
        res.json({ token: token });
      } else {
        res.json({ msg: "Senha errada" });
      }
    } else {
      res.json({ msg: "Email não cadastrado" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro");
  }
};
