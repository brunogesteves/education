import jwt from "jsonwebtoken";

export const createJWT = (
  id: number,
  name: string,
  role: string,
  document: string,
  image: string,
  email: string
) => {
  const token = jwt.sign(
    {
      id: id,
      name: name,
      role: role,
      document: document,
      image: image,
      email: email,
    },
    process.env.SECRET
  );
  return token;
};

export const createJWTTeacher = (
  id: number,
  name: string,
  image: string,
  email: string
) => {
  const token = jwt.sign(
    {
      id: id,
      name: name,
      image: image,
      email: email,
    },
    process.env.SECRET
  );
  return token;
};

export const createJWTStudent = (id: number, name: string) => {
  const token = jwt.sign(
    {
      id: id,
      name: name,
    },
    process.env.SECRET
  );
  return token;
};
