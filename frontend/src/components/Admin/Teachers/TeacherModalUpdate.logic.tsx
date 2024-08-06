import { useInfo } from "contexts/GlobalProvider";
import { api } from "../../../utils/api";
import { TeacherProps } from "../../../utils/types";

export const useLogicModalUpdate = (
  setIsModalUpdateOpen: (newState: boolean) => void
) => {
  const { loadSettings } = useInfo();
  function updateTeacher(values: Omit<TeacherProps, "id">) {
    console.log(values);

    api.put(`/teachers`, { values }).then((res) => {
      if (res.data) {
        setIsModalUpdateOpen(false);
        loadSettings();
      }
    });
  }

  return {
    methods: { updateTeacher },
  };
};
