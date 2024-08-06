import { useState } from "react";
import { api } from "../../../utils/api";
import { StudentResultProps } from "../../../utils/types";

export const useLogic = () => {
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  function updateStudentGrade(values: StudentResultProps) {
    api.put("/students/updategrade", { values }).then((res) => {
      if (res.data) {
        setIsUpdated(true);
      }
    });
  }

  return {
    data: { isUpdated },
    methods: { updateStudentGrade },
  };
};
