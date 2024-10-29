import { FC } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { Product, Recipe } from "../../client/types.gen";
import { CategoryMapping } from "../../utils/constants";

interface RelatedItemsProps {
  itemCategory: string;
  type: string;
}
interface RelatedItemCardProps {
  item: Product | Recipe;
  linkPrefix: string; // '/products' or '/recipes'
}
interface GuaranteeCardProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>> | string;
  text: string;
  title: string;
}

interface HeroCardProps {
  image: string;
  title: string;
  link: string;
}
interface RecipeCardType {
  id: string;
  image: string;
  title: string;
}

interface FeatureCardType {
  icon: React.ReactElement;
  title: string;
  description: string;
}
interface CategoryCardProps {
  category: { name: string; image: string; value: string };
  setCategory: (category: string) => void;
}

interface SocialLinkProps {
  href: string;
  icon: FC<React.SVGProps<SVGSVGElement>>;
  label: string;
}
interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
interface MobileMenuButtonProps {
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
type DateBadgeProps = {
  day: number | undefined;
  month: string | undefined;
};

type BannerProps = {
  image: string;
  text: string;
};
interface CarouselButtonProps {
  onClick: () => void;
  disabled: boolean;
  direction: "previous" | "next";
  children: React.ReactNode;
  ariaLabel: string;
}
interface CategoryButtonProps {
  category: string;
  onClick: () => void;
}
interface FiltersProps {
  clearFiltersPath: string;
  type: "recipes" | "products";
}
interface ClearFiltersButtonProps {
  handleClearFilters: () => void;
  clearFiltersPath: string;
}

type FormInputProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  type?: string;
  placeholder: string;
  name: Path<T>;
  error?: string;
  label?: string;
  registerOptions?: RegisterOptions<T>;
  className?: string; // Optional class names for input field
  required?: boolean; // Optional required field flag
};
interface SelectTypes {
  selectItems: string[];
  initialItem: string;
  classes?: string;
  type: "size" | "category";
  categoryMapping?: CategoryMapping;
  onChange?: (selectedOption: string) => void;
}
type PaginationButtonProps = {
  onClick: () => void;
  direction: "previous" | "next";
  ariaLabel: string;
  page: number;
};

type PaginationProps = {
  page: number;
  handlePrevious: () => void;
  handleNext: () => void;
};
type FloatingCartButtonProps = {
  cartItemsCount: number;
  setOpenCart: (isOpen: boolean) => void;
};
export {
  RelatedItemsProps,
  RelatedItemCardProps,
  GuaranteeCardProps,
  HeroCardProps,
  RecipeCardType,
  FeatureCardType,
  CategoryCardProps,
  SocialLinkProps,
  MobileMenuProps,
  MobileMenuButtonProps,
  DateBadgeProps,
  BannerProps,
  CarouselButtonProps,
  CategoryButtonProps,
  FiltersProps,
  ClearFiltersButtonProps,
  FormInputProps,
  SelectTypes,
  PaginationButtonProps,
  PaginationProps,
  FloatingCartButtonProps,
};
