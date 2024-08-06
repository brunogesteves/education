import { User } from "@prisma/client";
import * as UsersRepository from "@repository/users";

interface LoginProps {
  email: string;
  password: string;
}

export const getAllUsers = async () => {
  return UsersRepository.getAllUsers();
};

export const getByEmail = async (data: LoginProps) => {
  return UsersRepository.getByEmail(data);
};

export const findEmail = async (data: LoginProps) => {
  return UsersRepository.updatePassword(data);
};

export const addUpdateEditor = async (data: User) => {
  return UsersRepository.addUpdateEditor(data);
};

export const updateNameImage = async (nameFile: string, id: number) => {
  return UsersRepository.updateNameImage(nameFile, id);
};
