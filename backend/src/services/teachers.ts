import { Teacher } from "@prisma/client";
import * as TeachersRepository from "../repository/teachers";

export const list = async (currentPage: number) => {
  return TeachersRepository.list(currentPage);
};

export const create = (newTeacher: Teacher) => {
  return TeachersRepository.create(newTeacher);
};

export const update = (
  dataTeacher: Teacher,
  courseId: number
): Promise<Teacher> => {
  return TeachersRepository.update(dataTeacher, courseId);
};

export const remove = (id: number): Promise<Teacher> =>
  TeachersRepository.remove(id);

export const getById = (id: number): Promise<Teacher> =>
  TeachersRepository.getById(id);
