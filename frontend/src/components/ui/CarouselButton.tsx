import { FC } from "react";
import { useTranslation } from "react-i18next";
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { CarouselButtonProps } from "../../providers/interface/general.props";

const CarouselButton: FC<CarouselButtonProps> = ({ onClick, disabled, direction }) => {
  const { t } = useTranslation();
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="p-2 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 cursor-pointer"
      aria-label={direction === 'previous' ? t('relatedItems.previous') : t('relatedItems.next')}
    >
      {direction === 'previous' ? <MdKeyboardDoubleArrowRight size={24} /> : <MdKeyboardDoubleArrowLeft size={24} />}
    </button>
  );
};



export default CarouselButton;