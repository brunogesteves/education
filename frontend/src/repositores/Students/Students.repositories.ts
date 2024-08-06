import { api } from "../../utils/api";
import { StudentProps } from "../../utils/types";

export const StudentsRepository = () => {
  const url = `students`;

  const list = async (currentPage: number) => api.get(`/${url}/${currentPage}`);

  // const upsert = async (data: StudentProps) => api.post(url, { data });

  // const remove = async (id: number) => api.delete(`${url}/${id}`);

  return { list };
};
