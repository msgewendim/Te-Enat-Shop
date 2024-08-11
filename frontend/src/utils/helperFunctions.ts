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
  classProps?: [
    {
      [key: string]: string;
    }
  ]
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

// divide the nutrition of a product with in the description object
const divideDescriptionInfo = (
  descriptions: Array<string[]>,
  even: Array<string[]> = [],
  odd: Array<string[]> = []
): Array<string[][]> => {
  descriptions.forEach((desc, index) => {
    if (index % 2 !== 0) {
      odd.push(desc);
    } else {
      even.push(desc);
    }
  });
  return [odd, even];
};

export { createBanner, createRecipeCardImage, divideDescriptionInfo };
