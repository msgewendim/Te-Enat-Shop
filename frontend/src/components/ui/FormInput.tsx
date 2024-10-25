import { FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>,
  type?: string,
  placeholder: string,
  name: Path<T>,
  registerOptions?: RegisterOptions<T>,
  classNames?: string,  // Optional class names for input field
  required?: boolean,  // Optional required field flag
}
export const FormInput = <T extends FieldValues>({ register, type = "text", placeholder, name, classNames, required, registerOptions }: FormInputProps<T>) => {
  return (
    <div>
      <input type={type} placeholder={placeholder} {...register(name, registerOptions ? registerOptions : {})}
        className={`px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-btnColor2 ${classNames}`} required={required} />
    </div>
  )
}