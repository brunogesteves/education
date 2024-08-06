import { useState } from "react";

import { api } from "utils/api";
import { StudentProps } from "utils/types";
import { UserAcces } from "utils/UserAccess";

export const useLogicModal = () => {
  const [openStudentModal, setOpenStudentModal] = useState<boolean>(false);

  const userRole: string = UserAcces.role;

  const initialValues: Omit<StudentProps, "id"> = {
    name: "",
    password: "",
    email: "",
    document: "",
    year: null,
  };

  function createStudent(
    values: Omit<StudentProps, "id">,
    actions: { resetForm: () => void }
  ) {
    api.post("/students", { values }).then((res) => {
      if (res.data) {
        actions.resetForm();
        setOpenStudentModal(false);
      }
    });
  }

  return {
    data: { openStudentModal, initialValues, userRole },
    methods: { setOpenStudentModal, createStudent },
  };
};
