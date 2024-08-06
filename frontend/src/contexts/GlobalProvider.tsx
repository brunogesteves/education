/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-no-constructed-context-values */
import { useRepository } from "hooks/repositores.hook";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CourseProps, StudentProps, TeacherProps } from "utils/types";

interface SettingsContextType {
  students: StudentProps[];
  totalTeachers: number;
  totalStudents: number;
  teachers: TeacherProps[];
  courses: CourseProps[];
  loadSettings: () => void;
  listTeachers: (newState: number) => void;
  listStudents: (newState: number) => void;
}

export const SettingsContext = createContext<SettingsContextType>({
  students: [],
  teachers: [],
  totalTeachers: 0,
  totalStudents: 0,
  courses: [],
  loadSettings: () => {},
  listTeachers: () => {},
  listStudents: () => {},
});

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [courses, setCourses] = useState<CourseProps[]>([]);
  const [teachers, setTeachers] = useState<TeacherProps[]>([]);
  const [totalTeachers, setTotalTeachers] = useState<number>(0);
  const [students, setStudents] = useState<StudentProps[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(0);

  const { studentsRepository, coursesRepository, teachersRepository } =
    useRepository();

  function listStudents(currentPage: number) {
    studentsRepository
      .list(currentPage)
      .then(({ data }) => {
        setStudents(data.content);
        setTotalStudents(data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function listCourses() {
    coursesRepository
      .list()
      .then(({ data }) => {
        setCourses(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function listTeachers(currentPage: number) {
    teachersRepository
      .list(currentPage)
      .then(({ data }) => {
        setTeachers(data.content);
        setTotalTeachers(data.count);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function loadSettings() {
    listStudents(0);
    listCourses();
    listTeachers(0);
  }

  useEffect(() => {
    loadSettings();
    listStudents(0);
    listCourses();
    listTeachers(0);
  }, []);

  const value = {
    loadSettings,
    listStudents,
    students,
    totalStudents,
    listTeachers,
    teachers,
    totalTeachers,
    courses,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

export function useInfo() {
  const useInfo = useContext(SettingsContext);
  return useInfo;
}
