import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, DialogPanel } from '@headlessui/react'
import DarkMode from '../ui/DarkMode';
import { useAuth0 } from '@auth0/auth0-react';
import { TbLogin, TbLogout } from 'react-icons/tb';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { loginWithPopup, logout, isAuthenticated, user } = useAuth0()
  const [isOpen, setIsOpen] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setIsOpen(false);
      } else {
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
      <header className={`fixed top-0 sm:w-[90vw] w-full shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 ${isOpen ? 'translate-y-0 z-20' : '-translate-y-full'}`}>
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
              {/* LOGIN BUTTON LINK */}
              {
                isAuthenticated && (
                  <div className="flex items-center gap-2">
                    {/* <span className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</span> */}
                    <img alt={user?.name} src={user?.picture} className="h-6 w-6 rounded-full" />
                  </div>
                )
              }
              {
                isAuthenticated ?
                  <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className="text-md font-semibold leading-6 dark:text-white text-white p-2 text-center">
                    <TbLogout color='black' size={24} />
                  </button>
                  :
                  <button onClick={() => loginWithPopup()} className="text-md font-semibold leading-6 dark:text-white text-white p-2 text-center">
                    <TbLogin color='black' size={24} />
                  </button>
              }
              {/* DARK MODE BUTTON */}
              <DarkMode />
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
                  <Link
                    onClick={() => setMobileMenuOpen(false)}
                    to="/contact"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 dark:text-white hover:bg-secondary"
                  >
                    צרו קשר
                  </Link>
                </div>
                <div className="py-6 flex justify-between">
                  {
                    isAuthenticated ?
                      <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} className="-mx-3 text-center block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-white  hover:bg-secondary">
                        <TbLogout color='black' size={24} />
                      </button>
                      :
                      <button onClick={() => loginWithPopup()} className="-mx-3 text-center block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 dark:text-white  hover:bg-secondary">
                        <TbLogin color='black' size={24} />
                      </button>
                  }
                  <DarkMode />
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