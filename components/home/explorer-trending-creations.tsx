"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import Image from "next/image";
import "../../app/globals.css";

export default function ExplorerTrendingCreations() {
  return (
    <motion.section
      className="mt-5 mb-40 fill text-center sm:mb-0 scroll-mt-[100rem] sm:w-full dark:dark-design-banner"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.175 }}
      id="creations"
    >
      <div className="mt-10">
        <SectionHeading>인기 있는 창작물을 찾아보세요</SectionHeading>
      </div>
      <div className="flex flex-wrap w-auto items-center justify-center mx-auto CreationSection">
      <div className="flex flex-wrap justify-center">
        <div className="flex w-full sm:w-1/2 md:w-1/3 p-2 mostOutOff">
          <Image
            src="/TrendingCreations/blackCar.png"
            alt="Black Car Static"
            width={300}
            height={300}
            priority
          />
          <Image
            src="/TrendingCreations/blackCar.gif"
            alt="Black Car Animated"
            width={300}
            height={300}
            unoptimized
            priority
          />
        </div>
        <div className="flex w-full sm:w-1/2 md:w-1/3 p-2 mostOutOff">
          <Image
            src="/TrendingCreations/boatInLake.jpeg"
            alt="Boat in Lake Static"
            width={300}
            height={300}
            priority
          />
          <Image
            src="/TrendingCreations/boatInLake.gif"
            alt="Boat in Lake Animated"
            width={300}
            height={300}
            unoptimized
          />
        </div>
        <div className="flex w-full sm:w-1/2 md:w-1/3 p-2 mostOutOff">
          <Image
            src="/TrendingCreations/butterfly.jpg"
            alt="Butterfly Static"
            width={300}
            height={300}
            priority
          />
          <Image
            src="/TrendingCreations/butterfly.gif"
            alt="Butterfly Animated"
            width={300}
            height={300}
            unoptimized
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        <div className="flex w-full sm:w-1/2 md:w-1/3 p-2 mostOutOff">
          <Image
            src="/TrendingCreations/candle_org.jpg"
            alt="Candle Static"
            width={300}
            height={300}
            priority
          />
          <Image
            src="/TrendingCreations/candle.gif"
            alt="Candle Animated"
            width={300}
            height={300}
            unoptimized
          />
        </div>
        <div className="flex w-full sm:w-1/2 md:w-1/3 p-2 mostOutOff">
          <Image
            src="/TrendingCreations/cat_org.jpg"
            alt="Cat Static"
            width={300}
            height={300}
            priority
          />
          <Image
            src="/TrendingCreations/cat.gif"
            alt="Cat Animated"
            width={300}
            height={300}
            unoptimized
          />
        </div>
        <div className="flex w-full sm:w-1/2 md:w-1/3 p-2 mostOutOff">
          <Image
            src="/TrendingCreations/dragon_org.jpg"
            alt="Dragon Static"
            width={300}
            height={300}
            priority
          />
          <Image
            src="/TrendingCreations/dragon.gif"
            alt="Dragon Animated"
            width={300}
            height={300}
            unoptimized
          />
        </div>
      </div>
      </div>
    </motion.section>
  );
}
