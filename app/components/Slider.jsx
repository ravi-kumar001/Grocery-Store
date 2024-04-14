"use client";
import React, { useState, useEffect } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import Image from "next/image";
import GetApi from "../utils/GetApi";

const Slider = () => {
  const [sliderList, setSliderList] = useState([]);
  useEffect(() => {
    getslider();
  }, []);
  const getslider = () => {
    GetApi.getSliders()
      .then((res) => {
        const response = res.data.data;
        setSliderList(response);
      })
      .catch((err) => {
        console.log("The error is :", err);
      });
  };
  return (
    <div>
      <Carousel>
        <CarouselContent>
          {sliderList.map((slider, index) => (
            <CarouselItem key={index}>
              <Image
                src={
                  process.env.NEXT_PUBLIC_BASE_URL +
                  slider.attributes?.image?.data[0]?.attributes?.url
                }
                width={1000}
                height={400}
                alt="slider-image"
                className="w-full h-[200px] md:h-[400px] object-cover rounded-2xl"
                unoptimized={true}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className = {"mx-3"}/>
        <CarouselNext className = {"mx-3"}/>
      </Carousel>
    </div>
  );
};

export default Slider;
