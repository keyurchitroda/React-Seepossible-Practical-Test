import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../redux/slices/authSlice";

const Header = () => {
  const { currentLoginUser } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/signin");
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">
          Practical Test App
        </h1>

        <nav className="flex items-center gap-6 text-gray-600 text-sm">
          <a href="/home" className="hover:text-blue-600">
            Home
          </a>
          <p onClick={handleLogout} className="hover:text-blue-600 cursor-pointer">
            Logout
          </p>

          <p>{currentLoginUser?.fullName}</p>
        </nav>
      </div>
    </header>
  );
};

export default Header;
