import { useEffect, useState } from "react";
import { api } from "../../../utils/api";
import { StudentProps } from "../../../utils/types";
import { useInfo } from "contexts/GlobalProvider";

import { UserAcces } from "utils/UserAccess";

export const UseLogic = () => {
  const { students, listStudents, totalStudents } = useInfo();
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState<boolean>(false);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState<boolean>(false);
  const [deleteStudentId, setDeleteStudentId] = useState<number>(0);

  const [uniqueIdStudent, setUniqueIdStudent] = useState<number>(0);
  const [infoStudent, setInfoStudent] = useState<StudentProps>({
    id: 0,
    name: "",
    document: "",
    password: "",
    email: "",
    year: 0,
  });

  const [pageNumbers, setPageNumbers] = useState<number[]>([1, 2, 3]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const userRole: string = UserAcces.role;

  function searchTeacherTerm(term: string) {}

  function reloadStudents(numberPage: number) {
    listStudents(numberPage);
    setCurrentPage(numberPage + 1);
  }

  useEffect(() => {
    // let tempCurrentPage = currentPage;
    if (currentPage <= 1) {
      reloadStudents(0);
      setPageNumbers([
        (pageNumbers[0] = currentPage),
        (pageNumbers[1] = currentPage + 1),
        (pageNumbers[2] = currentPage + 2),
      ]);
    } else if (currentPage > totalStudents / 3) {
      reloadStudents(totalStudents / 3 - 1);
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
      reloadStudents(currentPage - 1);
    }
  }, [currentPage]);

  useEffect(() => {
    if (uniqueIdStudent !== 0) {
      api
        .get(`/students/unique/${uniqueIdStudent}`)
        .then((res) => {
          setInfoStudent(res.data);
        })
        .then(() => setIsModalUpdateOpen(true));
    }
  }, [uniqueIdStudent]);

  useEffect(() => {
    if (deleteStudentId !== 0) {
      api
        .get(`/students/${deleteStudentId}`)
        .then((res) => {
          setInfoStudent(res.data);
        })
        .then(() => setIsModalDeleteOpen(true));
    }
  }, [deleteStudentId]);

  return {
    data: {
      students,
      isModalUpdateOpen,
      isModalDeleteOpen,
      uniqueIdStudent,
      infoStudent,
      currentPage,
      pageNumbers,
      totalStudents,
      userRole,
    },
    methods: {
      setUniqueIdStudent,
      searchTeacherTerm,
      setIsModalUpdateOpen,
      setIsModalDeleteOpen,
      setDeleteStudentId,
      setCurrentPage,
    },
  };
};
