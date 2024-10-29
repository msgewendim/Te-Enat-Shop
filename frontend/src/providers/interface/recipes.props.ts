type IngredientItemProps = {
  quantity: string;
  name: string;
};

type InstructionItemProps = {
  instruction: string;
  step: number;
};

type RecipeInfoProps = {
  icon: React.ElementType;
  label: string;
  value: string;
};

export { IngredientItemProps, InstructionItemProps, RecipeInfoProps };
