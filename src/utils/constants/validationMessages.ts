export const VALIDATION_MESSAGES = {
  common: {
    required: "This field is required",
  },
  fullName: {
    required: "Full name is required",
    max: "Full name is too long",
  },
  email: {
    required: "Email is required",
    invalid: "Invalid email address",
  },
  password: {
    required: "Password is required",
    min: "Password must be at least 8 characters",
    uppercase: "Must contain at least one uppercase letter",
    lowercase: "Must contain at least one lowercase letter",
    special: "Must contain at least one special character",
  },
  confirmPassword: {
    required: "Confirm Password is required",
    mismatch: "Passwords must match",
  },
  gender: {
    required: "Gender is required",
    invalid: "Invalid gender",
  },
  mobile: {
    required: "Mobile number is required",
    invalid: "Mobile number must be 10 digits",
  },
  product: {
    titleRequired: "Title is required",
    descriptionRequired: "Description is required",
    priceRequired: "Price is required",
    priceInvalid: "Price must be a number",
    thumbnailRequired: "Image URL is required",
    thumbnailInvalid: "Enter a valid image URL",
  },
};
