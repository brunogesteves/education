import { Link } from "react-router-dom";

import User from "../components/Admin/Users/user";
import Teachers from "../components/Admin/Teachers/Teachers.view";
import Courses from "../components/Admin/Courses/Courses.view";
import Students from "../components/Admin/Students/Students.view";
import { useAuth } from "hooks/useAuth";
import { UserAcces } from "utils/UserAccess";

function Admin() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };
  return (
    <div>
      <div className="flex justify-between px-7 items-center">
        <img src="/logo.jpeg" width="100" className="mb-10" alt="logo" />

        <div className="flex gap-x-5 -mt-7">
          {UserAcces.role === "master" ? (
            <Link to="/admin/editor" className="text-sm ">
              <button className="px-3 py-1 h-10  bg-white border-2 rounded-md border-black text-black  hover:bg-green-500 hover:text-white">
                Add/Edit Editor
              </button>
            </Link>
          ) : null}

          <button
            onClick={handleLogout}
            className="px-3 py-1 h-10  bg-white border-2 rounded-md border-black text-black  hover:bg-red-500 hover:text-white"
          >
            Log out
          </button>
        </div>
      </div>
      <div>
        <div className="flex justify-between gap-x-10 h-80 mb-2">
          <User />
          <Courses />
        </div>

        <div className="flex justify-between gap-x-10">
          <Teachers />
          <Students />
        </div>
      </div>
    </div>
  );
}

export default Admin;
