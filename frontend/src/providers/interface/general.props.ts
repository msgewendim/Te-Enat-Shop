import { FC } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { Category, ProductSize } from "../../client/types.gen";
import { CategoryMapping } from "../../utils/constants";
import { QueryObserverResult } from "@tanstack/react-query";
import { RefetchOptions } from "@tanstack/react-query";

interface RelatedItemsProps {
  endpoint: string;
  itemCategory: string;
  titleKey: string;
  exclude: string;
}

interface RelatedItemCardProps<T> {
  item: T;
  endpoint: string; // '/products' or '/recipes'
}
interface GuaranteeCardProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>> | string;
  text: string;
  title: string;
}

interface HeroCardProps {
  image: () => Promise<{ default: string }>;
  title: string;
  link: string;
}

interface FeatureCardType {
  icon: React.ReactElement;
  title: string;
  description: string;
}
interface CategoryCardProps {
  category: {
    nameInHebrew: string;
    nameInEnglish: string;
    image: string;
  };
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
  isSelected: boolean;
  onClick: () => void;
  isSubCategory?: boolean;
}
interface FiltersProps {
  clearFiltersPath: string;
  type: "recipe" | "product";
  className?: string;
}

interface FilterCategoriesProps {
  categories: Category[];
  onCategoryChange: (category: string) => void;
  onSubCategoryChange: (subCategory: string) => void;
  subCategoriesMapping: CategoryMapping;
}
interface ClearFiltersButtonProps {
  handleClearFilters: () => void;
  clearFiltersPath: string;
}
type UpdateHookProps<T> = {
  itemId: string;
  itemData: Partial<T>;
};
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
interface SelectProps {
  items: Array<ProductSize | Category>;
  value: string;
  onChange: (value: string) => void;
  displayKey: string;
  valueKey: string;
  placeholder: string;
  className?: string;
  type: "category" | "size";
}
type PaginationButtonProps = {
  onClick: () => void;
  direction: "previous" | "next";
  ariaLabel: string;
  page: number;
  path: string;
};

type PaginationProps = {
  page: number;
  handlePrevious: () => void;
  handleNext: () => void;
  path: string;
};
type FloatingCartButtonProps = {
  cartItemsCount: number;
  setOpenCart: (isOpen: boolean) => void;
};

type DashboardConfig<T> = {
  items: T[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  deleteMutation: {
    mutate: (id: string) => void;
    isSuccess: boolean;
    isError: boolean;
  };
  itemType: string;
  formatTableData: (items: T[]) => TableData[];
  displayFields: Record<string, string>;
  setItemToEdit: (item: T) => void;
  refetch?: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<T[], Error>>;
};

type TableData = {
  _id: string;
  [key: string]: string | number | React.ReactNode;
};

export {
  RelatedItemsProps,
  RelatedItemCardProps,
  GuaranteeCardProps,
  HeroCardProps,
  UpdateHookProps,
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
  SelectProps,
  PaginationButtonProps,
  PaginationProps,
  FloatingCartButtonProps,
  FilterCategoriesProps,
  DashboardConfig,
  TableData,
};
