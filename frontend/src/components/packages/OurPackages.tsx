import { useTranslation } from "react-i18next";
import PackageCard from "./PackageCard";
import { Package } from "../../client";
import useRandomCards from "../../hooks/app/useRandomCards";
import { makeBreakLine } from "../../utils/helperFunctions";
import { Link } from "react-router-dom";

const OurPackages = () => {
  const { t } = useTranslation();
  const { data: packages } = useRandomCards<Package>({
    endpoint: '/packages/random',
  });

  return (
    <section className="bg-[#D2FCFF] dark:bg-gray-900 py-16" lang="he">
      <div className="container mx-auto px-4">
      <header className="text-center mb-8">
          <h2 className="text-4xl font-bold text-primary mb-4 dark:text-gray-100">
            <Link to="/packages" className="cursor-pointer">
              {t('homePage.productPackages.title')}
            </Link>
          </h2>
          <p className="text-primary max-w-3xl mx-auto dark:text-gray-100">
            {makeBreakLine(t('homePage.productPackages.description')).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </p>
        </header>
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