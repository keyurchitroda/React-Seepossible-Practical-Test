type FormikInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
};

interface Option {
  label: string;
  value: string;
}

interface FormikRadioGroupProps {
  name: string;
  label: string;
  options: Option[];
}

export { FormikInputProps, Option, FormikRadioGroupProps };
