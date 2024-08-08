const createBanner = (image: string) => {
  const bgImage = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "45vh",
    width: "100%",
  };
  return bgImage;
};
const createRecipeCardImage = (
  image: string,
  width?: string,
  height?: string,
  classProps?: [{
    [key: string]: string;
    }]
) => {
  const bgImage = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderRadius: "10px",
    height: height ? height : "300px",
    width: width ? width : "390px",
    marginBottom: "10px",
    props: classProps ? classProps : "",
  };
  return bgImage;
};

export { createBanner, createRecipeCardImage };
