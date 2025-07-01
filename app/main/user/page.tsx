"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "@/components/ui/use-toast";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

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
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isAccountUpdated, setIsAccountUpdated] = useState(false);

  const defaultValues = {
    username: session?.user?.username || "",
    email: session?.user?.email || "",
    prevpassword: "",
    password: "",
    passwordConfirm: "",
    };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });


  const onSubmit = async (data: UserFormValue) => {
    const res = await fetch(`/api/user/update`, {
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
      setDialogMessage("계정변경중 오류가 발생하였습니다.");
      setDialogOpen(true);
      setIsAccountUpdated(false);
    } else {
      const user = await res.json();
      console.log(user);
      setDialogMessage("계정이 성과적으로 변경되었습니다. 로그아웃후 다시 로그인하세요.");
      setDialogOpen(true);
      setIsAccountUpdated(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    if (isAccountUpdated) {
      signOut();
    }
  };

  return (
    <div className="flex min-h-screen lg:px-0 bg-gray-100">
      <div className="flex-col w-full items-center justify-center lg:px-0">
        <h2 className="mt-10 text-2xl font-bold text-center">
          계정을 관리하세요
        </h2>
        <div className="m-10">
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
                        placeholder="새 비밀번호"
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
                        placeholder="새비밀번호 확인"
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
                업데이트
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button style={{ display: "none" }}>Trigger</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>계정변경 알림</DialogTitle>
          <DialogDescription>
              <div className="text-gray-900">{dialogMessage}</div>
          </DialogDescription>
          <DialogFooter>
            <Button onClick={handleDialogClose}>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
