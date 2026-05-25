"use client";

import React, { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import HeroSlide from "./HeroSlide";
import { heroSlides } from "./heroData";

const HeroSlider = () => {
  const autoplay = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false })
  );

  return (
   
    <section className="relative w-screen left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] overflow-hidden">
      <Carousel
        plugins={[autoplay.current]}
        opts={{ loop: true }}
        className="w-full relative"
      >
        <CarouselContent className="ml-0">
          {heroSlides.map((slide) => (
            <CarouselItem key={slide.id} className="pl-0 basis-full">
              <HeroSlide slide={slide} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default HeroSlider;