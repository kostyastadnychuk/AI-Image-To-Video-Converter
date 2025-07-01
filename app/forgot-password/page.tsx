"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { getSession } from "next-auth/react";
import axios from "axios";
import * as z from "zod";
import Link from "next/link";

const formSchema = z.object({
  status: z.string(),
  email: z.string().email({ message: "유효한 이메일 주소를 입력하세요" }),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isredirect, setIsRedirect] = useState(false);

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
    try {
      const response = await axios.post("/api/user/forgotpassword", {
        email: data.email,
      });

      if (response.status === 200) {
        setMessage(response.data.message);
        setIsRedirect(true);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error("Error sending password reset email:", error);
    } finally {
      setLoading(false);
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    if (isredirect) {
      router.push("/login");
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
              비밀번호를 변경하세요.
            </h2>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-2"
            >
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
              <div className="flex flex-col md:flex-row items-center justify-center">
                <div className="text-sm">
                  <Link
                    href="/login"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    기억났다.로그인하러 가기
                  </Link>
                </div>
              </div>
              <Button
                disabled={loading}
                className="w-full flex mt-5 items-center justify-center px-4 py-2 space-x-2 bg-blue-500 text-white rounded hover:bg-blue-900"
                type="submit"
              >
                비밀번호 변경
              </Button>
            </form>
          </Form>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <VisuallyHidden>
                  <DialogTitle>알림</DialogTitle>
                </VisuallyHidden>
                <DialogDescription>
                  {message}
                </DialogDescription>
              </DialogHeader>
              <div className="dialog-actions">
                <Button onClick={handleDialogClose}>확인</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
