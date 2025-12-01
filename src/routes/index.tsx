import { Suspense, lazy, type ComponentType } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AuthProtectedRoutes from "./AuthProtectedRoutes";
import AuthLayout from "../components/shared/AuthLayout/AuthLayout";
import HomeLayout from "../components/shared/HomeLayout/HomeLayout";

const Loadable =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) => {
    return (
      <div>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Component {...props} />
        </Suspense>
      </div>
    );
  };

export default function Router() {
  return useRoutes([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          element: <AuthProtectedRoutes />,
          children: [
            {
              path: "sign-in",
              element: <SignIn />,
            },
            {
              path: "sign-up",
              element: <SignUp />,
            },
          ],
        },
      ],
    },
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { element: <Navigate to="/home" replace />, index: true },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: "home",
              element: <Home />,
            },
            {
              path: "add-product",
              element: <AddProduct />,
            },
          ],
        },
      ],
    },
    { path: "*", element: <Navigate to="/auth/sign-in" replace /> },
  ]);
}

const SignIn = Loadable(lazy(() => import("../pages/Authentication/Signin")));
const SignUp = Loadable(lazy(() => import("../pages/Authentication/Signup")));

const Home = Loadable(lazy(() => import("../pages/Home/Home")));
const AddProduct = Loadable(lazy(() => import("../pages/Products/AddProduct")));
