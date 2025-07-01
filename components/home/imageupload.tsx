"use client";
import * as z from "zod";
import { useState } from "react";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import "../../app/globals.css";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "../ui/use-toast";
import FileUpload from "./file-upload";

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
export default function ImageUpload() {
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

  return (
    <section className="mb-28 fill text-center sm:mb-0 scroll-mt-[100rem] sm:w-full design-banner dark:dark-design-banner">
      <motion.div
        className="flex flex-col mt-40 items-center justify-center gap-2 px-4 text-lg font-medium"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.1,
        }}
      >
        <h1 className="text-2xl font-bold uppercase mb-10  dark:text-gray-100">
          AI 이미지 비디오 변환기
        </h1>
        <h2 className="text-lg dark:text-gray-100">
          정적인 이미지를 생동감이 있는 비디오로 변환하세요. 이미지를 업로드하여
          시작해 보세요!
        </h2>
      </motion.div>
      <div className="flex w-auto items-center justify-center mx-auto promptSection">
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
            <div className="flex flex-col md:flex-row items-center justify-between px-4">
              <div className="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  style={{
                    height: "20px",
                    width: "20px",
                    marginTop: "4px",
                    marginRight: "5px",
                  }}
                >
                  <path
                    d="M10.0013 14.1667C10.4615 14.1667 10.8346 13.7936 10.8346 13.3333C10.8346 12.8731 10.4615 12.5 10.0013 12.5C9.54106 12.5 9.16797 12.8731 9.16797 13.3333C9.16797 13.7936 9.54106 14.1667 10.0013 14.1667Z"
                    stroke="#707178"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M15.8333 8.33331H4.16667C3.24619 8.33331 2.5 9.07951 2.5 9.99998V16.6666C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6666V9.99998C17.5 9.07951 16.7538 8.33331 15.8333 8.33331Z"
                    stroke="#707178"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M5.83203 8.33335V5.83335C5.83203 4.72828 6.27102 3.66848 7.05242 2.88708C7.83382 2.10567 8.89363 1.66669 9.9987 1.66669C11.1038 1.66669 12.1636 2.10567 12.945 2.88708C13.7264 3.66848 14.1654 4.72828 14.1654 5.83335V8.33335"
                    stroke="#707178"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <p className="mb-0 mt-1 text-sm dark:text-gray-700">
                  고객님의 이미지는 보호됩니다.
                </p>
              </div>
              <Button
                disabled={loading}
                className="w-full md:w-auto rounded-full mb-2 bg-blue-500 hover:bg-red-500 transition-colors duration-300"
                type="submit"
              >
                변환하세요
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
