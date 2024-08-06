import { api } from "../../utils/api";

export const TeachersRepository = () => {
  const url = `teachers`;

  const list = async (currentPage: number) => api.get(`/${url}/${currentPage}`);

  // const upsert = async (data: StudentProps) => api.post(url, { data });

  // const remove = async (id: number) => api.delete(`${url}/${id}`);

  return { list };
};
