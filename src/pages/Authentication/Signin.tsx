import { Formik, Form } from "formik";
import type { SigninFormValues } from "../../utils/types/auth";
import { getSigninValidationSchema } from "../../utils/validations/authSchema";
import FormikInput from "../../components/common/FormikInput";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import bcrypt from "bcryptjs";
import { toast } from "react-toastify";
import { loginUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../redux/store";

const initialValues: SigninFormValues = {
  email: "",
  password: "",
};

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.auth.users);
  console.log("users>>>>>>>>>>", users);
  const handleSubmit = useCallback(
    async (values: SigninFormValues, resetForm: () => void) => {
      const usersDetails = users.find(
        (user: { email: string }) => user.email === values.email
      );

      if (!usersDetails) {
        return toast.error("User not found..!");
      }

      const validatePassword = await bcrypt.compare(
        values.password,
        usersDetails.password
      );

      if (!validatePassword) {
        return toast.error("Invalid username or password..!");
      } else {
        await dispatch(loginUser(usersDetails));

        toast.success("Signin successful!");
        navigate("/");
        resetForm();
      }
    },
    [dispatch]
  );

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">Signin</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={getSigninValidationSchema()}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <FormikInput
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
            />

            <FormikInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer w-full py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? "Submitting..." : "Sign In"}
            </button>
            <div className="text-center text-sm mt-4">
              <span className="text-gray-600">Don't have an account? </span>
              <a
                href="/auth/sign-up"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign Up
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signin;
