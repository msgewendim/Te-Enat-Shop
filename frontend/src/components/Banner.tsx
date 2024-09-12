import { createBanner } from "../utils/helperFunctions"

const Banner = ({ image, text }: { image: string, text: string }) => {
  const bgImage = {
    ...createBanner(image)
  }
  return (
    <div style={bgImage} className="h-[10vh] sm:h-[20vh]">
      <div className="container mx-auto py-1">
        <h1 className="text-4xl font-bold text-center mt-8 text-primary capitalize">{text}</h1>
      </div>
    </div>
  )
}

export default Banner