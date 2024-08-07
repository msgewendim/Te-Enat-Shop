const createBanner = (image: string) => {
  const bgImage = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '45vh',
    width: '100%',
  }
  return bgImage;
}
const createRecipeCardImage = (image: string) => {
  const bgImage = {
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    borderRadius: '10px',
    height: '300px',
    width: '390px',
    marginBottom: '10px',
  }
  return bgImage;
}

export { createBanner, createRecipeCardImage}