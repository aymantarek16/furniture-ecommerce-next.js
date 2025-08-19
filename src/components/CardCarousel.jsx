"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import ProductCard from "./ProductCard";
/* left arrow component */
const PrevArrow = ({ onClick }) => {
  return (
    <button
      className="absolute left-[10px] top-1/2 transform -translate-y-1/2 bg-white text-black shadow-md p-2 rounded-full hover:bg-[#a91f64] hover:text-white cursor-pointer transition-colors z-10 outline-none"
      onClick={onClick}
    >
      <FaArrowLeft size={18} />
    </button>
  );
};

const NextArrow = ({ onClick }) => {
  return (
    <button
      className="absolute right-[10px] top-1/2 transform -translate-y-1/2 bg-white text-black shadow-md p-2 rounded-full hover:bg-[#a91f64] hover:text-white cursor-pointer transition-colors z-10 outline-none"
      onClick={onClick}
    >
      <FaArrowRight size={18} />
    </button>
  );
};

const CardCarousel = ({ title, cards }) => {
  const settings = {
    // autoplaySpeed: 500,
    // autoplay: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrow: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-12 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="carouselTitle text-xl sm:text-3xl md:text-4xl font-bold pr-4 text-gray-800 pb-3 border-b-6 border-[#a91f64]">
          {title}
        </h2>
        <Link href="/products">
          <span className="viewMoreTitle text-lg text-gray-600 hover:text-[#a91f64] transition-colors duration-200">
            View More
          </span>
        </Link>
      </div>

      <div className="relative">
        <Slider {...settings}>
          {cards.map((card, index) => (
            <div className="px-2" key={index}>
              <ProductCard
                image={card.image}
                text={card.text}
                price={card.price}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CardCarousel;
