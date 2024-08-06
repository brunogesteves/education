import prisma from "./prisma";

export const addImageUserDB = async (originalname: string, userId: number) => {
  console.log("rep: ", originalname);
  console.log("rep: ", userId);
  return await prisma.user.update({
    where: {
      id: Number(userId),
    },
    data: {
      image: originalname,
    },
  });
};

export const addImageTeacherDB = async (
  originalname: string,
  userId: number
) => {
  return await prisma.teacher.update({
    where: {
      id: userId,
    },
    data: {
      image: originalname,
    },
  });
};
