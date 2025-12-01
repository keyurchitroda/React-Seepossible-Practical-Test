import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const AuthProtectedRoute: React.FC = () => {
  const currentLoginUser = useSelector(
    (state: RootState) => state.auth.currentLoginUser
  );

  if (currentLoginUser) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default AuthProtectedRoute;
