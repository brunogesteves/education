import { api } from "../../../utils/api";
import { useInfo } from "contexts/GlobalProvider";

import { UserAcces } from "../../../utils/UserAccess";

export const useLogic = () => {
  const { courses, loadSettings } = useInfo();
  const userRole: string = UserAcces.role;

  function deleteCourse(courseId: number) {
    api.delete(`/courses/${courseId}`).then(() => loadSettings());
  }
  function searchTeacherTerm(term: string) {}

  return {
    data: { courses, userRole },
    methods: { deleteCourse, searchTeacherTerm },
  };
};
