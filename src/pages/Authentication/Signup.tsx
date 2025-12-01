import { Formik, Form } from "formik";
import type { SignupFormValues } from "../../utils/types/auth";
import { getSignupValidationSchema } from "../../utils/validations/authSchema";
import FormikInput from "../../components/common/FormikInput";
import FormikRadioGroup from "../../components/common/FormikRadioGroup";
import { GENDER_OPTIONS } from "../../utils/constants/common";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import bcrypt from "bcryptjs";
import { toast } from "react-toastify";
import { setUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../redux/store";

const initialValues: SignupFormValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  mobile: "",
};

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state: RootState) => state.auth.users);
  const handleSubmit = useCallback(
    async (values: SignupFormValues, resetForm: () => void) => {
      const isUserExist = users.some(
        (user: { email: string }) => user.email === values.email
      );

      if (isUserExist) {
        return toast.error("User already registered with this email");
      }
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(values.password, salt);

      const userToStore = {
        ...values,
        password: passwordHash,
      };

      dispatch(setUser(userToStore));

      toast.success("Signup successful!");
      navigate("/auth/sign-in");
      resetForm();
    },
    [dispatch]
  );

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">Signup</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={getSignupValidationSchema()}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <FormikInput
              name="fullName"
              label="Full Name"
              type="text"
              placeholder="Enter your full name"
            />

            <FormikInput
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
            />

            <div>
              <FormikInput
                name="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
              />
              <p className="text-[11px] text-gray-500 mt-1">
                Minimum 8 characters, 1 uppercase, 1 lowercase, 1 special
                character.
              </p>
            </div>

            <FormikInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your password"
            />

            <FormikRadioGroup
              name="gender"
              label="Gender"
              options={GENDER_OPTIONS}
            />

            <FormikInput
              name="mobile"
              label="Mobile"
              type="tel"
              placeholder="Enter your mobile number"
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer w-full py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {isSubmitting ? "Submitting..." : "Sign Up"}
            </button>
            <div className="text-center text-sm mt-4">
              <span className="text-gray-600">Already have an account? </span>
              <a
                href="/auth/sign-in"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign In
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
