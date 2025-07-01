"use client";
import React, { useState, ChangeEvent } from "react";
import "../../../globals.css";
import Image from "next/image";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import FileUpload from "@/components/home/file-upload";

const ImgSchema = z.object({
  fileName: z.string(),
  name: z.string(),
  fileSize: z.number(),
  size: z.number(),
  fileKey: z.string(),
  key: z.string(),
  fileUrl: z.string(),
  url: z.string(),
});

export const IMG_MAX_LIMIT = 1;
const formSchema = z.object({
  imgUrl: z
    .array(ImgSchema)
    .max(IMG_MAX_LIMIT, { message: "변환을 하고 다음 이미지를 업로드하세요." })
    .min(1, { message: "이미지가 업로드 되지않았습니다. 이미지를 업로드 하고 변환하세요." }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: any | null;
  categories: any;
}

export default function ImageToVideo() {
  const [motionStrength, setMotionStrength] = useState<number>(0.55);
  const [seed, setSeed] = useState<number>(1161875538);

  const handleMotionStrengthChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMotionStrength(parseFloat(e.target.value));
  };

  const handleSeedChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSeed(parseInt(e.target.value, 10));
  };

  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  const defaultValues = {
    imgUrl: [],
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      router.refresh();
      router.push(`/dashboard/products`);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      //   await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push(`/${params.storeId}/products`);
    } catch (error: any) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const triggerImgUrlValidation = () => form.trigger("imgUrl");

  const images = [
    { src: '/TrendingCreations/blackCar.gif', alt: 'Black Car Animated', key: 'blackCar' },
    { src: '/TrendingCreations/boatInLake.gif', alt: 'Boat in Lake Animated', key: 'boatInLake' },
    { src: '/TrendingCreations/butterfly.gif', alt: 'Butterfly Animated', key: 'butterfly' },
    { src: '/TrendingCreations/candle.gif', alt: 'Candle Animated', key: 'candle1' },
    { src: '/TrendingCreations/candle.gif', alt: 'Candle Animated', key: 'candle2' },
  ];

  return (
    <div className="flex flex-col md:flex-row h-full overflow-y-auto md:overflow-y-hidden">
      <div className="w-full md:w-1/5 p-4 bg-gray-100 dark:bg-gray-800">
        <div className="border-b pb-4 ">
          <div className="flex justify-center items-center mt-10">
            <span className="text-lg">이미지를 비디오로 변환하기</span>
          </div>
          <div className="mt-20 h-1/2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-8"
              >
                <FormField
                  control={form.control}
                  name="imgUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          onChange={field.onChange}
                          value={field.value}
                          onRemove={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
        <div className="mt-6">
          <Button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-md">
            변환하세요
          </Button>
        </div>
      </div>
      <div className="md:w-4/5 ml-2 p-4 bg-gray-100 dark:bg-gray-800 md:overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-center w-full">
        {images.map(image => (
          <div key={image.key} className="w-full md:w-1/5 p-2">
            <Link href={`/detail/${image.key}`}>
              <Image
                src={image.src}
                className="createdVideo"
                alt={image.alt}
                width={500}
                height={300}
                unoptimized
                priority
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}
