import { shiro } from "../../utils/data"
import { PiCookingPot } from "react-icons/pi"
import { TfiTimer } from "react-icons/tfi"
import { BsPeople } from "react-icons/bs"
import { Link } from "react-router-dom"
import { IconType } from "react-icons/lib"

const packages = [
  {
    _id: '1',
    title: 'מתכון קצר',
    image: shiro,
    price: 10,
    cookingTime: 5,
    ingredientsQuantity: 20,
    peoplesQuantity: 50
  },
  {
    _id: '2',
    title: 'מתכון סופי',
    image: shiro,
    price: 20,
    cookingTime: 10,
    ingredientsQuantity: 30,
    peoplesQuantity: 75
  },
  {
    _id: '3',
    title: 'מתכון ממוקד',
    image: shiro,
    price: 30,
    cookingTime: 15,
    ingredientsQuantity: 40,
    peoplesQuantity: 100
  }
]
const ProductPackages = () => {
  return (
    <div style={{ backgroundColor: '#D2FCFF' }}
      className="min-h-[350px] sm:min-h-[500px] pb-10"
      dir="rtl"
    >
      <div className="flex flex-col justify-center items-center mb-3 pt-8">
        <div className="flex flex-col justify-center items-center gap-2 mt-3">
          <h1 className="text-4xl font-bold text-primary capitalize">
            המארזים שלנו
          </h1>
          <p dir="rtl" className="text-sm px-10 text-black text-center w-[60vw]">
          </p>
        </div>
      </div>
      <div className="flex gap-2 items-center justify-center">
        {
          packages.slice(0, 3).map(pac =>
            <PackageCard data={pac} key={pac._id} />
          )
        }
      </div>
    </div>
  )
}
type Package = {
  _id: string;
  title: string;
  image: string;
  price: number;
  cookingTime: number;
  ingredientsQuantity: number;
  peoplesQuantity: number;
}
{/*
  tasks: 
    - pop up when clicking
    - link to single package page
    - buy package button
*/}
const PackageCard = ({ data }: { data: Package }) => {
  const { price, cookingTime, image, title, peoplesQuantity, ingredientsQuantity } = data
  return (
    <Link to="/" className="block rounded-lg p-4 shadow-sm shadow-indigo-100 hover:bg-slate-200">
      <img
        alt={title}
        src={image}
        className="h-56 w-full rounded-md object-cover"
      />
      <div className="mt-2">
        <dl>
          <div>
            <dt className="sr-only">מחיר</dt>
            <dd className="text-sm text-gray-500">{price}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="sr-only">שם</dt>
            <dd className="font-medium">{title}</dd>
            <dd className="font-medium">buy</dd>
          </div>
        </dl>
        <div className="mt-6 flex items-center gap-8 text-xs">
          <PackageInfo icon={TfiTimer} label={cookingTime} title="זמן הכנה" />
          <PackageInfo icon={BsPeople} label={peoplesQuantity} title="כמות סועדים" />
          <PackageInfo icon={PiCookingPot} label={ingredientsQuantity} title="כמות מצרכים" />
        </div>
      </div>
    </Link>
  )
}

export const PackageInfo = ({ icon: Icon, title, label, size = 24, color = "blue" }: { icon: IconType, title: string | number, label: number | string, size?: number, color?: string }) => {
  return (
    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
      <Icon size={size} color={color} />
      <div className="mt-1.5 sm:mt-0">
        <p className="text-gray-500">{title}</p>
        <p className="font-medium">{label}</p>
      </div>
    </div >
  )
}
export default ProductPackages