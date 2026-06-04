"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import HeroSlide from "./HeroSlide";
import { heroSlides } from "@/data/heroData";

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [api, setApi] = useState(null);

  const autoplay = useRef(Autoplay({ delay: 6000, stopOnInteraction: false }));

  const onSelect = useCallback(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    api.on("select", onSelect);
    return () => api.off("select", onSelect);
  }, [api, onSelect]);

  return (
    <section className="relative w-full overflow-x-hidden">
      <Carousel
        setApi={setApi}
        plugins={[autoplay.current]}
        opts={{ loop: true }}
        className="w-full relative"
      >
        <CarouselContent className="ml-0">
          {heroSlides.map((slide, index) => (
            <CarouselItem key={slide.id} className="pl-0 basis-full">
              <HeroSlide
                slide={slide}
                priority={index === 0}
                shouldLoad={
                  index === current ||
                  index === (current + 1) % heroSlides.length
                }
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default HeroSlider;
