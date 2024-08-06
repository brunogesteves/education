import { HiPencil } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEmail, MdNavigateBefore, MdNavigateNext } from "react-icons/md";

import { UseLogic } from "./Students.logic";
import StudentModalUpdate from "./StudentModalUpdate.view";
import StudentModalDelete from "./StudentModalDelete.view";

function Students() {
  const { data, methods } = UseLogic();
  return (
    <div className="w-1/2 h-fit flex flex-col justify-center items-center">
      <div className="flex justify-center">
        <input
          onChange={(e) => methods.searchTeacherTerm(e.target.value)}
          type="text"
          placeholder="find a student"
          className="border-2 border-black rounded-md pl-3 mb-3 flex self-center"
        />
      </div>
      <table className="w-full">
        <tbody>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Document</th>
            <th scope="col">Teacher</th>
            <th scope="col" className="flex justify-center">
              <MdEmail />
            </th>
          </tr>
          {data.students.map((student) => {
            return (
              <tr key={student.id}>
                <td className="text-center">{student?.id}</td>
                <td className="text-center">{student?.name}</td>
                <td className="text-center">{student?.document}</td>
                <td className="text-center">{student.email}</td>
                <td>
                  <button
                    onClick={() => {
                      methods.setUniqueIdStudent(student?.id);
                    }}
                  >
                    <HiPencil />
                  </button>
                </td>
                <td>
                  {data.userRole === "master" ? (
                    <button
                      onClick={() => methods.setDeleteStudentId(student?.id)}
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
          page {data.currentPage}/{Math.round(data.totalStudents / 3)}
        </div>
      </div>
      <StudentModalUpdate
        isModalUpdateOpen={data.isModalUpdateOpen}
        setIsModalUpdateOpen={(e: boolean) => methods.setIsModalUpdateOpen(e)}
        infoStudent={data?.infoStudent}
      />
      <StudentModalDelete
        isModalDeleteOpen={data.isModalDeleteOpen}
        setIsModalDeleteOpen={(e: boolean) => methods.setIsModalDeleteOpen(e)}
        infoStudent={data?.infoStudent}
      />
    </div>
  );
}

export default Students;
