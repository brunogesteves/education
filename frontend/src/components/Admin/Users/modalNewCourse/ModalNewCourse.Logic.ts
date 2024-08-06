import { useState } from "react";

import { api } from "utils/api";
import { CourseProps } from "utils/types";
import { useInfo } from "contexts/GlobalProvider";
import { UserAcces } from "utils/UserAccess";

export const useLogicModal = () => {
  const { loadSettings } = useInfo();
  const [openCourseModal, setOpenCourseModal] = useState<boolean>(false);

  const userRole: string = UserAcces.role;

  function createCourse(
    values: Omit<CourseProps, "id">,
    actions: { resetForm: () => void }
  ) {
    api.post(`/courses/${values.name}`).then((res) => {
      if (res.data) {
        setOpenCourseModal(false);
        actions.resetForm();
        loadSettings();
      }
    });
  }

  return {
    data: { openCourseModal, userRole },
    methods: { setOpenCourseModal, createCourse },
  };
};
