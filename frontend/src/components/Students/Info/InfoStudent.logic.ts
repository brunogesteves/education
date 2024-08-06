import { useState } from "react";
import { api } from "utils/api";
import { LoginProps, StudentProps } from "utils/types";
import { useInfo } from "contexts/GlobalProvider";
import { useAuth } from "hooks/useAuth";

export const useLogic = () => {
  const { courses } = useInfo();
  const { student, setStudent } = useAuth();

  const [studentInfo, setStudentInfo] = useState<StudentProps>();

  const [message, setMessage] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  function singIn(values: LoginProps) {
    api
      .get(`/students/login/${values.email}/${values.password}`)
      .then(async (res) => {
        if (res.data.results) {
          setStudentInfo(res.data.results);
          setStudent(res.data.token);
        } else if (!res.data.results) {
          setMessage("email / passwod are wrong");
        }
      });
  }

  return {
    data: { studentInfo, courses, message, student, initialValues },
    methods: { singIn, setStudent },
  };
};
