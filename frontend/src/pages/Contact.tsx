import { BsTelephone } from "react-icons/bs"
import { IoLocationOutline, IoMailOpenOutline } from "react-icons/io5";
import ContactForm from "../components/layout/ContactForm"

const Contact = () => {
  return (
    <div className="bg-white">
      <div dir="rtl" className="max-w-5xl px-4 xl:px-0 py-10 lg:py-20 mx-auto">
        <div className="flex flex-col items-center justify-center mb-10 lg:mb-14">
          <h2 className="font-semibold text-primary text-2xl md:text-4xl md:leading-tight">צור קשר</h2>
          <p className="mt-1 text-neutral-400">נשמח לשמוע את דעתך</p>
        </div>
        {/* <!-- Grid --> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16">
          <div className="space-y-14">
            {/* Phone */}
            <div className="flex gap-x-5">
              <BsTelephone />
              <div className="grow">
                <h4 className="font-semibold text-primary">פלאפון</h4>
                <a className="mt-1 text-neutral-400 text-sm hover:text-neutral-900 focus:outline-none focus:text-neutral-200" href="#mailto:example@site.co" target="_blank">
                  054-3287837
                </a>
              </div>
            </div>
            {/* Mail */}
            <div className="flex gap-x-5">
              <IoMailOpenOutline size={24} />
              <div className="grow">
                <h4 className="font-semibold text-primary">מייל</h4>
                <a className="mt-1 text-neutral-400 text-sm hover:text-neutral-900 focus:outline-none focus:text-neutral-200" href="#mailto:example@site.co" target="_blank">
                  hello@example.so
                </a>
              </div>
            </div>
            {/* Address */}
            <div className="flex gap-x-5">
              <IoLocationOutline size={24} />
              <div className="grow">
                <h4 className="font-semibold text-primary">הכתובת שלנו</h4>
                <address className="mt-1 text-neutral-400 text-sm not-italic">
                  ארלוזורוב 123<br />
                  תל-אביב-יפו <br />
                  ת.פ. 00000000
                </address>
              </div>
            </div>
          </div>
          {/* <!--  End Col --> */}
          <div className="md:order-2 border-b border-neutral-800 pb-10 mb-10 md:border-b-0 md:pb-0 md:mb-0">
            <ContactForm />
          </div>
        </div>
      </div>
    </div >
  )
}

export default Contact