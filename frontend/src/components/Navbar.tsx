import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, DialogPanel } from '@headlessui/react'
import DarkMode from './DarkMode';
import searchIcon from '/searchIcon.svg';
import { useTranslation } from 'react-i18next';
import SwitchLanguage from './SwitchLang';


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useTranslation()
  return (
    <>
      <header className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200">
        <nav className="container ">
          <div className="flex lg:justify-between justify-between items-center p-3 ">
            <div className="">
              {/* Logo */}
              <Link to="/" className="flex justify-start items-center gap-2 text-2xl sm:text-3xl font-bold text-primary dark:text-white">
                <img alt="" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" className="h-8 w-auto" />
                TE-ENATE
              </Link>
            </div>
            {/* Navbar Elements */}
            <div className="hidden lg:flex lg:gap-x-8">
              <Link to="/" className="inline-block text-md font-medium text-primary hover:text-secondary dark:text-white">
                {t('home')}
              </Link>
              <Link to="/products" className="inline-block text-md font-medium text-primary hover:text-secondary dark:text-white">
                {t('shop')}
              </Link>
              <Link to="/recipes" className="inline-block text-md font-medium text-primary dark:text-white hover:text-secondary">
                {t('recipes')}
              </Link>
              <Link to="/about" className="inline-block text-md font-medium text-primary dark:text-white hover:text-secondary">
                {t('about')}
              </Link>
            </div>
            {/* NAVBAR ICONS */}
            <div className="hidden lg:flex lg:gap-x-6 items-center gap-4">
              {/* SEARCH ICON */}
              <div className="flex relative w-24">
                <input type="text" className='border-primary border-2 rounded-lg pl-2 w-full' />
                <img src={searchIcon} alt="search icon" width={20} className='absolute right-1 top-1' />
              </div>
              {/* CART ICON */}
              <div className="flex justify-center relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
                <span className="absolute -top-3 left-6 text-black rounded w-3 h-5 dark:text-white">0</span>
              </div>
              {/* LOGIN BUTTON LINK */}
              {/* <Link to="/login" className="text-md font-semibold leading-6 dark:text-white text-white border bg-secondary rounded-full p-2 text-center">
                {t('login')}
                {/* <span aria-hidden="true">&rarr;</span> */}
              {/* </Link> */}
              {/* LANGUAGE SWITCHER */}
              <SwitchLanguage /> 
              {/* DARK MODE BUTTON */}
              <div className="">
                <DarkMode />
              </div>
            </div>

            <div className="flex justify- lg:hidden">
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
                <div className="space-y-2 py-6">
                  <Link to="/" className="-mx-3 block rounded-lg px-3 py-2 text-sm font-semibold leading-7 hover:bg-secondary text-gray-900 dark:text-white" onClick={() => setMobileMenuOpen(false)}>
                    {t('home')}
                  </Link>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/products"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-secondary"
                  >
                    {t('shop')}
                  </Link>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/recipes"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-secondary"
                  >
                    {t('recipes')}
                  </Link>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/about"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-secondary"
                  >
                    {t('about')}
                  </Link>
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/contact"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-secondary"
                  >
                    {t('contact')}
                  </Link>
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
                  <SwitchLanguage />
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















































































// POPOVER PANEL FOR DESKTOP VERSION
{/* <PopoverGroup className='hidden lg:flex lg:gap-x-8'> */ }

{/* <Popover className="relative inline-block">
                  <PopoverButton className="flex justify-center items-end gap-x-1 text-md font-medium leading-6 text-primary hover:text-secondary dark:text-white">
                    {/* <Link to="/products" className="inline-block text-md font-medium text-primary hover:text-secondary">
                    Products
                  </Link> */}
{/* {t('shop')}
                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400 " />
                  </PopoverButton>
                  <PopoverPanel
                    transition
                    className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 dark:text-white ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                  > */}
{/* {products.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          {/* <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" /> */}
{/* </div> */ }
{/* <div className="flex-auto">
              <a href={item.image} className="block font-semibold text-gray-900">
                {t("item.name")}
                <span className="absolute inset-0" />
              </a>
              <p className="mt-1 text-gray-600">{t('item.description')}</p>
            </div>*/}
{/* <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                      {callsToAction.map((item) => (
                        <a
                          key={(item.title)}
                          href={item.link}
                          className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                        >
                          {/* <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" /> */}
{/* {t('item.title')}
                        </a>
                      ))} */}
{/* </div> */ }
{/* </PopoverPanel> */ }
{/* </Popover>  */ }

// POP OVER PANEL FOR MOBILE CHOOSING AN ACTION FROM SERVICES OF THE SHOP
{/* <Disclosure as="div" className="-mx-3">
                    <DisclosureButton className="group dark:text-white flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-secondary">
                      {t('services')}
                      <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
                    </DisclosureButton>
                    <DisclosurePanel className="mt-2 space-y-2 dark:text-white">
                      {[...products, ...callsToAction].map((item) => (
                        <DisclosureButton
                          key={item.description}
                          as="a"
                          href={item.description}
                          className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 dark:text-white hover:bg-secondary"
                        >
                          {t('item.description')}
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  </Disclosure> */}