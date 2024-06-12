import * as UsersServices from "../services/users";
import { Request, Response } from "express";

export const getByEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userData = req.body;
  console.log(req.body);

  try {
    const data = await UsersServices.getByEmail(userData.values);
    if (data.password == userData.values.password) {
      res.json(true);
    } else {
      res.json(false);
    }
  } catch (e) {
    console.log("nao: ");
    console.log(e);
    res.status(500).send("Erro");
  }
};

export const resetpassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userData = req.body;

  console.log("controllers: ", userData);

  try {
    const data = await UsersServices.findEmail(userData.values);
  } catch (e) {
    res.status(500).send("Erro");
  }
};
