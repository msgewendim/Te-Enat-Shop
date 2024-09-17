import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, DialogPanel } from '@headlessui/react'
import DarkMode from './DarkMode';
// import SwitchLanguage from './SwitchLang';
// import Cart from '../pages/Cart';
// import { AppContext } from '../providers/interface/context';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  // const [openCart, setOpenCart] = useState(false)
  // const { cartItems } = useContext(AppContext)
  const [isOpen, setIsOpen] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const controlNavbar = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setIsOpen(false);
      }else{
        // if scroll up show the navbar
        setIsOpen(true);
      }
      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [controlNavbar]);
  return (
    <>
      <header className={`fixed top-0 sm:w-[90vw] w-full shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <nav className="container">
          <div dir='rtl' className="flex lg:justify-between justify-between items-center p-3 ">
            {/* <div className=""> */}
            {/* Logo */}
            <Link to="/" className="flex justify-start items-center gap-2 text-2xl sm:text-3xl font-bold text-primary dark:text-white">
              {/* <img alt="" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" className="h-8 w-auto" /> */}
              {/* TE-ENATE */} טאנת
            </Link>
            {/* </div> */}
            {/* Navbar Elements */}
            <div dir='rtl' className="hidden lg:flex lg:gap-x-8">
              <Link to="/" className="inline-block text-md font-medium text-primary hover:text-secondary dark:text-white">
                עמוד הבית
              </Link>
              <Link to="/products" className="inline-block text-md font-medium text-primary hover:text-secondary dark:text-white">
                חנות
              </Link>
              <Link to="/recipes" className="inline-block text-md font-medium text-primary dark:text-white hover:text-secondary">
                מתכונים
              </Link>
              <Link to="/about" className="inline-block text-md font-medium text-primary dark:text-white hover:text-secondary">
                עלינו
              </Link>
            </div>
            {/* NAVBAR ICONS */}
            <div className="hidden lg:flex lg:gap-x-6 items-center gap-4">
              {/* SEARCH ICON */}
              {/* <div className="flex relative w-24">
                <input type="text" className='border-primary border-2 rounded-lg pl-2 w-full' />
                <img src={searchIcon} alt="search icon" width={20} className='absolute right-1 top-1' />
              </div> */}
              {/* CART ICON */}
              {/* <Cart setOpenCart={setOpenCart} openCart={openCart} />
              <button onClick={() => setOpenCart(true)} className="flex justify-center relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                <span className="absolute -top-3 left-6 text-black rounded w-3 h-5 dark:text-white">{cartItems.length}</span>
              </button> */}
              {/* LOGIN BUTTON LINK */}
              {/* <Link to="/login" className="text-md font-semibold leading-6 dark:text-white text-white border bg-secondary rounded-full p-2 text-center">
                {t('login')}
                {/* <span aria-hidden="true">&rarr;</span> */}
              {/* </Link> */}
              {/* LANGUAGE SWITCHER */}
              {/* <SwitchLanguage /> */}
              {/* DARK MODE BUTTON */}
              <div className="">
                <DarkMode />
              </div>
            </div>

            <div className="flex justify-between lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="hidden">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
          </div>
        </nav >


        {/* MOBILE MENU SECTION */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden" >
          <div className="fixed inset-0 z-10" />
          <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white hover: dark:bg-primary px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between ">
              <Link to="/" className="-m-1.5 p-1.5">
                <span className="sr-only ">TE-ENAT</span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6 dark:text-white" />
              </button>
            </div>

            <div className="mt-6 flow-root ">
              <div className="-my-6 divide-y divide-gray-500/10 bg ">
                <div dir='rtl' className="space-y-2 py-6">
                  <Link to="/" className="-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 hover:bg-secondary text-gray-900 dark:text-white" onClick={() => setMobileMenuOpen(false)}>
                    עמוד הבית
                  </Link>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/products"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-secondary"
                  >
                    חנות
                  </Link>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/recipes"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-secondary"
                  >
                    מתכונים
                  </Link>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/about"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-secondary"
                  >
                    עלינו
                  </Link>
                  {/* <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/contact"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-secondary"
                  >
                    {t('contact')}
                  </Link> */}
                </div>
                <div className="py-6 flex justify-between">
                  {/* <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/login"
                    className="-mx-3 text-center block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-white  hover:bg-secondary"
                  >
                    {t('login')}
                  </Link> */}
                  <DarkMode />
                  {/* <Cart setOpenCart={setOpenCart} openCart={openCart} />
                  <button onClick={() => setOpenCart(true)} className="flex justify-center relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    <span className="absolute -top-3 left-6 text-black rounded w-3 h-5 dark:text-white">{cartItems.length}</span>
                  </button> */}
                  {/* <SwitchLanguage /> */}
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header >
    </>
  )
}

export default Navbar