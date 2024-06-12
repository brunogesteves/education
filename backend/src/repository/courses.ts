import prisma from "./prisma";

const { course: db } = prisma;

export const list = async () => {
  return await db.findMany();
};

export const create = async (name: string) => {
  return await db.create({
    data: {
      name,
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
