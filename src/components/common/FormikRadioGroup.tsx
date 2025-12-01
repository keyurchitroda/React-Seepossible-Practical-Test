import React from "react";
import { useField } from "formik";
import type { FormikRadioGroupProps } from "../../utils/types/common";

const FormikRadioGroup: React.FC<FormikRadioGroupProps> = ({
  name,
  label,
  options,
}) => {
  const [field, meta, helpers] = useField(name);
  const hasError = meta.touched && !!meta.error;

  return (
    <div>
      <span className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </span>

      <div className="flex items-center gap-4">
        {options.map((op) => (
          <label key={op.value} className="flex items-center gap-1 text-sm">
            <input
              type="radio"
              checked={field.value === op.value}
              onChange={() => helpers.setValue(op.value)}
            />
            <span>{op.label}</span>
          </label>
        ))}
      </div>

      {hasError && (
        <div className="text-xs text-red-500 mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export default FormikRadioGroup;
