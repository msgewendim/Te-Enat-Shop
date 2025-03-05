import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"

import { HeroCardProps } from "../../providers/interface/general.props";
import { awaze, beyaynetu, cookies, rollInjera, shiro, tavlinim } from "../../utils/imageFiles"

const homePageImages = [beyaynetu, shiro, awaze, cookies];

const Hero = () => {
  const [currentImage, setCurrentImage] = useState<string>('');
  const [imageId, setImageId] = useState(() => {
    const randomIndex = Math.floor(Math.random() * homePageImages.length);
    return homePageImages[randomIndex] as () => Promise<typeof import("*.jpg")>;
  });

  const changeImage = useCallback(() => {
    setImageId((prevImage) => {
      const currentIndex = homePageImages.indexOf(prevImage);
      const nextIndex = (currentIndex + 1) % homePageImages.length;
      return homePageImages[nextIndex] as () => Promise<typeof import("*.jpg")>;
    });
  }, []);

  useEffect(() => {
    imageId().then(img => setCurrentImage(img.default));
  }, [imageId]);

  useEffect(() => {
    const intervalId = setInterval(changeImage, 5000);
    return () => clearInterval(intervalId);
  }, [changeImage]);

  return (
    <section className="bg-gray-100 dark:bg-gray-900 min-h-[80vh] sm:min-h-[60vh] transition-colors duration-200" lang="he">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <img loading="eager" src={currentImage} alt="" className="w-full max-w-[600px] mx-auto object-contain transition-opacity duration-150" />
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2 flex flex-col gap-8">
            <HeroText />
            <HeroCards />
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroCards = () => {
  const { t } = useTranslation();

  return (
    <div className="border-2 p-4 rounded-lg border-gray-200 w-full max-w-md mx-auto dark:border-gray-800">
      <p className="text-center pb-4">{t('homePage.hero.cards.heading')}</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <HeroCard image={rollInjera} title={t('homePage.hero.cards.recipes.title')} link="/recipes" />
        <HeroCard image={tavlinim} title={t('homePage.hero.cards.store.title')} link="/products" />
      </div>
      <p className="text-center pt-4">{t('homePage.hero.cards.scrollBelow')}</p>
    </div>
  );
};

const HeroCard: FC<HeroCardProps> = ({ image, title, link }) => {
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    image().then(img => setImageSrc(img.default));
  }, [image]);

  return (
    <Link to={link} className="block w-full sm:w-[160px] rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
      <img className="w-full h-32 object-cover" src={imageSrc} alt={title} />
      <p className="bg-emerald-700 text-white text-xl font-semibold text-center py-2 hover:bg-emerald-800 transition-colors dark:bg-emerald-900 dark:hover:bg-emerald-800">
        {title}
      </p>
    </Link>
  );
};

const HeroText = () => {
  const { t } = useTranslation();

  return (
    <div className="text-right">
      <h1 className="text-3xl lg:text-5xl font-bold text-primary mb-4 dark:text-gray-100">
        {t('homePage.hero.mainHeading')}
        <br />
        <span className="block mt-2">{t('homePage.hero.subHeading')}</span>
      </h1>
      <p className="text-xl text-emerald-900 dark:text-gray-100">
        {t('homePage.hero.description')}
      </p>
    </div>
  );
};

export default Hero;
