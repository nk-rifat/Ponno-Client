import Materials from "@/components/materials/Materials";

const MaterialsPage = () => {
  return (
    <>
      {/* HEADER */}
      <div className="bg-linear-to-br from-emerald-900 via-green-950 to-stone-900 py-5 lg:py-10 text-center px-6">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-emerald-500/10 text-emerald-300 rounded-full border border-emerald-500/20 mb-4">
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
