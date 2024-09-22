import { FaFacebook } from "react-icons/fa";
import { SlSocialInstagram } from "react-icons/sl";
import { Link } from "react-router-dom"

const Footer = () => {

  return (
    <footer dir="rtl" className="mt-auto bg-[#ffdf40] w-full dark:bg-neutral-950">
      <div className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto">
        {/* <!-- Grid --> */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <div className="col-span-full lg:col-span-1">
            <a className="flex-none text-xl font-semibold focus:outline-none focus:opacity-80" aria-label="Brand">טנאת</a>
          </div>
          {/* <!-- End Col --> */}

          <div className="col-span-1">
            <h4 className="font-semibold">טנאת</h4>

            <div className="mt-3 grid space-y-3">
              <p><Link to="/about" className="inline-flex gap-x-2 text-gray-900 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200">עלינו</Link></p>
              <p><Link to="/products" className="inline-flex gap-x-2 text-gray-900 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200">חנות</Link></p>
              <p><Link to="/recipes" className="inline-flex gap-x-2 text-gray-900 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200">מתכונים</Link> </p>
              <p><Link to="/contact" className="inline-flex gap-x-2 text-gray-900 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200">צור קשר</Link></p>
            </div>
          </div>
          {/* <!-- End Col --> */}

          <div className="col-span-2">
            <h4 className="font-semibold">הירשם לעדכונים</h4>

            <form>
              <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-3 bg-white rounded-lg p-2 dark:bg-neutral-900">
                <div className="w-full">
                  <label htmlFor="hero-input" className="sr-only">Subscribe</label>
                  <input type="text" id="hero-input" name="hero-input"
                    className="py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:border-btnColor focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 
                  dark:border-transparent dark:text-neutral-400 dark:placeholder-neutral-500 
                  dark:focus:ring-neutral-600" placeholder="הזן כתובת מייל" />
                </div>
                <button className="w-full sm:w-auto whitespace-nowrap p-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-secondary text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                  הרשמה
                </button>
              </div>
              <p className="mt-3 text-sm text-gray-900">
                מוצרים ומתכונים חדשים בהמשך
              </p>
            </form>
          </div>
          {/* <!-- End Col --> */}
        </div>
        {/* <!-- End Grid --> */}

        <div className="mt-5 sm:mt-12 grid gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-900 dark:text-neutral-400">כל הזכויות שמורות</p>
            <p className="text-sm text-gray-900 dark:text-neutral-400">2024 ©</p>
          </div>
          {/* <!-- End Col --> */}

          {/* <!-- Social Brands --> */}
          <div>
            {/* Facebook */}
            <Link to="#" className="size-12 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none">
              {/* <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" viewBox="0 0 16 16">
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg> */}
              <FaFacebook color="black" />
            </Link>
            {/* Instagram */}
            <Link to="#" className="size-12 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white hover:bg-white/10 focus:outline-none focus:bg-white/10 disabled:opacity-50 disabled:pointer-events-none">
              <SlSocialInstagram color="black" />
            </Link>
          </div>
          {/* <!-- End Social Brands --> */}
        </div>
      </div>
    </footer>
  )
}
export default Footer;

{/* <div className="col-span-1">
  <h4 className="font-semibold text-gray-100">Product</h4>

  <div className="mt-3 grid space-y-3">
    <p><a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200">Pricing</a></p>
    <p><a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200">Changelog</a></p>
    <p><a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200">Docs</a></p>
  </div>
</div> */}