import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const HeroSlide = ({ slide }) => {
  return (
    <div className="relative h-[41vh] sm:h-[55vh] md:h-[65vh] lg:h-[75vh] w-full overflow-hidden flex items-center">
      <div className="absolute inset-0">
        <Image
          src={slide.image}
          alt={slide.title || "Hero Banner"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Text Content Block */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="max-w-2xl py-6 rounded-2xl bg-white/6 text-center sm:text-center md:text-center lg:text-left flex flex-col items-center lg:items-start md:border-l-2 md:border-white/20 md:pl-8">
          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:7xl lg:text-8xl font-semibold text-green-950 ">
            {slide?.title}
          </h1>

          {/* Description */}
          <p className="mt-4 text-lg sm:text-xl text-slate-800 font-medium max-w-lg">
            {slide.desc}
          </p>

          {/* Action Button */}
          <div className="mt-8">
            <Link
              href={slide?.linkUrl || "/"}
              size="lg"
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 sm:px-10 sm:py-4.5 overflow-hidden border border-green-950/40 rounded-2xl bg-white/10 backdrop-blur-sm text-stone-950 text-xs sm:text-sm font-medium tracking-widest uppercase transition-colors duration-300 ease-in-out hover:text-white w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center gap-2">
                {slide.buttonText}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSlide;
