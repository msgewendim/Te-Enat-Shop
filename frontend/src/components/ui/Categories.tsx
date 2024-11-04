import React from 'react';
import Select from "./Select";
import { CategoryButtonProps } from '../../providers/interface/general.props';
import { CategoryMapping } from '../../utils/constants';


const FilterCategories = ({ categoryMapping,
  onCategoryChange,
}: {
  categoryMapping: CategoryMapping,
  onCategoryChange: (category: string) => void,
}) => {
  const categories = Object.values(categoryMapping);

  const handleCategoryChange = (selectedCategory: string) => {
    const englishCategory = Object.keys(categoryMapping).find(key => categoryMapping[key] === selectedCategory) || '';
    onCategoryChange(englishCategory);
  };

  return (
    <div className="rounded-lg items-center">
      <Select
        selectItems={categories}
        initialItem={categories[0]}
        type="category"
        classes="md:hidden"
        categoryMapping={categoryMapping}
        onChange={handleCategoryChange}
      />
      <div className="md:flex gap-2 hidden">
        {categories.map((hebrewCategory, idx) => (
          <CategoryButton
            key={idx}
            category={hebrewCategory}
            onClick={() => handleCategoryChange(hebrewCategory)}
          />
        ))}
      </div>
    </div>
  );
};



const CategoryButton: React.FC<CategoryButtonProps> = ({ category, onClick }) => (
  <button
    onClick={onClick}
    type="button"
    className="text-sm border-primary border-2 text-primary w-fit p-2 rounded-lg hover:bg-slate-100"
  >
    {category}
  </button>
);

export default FilterCategories;