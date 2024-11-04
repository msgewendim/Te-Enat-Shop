import { IconType } from "react-icons";
const PackageInfo = ({ icon: Icon, title, label }: { icon: IconType, title: string, label: number | string }) => {
  return (
    <div className="flex flex-col items-center">
      <Icon size={24} className="text-blue-700 mb-1" />
      <p className="text-gray-500">{title}</p>
      <p className="font-medium">{label}</p>
    </div>
  );
};

export default PackageInfo;