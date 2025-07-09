import { createContext } from "react";

import {  
  Product,
  Recipe,
  Package,
} from "../../client/types.gen";

export type query = {
  page?: number;
  category?: string;
  subCategory?: string;
  filter?: string;
  limit?: number;
  type?: string;
};

export interface IContext {
  category: string;
  page: number;
  filter: string;
  paymentFormUrl: string;
  adminActiveSection: string;
  setFilter: (filter: string) => void;
  setPage: (newPage: number) => void;
  setCategory: (newCategory: string) => void;
  setPaymentFormUrl: (url: string) => void;
  setAdminActiveSection: (section: string) => void;
  showModal: (onConfirm: () => void) => void;
  hideModal: () => void;
  modalState: ModalState;
  setModalState: (state: ModalState) => void;
  setProductToEdit: (product: Product | undefined) => void;
  setRecipeToEdit: (product: Recipe | undefined) => void;
  recipeToEdit: Recipe | undefined;
  productToEdit: Product | undefined;
  openCart: boolean;
  setOpenCart: (open: boolean) => void;
  packageToEdit: Package | undefined;
  setPackageToEdit: (pkg: Package | undefined) => void;
  subCategory: string;
  setSubCategory: (subCategory: string) => void;
}

export const AppContext = createContext<IContext>({
  category: "",
  page: 0,
  filter: "",
  paymentFormUrl: "",
  adminActiveSection: "",
  setPaymentFormUrl: () => {},
  setFilter: () => {},
  setPage: () => {},
  setCategory: () => {},
  setAdminActiveSection: () => {},
  hideModal: () => {},
  showModal: () => {},
  modalState: { isOpen: false, onConfirm: () => {} },
  setModalState: () => {},
  productToEdit: undefined,
  recipeToEdit: undefined,
  setProductToEdit: () => {},
  setRecipeToEdit: () => {},
  openCart: false,
  setOpenCart: () => {},
  packageToEdit: undefined,
  setPackageToEdit: () => {},
  subCategory: "",
  setSubCategory: () => {},
});

export interface ModalState {
  isOpen: boolean;
  onConfirm: () => void;
}
