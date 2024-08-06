import { ErrorMessage, Field, Formik, Form } from "formik";

import { AddCourseSchema } from "../../../../utils/yup";
import { useLogicModal } from "./ModalNewCourse.Logic";
import { ModalNoAccess } from "utils/modalNoAccess";

const ModalNewCourse: React.FC = () => {
  const { data, methods } = useLogicModal();

  return (
    <div>
      <button
        onClick={() => methods.setOpenCourseModal(true)}
        type="submit"
        className="bg-[#96BB7C] text-1xl px-2 py-1 rounded-md text-white "
      >
        <span>Add Course</span>
      </button>
      {data.openCourseModal ? (
        <div className="fixed z-50 inset-0 ">
          <div className="bg-gray-500 opacity-70 h-full"></div>
          <div className="bg-white p-2 rounded m-auto fixed inset-0 max-w-2xl h-fit">
            {data.userRole === "master" ? (
              <>
                Add Course
                <Formik
                  initialValues={{
                    name: "",
                  }}
                  validationSchema={AddCourseSchema}
                  onSubmit={(values, actions) => {
                    methods.createCourse(values, actions);
                  }}
                >
                  {() => (
                    <Form className="flex justify-center items-center flex-col h-fit gap-y-5 ">
                      <Field
                        name="name"
                        className="bg-white border-2 pl-2 border-black rounded-md placeholder:text-black placeholder:opacity-30"
                        placeholder="name"
                      />
                      <div className="-mt-2 text-red-500">
                        <ErrorMessage name="name" />
                      </div>
                      <div className="flex gap-x-2">
                        <button
                          type="submit"
                          className="bg-[#96BB7C] px-3 py-1 rounded-md text-white w-auto flex justify-between items-center gap-x-2 hover:text-black"
                        >
                          Add Course
                        </button>
                        <button
                          onClick={() => methods.setOpenCourseModal(false)}
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
                  methods.setOpenCourseModal(e)
                }
              />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ModalNewCourse;
