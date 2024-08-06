import { useEffect, useState } from "react";

import { api } from "../../../utils/api";
import { TeacherProps } from "../../../utils/types";
import { useInfo } from "contexts/GlobalProvider";
import { UserAcces } from "utils/UserAccess";

export const UseLogic = () => {
  const { teachers, courses, totalTeachers, listTeachers } = useInfo();

  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
  const [deleteTeacherId, setDeleteTeacherId] = useState<number>(0);
  const [uniqueIdTeacher, setUniqueIdTeacher] = useState<number>(0);
  const [infoTeacher, setInfoTeacher] = useState<TeacherProps>({
    id: 0,
    document: "",
    email: "",
    name: "",
    password: "",
    course: {
      name: "",
      id: 0,
      result: [],
    },
  });
  const [pageNumbers, setPageNumbers] = useState<number[]>([1, 2, 3]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const UserRole: string = UserAcces.role;

  function searchTeacherTerm(term: string) {}

  function reloadTeachers(numberPage: number) {
    listTeachers(numberPage);
    setCurrentPage(numberPage + 1);
  }

  useEffect(() => {
    // let tempCurrentPage = currentPage;
    if (currentPage <= 1) {
      reloadTeachers(0);
      setPageNumbers([
        (pageNumbers[0] = currentPage),
        (pageNumbers[1] = currentPage + 1),
        (pageNumbers[2] = currentPage + 2),
      ]);
    } else if (currentPage > totalTeachers / 3) {
      reloadTeachers(totalTeachers / 3 - 1);
      setPageNumbers([
        (pageNumbers[0] = currentPage - 2),
        (pageNumbers[1] = currentPage - 1),
        (pageNumbers[2] = currentPage),
      ]);
    } else {
      setPageNumbers([
        (pageNumbers[0] = currentPage - 1),
        (pageNumbers[1] = currentPage),
        (pageNumbers[2] = currentPage + 1),
      ]);
      reloadTeachers(currentPage - 1);
    }
  }, [currentPage]);

  useEffect(() => {
    if (uniqueIdTeacher !== 0) {
      console.log(uniqueIdTeacher);
      api
        .get(`teachers/unique/${uniqueIdTeacher}`)
        .then((res) => {
          setInfoTeacher(res.data);
        })
        .then(() => setIsModalUpdateOpen(true));
    }
  }, [uniqueIdTeacher]);

  useEffect(() => {
    if (deleteTeacherId !== 0) {
      api
        .get(`teachers/${deleteTeacherId}`)
        .then((res) => {
          setInfoTeacher(res.data);
        })
        .then(() => setIsModalDeleteOpen(true));
    }
  }, [deleteTeacherId]);

  return {
    data: {
      teachers,
      totalTeachers,
      courses,
      infoTeacher,
      isModalUpdateOpen,
      isModalDeleteOpen,
      pageNumbers,
      currentPage,
      UserRole,
    },
    methods: {
      searchTeacherTerm,
      setUniqueIdTeacher,
      setIsModalUpdateOpen,
      setIsModalDeleteOpen,
      setDeleteTeacherId,
      setCurrentPage,
    },
  };
};
