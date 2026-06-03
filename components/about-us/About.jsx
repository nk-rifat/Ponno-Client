import { coreValues, whyChooseUs } from "@/data/about";
import Image from "next/image";

const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-linear-to-br from-emerald-900 via-green-950 to-stone-900 py-6 md:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-emerald-500/10 text-emerald-300 rounded-full border border-emerald-500/20 mb-4">
            Our Heritage
          </span>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3 text-white">
            About Ponno
          </h1>

          <p className="text-sm md:text-xl max-w-3xl mx-auto leading-relaxed text-stone-300 font-light">
            Celebrating Bangladesh is rich craftsmanship through sustainable,
            handcrafted products that bring tradition, beauty, and purpose into
            modern homes.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 relative group">
            <div className="absolute -inset-4 lg:bg-emerald-100/70 rounded-3xl -rotate-2 transform transition-transform group-hover:rotate-0 duration-300"></div>
            <Image
              src="https://res.cloudinary.com/dlm5fnpnv/image/upload/v1780141952/artisan-weaving-basket_1_zoxt6b.jpg"
              alt="Handcrafted products"
              width={1200}
              height={500}
              className="relative w-full h-100 md:h-125 object-cover rounded-2xl shadow-xl"
            />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-emerald-800 font-bold uppercase tracking-widest text-xs mb-2">
                Our Story
              </p>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-emerald-800 tracking-tight">
                Preserving Tradition Through Craftsmanship
              </h2>
            </div>

            <div className="w-16 h-0.5 bg-emerald-700"></div>

            <p className="text-stone-700 leading-relaxed text-base md:text-lg font-normal">
              Ponno was founded with a simple goal: to celebrate the beauty of
              handmade products while supporting the talented artisans who
              create them. We believe that every handcrafted piece tells a story
              of culture, creativity, and dedication.
            </p>

            <p className="text-stone-700 leading-relaxed text-base md:text-lg font-normal">
              By working directly with local makers, we help bring traditional
              craftsmanship into modern spaces. From raw natural materials to
              timeless geometric patterns, our collections are curated strictly
              for quality, sustainability, and complete authenticity.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-zinc-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border relative overflow-hidden group hover:shadow-md hover:border-green-300 transition-shadow">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-700"></div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-emerald-800">
                Our Mission
              </h3>
              <p className="text-stone-700 leading-relaxed font-normal">
                To promote sustainable living by offering eco-friendly,
                handcrafted products while empowering local artisans and
                preserving traditional structural skills for generations to
                come.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border relative overflow-hidden group hover:shadow-md hover:border-green-300 transition-shadow">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-700"></div>
              <h3 className="text-2xl font-serif font-bold mb-4 text-emerald-800">
                Our Vision
              </h3>
              <p className="text-stone-700 leading-relaxed font-normal">
                To become a globally trusted destination for premium handmade
                and sustainable goods, seamlessly connecting conscious consumers
                with talented native artisans across Bangladesh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-emerald-800 font-bold uppercase tracking-widest text-xs mb-2">
            What Drives Us
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 tracking-tight mb-4">
            Our Core Values
          </h2>
          <p className="text-stone-600 max-w-xl mx-auto font-normal">
            These guiding pillars map out our journey and build reliable,
            authentic connections between traditional artists and modern spaces.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((value, idx) => (
            <div
              key={idx}
              className="bg-white border rounded-xl p-6 shadow-sm hover:-translate-y-1 hover:border-green-300 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-lg font-bold text-emerald-800 mb-2">
                {value.title}
              </h3>
              <p className="text-stone-700 text-sm leading-relaxed font-normal">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-zinc-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-800 tracking-tight mb-4">
              Why Choose Ponno?
            </h2>
            <p className="text-stone-600 max-w-xl mx-auto font-normal">
              We deliver more than premium goods. We deliver unique narratives,
              cultural histories, and a tangible pledge to eco-friendly systems.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {whyChooseUs.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl border shadow-sm text-center flex flex-col items-center hover:shadow-md  hover:-translate-y-1 hover:border-green-300 transition-all duration-300"
              >
                <div className="p-3 bg-green-50 rounded-full">{item.icon}</div>
                <h3 className="font-bold text-lg text-emerald-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-stone-700 text-sm leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
