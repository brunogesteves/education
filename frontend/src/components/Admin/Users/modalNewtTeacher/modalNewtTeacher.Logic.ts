import { useState } from "react";

import { api } from "utils/api";
import { TeacherProps } from "utils/types";
import { useInfo } from "contexts/GlobalProvider";
import { UserAcces } from "utils/UserAccess";

export const useLogicModal = () => {
  const { loadSettings, courses } = useInfo();
  const [openTeacherModal, setOpenTeacherModal] = useState<boolean>(false);

  const userRole: string = UserAcces.role;

  const initialValues = {
    name: "",
    password: "",
    email: "",
    document: "",
    courseId: 0,
    studentId: null,
  };

  function createTeacher(
    values: Omit<TeacherProps, "id" | "course">,
    actions: { resetForm: () => void }
  ) {
    api.post("/teachers", { values }).then((res) => {
      if (res.data) {
        actions.resetForm();
        setOpenTeacherModal(false);
        loadSettings();
      }
    });
  }

  return {
    data: { openTeacherModal, initialValues, courses, userRole },
    methods: { setOpenTeacherModal, createTeacher },
  };
};
