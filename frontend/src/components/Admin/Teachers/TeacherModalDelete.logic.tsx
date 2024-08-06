import { useInfo } from "contexts/GlobalProvider";
import { api } from "../../../utils/api";

export const useLogicModalDelete = (
  setIsModalDeleteOpen: (newState: boolean) => void
) => {
  const { loadSettings } = useInfo();
  function deleteTeacher(teacherId: number) {
    api
      .delete(`teachers/${teacherId}`)
      .then((res) => {
        if (res.data) {
          loadSettings();
        }
      })
      .then(() => setIsModalDeleteOpen(false));
  }

  return {
    methods: { deleteTeacher },
  };
};
