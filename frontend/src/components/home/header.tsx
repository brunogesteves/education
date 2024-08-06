import { Link } from "react-router-dom";
import { RightArrow } from "../../utils/icons";

function Header() {
  return (
    <div className="mt-2 flex justify-between items-center mx-12">
      <Link to="/">
        <img src="/logo.jpeg" width="100" alt="logo" />
      </Link>
      <div className="flex gap-x-4 items-center">
        <Link to="/teacher" className="text-sm text-[#96BB7C]">
          Teacher
        </Link>
        <Link to="/student" className="text-sm text-[#96BB7C]">
          Student
        </Link>
        <button className="bg-[#96BB7C] px-3 py-1 rounded-md text-white flex justify-between items-center gap-x-2">
          <Link to="/admin" className="text-sm text-[#96BB7C]">
            <span className="text-white">Admin</span>
          </Link>
          {RightArrow()}
        </button>
      </div>
    </div>
  );
}

export default Header;
