import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

export const useAuth = () => {
  const currentLoginUser = useSelector(
    (state:RootState) => state.auth.currentLoginUser
  );

  const isLoggedIn = !!currentLoginUser;

  return {
    isLoggedIn,
    currentLoginUser,
  };
};
