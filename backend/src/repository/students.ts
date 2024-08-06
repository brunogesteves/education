import { Student, Result } from "@prisma/client";

import prisma from "./prisma";

const { student: db } = prisma;

export const list = async (currentPage: number) => {
  const count = await db.count();

  const content = await db.findMany({
    take: 3,
    skip: 3 * currentPage,
  });

  return { count, content };
};

export const create = async (newStudent: Omit<Student, "id">) => {
  return await db.create({
    data: {
      name: newStudent.name,
      document: newStudent.document,
      email: newStudent.email,
      password: newStudent.password,
      year: Number(newStudent.year),
    },
  });
};

export const update = async (student: Student) => {
  return await db.update({
    where: {
      id: student.id,
    },
    data: {
      document: student.document,
      email: student.email,
      name: student.name,
      password: student.name,
      year: Number(student.year),
    },
  });
};

export const getGrade = async (courseId: number) => {
  return await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    select: {
      result: true,
    },
  });
};

export const getAllGrades = async (id: number) => {
  return await db.findUnique({
    where: {
      id,
    },
    include: {
      result: true,
    },
  });
};

export const updateGrade = async (values: Result) => {
  const { id, grade, courseId, studentId } = values;

  return await prisma.result.upsert({
    where: {
      id,
    },
    update: {
      grade: Number(grade),
    },
    create: {
      grade: Number(grade),
      courseId: Number(courseId),
      studentId: Number(studentId),
    },
  });
};

export const getById = async (id: number) => {
  return await db.findUnique({ where: { id } });
};

export const remove = async (id: number) => {
  return await db.delete({ where: { id } });
};

export const verifyLogin = async (email: string, password: string) => {
  const studentVerifyPassword = await db.findFirst({
    where: {
      email,
    },
    select: { password: true, id: true },
  });
  if (studentVerifyPassword.password === password) {
    const studentrData = await getAllGrades(studentVerifyPassword.id);
    return studentrData;
  } else {
    return false;
  }
};
