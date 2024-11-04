import { useTranslation } from "react-i18next";
import PackageCard from "./PackageCard";
import useRandomCards from "../../hooks/useRandomCards";
import { Package } from "../../client/types.gen";
import { useGetRandomPackages } from "../../hooks/usePackagesData";


const OurPackages = () => {
  const { t } = useTranslation();
  const { data: packages } = useRandomCards<Package>({
    fetchHook: useGetRandomPackages,
    dataKey: 'packages'
  })
  return (
    <section className="bg-[#D2FCFF] py-16" lang="he">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-primary text-center mb-12">
          {t('homePage.productPackages.title')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages?.map(pac => (
            <PackageCard key={pac._id} data={pac} />
          ))}
        </div>
      </div>
    </section>
  );
};




export default OurPackages;