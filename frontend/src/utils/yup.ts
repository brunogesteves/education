import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const AddCourseSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").required("Required"),
});

export const TeacherSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  password: Yup.string().required("Password is required"),
  document: Yup.string().required("Document is required"),
  email: Yup.string().email().required("Email is required"),
  course: Yup.object().shape({
    id: Yup.number().integer().min(1).required("Choose a Course"),
  }),
});

export const StudentSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  password: Yup.string().required("Password is required"),
  email: Yup.string().email().required("Email is required"),
  document: Yup.string().required("Document is required"),
  year: Yup.number().integer().min(1).required("Select the Year"),
});

export const StudentGradeSchema = Yup.object().shape({
  grade: Yup.number().min(0).max(10).required("Grade is Required"),
});

export const ResetPasswordSchema = Yup.object().shape({
  password: Yup.number().min(4).required(),
});

export const AddEditorSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  email: Yup.string().required("email is required"),
  document: Yup.string().required("document is required"),
  password: Yup.string().min(4).required(),
});

export const UpdateEditorSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  email: Yup.string().required("email is required"),
  document: Yup.string().required("document is required"),
});
