import { useState } from "react";
import StudentGrade from "../components/Teachers/Grades/StudentGrade.view";
import InfoTeacher from "../components/Teachers/Info/InfoTeacher.view";
import { StudentResultProps } from "../utils/types";
import { Link } from "react-router-dom";

const TeacherPage: React.FC = () => {
  const [infoResults, setInfoResults] = useState<StudentResultProps>({
    id: 0,
    courseId: 0,
    grade: 0,
    studentId: 0,
  });

  return (
    <div className="bg-[#FFF2F3]">
      <Link to="/">
        <img src="/logo.jpeg" width="100" alt="logo" />
      </Link>
      <div className=" min-h-screen flex justify-center items-center -mt-20">
        <div className="mx-10 flex justify-center items-center flex-col">
          <InfoTeacher
            studentInfo={(e: StudentResultProps) => setInfoResults(e)}
          />
          {infoResults.studentId !== 0 ? (
            <StudentGrade infoResults={infoResults} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherPage;
