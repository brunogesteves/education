import { useLogicModalUpdate } from "./TeacherModalUpdate.logic";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { TeacherSchema } from "../../../utils/yup";
import { CourseProps, TeacherProps } from "../../../utils/types";

interface ModalUpdateStatus {
  isModalUpdateOpen: boolean;
  setIsModalUpdateOpen: (newState: boolean) => void;
  infoTeacher: TeacherProps;
  courses: CourseProps[];
}

function TeacherModalUpdate({
  isModalUpdateOpen,
  setIsModalUpdateOpen,
  infoTeacher,
  courses,
}: ModalUpdateStatus) {
  const { methods } = useLogicModalUpdate(setIsModalUpdateOpen);

  return (
    <div>
      {isModalUpdateOpen ? (
        <div className="fixed z-50 inset-0 ">
          <div className="bg-gray-500 opacity-70 h-full"></div>
          <div className="bg-white p-2 rounded m-auto fixed inset-0 max-w-2xl h-fit">
            Update Teacher
            <Formik
              initialValues={infoTeacher}
              enableReinitialize
              validationSchema={TeacherSchema}
              onSubmit={(values) => {
                methods.updateTeacher(values);
              }}
            >
              {() => (
                <Form className="flex justify-center items-center flex-col h-fit gap-y-2 ">
                  <Field
                    name="name"
                    placeholder="name"
                    className=" bg-white border-2 pl-2 border-black rounded-md placeholder:text-black placeholder:opacity-30"
                  />
                  <div className="-mt-2 text-red-500 ">
                    <ErrorMessage name="name" />
                  </div>

                  <Field
                    name="password"
                    placeholder="password"
                    type="password"
                    className=" bg-white border-2 pl-2 border-black rounded-md placeholder:text-black placeholder:opacity-30"
                  />
                  <div className="-mt-2 text-red-500">
                    <ErrorMessage name="password" />
                  </div>
                  <Field
                    name="document"
                    placeholder="document"
                    className=" bg-white border-2 pl-2 border-black rounded-md placeholder:text-black placeholder:opacity-30"
                  />
                  <div className="-mt-2 text-red-500">
                    <ErrorMessage name="document" />
                  </div>
                  <Field
                    name="email"
                    placeholder="email"
                    className=" bg-white border-2 pl-2 border-black rounded-md placeholder:text-black placeholder:opacity-30"
                  />
                  <div className="-mt-2 text-red-500">
                    <ErrorMessage name="email" />
                  </div>
                  <Field
                    name="course.id"
                    component="select"
                    // value={infoTeacher?.course?.id ?? 1}
                    className=" bg-white border-2 pl-2 border-black rounded-md placeholder:text-black placeholder:opacity-30"
                  >
                    <option>Choose a Course</option>
                    {courses.map((course) => {
                      return (
                        <option key={course.id} value={course.id}>
                          {course.name}
                        </option>
                      );
                    })}
                  </Field>
                  <div className="-mt-2 text-red-500">
                    <ErrorMessage name="course.id" />
                  </div>
                  <div className="flex gap-x-2 mt-5">
                    <button
                      type="submit"
                      className="bg-[#96BB7C] px-3 py-1 rounded-md text-white w-auto flex justify-between items-center gap-x-2 hover:text-black"
                    >
                      Update Teacher
                    </button>
                    <button
                      onClick={() => setIsModalUpdateOpen(false)}
                      className="px-3 py-1 bg-white border-2 rounded-md border-black text-black  hover:bg-red-500 hover:text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TeacherModalUpdate;
