import { api } from "../../utils/api";
import { StudentProps } from "../../utils/types";

export const CoursesRepository = () => {
  const url = `courses`;

  const list = async () => api.get(`/${url}`);

  // const upsert = async (data: StudentProps) => api.post(url, { data });

  // const remove = async (id: number) => api.delete(`${url}/${id}`);

  return { list };
};
