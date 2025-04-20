"use client"
import { useTranslation } from "react-i18next";
import Link from "next/link";

const Logo = () => {
  const { t } = useTranslation();
  return (
    <Link href="/" className="text-2xl sm:text-3xl font-bold text-primary dark:text-white">
      {/* TE-ENATE */} {t('tenat')}
    </Link>
  );
};

export default Logo;