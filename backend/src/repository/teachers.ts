import { Teacher } from "@prisma/client";
import prisma from "./prisma";

const { teacher: db } = prisma;

export const list = async (currentPage: number) => {
  const count = await db.count();

  const content = await db.findMany({
    include: {
      course: true,
    },
    take: 3,
    skip: 3 * currentPage,
  });
  return { count, content };
};

export const create = async (newTeacher: Omit<Teacher, "id">) => {
  return await db.create({
    data: {
      name: newTeacher.name,
      password: newTeacher.password,
      email: newTeacher.email,
      image: newTeacher.image,
      document: newTeacher.document,
    },
  });
};

export const update = async (dataTeacher: Teacher, courseId: number) => {
  return await db.update({
    where: {
      id: dataTeacher.id,
    },
    data: {
      name: dataTeacher.name,
      password: dataTeacher.password,
      email: dataTeacher.email,
      document: dataTeacher.document,

      course: {
        connect: {
          id: courseId,
        },
      },
    },
  });
};

export const remove = async (id: number) => {
  return await db.delete({
    where: {
      id,
    },
  });
};

export const getGrades = async (id: number) => {
  return await db.findUnique({
    where: {
      id,
    },
    include: {
      course: {
        select: {
          name: true,
          id: true,
          result: true,
        },
      },
    },
  });
};

export const verifyLogin = async (email: string, password: string) => {
  const teacherVerifyPassword = await db.findFirst({
    where: {
      email,
    },
    select: { password: true, id: true },
  });
  if (teacherVerifyPassword.password === password) {
    const teacherData = await getGrades(teacherVerifyPassword.id);
    return teacherData;
  } else {
    return false;
  }
};
