import { TeacherSchema } from "../../../../utils/yup";
import { ErrorMessage, Field, Formik, Form } from "formik";

import { useLogicModal } from "./modalNewtTeacher.Logic";
import { ModalNoAccess } from "utils/modalNoAccess";

function ModalNewTeacher() {
  const { data, methods } = useLogicModal();
  return (
    <div>
      <button
        onClick={() => methods.setOpenTeacherModal(true)}
        type="submit"
        className="bg-[#96BB7C] text-1xl px-2 py-1 rounded-md text-white "
      >
        <span>Add Teacher</span>
      </button>
      {data.openTeacherModal ? (
        <div className="fixed z-50 inset-0 ">
          <div className="bg-gray-500 opacity-70 h-full"></div>
          <div className="bg-white p-2 rounded m-auto fixed inset-0 max-w-2xl h-fit">
            {data.userRole === "master" ? (
              <>
                Add Teacher
                <Formik
                  initialValues={data.initialValues}
                  validationSchema={TeacherSchema}
                  onSubmit={(values, actions) => {
                    methods.createTeacher(values, actions);
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
                        name="courseId"
                        component="select"
                        className=" bg-white border-2 pl-2 border-black rounded-md placeholder:text-black placeholder:opacity-30"
                      >
                        <option>Choose a Course</option>

                        {data.courses.map((course) => {
                          return (
                            <option value={course.id}>{course.name}</option>
                          );
                        })}
                      </Field>
                      <div className="-mt-2 text-red-500">
                        <ErrorMessage name="courseId" />
                      </div>
                      <div className="flex gap-x-2 mt-5">
                        <button
                          type="submit"
                          className="bg-[#96BB7C] px-3 py-1 rounded-md text-white w-auto flex justify-between items-center gap-x-2 hover:text-black"
                        >
                          Add Teacher
                        </button>
                        <button
                          onClick={() => methods.setOpenTeacherModal(false)}
                          className="px-3 py-1 bg-white border-2 rounded-md border-black text-black  hover:bg-red-500 hover:text-white"
                        >
                          Cancel
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
            ) : (
              <ModalNoAccess
                closeModalNoAccess={(e: boolean) =>
                  methods.setOpenTeacherModal(e)
                }
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ModalNewTeacher;
