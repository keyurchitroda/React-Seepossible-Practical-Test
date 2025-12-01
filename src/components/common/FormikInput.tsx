
import React, { useState } from "react";
import { useField } from "formik";
import type { FormikInputProps } from "../../utils/types/common";
import { FiEye, FiEyeOff } from "react-icons/fi";

const FormikInput: React.FC<FormikInputProps> = ({ label, name, type, ...props }) => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const finalType = isPassword && showPassword ? "text" : type;
  const hasError = meta.touched && !!meta.error;

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>

      <input
        id={name}
        {...field}
        {...props}
        type={finalType}
        className={`w-full px-3 py-2 border rounded-md text-sm outline-none ${
          hasError ? "border-red-500" : "border-gray-300"
        } ${props.className ?? ""} pr-10`}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[39px] -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </button>
      )}

      {hasError && (
        <div className="text-xs text-red-500 mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default FormikInput;
