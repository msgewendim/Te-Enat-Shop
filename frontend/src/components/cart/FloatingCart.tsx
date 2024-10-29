import { t } from "i18next";
import { FloatingCartButtonProps } from "../../providers/interface/general.props";

const FloatingCartButton = ({ cartItemsCount, setOpenCart }: FloatingCartButtonProps) => (
  <button
    onClick={() => setOpenCart(true)}
    className="fixed right-2 top-16 sm:right-10 sm:top-[50vh] bg-primary rounded-full p-3 shadow-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
    aria-label={t('shop.openCart')}
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
      {cartItemsCount}
    </span>
  </button>
);

export default FloatingCartButton;