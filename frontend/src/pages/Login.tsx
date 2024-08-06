import { Field, Form, Formik } from "formik";
import { SignInSchema } from "../utils/yup";
import { useAuth } from "hooks/useAuth";

function Login() {
  const { login, msg } = useAuth();
  const initialValues = {
    email: "",
    password: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignInSchema}
      onSubmit={(values) => {
        login(values);
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex justify-center items-center flex-col h-screen gap-y-10 ">
          <div>
            <Field
              name="email"
              type="email"
              className=" bg-white border-2 pl-2 border-black rounded-md placeholder:text-black placeholder:opacity-30"
            />
            {errors.email && touched.email ? (
              <div className="text-red-500 font-bold">{errors.email}</div>
            ) : null}
          </div>
          <div>
            <Field
              name="password"
              type="password"
              className=" bg-white border-2 pl-2 border-black rounded-md placeholder:text-black placeholder:opacity-30"
            />
            {errors.password && touched.password ? (
              <div className="text-red-500 font-bold">{errors.password}</div>
            ) : null}
          </div>
          <button
            type="submit"
            className="bg-[#96BB7C] px-3 py-1 rounded-md text-white w-auto flex justify-between items-center gap-x-2"
          >
            <span>Sign In</span>
          </button>
          {msg ? <div className="text-red-500 font-bold">{msg}</div> : ""}
        </Form>
      )}
    </Formik>
  );
}

export default Login;
