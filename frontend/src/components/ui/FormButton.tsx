interface FormButtonProps {
  type: "button" | "submit" | "reset";
  onClick: () => void;
  text: string;
  ariaLabel?: string;
  className?: string;
}
const FormButton = ({ type, onClick, ariaLabel, className, text }: FormButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full md:w-fit py-2 px-4 rounded-md ${className || ''}`}
      aria-label={ariaLabel}
    >
      {text}
    </button>
  )
}

export default FormButton;
