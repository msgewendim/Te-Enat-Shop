import React, { useState } from 'react';

import Select from "./Select";
import { Category } from '../../client/types.gen';
import { CategoryButtonProps, FilterCategoriesProps } from '../../providers/interface/general.props';


const FilterCategories: React.FC<FilterCategoriesProps> = ({
  categories,
  onCategoryChange,
  subCategoriesMapping,
  onSubCategoryChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category.nameInEnglish);
    onCategoryChange(category.nameInEnglish);
  };

  // Get subcategories for the selected main category
  const availableSubCategories = subCategoriesMapping[selectedCategory] as Category[] || [];

  return (
    <div className="space-y-4">
      {/* Main Categories */}
      <div className="rounded-lg items-center">
        <Select
          items={categories}
          value={selectedCategory}
          onChange={(value) => handleCategoryChange(categories.find(cat => cat.nameInEnglish === value) as Category)}
          displayKey="nameInHebrew"
          valueKey="nameInEnglish"
          placeholder="בחר קטגוריה"
          className="md:hidden"
          type="category"
        />

        <div className="md:flex gap-2 hidden">
          {categories.map((category, index) => (
            <CategoryButton
              key={index}
              category={category.nameInHebrew}
              isSelected={selectedCategory === category.nameInEnglish}
              onClick={() => handleCategoryChange(category)}
            />
          ))}
        </div>
      </div>

      {/* Subcategories - Only show if main category is selected */}
      {selectedCategory && Array.isArray(availableSubCategories) && availableSubCategories.length > 0 && (
        <div className="mt-2">
          <Select
            items={availableSubCategories}
            value={""}
            onChange={(value) => onSubCategoryChange(value)}
            displayKey="nameInHebrew"
            valueKey="nameInEnglish"
            placeholder="בחר תת קטגוריה"
            className="md:hidden"
            type="category"
          />

          <div className="md:flex gap-2 hidden">
            {availableSubCategories?.map((subCat, index) => (
              <CategoryButton
                key={index}
                category={subCat.nameInHebrew}
                isSelected={false}
                onClick={() => onSubCategoryChange(subCat.nameInEnglish)}
                isSubCategory
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


const CategoryButton: React.FC<CategoryButtonProps> = ({
  category,
  isSelected,
  onClick,
  isSubCategory = false
}) => (
  <button
    onClick={onClick}
    type="button"
    className={`
      text-sm border-2 w-fit p-2 rounded-lg transition-colors
      ${isSelected
        ? 'bg-primary text-white border-primary'
        : `border-primary text-primary hover:bg-slate-100
          ${isSubCategory ? 'hover:underline border-none text-md' : ''}`
      }
    `}
  >
    {category}
  </button>
);

export default FilterCategories;