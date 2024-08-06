import { useInfo } from "contexts/GlobalProvider";
import { api } from "../../../utils/api";

export const useLogicModalDelete = (
  setIsModalDeleteOpen: (newState: boolean) => void
) => {
  const { loadSettings } = useInfo();
  function deleteStudent(studentId: number) {
    api
      .delete(`students/${studentId}`)
      .then((res) => {
        if (res.data) {
          loadSettings();
        }
      })
      .then(() => setIsModalDeleteOpen(false));
  }

  return {
    methods: { deleteStudent },
  };
};
