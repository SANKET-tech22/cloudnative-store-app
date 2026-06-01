import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    navigate("/");
  };

  return (
    <div className="bg-slate-800 shadow-lg p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">
        CloudNative Store
      </h1>

      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold"
        >
          👤
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-slate-700 rounded-lg shadow-lg">
            <button
              className="block w-full text-left px-4 py-3 hover:bg-slate-600"
            >
              Profile
            </button>

            <button
              onClick={logout}
              className="block w-full text-left px-4 py-3 hover:bg-slate-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;