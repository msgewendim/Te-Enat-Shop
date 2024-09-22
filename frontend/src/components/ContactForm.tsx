import { IoIosArrowRoundBack } from "react-icons/io"

const ContactForm = () => {
  return (
    <form dir="rtl">
      <div className="space-y-4">
        {/* <!-- Input --> */}
        <div className="relative">
          <input type="text" id="hs-tac-input-name" className="peer p-4 block w-full bg-gray-100 border-transparent rounded-lg text-sm text-gray-800 placeholder:text-transparent focus:outline-btnColor2 focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
              focus:pt-6
              focus:pb-2
              [&:not(:placeholder-shown)]:pt-6
              [&:not(:placeholder-shown)]:pb-2
              autofill:pt-6
              autofill:pb-2" placeholder="שם" />
          <label htmlFor="hs-tac-input-name" className="absolute top-0 start-0 p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                peer-focus:text-xs
                peer-focus:-translate-y-1.5
                peer-focus:text-neutral-400
                peer-[:not(:placeholder-shown)]:text-xs
                peer-[:not(:placeholder-shown)]:-translate-y-1.5
                peer-[:not(:placeholder-shown)]:text-neutral-400">שם מלא</label>
        </div>

        <div className="relative">
          <input type="email" id="hs-tac-input-email" className="peer p-4 block w-full bg-gray-100 border-transparent rounded-lg text-sm text-gray-800 placeholder:text-transparent focus:outline-btnColor2 focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
              focus:pt-6
              focus:pb-2
              [&:not(:placeholder-shown)]:pt-6
              [&:not(:placeholder-shown)]:pb-2
              autofill:pt-6
              autofill:pb-2" placeholder="מייל" />
          <label htmlFor="hs-tac-input-email" className="absolute top-0 start-0 p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                peer-focus:text-xs
                peer-focus:-translate-y-1.5
                peer-focus:text-neutral-400
                peer-[:not(:placeholder-shown)]:text-xs
                peer-[:not(:placeholder-shown)]:-translate-y-1.5
                peer-[:not(:placeholder-shown)]:text-neutral-400">מייל</label>
        </div>

        <div className="relative">
          <input type="text" id="hs-tac-input-phone"
            className="peer p-4 block w-full bg-gray-100 border-transparent rounded-lg text-sm text-gray-800 placeholder:text-transparent focus:outline-btnColor2  focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
              focus:pt-6
              focus:pb-2
              [&:not(:placeholder-shown)]:pt-6
              [&:not(:placeholder-shown)]:pb-2
              autofill:pt-6
              autofill:pb-2"
            placeholder="פלאפון" />
          <label htmlFor="hs-tac-input-phone" className="absolute top-0 start-0 p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                peer-focus:text-xs
                peer-focus:-translate-y-1.5
                peer-focus:text-neutral-400
                peer-[:not(:placeholder-shown)]:text-xs
                peer-[:not(:placeholder-shown)]:-translate-y-1.5
                peer-[:not(:placeholder-shown)]:text-neutral-400">פלאפון</label>
        </div>

        {/* <!-- Textarea --> */}
        <div className="relative">
          <textarea id="hs-tac-message" className="peer p-4 block w-full bg-gray-100 border-transparent rounded-lg text-sm text-gray-800 placeholder:text-transparent focus:outline-btnColor2 focus:ring-0 focus:border-transparent disabled:opacity-50 disabled:pointer-events-none
              focus:pt-6
              focus:pb-2
              [&:not(:placeholder-shown)]:pt-6
              [&:not(:placeholder-shown)]:pb-2
              autofill:pt-6
              autofill:pb-2" placeholder="This is a textarea placeholder"></textarea>
          <label htmlFor="hs-tac-message" className="absolute top-0 start-0 p-4 h-full text-neutral-400 text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none
                peer-focus:text-xs
                peer-focus:-translate-y-1.5
                peer-focus:text-neutral-400
                peer-[:not(:placeholder-shown)]:text-xs
                peer-[:not(:placeholder-shown)]:-translate-y-1.5
                peer-[:not(:placeholder-shown)]:text-neutral-400">איך נוכל לעזור</label>
        </div>
      </div>

      <div className="mt-2">
        <p className="text-xs text-neutral-500">
          כל השדות הן חובה
        </p>

        <p className="mt-5">
          <button className="group inline-flex items-center gap-x-2 py-2 px-3 bg-secondary font-medium text-sm text-neutral-800 rounded-full focus:outline-btnColor2">
            שלח
            <IoIosArrowRoundBack />
          </button>
        </p>
      </div>
    </form>
  )
}

export default ContactForm