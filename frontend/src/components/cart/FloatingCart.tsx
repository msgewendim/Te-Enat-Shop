import { t } from "i18next";
import { FloatingCartButtonProps } from "../../providers/interface/general.props";
import { BiCart } from "react-icons/bi";

const FloatingCartButton = ({ cartItemsCount, setOpenCart }: FloatingCartButtonProps) => (
  <button
    onClick={() => setOpenCart(true)}
    className="relative rounded-full p-1 shadow-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
    aria-label={t('shop.openCart')}
  >
    <BiCart size={24} className="text-primary" />
    <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {cartItemsCount}
    </span>
  </button>
);

export default FloatingCartButton;