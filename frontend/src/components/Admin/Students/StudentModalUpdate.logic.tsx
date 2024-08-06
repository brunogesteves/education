import { useInfo } from "contexts/GlobalProvider";
import { api } from "../../../utils/api";
import { StudentProps } from "../../../utils/types";

export const useLogicModalUpdate = (
  setIsModalUpdateOpen: (newState: boolean) => void
) => {
  const { loadSettings } = useInfo();
  function updateStudent(values: Omit<StudentProps, "id">) {
    console.log("students: ", values);
    api.put(`/students`, { body: values }).then((res) => {
      if (res.data) {
        setIsModalUpdateOpen(false);
        loadSettings();
      }
    });
  }

  return {
    methods: { updateStudent },
  };
};
