
const Pattern = () => {
  return (
    <div className="w-full h-[100px]">
      <div 
        className="w-full h-full bg-light-green"
        style={{
          backgroundImage: `
            radial-gradient(circle at 0% 50%, transparent 20%, #006400 21% 28%, transparent 29%),
            radial-gradient(circle at 50% 50%, transparent 20%, #006400 21% 28%, transparent 29%),
            radial-gradient(circle at 100% 50%, transparent 20%, #006400 21% 28%, transparent 29%)
          `,
          backgroundSize: '60px 70px'
        }}
      />
    </div>
  );
}

export default Pattern;