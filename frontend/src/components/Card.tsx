import { Link } from "react-router-dom"

const Card = ({ title, imageUrl }: { title: string, imageUrl: string }) => {

  return (
    <div className="w-34 h-42 relative">
      <Link to={'/' + title.toLowerCase()} className="cursor-pointer" >
        <img className="rounded-t-lg h-32 w-32 " src={imageUrl} />
        <div className="text-primary text-xl font-semibold text-center bg-gray-400 rounded-b-md hover:text-gray-300">
          {title}
        </div>
      </Link>
    </div>
  )
}

export default Card