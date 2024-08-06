import { Field, Form, Formik } from "formik";
import { StudentResultProps } from "../../../utils/types";
import { useLogic } from "./InfoTeacher.logic";
import { SignInSchema } from "utils/yup";

interface InfoProps {
  studentInfo: (newState: StudentResultProps) => void;
}

const InfoTeacher: React.FC<InfoProps> = ({ studentInfo }) => {
  const { data, methods } = useLogic();

  return (
    <div>
      <div className="flex justify-between px-7 items-center">
        {data.teacher !== "" ? (
          <>
            <div className="flex gap-x-5 -mt-7 mb-5">
              <button
                onClick={() => methods.setTeacher("")}
                className="px-3 py-1 h-10  bg-white border-2 rounded-md border-black text-black  hover:bg-red-500 hover:text-white"
              >
                Log out
              </button>
            </div>
          </>
        ) : null}
      </div>
      {data.teacher !== "" ? (
        <>
          <div className="mb-2">
            <span>Name:</span>
            <span className="ml-2">{data?.teacherInfo?.name}</span>
          </div>
          <div className="mb-2">
            <span>Email:</span>
            <span className="ml-2">{data?.teacherInfo?.email}</span>
          </div>
          <div className="mb-2">
            <span>Course:</span>
            <span className="ml-2">{data?.teacherInfo?.course.name}</span>
          </div>
          <select
            onChange={async (e) => {
              const res = await methods.getStudentInfo(
                Number(e.target.value),
                data?.teacherInfo?.course.id
              );
              studentInfo(res);
            }}
          >
            <option value="">Choose a Student</option>
            {data?.students?.map((student) => {
              return (
                <option key={student.id} value={student?.id}>
                  {student?.name}
                </option>
              );
            })}
          </select>
        </>
      ) : (
        <Formik
          initialValues={data.initialValues}
          validationSchema={SignInSchema}
          onSubmit={(values) => {
            methods.singIn(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex justify-center items-center flex-col h-screen gap-y-10 ">
              <img src="/logo.jpeg" alt="logo" width={100} />
              Sign In
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
                  <div className="text-red-500 font-bold">
                    {errors.password}
                  </div>
                ) : null}
              </div>
              <button
                type="submit"
                className="bg-[#96BB7C] px-3 py-1 rounded-md text-white w-auto flex justify-between items-center gap-x-2"
              >
                <span>Sign In</span>
              </button>
              {data.message ? (
                <div className="text-red-500 font-bold">{data.message}</div>
              ) : (
                ""
              )}
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default InfoTeacher;
