interface SignupFormValues {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  mobile: string;
}

interface SigninFormValues {
  email: string;
  password: string;
}

export { SignupFormValues, SigninFormValues };
