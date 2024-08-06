import { Link } from "react-router-dom"
import Instagram from "/instagram.svg"
import Tweeter from "/tweeter.svg"
import Youtube from "/youtube.svg"

const Footer = () => {

  return (
    <>
      <footer className="bg-gray-100 dark:bg-gray-900">
        <div className="max-w-[1200px] mx-auto p-2 dark:text-gray-400">
          <div className="h-32 flex items-center m-3 p-4 justify-between bg-blue-200 rounded-xl text-primary dark:bg-#37B5DE dark:text-white ">
            <h1 className="font-semibold dark:text-white text-2xl ml-10">
              Subscribe to <br /> our Newsletter
            </h1>
            <div className="p-3 gap-2">
              <input type="text" placeholder="Your Email Address" className="rounded p-2 placeholder:text-sm" />
              <button className="rounded p-2 ml-2 bg-primary text-white">Subscribe</button>
            </div>
            <div className="grid md:grid-cols-3 py-5">
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10 ">
            <div className="flex flex-col m-2 pb-2">
              <h3 className="font-semibold text-lg dark:text-white text-center">Contact Us</h3>
              <div className="">
                <span className="font-bold text-md">Email</span>
                <p className="pl-2 ">needhelp@Tenat.com</p>
              </div>
              <div className="">
                <span className="font-bold text-md">Phone</span>
                <p className="pl-2 ">+972-542-1221-132</p>
              </div>
              <div className="">
                <span className="font-bold text-md">Address</span>
                <p className="pl-2 ">Menahem-Begin, TA Israel, 213411</p>
              </div>
            </div>
            <div className="border-l-2 border-r-2 border-gray-200">
              <div className="flex justify-center gap-2">
                <img alt="" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" className="h-8 w-auto" />
                <h3 className="text-lg dark:text-white text-center font-bold">Te-Enat</h3>
              </div>
              <p className="text-sm text-center">Lorem, ipsum dolor sit amet consectetur adipisicing.</p>
              <div className="flex justify-center items-center mt-3">
                <Link to="#" className="p-2 mt-2">
                  <img src={Instagram} alt="instagram-icon" className="" width={24} />
                </Link>
                <Link to="#" className="p-2">
                  <img src={Tweeter} alt="tweeter-icon" width={24} />
                </Link>
                <Link to="#" className="p-2 ">
                  <img src={Youtube} alt="youtube-icon" width={24} />
                </Link>
              </div>
            </div>
            <div className="px-4">
              <h3 className="font-semibold text-lg dark:text-white text-center">Support</h3>
              <ul className="pl-2 mb-1 text-gray-600 dark:text-gray-400 list-none ">
                <li><Link to="#">Terms & Conditions</Link></li>
                <li><Link to="#">Privacy Policy</Link></li>
                <li><Link to="#">Refund Policy</Link></li>
                <li><Link to="#">FAQ</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex justify-center items-center py-5 text-gray-600 dark:text-gray-400 border-t-2 mt-2">
            <p className="text-sm">&copy; 2023 Te-Enat. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  )
}


















































































// const Footer = () => {
//   return (
//     <footer className="w-xl">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between flex-col py-14 gap-14 lg:gap-20 min-[1124px]:flex-row">
//           <div className="block  xl:max-w-lg">
//             <p className="text-lg text-gray-500 mb-12 text-center min-[1124px]:text-left">
//               Trusted in more than 100 countries & 5 million customers.
//             </p>
//             <div className="relative lg:flex-row gap-3 flex-col flex items-center justify-between max-[1124px]:max-w-2xl max-[1124px]:mx-auto ">
//               <span className="absolute left-5 top-4 lg:top-5"><svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M1.25201 4L7.15881 7.89529C9.26862 9.16117 10.3235 9.79412 11.4825 9.76654C12.6416 9.73896 13.6652 9.05656 15.7124 7.69175L20.748 4M9 17H13C16.7712 17 18.6569 17 19.8284 15.8284C21 14.6569 21 12.7712 21 9C21 5.22876 21 3.34315 19.8284 2.17157C18.6569 1 16.7712 1 13 1H9C5.22876 1 3.34315 1 2.17157 2.17157C1 3.34315 1 5.22876 1 9C1 12.7712 1 14.6569 2.17157 15.8284C3.34315 17 5.22876 17 9 17Z" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" />
//               </svg>
//               </span>
//               <input type="text" name="email" className="py-3 px-5 h-14 pl-14 border border-gray-300 rounded-full text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none flex-1 w-full " placeholder="Contact" />
//               <button type="submit" className="h-14 py-3.5 px-7 bg-indigo-600 transition-all duration-500 shadow-md rounded-full text-white font-semibold hover:bg-indigo-700">Subscribe</button>
//             </div>
//           </div>
//           <div className="flex flex-col items-center sm:items-start min-[530px]:flex-row max-[1124px]:w-xl max-[1124px]:justify-between gap-12 xl:gap-24 max-[1124px]:max-w-2xl max-[1124px]:mx-auto relative">
//             <div className="block absolute top-24 -left-20">
//               <h4 className="text-lg text-gray-900 font-medium mb-7 text-center lg:text-left">TENAT</h4>
//             </div>
//             <div className="block border-x-2 p-10">
//               <h4 className="text-lg text-gray-900 font-medium mb-7 text-center lg:text-left">מוצרים</h4>
//               <ul className="grid gap-6 text-center lg:text-left" >
//                 <li><Link to="#" className="text-gray-600 hover:text-gray-900">תבלינים</Link></li>
//                 <li><Link to="#" className="text-gray-600 hover:text-gray-900">מתכונים</Link></li>
//                 <li><Link to="#" className="text-gray-600 hover:text-gray-900">סדנאות</Link></li>
//               </ul>
//             </div>
//             <div className="block">
//               <h4 className="text-lg text-gray-900 font-medium mb-7 text-center lg:text-left">Support</h4>
//               <ul className="grid gap-6 text-center lg:text-left">
//                 <li><Link to="#" className="text-gray-600 hover:text-gray-900">Customer Support</Link></li>
//                 <li><Link to="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</Link></li>
//                 <li><Link to="#" className="text-gray-600 hover:text-gray-900">License</Link></li>
//                 <li><Link to="#" className="text-gray-600 hover:text-gray-900">Terms & Conditions</Link></li>
//               </ul>
//             </div>
//           </div>

//         </div>
//         <div className="py-9 border-t border-gray-200">
//           <div className="flex items-center justify-center flex-col gap-8 lg:gap-0 sm:flex-row sm:justify-between">

//             <span className="text-sm text-gray-500 ">
//               © 2024, All rights reserved.
//             </span>


//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

export default Footer