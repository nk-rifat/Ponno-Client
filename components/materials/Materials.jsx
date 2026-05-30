import Image from "next/image";
import { materials } from "@/data/materials";
import { HiCheckCircle } from "react-icons/hi2";

const Materials = () => {
  return (
    <section className="py-6 lg:py-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* SECTIONS */}
        <div className="space-y-16 lg:space-y-32">
          {materials.map((item, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={item.id}
                className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center"
              >
                <div
                  className={`lg:col-span-6 ${isReversed ? "lg:order-2" : "lg:order-1"}`}
                >
                  <div className="relative h-105 rounded-2xl overflow-hidden shadow-lg">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={index === 0}
                    />
                  </div>
                </div>

                {/* CONTENT CONTAINER */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-center ${isReversed ? "lg:order-1" : "lg:order-2"}`}
                >
                  <h3 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-slate-900">
                    Why {item.name}?
                  </h3>

                  <p className="text-slate-700 leading-relaxed text-base sm:text-lg mb-8">
                    {item.description}
                  </p>

                  {/* HIGHLIGHTS */}
                  <div className="mb-8">
                    <h4 className="text-xs uppercase tracking-wider font-bold mb-4 text-slate-500">
                      Key Benefits
                    </h4>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600">
                      {item.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-3 text-sm sm:text-base"
                        >
                          <HiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* TAGS / USES */}
                  <div className="pt-6 border-t border-slate-100">
                    <div className="flex flex-wrap gap-2.5">
                      {item.uses.map((u) => (
                        <span
                          key={u}
                          className="px-4 py-2 text-sm font-medium rounded-full bg-slate-50 text-slate-800 border border-slate-200 transition-colors duration-300 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
                        >
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Materials;
