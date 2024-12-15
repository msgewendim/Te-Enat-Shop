import { useTranslation } from "react-i18next";
// import useShop from "../hooks/product/useShop";
// import { useAppContext } from "../hooks/app/useAppContext";
// import { useEffect } from "react";
import Banner from "../components/ui/Banner";
import { FormInput } from "../components/ui/FormInput";
import { useForm } from "react-hook-form";
import { addTobiaWaitingList, WaitingListData } from "../providers/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";

const Tobia = () => {
  // const {setCategory, category} = useAppContext();
  
  // const { products } = useShop({ limit: 10 });
  // useEffect(() => {
  //   setCategory('tobia');
  // }, [setCategory, category]);

  // if (products?.length === 0) return (
  //   <TobiaComingSoon />
  // )
//   return (
//     <section className="text-center container mx-auto px-4 py-8 sm:max-w-[78svw] min-h-[80vh] flex justify-center items-center">
// {/*       
//       <h1>{t('TOBIA.title')}</h1>
//       <p>{t('TOBIA.description')}</p> */}
      
//       {products?.map((item) => (
//         <ProductCard key={item._id} product={item} />
//       ))}
//     </section>
  // )
  return <TobiaComingSoon />
};

const WaitingListFormSchema = z.object({
  email: z.string().email(),
});
const TobiaComingSoon: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<WaitingListData>({
    defaultValues: { email: '' },
    resolver: zodResolver(WaitingListFormSchema)
  });

  const onSubmit = async (data: WaitingListData) => {
    try {
      await addTobiaWaitingList(data);
      reset();
      toast.success(t('TOBIA.subscribeSuccess'));
    } catch (error) {
      toast.error(t('TOBIA.subscribeError'));
    }
  };

  return (
    <main className="bg-white">
      <Banner 
        className="text-gray-200 dark:text-gray" 
        image="https://res.cloudinary.com/dmlhf9fee/image/upload/c_fill,w_1400,h_200,e_improve,e_sharpen/v1734271986/snackbarsimage_udmsv2.jpg" 
        text="Tobia"
      />
      <section className="p-6 dark:bg-gray-100 dark:text-gray-800 max-w-7xl mx-auto min-h-screen">
        <div className="grid gap-6 text-center lg:grid-cols-2 xl:grid-cols-5 w-full">
          <div className="w-full rounded-md xl:col-span-2 dark:bg-gray-50 p-6">
            <span className="block mb-2 dark:text-violet-600">Tobia Coming Soon</span>
            <h1 className="text-3xl md:text-5xl font-extrabold dark:text-gray-900">{t('TOBIA.comingSoon')}</h1>
            <p className="my-4 md:my-8">{t('TOBIA.comingSoonDescription')}</p>
            <p className="my-4 md:my-8">{t('TOBIA.comingSoonDescription2')}</p>
            <form className="bg-gray-200 p-4 md:p-6 rounded-lg shadow-md" onSubmit={handleSubmit(onSubmit)}>
              <FormInput 
                name="email" 
                type="email" 
                placeholder={t('TOBIA.emailPlaceholder')}
                register={register} 
                required 
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              <button 
                type="submit" 
                className="w-full md:w-fit mt-4 px-4 py-2 rounded-md bg-violet-600 text-white hover:bg-violet-700 transition-colors"
              >
                {t('TOBIA.subscribe') || 'Subscribe'}
              </button>
            </form>
          </div>
          <div className="xl:col-span-3 h-64 md:h-auto">
            <img 
              src="https://res.cloudinary.com/dmlhf9fee/image/upload/v1734271986/snackbarsimage_udmsv2.jpg" 
              alt="Tobia Product" 
              className="object-cover w-full h-full rounded-md dark:bg-gray-500"
              loading="lazy"
            />
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <TobiaProductCard image="https://res.cloudinary.com/dmlhf9fee/image/upload/v1734271986/teff-tobia_co0izp.jpg" name="Teff-Tobia" />
          <TobiaProductCard image="https://res.cloudinary.com/dmlhf9fee/image/upload/v1734271986/creal-tobia_ghx4gh.jpg" name="Creal-Tobia" />
          <TobiaProductCard image="https://res.cloudinary.com/dmlhf9fee/image/upload/v1734271987/brownteffTobia_cwrbie.jpg" name="BrownTeff-Tobia" />
          <TobiaProductCard image="https://res.cloudinary.com/dmlhf9fee/image/upload/v1734271987/snackbar_jrvirw.jpg" name="SnackBars-Tobia" />
        </div>
      </section>
    </main>
  );
};

const TobiaProductCard = ({image, name} : {image: string, name: string}) => {
  return (
    <div className="w-full rounded-md dark:bg-gray-50">
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-md dark:bg-gray-500" />
      <h3 className="text-xl font-semibold mt-4 dark:text-gray-900">{name}</h3>
    </div>
  )
}
export default Tobia;
