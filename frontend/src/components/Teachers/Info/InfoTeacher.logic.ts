import { useState } from "react";
import { api } from "../../../utils/api";
import { LoginProps, TeacherProps } from "../../../utils/types";
import { useInfo } from "contexts/GlobalProvider";
import { useAuth } from "hooks/useAuth";

export const useLogic = () => {
  const { students } = useInfo();
  const { teacher, setTeacher } = useAuth();
  const [teacherInfo, setTeacherInfo] = useState<TeacherProps | null>();
  const [message, setMessage] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  function singIn(values: LoginProps) {
    api
      .get(`/teachers/login/${values.email}/${values.password}`)
      .then(async (res) => {
        if (res.data.results) {
          setTeacherInfo(res.data.results);
          setTeacher(res.data.token);
        } else if (!res.data.results) {
          setMessage("email / passwod are wrong");
        }
      });
  }

  function getStudentInfo(studentId: number, courseId: number | undefined) {
    const res = api
      .get(`students/results/${studentId}/${courseId}`)
      .then(async (res) => {
        return await res.data;
      });
    return res;
  }

  return {
    data: { teacherInfo, students, initialValues, message, teacher },
    methods: { getStudentInfo, singIn, setTeacherInfo, setTeacher },
  };
};
