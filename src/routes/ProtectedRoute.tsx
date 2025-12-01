import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

const ProtectedRoute: React.FC = () => {
  const currentLoginUser = useSelector(
    (state: RootState) => state.auth.currentLoginUser
  );

  if (!currentLoginUser) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
