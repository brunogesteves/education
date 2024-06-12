import { Result, Student } from "@prisma/client";
import * as StudentsRepository from "../repository/students";

export const list = async (currentPage: number) => {
  return StudentsRepository.list(currentPage);
};

export const create = async (newStudent: Student) => {
  return StudentsRepository.create(newStudent);
};

export const remove = (id: number): Promise<Student> =>
  StudentsRepository.remove(id);

export const update = (student: Student): Promise<Student> => {
  return StudentsRepository.update(student);
};

export const getById = (id: number): Promise<Student> =>
  StudentsRepository.getById(id);

export const getGrade = (courseId: number) =>
  StudentsRepository.getGrade(courseId);

export const getAllGrades = (id: number) => StudentsRepository.getAllGrades(id);

export const updateGrade = (values: Result) =>
  StudentsRepository.updateGrade(values);
