import { useTranslation } from 'react-i18next';
import { createBanner } from "../../utils/helperFunctions";

const Banner = ({ image, text }: BannerProps) => {
  const { t } = useTranslation();

  const bgStyle = createBanner(image);

  return (
    <section
      className="w-full mt-[50px]"
      style={bgStyle}
      role="banner"
      aria-label={t('banner.ariaLabel', { text })}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-primary capitalize">
          {text}
        </h1>
      </div>
    </section>
  );

};

type BannerProps = {
  image: string;
  text: string;
}
export default Banner;