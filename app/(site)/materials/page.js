import Materials from "@/components/materials/Materials";

const MaterialsPage = () => {
  return (
    <>
      {/* HEADER */}
      <div className="bg-green-600 py-5 lg:py-10 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-white uppercase tracking-widest text-xs font-bold bg-amber-500 px-3 py-1 rounded-full mb-5">
            Materials We Trust
          </span>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            Crafted From Nature, <br /> Built With Purpose
          </h1>
        </div>
      </div>
      
    {/* Materials Grid */}
      <Materials />
    </>
  );
};

export default MaterialsPage;
