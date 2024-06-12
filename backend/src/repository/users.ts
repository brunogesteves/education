import prisma from "./prisma";
import bcrypt from "bcrypt";

const { user: db } = prisma;
interface LoginProps {
  email: string;
  password: string;
}

const newPasswordHash = async (password: string): Promise<undefined> => {
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds).then(async (salt) => {
    return await bcrypt.hash(password, salt);
  });
};

export const getByEmail = async (data: LoginProps) => {
  return await db.findFirstOrThrow({
    where: {
      email: data.email,
    },
    select: {
      password: true,
    },
  });
};

export const updatePassword = async (data: LoginProps) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(data.password, salt);
  const userId = await db.findFirst({
    where: {
      email: data.email,
    },
    select: {
      id: true,
    },
  });

  return await db.update({
    where: {
      id: userId.id,
    },
    data: {
      password: hashedPassword,
    },
  });
};
