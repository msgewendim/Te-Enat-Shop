import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import { useGetProducts } from "../../hooks/useProductsData";
import Loader from "../ui/Loader";

const RelatedProducts = ({ productCategory }: { productCategory: string }) => {
  const { t } = useTranslation();
  const { data, isError, isLoading, error } = useGetProducts({
    category: productCategory
  });

  if (isLoading) return <Loader />;
  if (isError) {
    toast.error(error.message);
    return null;
  }
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-primary text-center mb-6">
          {t('relatedProducts.title')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {data.map(({ _id, name, image }) => (
            <RelatedProductCard key={_id} id={_id} name={name} image={image} />
          ))}
        </div>
      </div>
    </section>
  );
};

const RelatedProductCard = ({ id, name, image }: RelatedProductCardProps) => (
  <Link to={`/products/${id}/info`} className="flex flex-col items-center group">
    <div className="w-full aspect-square mb-2 overflow-hidden rounded-lg">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    <h3 className="text-sm md:text-base text-primary text-center font-semibold group-hover:underline">
      {name}
    </h3>
  </Link>
);
interface RelatedProductCardProps {
  id: string;
  name: string;
  image: string;
}
export default RelatedProducts;