"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import * as z from "zod";

const formSchema = z
  .object({
    username: z.string().min(3, { message: "유효한 사용자 이름을 입력하세요" }),
    email: z.string().email({ message: "유효한 메일주소를 입력하세요" }),
    password: z
      .string()
      .min(8, { message: "암호 길이는 8자 이상이어야 합니다" })
      .regex(/[0-9]/, {
        message: "암호에는 숫자가 하나 이상 포함되어야 합니다",
      })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: "암호는 하나 이상의 특수 문자를 포함해야 합니다",
      }),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "암호가 일치하지 않습니다",
    path: ["passwordConfirm"],
  });

type UserFormValue = z.infer<typeof formSchema>;

export default function SignupForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const router = useRouter();

  const onSubmit = async (data: UserFormValue) => {
    const res = await fetch(`/api/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.username,
        email: data.email,
        password: data.password,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.log(errorData);
      form.setError("email", { type: "manual", message: errorData.error });
    } else {
      const user = await res.json();
      console.log(user);
      router.push("/main");
    }
  };

  return (
    <div className="relative h-screen flex-col items-center justify-center relative h-screen md:grid lg:grid-cols-[2fr_4fr] lg:px-0">
      <div
        className="relative hidden lg:flex flex-col bg-white text-gray-900 dark:border-r h-screen overflow-hidden"
      >
        <video className="w-full h-full object-cover" autoPlay loop muted>
          <source src="/video/login-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex h-full items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-2xl p-8 space-y-8 bg-gray-100 rounded shadow">
          <div className="space-y-2 text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-pink-600 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 10l4.552-2.276A2 2 0 0119 12v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7a2 2 0 01.448-1.276L10 10M15 10V6a2 2 0 10-4 0v4m4 0H8"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center">계정을 만드세요</h2>
            <p className="text-center text-gray-400">
              이미 계정이 있으신가요?{" "}
              <a href="/login" className="text-blue-500">
                로그인
              </a>
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormControl>
                        <Input
                          type="text"
                          className="w-full px-4 py-2  rounded"
                          placeholder="사용자 이름"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormControl>
                        <Input
                          type="email"
                          className="w-full px-4 py-2 rounded"
                          placeholder="이메일"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormControl>
                        <Input
                          type="password"
                          className="w-full px-4 py-2  rounded"
                          placeholder="비밀번호"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem className="mb-3">
                      <FormControl>
                        <Input
                          type="password"
                          className="w-full px-4 py-2  rounded"
                          placeholder="비밀번호 확인"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  disabled={loading}
                  className="w-full flex mt-5 items-center justify-center px-4 py-2 space-x-2 bg-blue-500 rounded hover:bg-blue-900"
                  type="submit"
                >
                  계속하기
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
