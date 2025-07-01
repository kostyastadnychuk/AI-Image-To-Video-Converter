"use client";
import React, { useState, ChangeEvent } from "react";
import "../../globals.css";
import Image from "next/image";

export default function ImageToVideo() {

  return (
    <div className="flex h-full">
      <div className="w-full ml-2 p-4 bg-gray-100 flex dark:bg-gray-800 overflow-y-auto">
        <div className="flex flex-col md:flex-row flex-nowrap justify-center mt-60 md:mt-0">
          <div className="flex w-full p-2 md:w-1/5">
            <Image
              src="/TrendingCreations/blackCar.gif"
              className="createdVideo"
              alt="Black Car Animated"
              width={500}
              height={300}
              unoptimized
              priority
            />
          </div>
          <div className="flex w-full p-2 md:w-1/5">
            <Image
              src="/TrendingCreations/boatInLake.gif"
              className="createdVideo"
              alt="Boat in Lake Animated"
              width={500}
              height={300}
              unoptimized
            />
          </div>
          <div className="flex w-full p-2 md:w-1/5">
            <Image
              src="/TrendingCreations/butterfly.gif"
              className="createdVideo"
              alt="Butterfly Animated"
              width={500}
              height={300}
              unoptimized
            />
          </div>
          <div className="flex w-full p-2 md:w-1/5">
            <Image
              src="/TrendingCreations/candle.gif"
              className="createdVideo"
              alt="Candle Animated"
              width={500}
              height={300}
              unoptimized
            />
          </div>
          <div className="flex w-full p-2 md:w-1/5">
            <Image
              src="/TrendingCreations/candle.gif"
              className="createdVideo"
              alt="Candle Animated"
              width={500}
              height={300}
              unoptimized
            />
          </div>
        </div>
      </div>
    </div>
  );
}
