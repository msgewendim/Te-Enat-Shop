import { testimonial } from "../utils/data";
import TestimonialCard from "./TestimonialCard";
import Cart from "/cart.svg"
import Credit from "/credit-card.svg"
import Globe from "/globe.svg"
import Support from "/support.svg"
const Testimonials = () => {
  return (
    <>
      <div className=" bg-#F9F8F8">
        <div className="flex flex-col justify-start items-start">
          <div className="text-xl font-normal font-['Yellowtail'] italic text-secondary p-1">Why Choose us?</div>
          {/* text & image section */}
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Text section */}
            <div className="flex flex-col order-2 sm:order-1 sm:mt-2 mx-2 sm:text-left relative">
              <h1 className="font-bold text-3xl sm:text-4xl text-primary mb-6">We do not buy from the <br /> open market & traders</h1>
              <p className="text-sm mb-6 pr-6">Simply dummy text of the printing and typesetting industry. Lorem had ceased to been the industry's standard  the 1500s, when an unknown</p>
              <span className="p-3 px-6 bg-gray-200 w-fit rounded-full text-primary mb-2">100% natural product</span>
              <p className="px-5 text-sm mb-4">Simply dummy text of the printing and typesetting industry. Lorem had ceased to been the industry's standard  the 1500s, when an unknown</p>
              <span className="p-3 px-8 bg-gray-200 w-fit rounded-full text-primary mb-2">Increase Resistance</span>
              <p className="px-5 text-sm">Filling, and temptingly healthy, our Biona Organic Granola with Wild Berries is just the thing</p>
            </div>
            {/* Image section */}
            <div className="order-1 sm:order-2 min-h-[450px] sm:min-h-[450px] relative">
              <img src={testimonial} alt="Testimonials" width={600} />
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 justify-center items-center lg:mx-40 mx-auto my-5">
            {/* Cards */}
            <TestimonialCard title="Return Policy" text="Simply dummy text of the print in type setting industry." icon={Cart}/>
            <TestimonialCard title="100% Fresh" text="Simply dummy text of the print in type setting industry." icon={Globe}/>
            <TestimonialCard title="Support 24/7" text="Simply dummy text of the print in type setting industry." icon={Support}/>
            <TestimonialCard title="Secured Payment" text="Simply dummy text of the print in type setting industry." icon={Credit}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
