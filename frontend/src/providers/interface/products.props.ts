import { Product } from "../../client/types.gen";

type ProductModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: Product;
};
export type ItemProperties = {
  quantity: number;
  size: string;
  price: number;
  itemType: string;
  name: string;
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
export type { ProductModalProps, ProductImageProps, ProductActionsProps };
