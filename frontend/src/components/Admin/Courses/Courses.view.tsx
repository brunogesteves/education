import { useLogic } from "./Courses.logic";
import { FaRegTrashAlt } from "react-icons/fa";

function Courses() {
  const { data, methods } = useLogic();

  return (
    <div className="flex flex-col items-center w-1/2 overflow-y-auto h-full">
      {data?.courses.map((course, i) => {
        return (
          <div key={i} className="flex justify-between w-40">
            <span className="text-center">{course.name}</span>
            {data.userRole === "master" ? (
              <button
                className="hover:text-red-500 cursor-pointer"
                onClick={() => methods.deleteCourse(course.id)}
              >
                <FaRegTrashAlt />
              </button>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default Courses;
