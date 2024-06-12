import * as StudentsServices from "../services/students";
import { Request, Response } from "express";

export const list = async (req: Request, res: Response): Promise<void> => {
  const { currentPage } = req.params;

  try {
    const data = await StudentsServices.list(Number(currentPage));
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro");
  }
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const dataStudent = req.body;

  try {
    const data = await StudentsServices.create(dataStudent);
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro");
  }
};

export const uniqueStudent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { studentId } = req.params;

  try {
    const data = await StudentsServices.getById(Number(studentId));
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro");
  }
};

export const update = async (req: Request, res: Response): Promise<void> => {
  const studentData = req.body;
  try {
    const data = await StudentsServices.update(studentData.body);
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro");
  }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
  const { studentId } = req.params;

  try {
    const data = await StudentsServices.remove(Number(studentId));
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro");
  }
};

export const getGrade = async (req: Request, res: Response): Promise<void> => {
  const { studentId, courseId } = req.params;

  try {
    const data = await StudentsServices.getGrade(Number(courseId));
    if (data.result.length !== 0) {
      const filteredData = data.result.find(
        (element) => element.studentId == Number(studentId)
      );
      res.json(filteredData);
    } else {
      const filteredData = {
        id: 0,
        grade: 0,
        courseId: courseId,
        studentId: studentId,
      };
      res.json(filteredData);
    }
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro");
  }
};

export const getAllGrades = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { studentId } = req.params;

  try {
    const data = await StudentsServices.getAllGrades(Number(studentId));
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro");
  }
};

export const updateGrade = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { values } = req.body;

  try {
    const data = await StudentsServices.updateGrade(values);
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send("Erro");
  }
};
