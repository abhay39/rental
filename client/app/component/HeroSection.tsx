import Link from "next/link"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import ImageSlider from "./ImageSlider";



const HeroSection = () => {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
      };
  return (
    <section className=" lg:px-32 flex flex-col items-start gap-4 md:px-16 px-4 py-16">
        <h1 className=" font-bold text-3xl md:text-4xl text-slate-900">Find your next <span className=" text-slate-600">perfect</span> <br /> place with ease</h1>
        <p className="text-slate-600 font-light">
            Khoojo Rooms will help you find your home fast, easy and comfortable.
            <br />
            Our expert support are always available.
        </p>
        <Link href={"/rooms"} className="  p-2 rounded-md text-blue-600 font-bold hover:underline">Let&apos;s start</Link>
        <ImageSlider />
    </section>
  )
}

export default HeroSection