"use client"
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from "next/navigation";
import Link from 'next/link';
import { toast } from "react-toastify";

import { Product } from '../../../../client/types.gen';
import RelatedItems from '../../../../components/layout/RelatedItems';
import FeatureList from '../../../../components/products/FeatureElement';
import PopupProduct from "../../../../components/products/PopupProduct";
import Banner from "../../../../components/ui/Banner";
import Loader from "../../../../components/ui/Loader";

import videoProduct from "../../../../assets/videoProduct.png";
import ProductPageBanner from "../../../../assets/ProductPageBanner.svg";

import useGenericData from '../../../../hooks/app/useGenericData';
import { ProductActionsProps } from '../../../../providers/interface/products.props';
import { divideFeatures } from "../../../../utils/helperFunctions";
import Image from 'next/image';

const SingleProduct = () => {
  const { t } = useTranslation();
  const { productID } = useParams();
  const { useGetItemById } = useGenericData<Product>("/products");
  const { data, isError, isLoading, error } = useGetItemById(productID as string);
  const [openProductId, setOpenProductId] = useState("");

  if (isLoading) return <Loader />;
  if (isError) {
    toast.error(error?.message || t('errors.genericError'));
    return null;
  }
  if (!data) {
    toast.error(t('errors.productNotAvailable'));
    return null;
  }

  const { name, image, categories, features, _id } = data;
  const { leftFeatures, rightFeatures } = divideFeatures(features.value);

  const handleClosePopup = () => setOpenProductId("");
  const handleOpenPopup = () => setOpenProductId(productID as string);

  return (
    <main className="flex flex-col">
      <Banner text={name} image={ProductPageBanner} />
      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <FeatureList features={rightFeatures} className="order-1 md:order-1" />
          <ProductImage name={name} image={image} />
          <FeatureList features={leftFeatures} className="order-3 md:order-3" />
        </div>
        <ProductActions
          openProductId={openProductId}
          productID={productID as string}
          product={data}
          handleClosePopup={handleClosePopup}
          handleOpenPopup={handleOpenPopup}
        />
        <ProductVideo />
        <RelatedItems
          endpoint='/products'
          itemCategory={categories[0]?.nameInEnglish || ''}
          titleKey='relatedProducts.title'
          exclude={_id}
        />
      </div>
    </main>
  );
};



const ProductImage = ({ name, image }: { name: string, image: string }) => (
  <div className="order-2 w-full md:w-[680px]">
    <Image src={image} alt={name} width={680} height={680} className="w-full h-auto" />
  </div>
);

const ProductActions: FC<ProductActionsProps> = ({ openProductId, productID, product, handleClosePopup, handleOpenPopup }) => {
  const { t } = useTranslation();
  return (
    <div className="flex justify-center items-center gap-4 my-8">
      <Link href={`/recipes?category=${product.categories[0]}`} className="bg-white p-2 text-primary rounded-lg border-2 border-gray-700" aria-label={t('buttons.recipes')}>
        {t('buttons.recipes')}
      </Link>
      {openProductId === productID && product && (
        <PopupProduct
          product={product}
          open={openProductId === productID}
          setOpen={handleClosePopup}
        />
      )}
      <button
        onClick={handleOpenPopup}
        className="bg-primary_btn p-2 px-3 text-white rounded-lg hover:bg-hoverBtnColor2"
        aria-label={t('buttons.buy')}
      >
        {t('buttons.buy')}
      </button>
    </div>
  );
};

const ProductVideo = () => (
  <div className="flex justify-center my-14">
    <Image src={videoProduct} alt="" width={700} height={700} className="w-full max-w-[700px]" />
  </div>
);


export default SingleProduct;