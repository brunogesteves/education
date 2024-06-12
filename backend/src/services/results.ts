import { Course } from "@prisma/client";
import * as ResultsRepository from "../repository/results";

// export const list = async () => {
//   return ResultsRepository.list();
// };

// export const create = async (name: string) => {
//   return ResultsRepository.create(name);
// };

export const getById = async (id: number) => {
  return ResultsRepository.getById(id);
};
