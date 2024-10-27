import { Feature } from "../../client/types.gen"

const FeatureElement = ({ feature }: { feature: Feature }) => {
  return (
    <div className="relative text-center" dir="rtl">
      {feature.title &&
        <h3 className="text-2xl text-primary font-semibold" >{feature.title}</h3>}
      {feature.description && <p className="text-md" >{feature.description}</p>}
    </div>
  )
}

const FeatureList = ({ features, className }: { features: Feature[], className: string }) => (
  <div className={`w-full md:w-[300px] flex flex-col gap-8 ${className}`}>
    {features.map((feature, index) => (
      <FeatureElement key={index} feature={feature} />
    ))}
  </div>
);

export default FeatureList;