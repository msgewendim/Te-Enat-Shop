import { Product } from "../../client/types.gen";

type ProductModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: Product;
};
type ProductImageProps = {
  image: string | null;
  name: string;
  onClick: () => void;
};
interface ProductActionsProps {
  openProductId: string | null;
  productID: string;
  product: Product;
  handleClosePopup: () => void;
  handleOpenPopup: () => void;
}
export { ProductModalProps, ProductImageProps, ProductActionsProps };
