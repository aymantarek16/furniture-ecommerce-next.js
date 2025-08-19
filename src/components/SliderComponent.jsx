"use client";

import React from "react";
import slider1 from "../../public/images/slider1.jpg";
import slider2 from "../../public/images/slider2.jpg";
import slider3 from "../../public/images/slider3.jpg";
import Slider from "react-slick";
import Image from "next/image";

const SliderComponent = () => {
  const slides = [slider1, slider2, slider3];

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div
      className="w-full mx-auto my-8 max-w-6xl h-[250px] md:h-[500px]"
      id="home"
    >
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <div className="relative w-full h-[250px] md:h-[500px]">
              <Image
                src={slide}
                alt="fill"
                className="rounded-3xl object-cover w-full h-full"
              />
              {/* dark overlay at the image  */}
              <div className="absolute inset-0 bg-black opacity-20 rounded-3xl"></div>
              {index === 0 && (
                <div className="absolute inset-0 flex justify-center md:justify-start">
                  <div className="pr-2 md:pr-8 sm:pl-20 h-full flex flex-col justify-center items-end w-full md:space-y-4">
                    <span className="text-white text-xl md:text-5xl lg:text-7xl font-extrabold uppercase text-center animate-slide-in">
                      Hot Offers
                    </span>
                    <span className="text-pink-600 text-xl md:text-8xl font-bold text-center animate-pulse">
                      50%
                    </span>
                  </div>
                </div>
              )}
              {index === 1 && (
                <div className="text-white absolute inset-0 flex items-center justify-start">
                  <div className="pl-3 md:pl-8 text-center  md:space-y-4 animate-pulse">
                    <h2 className="text-xl md:text-6xl lg:text-7xl font-bold flex items-start">
                      New
                    </h2>
                    <h2 className="text-xl md:text-6xl lg:text-9xl font-light text-[][#a91f64]">
                      Collection...
                    </h2>
                  </div>
                </div>
              )}
              {index === 2 && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className=" flex flex-col items-center space-y-1 md:space-y-3">
                    <span className="text-[][#a91f64] text-xl md:text-9xl font-extrabold leading-none uppercase">
                      Deal
                    </span>
                    <span className="text-sm md:text-5xl font-semibold uppercase py-2 text-center bg-white text-black w-fit px-1 md:px-4">
                      Of The Week
                    </span>
                    <span className="text-white text-sm md:text-base text-center">
                      Limited Time Only - Grab It Now
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
