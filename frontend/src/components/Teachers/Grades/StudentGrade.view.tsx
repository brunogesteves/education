import { ErrorMessage, Field, Form, Formik } from "formik";
import { useLogic } from "./StudentGrade.logic";
import { StudentGradeSchema } from "../../../utils/yup";
import { StudentResultProps } from "../../../utils/types";

interface InfoProps {
  infoResults: StudentResultProps;
}

const StudentGrade: React.FC<InfoProps> = (infoResults) => {
  const { data, methods } = useLogic();
  return (
    <div>
      <Formik
        initialValues={infoResults.infoResults}
        enableReinitialize
        validationSchema={StudentGradeSchema}
        onSubmit={(values) => {
          methods.updateStudentGrade(values);
        }}
      >
        {() => (
          <Form className="flex justify-center items-center flex-col h-fit gap-y-2 mt-5">
            <Field
              name="grade"
              placeholder="grade"
              className=" bg-white border-2 pl-2 border-black rounded-md placeholder:text-black placeholder:opacity-30"
            />
            <div className="-mt-2 text-red-500 ">
              <ErrorMessage name="grade" />
            </div>
            <div className="mt-2 text-green-500 h-3 ">
              {data.isUpdated ? "Grade is Updated" : ""}
            </div>
            <div className="flex gap-x-2 mt-5">
              <button
                type="submit"
                className="bg-[#96BB7C] px-3 py-1 rounded-md text-white w-auto flex justify-between items-center gap-x-2 hover:text-black"
              >
                Update Grade Student
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StudentGrade;
