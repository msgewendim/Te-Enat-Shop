import { useTranslation } from "react-i18next";

const Tobia = () => {
  const { t } = useTranslation();
  return <div>{t('TOBIA.title')}</div>;
};

export default Tobia;
