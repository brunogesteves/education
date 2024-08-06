import { createJWTTeacher } from "@/utils/createJWT";
import * as TeachersServices from "@services/teachers";
import { Request, Response } from "express";

export const list = async (req: Request, res: Response): Promise<void> => {
  const { currentPage } = req.params;

  try {
    const data = await TeachersServices.list(Number(currentPage));
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro");
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const dataTeacher = req.body;

  try {
    const data = await TeachersServices.create(dataTeacher);
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro");
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const dataTeacher = req.body.values;
  const { course } = req.body.values;
  const courseId = course.id;

  try {
    const data = await TeachersServices.update(dataTeacher, Number(courseId));
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro");
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const { teacherId } = req.params;
  try {
    const data = await TeachersServices.remove(Number(teacherId));
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro");
  }
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  const { teacherId } = req.params;
  try {
    const data = await TeachersServices.getById(Number(teacherId));
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro");
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.params;
  try {
    const data = await TeachersServices.login(email, password);
    if (data) {
      const { id, name, image, email } = data;
      const token = createJWTTeacher(id, name, image, email);
      res.json({ results: data, token });
    } else if (!data) {
      res.json({ results: data });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro");
  }
};
