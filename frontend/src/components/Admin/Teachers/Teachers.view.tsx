import { FaRegTrashAlt } from "react-icons/fa";
import { UseLogic } from "./Teachers.logic";
import { HiPencil } from "react-icons/hi2";
import { MdNavigateNext, MdEmail, MdNavigateBefore } from "react-icons/md";

import TeacherModalUpdate from "./TeacherModalUpdate.view";
import TeacherModalDelete from "./TeacherModalDelete.view";

function Teachers() {
  const { data, methods } = UseLogic();

  return (
    <div className="w-1/2 h-fit flex flex-col justify-center items-center">
      <div className="flex justify-center">
        <input
          onChange={(e) => methods.searchTeacherTerm(e.target.value)}
          type="text"
          placeholder="find a teacher"
          className="border-2 border-black rounded-md pl-3 mb-3 flex self-center"
        />
      </div>
      <table className="w-full">
        <tbody>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Document</th>
            <th scope="col">Course</th>
            <th scope="col" className="flex justify-center">
              <MdEmail />
            </th>
            <th scope="col"></th>
          </tr>
          {data?.teachers.map((teacher, i) => {
            return (
              <tr key={i}>
                <td className="text-center">{teacher?.id}</td>
                <td className="text-center">{teacher?.name}</td>
                <td className="text-center">{teacher?.document}</td>
                <td className="text-center">{teacher?.course?.name}</td>
                <td className="text-center">{teacher?.email}</td>
                <td>
                  <button
                    onClick={() => methods.setUniqueIdTeacher(teacher.id)}
                  >
                    <HiPencil />
                  </button>
                </td>
                <td>
                  {data.UserRole === "master" ? (
                    <button
                      onClick={() => methods.setDeleteTeacherId(teacher.id)}
                    >
                      <FaRegTrashAlt />
                    </button>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className=" w-full px-2 flex justify-between mt-5">
        <div className="flex gap-x-2">
          <button
            onClick={() =>
              methods.setCurrentPage((currentPage) => currentPage - 1)
            }
            className="border-2 rounded-lg border-black px-3 py-1"
          >
            <MdNavigateBefore />
          </button>
          {data.pageNumbers.map((page, i) => {
            return (
              <button
                key={i}
                onClick={() => methods.setCurrentPage(page)}
                className={`border-2 rounded-lg border-black px-3 py-1 ${
                  page === data.currentPage ? "bg-[#96BB7C]" : ""
                } `}
              >
                {page}
              </button>
            );
          })}
          <button
            onClick={() =>
              methods.setCurrentPage((currentPage) => currentPage + 1)
            }
            className="border-2 rounded-lg border-black px-3 py-1"
          >
            <MdNavigateNext />
          </button>
        </div>
        <div>
          page {data.currentPage}/{Math.round(data.totalTeachers / 3)}
        </div>
      </div>
      <TeacherModalUpdate
        isModalUpdateOpen={data.isModalUpdateOpen}
        setIsModalUpdateOpen={(e: boolean) => methods.setIsModalUpdateOpen(e)}
        infoTeacher={data?.infoTeacher}
        courses={data?.courses}
      />
      <TeacherModalDelete
        isModalDeleteOpen={data.isModalDeleteOpen}
        setIsModalDeleteOpen={(e: boolean) => methods.setIsModalDeleteOpen(e)}
        infoTeacher={data?.infoTeacher}
      />
    </div>
  );
}

export default Teachers;
