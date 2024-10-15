
const GranteesCard = ({ icon, text, title }: { icon: string, text: string, title: string }) => {
  return (
    <div className="w-[156px] h-[180px] bg-white flex flex-col justify-center items-center gap-2 rounded-lg p-4">
      <div className="p-2 bg-gray-100 rounded-lg">
        <img src={icon} width={24} alt={title + " icon"} />
      </div>
      <h3 className="text-md font-bold text-primary text-start text-nowrap">{title}</h3>
      <p className="text-xs text-gray-600 text-center">{text}</p>
    </div>
  )
}

export default GranteesCard;