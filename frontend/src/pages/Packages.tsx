import { useTranslation } from 'react-i18next';
import Banner from "../components/ui/Banner";
import ShopBanner from "/ShopBanner.svg";
import Pagination from '../components/ui/Pagination';
import usePackages from '../hooks/package/usePackages';
import PackageCard from '../components/packages/PackageCard';

const Packages = () => {
  const { t } = useTranslation();
  const { packages, handlePrevious, handleNext, page } = usePackages({ limit: 9 });

  return (
    <main className="packages-page">
      <Banner image={ShopBanner} text={t('packages.title')} />
      <div className="container mx-auto px-4 py-8">
        <section
          className="my-8"
          aria-label={t('packages.packagesList')}
        >
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
              {packages?.map(pkg => (
                <PackageCard key={pkg._id} data={pkg} />
              ))}
            </div>
          </div>
        </section>

        <Pagination
          page={page}
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          path="packages"
        />
      </div>
    </main>
  );
};

export default Packages;