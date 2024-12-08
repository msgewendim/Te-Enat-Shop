import { useTranslation } from "react-i18next";
import ProductCard from "../components/products/ProductCard";
import useShop from "../hooks/product/useShop";
import { useAppContext } from "../hooks/app/useAppContext";
import { useEffect } from "react";

const Tobia = () => {
  const { t } = useTranslation();
  const {setCategory, category} = useAppContext();
  
  const { products } = useShop({ limit: 10 });
  useEffect(() => {
    setCategory('tobia');
  }, [setCategory, category]);

  if (products?.length === 0) return (
    <section className="text-center container mx-auto px-4 py-8 sm:max-w-[78svw] min-h-[80vh] flex justify-center items-center">

      <h1>no products found</h1>
    </section>
  )
  return (
    <section className="text-center container mx-auto px-4 py-8 sm:max-w-[78svw] min-h-[80vh] flex justify-center items-center">
      
      <h1>{t('TOBIA.title')}</h1>
      <p>{t('TOBIA.description')}</p>
      
      {products?.map((item) => (
        <ProductCard key={item._id} product={item} />
      ))}
    </section>
  )
};

export default Tobia;
