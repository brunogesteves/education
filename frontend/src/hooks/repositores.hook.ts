import { useCallback } from "react";
import {
  StudentsRepository,
  CoursesRepository,
  TeachersRepository,
} from "repositores";

export function useRepository() {
  return {
    studentsRepository: useCallback(() => StudentsRepository(), [])(),
    coursesRepository: useCallback(() => CoursesRepository(), [])(),
    teachersRepository: useCallback(() => TeachersRepository(), [])(),
  };
}
