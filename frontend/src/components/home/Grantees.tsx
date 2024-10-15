import GranteesCard from "./GranteesCard"
import Cart from "/cart.svg"
import Credit from "/credit-card.svg"
import Globe from "/globe.svg"
import Support from "/support.svg"

// Grantees Cards
const Grantees = () => {
  return (
    <div className="bg-[#D2FCFF] flex flex-col order-2 sm:order-1 py-3 sm:text-right relative w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 justify-center items-center lg:mx-32 mx-20 my-8 -mt-4">
        {/* Cards */}
        <GranteesCard title="טריות 100%" text="אנו מתחייבים לספק את המוצרים הטריים והאיכותיים" icon={Globe} />
        <GranteesCard title="תמיכה" text="זמינים במגוון דרכי התקששרות לכל שאלה" icon={Support} />
        <GranteesCard title="מדיניות החזרה" text="ביטול רכישה בכל עת טרם יציאת המשלוח זמין מיידית" icon={Cart} />
        <GranteesCard title="תשלום מאובטח" text="תשלום על ידי חברת 'חשבונית ירוקה' " icon={Credit} />
      </div>
    </div>
  )
}

export default Grantees