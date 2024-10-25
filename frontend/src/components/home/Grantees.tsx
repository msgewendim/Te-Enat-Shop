import GranteesCard from "./GranteesCard"
import Cart from "/cart.svg"
import Credit from "/credit-card.svg"
import Globe from "/globe.svg"
import Support from "/support.svg"

// Grantees Cards
const Grantees = () => {
  return (
    <div className="bg-[#D2FCFF] pb-12 sm:text-right w-full">
      {/* Cards */}
      <div className="sm:flex sm:justify-center sm:items-center sm:gap-24 grid grid-cols-2 gap-12 mr-3 ml-3">
        <GranteesCard title="טריות 100%" text="אנו מתחייבים לספק את המוצרים הטריים והאיכותיים" icon={Globe} />
        <GranteesCard title="תמיכה" text="זמינים במגוון דרכי התקששרות לכל שאלה" icon={Support} />
        <GranteesCard title="מדיניות החזרה" text="ביטול רכישה בכל עת טרם יציאת המשלוח זמין מיידית" icon={Cart} />
        <GranteesCard title="תשלום מאובטח" text="תשלום על ידי חברת 'חשבונית ירוקה' " icon={Credit} />
      </div>
    </div>
  )
}

export default Grantees