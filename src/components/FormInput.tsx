import { FC } from "react";
import { FieldValues, UseFormRegister, FieldErrors } from "react-hook-form";

interface FormInputProps {
  register: UseFormRegister<any>;
  name: string;
  label: string;
  errors: FieldErrors;
  placeholder?: string;
  required?: boolean;
  type?: string;
  centered?: boolean;
}

const FormInput: FC<FormInputProps> = ({
  register,
  name,
  type = "text",
  label,
  errors,
  placeholder,
  required = false,
  centered = false,
}) => (
  <div>
    <label
      htmlFor={name}
      className="flex space-x-2 justify-between items-baseline"
    >
      <span>{label}</span>
      <span className="text-xs text-gray-500">{!required && "Optional"}</span>
    </label>
    <input
      type={type}
      id={name}
      placeholder={placeholder || label}
      {...register(name, {
        required: { value: required, message: `${label} is required` },
      })}
      className={`w-full rounded-md border-gray-200 bg-white ${
        centered && "text-center"
      } placeholder:text-gray-400 shadow-sm`}
    />
    {errors[name] && (
      <div className="text-red-500 text-center">
        {errors[name]?.message as string | undefined}
      </div>
    )}
  </div>
);

export default FormInput;
