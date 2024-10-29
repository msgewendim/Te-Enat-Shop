import { FieldValues } from "react-hook-form";
import { FormInputProps } from "../../providers/interface/general.props";

export const FormInput = <T extends FieldValues>({
  register,
  type = "text",
  name,
  className = "",
  required = false,
  registerOptions,
  label,
  placeholder,
  error
}: FormInputProps<T>) => {
  const inputId = `input-${name}`;

  return (
    <div className="relative">
      {label && <label
        htmlFor={inputId}
        className={`block text-sm font-medium text-gray-700 mb-1 ${required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : ''}`}
      >
        {label}
      </label>}
      <input
        id={inputId}
        type={type}
        {...register(name, registerOptions)}
        className={`
          px-4 py-3 bg-gray-100 text-gray-800 w-full text-sm rounded-md
          focus:outline-none focus:ring-2 focus:ring-btnColor2 focus:border-transparent placeholder:text-right
          ${className}
        `}
        required={required}
        placeholder={placeholder}
        aria-required={required}
      />
      {error &&
        <div className="mt-2 text-sm text-red-500">
          {error}
        </div>}
    </div>
  )
}