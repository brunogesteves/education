import * as FileRepository from "@repository/file";

export const addImage = async (originalname: string, userId: number) => {
  return FileRepository.addImageUserDB(originalname, userId);
};
