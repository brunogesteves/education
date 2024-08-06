import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import { api } from "utils/api";
import { LoginProps } from "utils/types";

interface Props {
  children: React.ReactNode;
}

interface AuthProps {
  user: string | null;
  teacher: string | null;
  student: string | null;
  msg: string;
  login: (newState: any) => void;
  logout: () => void;
  setUser: (newState: string) => void;
  setTeacher: (newState: string) => void;
  setStudent: (newState: string) => void;
}

const AuthContext = createContext<AuthProps>({
  user: null,
  teacher: null,
  student: null,
  msg: "",
  login: () => {},
  logout: () => {},
  setUser: () => {},
  setTeacher: () => {},
  setStudent: () => {},
});

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [teacher, setTeacher] = useLocalStorage("teacher", null);
  const [student, setStudent] = useLocalStorage("student", null);
  const [msg, setMsg] = useState<string>("");

  const navigate = useNavigate();

  async function login(data: LoginProps) {
    api.post("/login", { data }).then((res) => {
      if (res.data.token) {
        setUser(res.data.token);
        navigate("/admin");
      } else {
        setMsg(res.data.msg);
      }
    });
  }

  const logout = () => {
    setUser(null);
    setTeacher(null);
    setStudent(null);
    navigate("/", { replace: true });
  };

  const value = {
    setUser,
    user,
    teacher,
    setTeacher,
    student,
    setStudent,
    login,
    logout,
    msg,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
