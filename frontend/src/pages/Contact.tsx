import { BsTelephone } from "react-icons/bs"
import ContactForm from "../components/ContactForm"

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
            {/* <!-- Item --> */}
            <div className="flex gap-x-5">
              <BsTelephone />
              <div className="grow">
                <h4 className="font-semibold text-primary">פלאפון</h4>
                <a className="mt-1 text-neutral-400 text-sm hover:text-neutral-900 focus:outline-none focus:text-neutral-200" href="#mailto:example@site.co" target="_blank">
                  054-3287837
                </a>
              </div>
            </div>

            <div className="flex gap-x-5">
              <svg className="shrink-0 size-6 text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" /><path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" /></svg>
              <div className="grow">
                <h4 className="font-semibold text-primary">מייל</h4>
                <a className="mt-1 text-neutral-400 text-sm hover:text-neutral-900 focus:outline-none focus:text-neutral-200" href="#mailto:example@site.co" target="_blank">
                  hello@example.so
                </a>
              </div>
            </div>

            <div className="flex gap-x-5">
              <svg className="shrink-0 size-6 text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
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
    </div>
  )
}

export default Contact


{/* <div className="flex gap-x-5">
<svg className="shrink-0 size-6 text-neutral-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></svg>
<div className="grow">
  <h4 className="text-white font-semibold">We're hiring</h4>
  <p className="mt-1 text-neutral-400">We're thrilled to announce that we're expanding our team and looking for talented individuals like you to join us.</p>
  <p className="mt-2">
    <a className="group inline-flex items-center gap-x-2 font-medium text-sm text-[#ff0] decoration-2 hover:underline focus:outline-none focus:underline" href="#">
      Job openings
      <svg className="shrink-0 size-4 transition group-hover:translate-x-0.5 group-focus:translate-x-0.5 " xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
    </a>
  </p>
</div>
</div> */}