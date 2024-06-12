import { Course } from "@prisma/client";
import * as CoursesRepository from "../repository/courses";

export const list = async () => {
  return CoursesRepository.list();
};

export const create = async (name: string) => {
  return CoursesRepository.create(name);
};

export const remove = async (id: number) => {
  console.log("service :>> ", id);

  return CoursesRepository.remove(id);
};
