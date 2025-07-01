import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface VideoDetailsProps {
  title: string;
  date: string;
  motionStrength: number;
  seed: number;
  hdQuality: string;
  videoSrc: string;
}

export default function VideoDetails({
  title,
  date,
  motionStrength,
  seed,
  hdQuality,
  videoSrc,
}: VideoDetailsProps) {
  const router = useRouter();

  const GoPrevious = () => {
    router.back();
  };

  return (
    <div className="flex flex-col">
      <div className="absolute z-50 left-6 top-20 w-20 h-10 bg-gray-900 border border-solid border-border-primary rounded-md cursor-pointer flex justify-center items-center">
        <Link href={""} passHref onClick={GoPrevious}>
          <motion.span
            role="img"
            aria-label="arrow-left"
            className="anticon anticon-arrow-left"
          >
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="arrow-left"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
            </svg>
          </motion.span>
        </Link>
      </div>
      <div className="flex justify-center items-center p-4 mt-20 w-full cursor-point">
        <video className="w-4/5 h-4/5" controls>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
