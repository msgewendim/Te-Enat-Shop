import { menu } from "../../utils/data";

const WhoAreWe = () => {
  return (
    <div dir="rtl" className="bg-[#D2FCFF] min-h-[550px]">
      <div className="text-xl font-normal text-start font-['Yellowtail'] italic text-emerald-900 p-1">
        מי אנחנו?
      </div>
      {/* text & image section */}
      <div className="sm:flex">
        {/* Text section */}
        <TextSection />
        {/* Image section */}
        <div className="order-1 pb-12 sm:pb-0 sm:w-[800px] w-fit sm:mt-4 sm:mr-10">
          <img src={menu} alt="about us" className="w-full" />
        </div>
      </div>
    </div>
  );
};

const TextSection = () => {
  return (
    <div className="flex flex-col sm:mt-2 mx-2 sm:text-right max-w-[700px] mb-12">
      <h1 className="font-bold text-3xl sm:text-4xl text-primary mb-6">
        אנו ספקים של סחורה איכותית<br />
        ומוצרי בישול מובילים
      </h1>
      <p className="font-normal mb-4 max-w-[600px]">
        מביאים לכם מוצרים טבעיים ואותנטיים ממטבחים מגוונים ברחבי העולם. השילוב בין מסורת לחדשנות מאפשר לכם לגלות טעמים חדשים וליהנות ממוצרים איכותיים למטבח שלכם. כל מוצר נבחר בקפידה כדי להעשיר את חוויית הבישול והאכילה שלכם.
      </p>
      <span className="p-3 px-6 bg-gray-200 w-fit rounded-full text-primary mb-3">
        100% מוצרים טבעיים
      </span>
      <p className="font-normal mb-4 max-w-[600px]">המוצרים שלנו עשויים מרכיבים טבעיים בלבד, ללא תוספים מלאכותיים. אנחנו מתחייבים לאיכות טהורה שמביאה את הטבע היישר למטבח שלכם.
      </p>
      <span className="p-3 px-6 bg-gray-200 w-fit rounded-full text-primary mb-3">
        מוצרים המסייעים בבריאות
      </span>
      <p className="font-normal max-w-[600px]">
        המוצרים שלנו תורמים לבריאות בעזרת רכיבים טבעיים ועשירים בוויטמינים ומינרלים. כל מוצר נועד לתמוך באורח חיים בריא ומאוזן.
      </p>
    </div>
  )
}
export default WhoAreWe;
