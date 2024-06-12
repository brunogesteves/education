import { User } from "@prisma/client";
import prisma from "./prisma";

const { user: db } = prisma;

export const findByEmail = async (data: User) => {
  return await db.findFirst({
    where: {
      email: data.email,
    },
  });
};
