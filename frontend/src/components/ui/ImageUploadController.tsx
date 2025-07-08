import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form'
import { ImageUploadField } from './ImageUploadField'

interface ImageUploadControllerProps<T extends FieldValues> {
  name: FieldPath<T>
  control: Control<T>
  label?: string
  placeholder?: string
  className?: string
  multiple?: boolean
  maxFiles?: number
  maxSizeMB?: number
  folder?: string
  required?: boolean
  disabled?: boolean
  onError?: (error: string) => void
}

export function ImageUploadController<T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  className,
  multiple = false,
  maxFiles = 10,
  maxSizeMB = 5,
  folder = 'tenat-uploads',
  required = false,
  disabled = false,
  onError
}: ImageUploadControllerProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? 'This field is required' : false
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div>
          <ImageUploadField
            value={value}
            onChange={onChange}
            onError={onError}
            label={label}
            placeholder={placeholder}
            className={className}
            multiple={multiple}
            maxFiles={maxFiles}
            maxSizeMB={maxSizeMB}
            folder={folder}
            required={required}
            disabled={disabled}
          />
          {error && (
            <span className="text-red-500 text-sm mt-1 block">
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  )
} 