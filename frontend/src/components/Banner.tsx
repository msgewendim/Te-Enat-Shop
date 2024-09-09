import { createBanner } from "../utils/helperFunctions"

const Banner = ({ image, text }: { image: string, text: string }) => {
  return (
    <div style={createBanner(image)}>
      <div className="container mx-auto py-1">
        <h1 className="text-4xl font-bold text-center mt-8 text-primary capitalize">{text}</h1>
      </div>
    </div>
  )
}

export default Banner