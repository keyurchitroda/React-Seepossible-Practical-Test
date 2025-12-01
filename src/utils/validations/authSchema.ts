import * as Yup from "yup";
import { VALIDATION_MESSAGES } from "../constants/validationMessages";

export const getSignupValidationSchema = () =>
  Yup.object({
    fullName: Yup.string()
      .required(VALIDATION_MESSAGES.fullName.required)
      .max(100, VALIDATION_MESSAGES.fullName.max),

    email: Yup.string()
      .email(VALIDATION_MESSAGES.email.invalid)
      .required(VALIDATION_MESSAGES.email.required),

    password: Yup.string()
      .required(VALIDATION_MESSAGES.password.required)
      .min(8, VALIDATION_MESSAGES.password.min)
      .matches(/[A-Z]/, VALIDATION_MESSAGES.password.uppercase)
      .matches(/[a-z]/, VALIDATION_MESSAGES.password.lowercase)
      .matches(/[!@#$%^&*(),.?":{}|<>]/, VALIDATION_MESSAGES.password.special),

    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        VALIDATION_MESSAGES.confirmPassword.mismatch
      )
      .required(VALIDATION_MESSAGES.confirmPassword.required),

    gender: Yup.string()
      .oneOf(["male", "female", "other"], VALIDATION_MESSAGES.gender.invalid)
      .required(VALIDATION_MESSAGES.gender.required),

    mobile: Yup.string()
      .required(VALIDATION_MESSAGES.mobile.required)
      .matches(/^[0-9]{10}$/, VALIDATION_MESSAGES.mobile.invalid),
  });

export const getSigninValidationSchema = () =>
  Yup.object({
    email: Yup.string()
      .email(VALIDATION_MESSAGES.email.invalid)
      .required(VALIDATION_MESSAGES.email.required),

    password: Yup.string().required(VALIDATION_MESSAGES.password.required),
  });
