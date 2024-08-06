import { User } from "@prisma/client";
import * as AuthRepository from "@repository/login";

export const login = async (data: User) => {
  return AuthRepository.findByEmail(data);
};
