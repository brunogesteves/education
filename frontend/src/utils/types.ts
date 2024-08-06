enum UsersRole {
  master,
  editor,
}
export interface UserInfoProps {
  id: number;
  name: String;
  image: String;
  email: String;
  document: String;
  password: String;
  role: UsersRole;
}

export interface TeacherProps {
  id: number;
  name: string;
  password: string;
  email: string;
  document: string;
  course: {
    name: string;
    id: number;
    result: StudentResultProps[];
  };
}

export interface StudentResultProps {
  id: number;
  courseId: number;
  grade: number;
  studentId: number;
}

export interface StudentProps {
  id: number;
  name: string;
  document: string;
  password: string;
  email: string;
  year: number | null;
  result?: StudentResultProps[];
}

export interface CourseProps {
  id: number;
  name: string;
}

export interface TeacherInfo {
  id: number;
  document: string;
  email: string;
  name: string;
  password: string;
  course: {
    name: string;
    id: number;
  };
  students: StudentProps[];
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface RoleProps {
  role: string;
}
