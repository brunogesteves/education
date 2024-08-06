import * as CoursesServices from "services/courses";
import { Request, Response } from "express";

export const list = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await CoursesServices.list();
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro");
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.params;

  try {
    const data = await CoursesServices.create(name);
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro");
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await CoursesServices.remove(Number(id));
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro");
  }
};
