"use client";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle, FaFacebookF, FaTwitter, FaMicrosoft } from "react-icons/fa";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { getSession } from "next-auth/react";
import * as z from "zod";

const formSchema = z.object({
  status: z.string(),
  email: z.string().email({ message: "유효한 이메일 주소를 입력하세요" }),
  password: z
    .string()
    .min(8, { message: "암호 길이는 8자 이상이어야 합니다" })
    .regex(/[0-9]/, { message: "암호에는 숫자가 하나 이상 포함되어야 합니다" })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "암호는 하나 이상의 특수 문자를 포함해야 합니다",
    }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function AuthenticationPage() {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await getSession();
        if (session) {
          router.push("/main"); // 세션이 있는 경우 /main 페이지로 리디렉트
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchData();
  }, [router]);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    status: "",
    email: "",
    password: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      role: 2,
      callbackUrl: callbackUrl ?? "/main",
      redirect: false, // 리디렉션을 비활성화하여 결과를 직접 처리
    });

    setLoading(false);

    if (result?.error) {
      form.setError("status", {
        type: "manual",
        message: "이메일 또는 비밀번호가 맞지 않습니다.",
      });
    } else {
      // 로그인 성공 시 리디렉션
      window.location.href = callbackUrl ?? "/main";
    }
  };

  return (
    <div className="relative h-screen flex-col items-center justify-center relative h-screen md:grid lg:grid-cols-[2fr_4fr] lg:px-0">
      <div className="relative hidden lg:flex flex-col bg-white text-gray-900 dark:border-r h-screen overflow-hidden">
        <video className="w-full h-full object-cover" autoPlay loop muted>
          <source src="/video/login-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex h-full items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-2xl p-8 space-y-8 bg-gray-100 rounded shadow">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              귀하의 계정에 로그인하세요
            </h2>
            <p className="text-sm text-gray-600">
              계정이 없으신가요?{" "}
              <Link
                href="/signup"
                className="font-medium text-blue-600 hover:underline"
              >
                가입하세요
              </Link>
            </p>
          </div>
          <div className="mt-4">
            <Button className="w-full flex items-center justify-center px-4 py-2 space-x-2 bg-[#03C75A] text-white rounded hover:bg-[#029a46]">
              <span>네이버로 로그인</span>
            </Button>
          </div>
          <div className="flex items-center justify-center my-8">
            <div className="pl-10 border-t border-gray-300"></div>
            <span className="px-2 text-gray-500">또는</span>
            <div className="pr-10 border-t border-gray-300"></div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-2"
            >
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-center">
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="이메일을 입력하세요..."
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
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="**********"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col md:flex-row items-center justify-center">
                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    비밀번호를 잊으 셨나요?
                  </Link>
                </div>
              </div>
              <Button
                disabled={loading}
                className="w-full flex mt-5 items-center justify-center px-4 py-2 space-x-2 bg-blue-500 text-white rounded hover:bg-blue-900"
                type="submit"
              >
                로그인
              </Button>
            </form>
          </Form>
          <div className="relative flex justify-center text-sm mt-6">
            <span className="px-2 bg-white text-gray-500">
              다른 방법으로 로그인
            </span>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <button className="p-2 bg-blue-500 rounded-full text-gray-700 hover:bg-blue-500">
              <FaGoogle />
            </button>
            <button className="p-2 bg-blue-300 rounded-full text-gray-700 hover:bg-blue-500">
              <FaFacebookF />
            </button>
            <button className="p-2 bg-blue-300 rounded-full text-gray-700 hover:bg-blue-500">
              <FaTwitter />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
