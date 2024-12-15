import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Logo = () => {
  const { t } = useTranslation();
  return (
    <Link to="/" className="text-2xl sm:text-3xl font-bold text-primary dark:text-white">
      {/* TE-ENATE */} {t('tenat')}
    </Link>
  );
};

export default Logo;