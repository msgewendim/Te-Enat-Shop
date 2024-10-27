import { awaze, beyaynetu, cookies, rollInjera, shiro, tavlinim } from "../../utils/data"
import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"
const homePageImages = [
  beyaynetu, shiro, awaze, cookies
]
const Hero = () => {
  const { t } = useTranslation();

  const [imageId, setImageId] = useState(() => {
    const randomIndex = Math.floor(Math.random() * homePageImages.length);
    return homePageImages[randomIndex];
  });

  const changeImage = useCallback(() => {
    setImageId((prevImage) => {
      const currentIndex = homePageImages.indexOf(prevImage);
      const nextIndex = (currentIndex + 1) % homePageImages.length;
      return homePageImages[nextIndex];
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(changeImage, 5000);
    return () => clearInterval(intervalId);
  }, [changeImage]);

  return (
    <section className="bg-gray-100 dark:bg-gray-950 min-h-[80vh] sm:min-h-[60vh] transition-colors duration-200" lang="he">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          <div className="order-2 sm:order-1">
            <img src={imageId} alt="" className="w-full max-w-[600px] mx-auto object-contain transition-opacity duration-150" />
          </div>
          <div className="order-1 sm:order-2 flex flex-col gap-8">
            <HeroText />
            <div className="flex gap-4 justify-center sm:justify-end">
              <HeroCard image={rollInjera} title={t('homePage.hero.cards.recipes.title')} link="/recipes" />
              <HeroCard image={tavlinim} title={t('homePage.hero.cards.store.title')} link="/products" />
            </div>
          </div>
        </div>
      </div>
    </section>

  );
};
interface HeroCardProps {
  image: string;
  title: string;
  link: string;
}
const HeroCard: FC<HeroCardProps> = ({ image, title, link }) => {
  return (
    <Link to={link} className="block w-[140px] sm:w-[160px] rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
      <img className="w-full h-32 object-cover" src={image} alt={title} />
      <p className="bg-emerald-700 text-white text-xl font-semibold text-center py-2 hover:bg-emerald-800 transition-colors">
        {title}
      </p>
    </Link>
  );
};

const HeroText = () => {
  const { t } = useTranslation();

  return (
    <div className="text-right">
      <h1 className="text-3xl lg:text-5xl font-bold text-primary mb-4">
        {t('homePage.hero.mainHeading')}
        <br />
        <span className="block mt-2">{t('homePage.hero.subHeading')}</span>
      </h1>
      <p className="text-xl text-emerald-950">
        {t('homePage.hero.description')}
      </p>
    </div>
  );
};

export default Hero;