
const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-primary_btn" />
      <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-secondary ml-3" />
      <div className="animate-spin ease-linear rounded-full w-10 h-10 border-t-2 border-b-2 border-btnColor1 ml-3" />
    </div>
  );
};

export default Loader;