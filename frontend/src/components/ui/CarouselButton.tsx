import { FC } from "react";
import { useTranslation } from "react-i18next";
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from "react-icons/md";

const CarouselButton: FC<CarouselButtonProps> = ({ onClick, disabled, direction }) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="p-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 cursor-pointer"
      aria-label={direction === 'left' ? t('relatedItems.previous') : t('relatedItems.next')}
    >
      {direction === 'left' ? <MdKeyboardDoubleArrowRight size={24} /> : <MdKeyboardDoubleArrowLeft size={24} />}
    </button>
  );
};

type CarouselButtonProps = {
  onClick: () => void;
  disabled: boolean;
  direction: 'left' | 'right';
}

export default CarouselButton;