import { Field, Form, Formik } from "formik";
import { useLogic } from "./InfoStudent.logic";
import { SignInSchema } from "utils/yup";

const InfoStudent: React.FC = () => {
  const { data, methods } = useLogic();
  return (
    <div className="bg-[#FFF2F3]  flex  justify-center items-center">
      <div className="flex justify-between px-7 items-center">
        {data.student !== "" ? (
          <>
            <div className="flex gap-x-5 -mt-7 mb-5">
              <button
                onClick={() => methods.setStudent("")}
                className="px-3 py-1 h-10  bg-white border-2 rounded-md border-black text-black  hover:bg-red-500 hover:text-white"
              >
                Log out
              </button>
            </div>
          </>
        ) : null}
      </div>
      {data.student !== "" ? (
        <div className="h-screen -mt-14 flex flex-col justify-center items-center">
          <div className="mb-2">
            <span>Name:</span>
            <span className="ml-2">{data?.studentInfo?.name}</span>
          </div>
          <div className="mb-2">
            <span>Email:</span>
            <span className="ml-2">{data?.studentInfo?.email}</span>
          </div>
          <span className="my-2">Grades:</span>
          <div className="mt-2">
            {data.studentInfo?.result?.map((info) => {
              let courseName = "";
              data.courses.forEach((course) => {
                if (course.id === info.courseId) courseName = course.name;
              });

              return (
                <div key={info?.id} className="flex gap-x-5 justify-between">
                  <div>{courseName}: </div>
                  <div>{info?.grade}</div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Formik
          initialValues={data.initialValues}
          validationSchema={SignInSchema}
          onSubmit={(values) => {
            methods.singIn(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex -mt-7 justify-center items-center flex-col h-screen gap-y-10 ">
              Students Sign In
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

export default InfoStudent;
