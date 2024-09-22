import { menu } from "../utils/data";
import TestimonialCard from "./TestimonialCard";
import Cart from "/cart.svg"
import Credit from "/credit-card.svg"
import Globe from "/globe.svg"
import Support from "/support.svg"
const Testimonials = () => {
  return (
    <>
      <div dir="rtl" className=" bg-#F9F8F8">
        <div className="text-xl font-normal text-start font-['Yellowtail'] italic text-secondary p-1">
          מי אנחנו?
        </div>
        <div className="flex flex-col justify-start items-center">
          {/* text & image section */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Text section */}
            <div className="flex flex-col order-2 sm:order-1 sm:mt-2 mx-2 sm:text-right relative">
              <h1 className="font-bold text-3xl sm:text-4xl text-primary mb-6">
                אנחנו ספקים של סחורה איכותית<br />
                ומוצרי בישול מובילים
              </h1>
              <p className="text-sm mb-6 pr-6 px-5">
                מביאים לכם מוצרים טבעיים ואותנטיים ממטבחים מגוונים ברחבי העולם. השילוב בין מסורת לחדשנות מאפשר לכם לגלות טעמים חדשים וליהנות ממוצרים איכותיים למטבח שלכם. כל מוצר נבחר בקפידה כדי להעשיר את חוויית הבישול והאכילה שלכם.
              </p>
              <span className="p-3 px-6 bg-gray-200 w-fit rounded-full text-primary mb-2">
                100% מוצרים טבעיים
              </span>
              <p className="px-5 text-sm mb-4">המוצרים שלנו עשויים מרכיבים טבעיים בלבד, ללא תוספים מלאכותיים. אנחנו מתחייבים לאיכות טהורה שמביאה את הטבע היישר למטבח שלכם.
              </p>
              <span className="p-3 px-8 bg-gray-200 w-fit rounded-full text-primary mb-2">
                מוצרים המסייעים בבריאות
              </span>
              <p className="px-5 text-sm">
                המוצרים שלנו תורמים לבריאות בעזרת רכיבים טבעיים ועשירים בוויטמינים ומינרלים. כל מוצר נועד לתמוך באורח חיים בריא ומאוזן.
              </p>
            </div>
            {/* Image section */}
            <div className="order-1 sm:order-2 min-h-[400px] sm:min-h-[450px] relative items-center mt-14">
              <img src={menu} alt="Testimonials" width={600} />
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 justify-center items-center lg:mx-28 mx-auto my-8 -mt-4">
            {/* Cards */}
            <TestimonialCard title="טריות 100%" text="אנו מתחייבים לספק את המוצרים הטריים והאיכותיים" icon={Globe} />
            <TestimonialCard title="תמיכה" text="זמינים במגוון דרכי התקששרות לכל שאלה" icon={Support} />
            <TestimonialCard title="מדיניות החזרה" text="ביטול רכישה בכל עת טרם יציאת המשלוח זמין מיידית" icon={Cart} />
            <TestimonialCard title="תשלום מאובטח" text="תשלום על ידי חברת 'חשבונית ירוקה' " icon={Credit} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
