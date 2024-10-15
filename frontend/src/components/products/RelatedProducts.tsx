import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useGetProducts } from "../../hooks/useProductsData";
import Loader from "../ui/Loader";

const RelatedProducts = ({ productCategory }: { productCategory: string }) => {
  const { data, isError, isLoading, error } = useGetProducts({
    category: productCategory
  })

  if (isLoading) return <Loader />;
  if (isError) {
    toast.error(error.message)
  }
  return (
    <section>
      <div className="flex flex-col justify-center items-start">
        <h2 className="text-2xl font-bold text-primary text-start my-5 mx-auto">מוצרים הקשורים לבחירתך</h2>
        <div className="flex justify-between items-center gap-4">
          {/* <button className="" onClick={(e) => handleLoad(e)} name="start">
            <img src={arrowLeft} alt="" width={36} />
          </button> */}
          <div className="flex gap-4 mt-3">
            {data?.map(({ _id, name, images }) => (
              <Link to={`/products/${_id}/info`} key={_id} className="flex flex-col gap-4 justify-between items-center">
                <img src={images[0]} alt={name} className="object-cover w-32 h-32 rounded-lg" />
                <h2 className="text-xl ml-2 text-primary capitalize font-semibold">
                  {name}
                </h2>
              </Link>
            ))}
          </div>
          {/* <button className="" onClick={(e) => handleLoad(e)} name="end">
            <img src={arrowRight} alt="" width={36} />
          </button> */}
        </div>
      </div>
    </section>
  )
}

export default RelatedProducts