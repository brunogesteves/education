import * as UsersRepository from "../repository/users";

interface LoginProps {
  email: string;
  password: string;
}

export const getByEmail = async (data: LoginProps) => {
  return UsersRepository.getByEmail(data);
};

export const findEmail = async (data: LoginProps) => {
  return UsersRepository.updatePassword(data);
};
