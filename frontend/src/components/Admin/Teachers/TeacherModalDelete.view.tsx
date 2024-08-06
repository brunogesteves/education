import { TeacherProps } from "../../../utils/types";
import { useLogicModalDelete } from "./TeacherModalDelete.logic";

interface ModalUpdateStatus {
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (newState: boolean) => void;
  infoTeacher: TeacherProps;
}

function TeacherModalDelete({
  isModalDeleteOpen,
  setIsModalDeleteOpen,
  infoTeacher,
}: ModalUpdateStatus) {
  const { methods } = useLogicModalDelete(setIsModalDeleteOpen);

  return (
    <div>
      {isModalDeleteOpen ? (
        <div className="fixed z-50 inset-0 ">
          <div className="bg-gray-500 opacity-70 h-full"></div>
          <div className="bg-white p-2 rounded m-auto fixed inset-0 max-w-2xl h-fit text-center py-5">
            Are you sure you would delete {infoTeacher.name}?
            <div className="flex gap-x-2 mt-5 justify-center">
              <button
                onClick={() => methods.deleteTeacher(infoTeacher.id)}
                className="bg-[#96BB7C] px-3 py-1 rounded-md text-white w-auto flex justify-between items-center gap-x-2 hover:text-black"
              >
                Delete Teacher
              </button>
              <button
                onClick={() => setIsModalDeleteOpen(false)}
                className="px-3 py-1 bg-white border-2 rounded-md border-black text-black  hover:bg-red-500 hover:text-white"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default TeacherModalDelete;
