import { useTranslation } from "react-i18next";
import PackageCard from "./PackageCard";
import { Package } from "../../client";
import useRandomCards from "../../hooks/app/useRandomCards";

const OurPackages = () => {
  const { t } = useTranslation();
  const { data: packages } = useRandomCards<Package>({
    endpoint: '/packages/random',
  });

  return (
    <section className="bg-[#D2FCFF] dark:bg-gray-900 py-16" lang="he">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-primary text-center mb-12 dark:text-gray-50">
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