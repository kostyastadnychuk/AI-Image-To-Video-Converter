"use client";

import React, { useEffect,useState } from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  paymentname: z.string().min(1, "입금자명은 비워 둘 수 없습니다."),
  paymentamount: z
    .string()
    .min(1, "입금할 금액은 비워 둘 수 없습니다.")
    .regex(/^\d+$/, "입금할 금액은 숫자여야 합니다."),
});

type UserFormValue = z.infer<typeof formSchema>;

interface Credits {
  stock: number;
}

export function CreditCard() {
  const { data: session } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [credits, setCredits] = useState<Credits>({ stock: 0 });
  const router = useRouter();

  const handleNavigation = (tab: string) => {
    router.push(`/main/history?tab=${tab}`);
  };

  const defaultValues = {
    paymentname: "",
    paymentamount: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { register, handleSubmit, formState: { errors }, control, reset } = form;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/user/stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletid: 0,
          accepted: "all"
        })
      });
      const data = await response.json();
      setCredits(data);
    };

    fetchData();
  }, []);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => {
    setIsDialogOpen(false);
    reset();
  };

  const onSubmit = async (data: UserFormValue) => {
    try {
      const response = await fetch("/api/user/charge", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount : data.paymentamount , method : data.paymentname}),
      });
      if (response.ok) {
        // Handle successful response
        alert("충전 요청이 성공적으로 접수되었습니다.");
        closeDialog();
      } else {
        // Handle error response
        alert("충전 요청에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("충전 요청 중 오류가 발생했습니다.");
    }
  };

  if (session) {
    return (
      <div className="flex flex-col items-center">
        <div className="mb-2">
          <img
            src="/forbio.webp"
            alt="User Avatar"
            className="rounded-full w-16 h-16"
          />
        </div>
        <div className="mb-1">
          <strong>{session?.user?.username ?? "Guest"}님</strong>
        </div>
        <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-900">
          <div className="bg-gray-200 text-gray-900 rounded-lg p-6 w-60">
            <div className="flex mb-1 justify-center items-center">
              잔고: {credits.stock.toLocaleString('ko-KR')}원
            </div>
            <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {
              setIsDialogOpen(isOpen);
              if (!isOpen) {
                reset(defaultValues);
              }
            }}>
              <DialogTrigger asChild>
                <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full mb-2">
                  충전하기
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-100 text-gray-900 rounded-lg p-6 max-w-md mx-auto">
                <DialogHeader>
                  <DialogTitle>결제</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-2"
                  >
                    <FormField
                      control={form.control}
                      name="paymentname"
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-start space-y-2">
                          <div className="flex flex-row items-center space-x-2">
                            <FormLabel className="flex-none w-24">
                              입금자명
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                className="w-30 p-2 rounded"
                                placeholder={session?.user?.username ?? "Guest"}
                                disabled={loading}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500"/>
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="paymentamount"
                      render={({ field }) => (
                        <FormItem className="flex flex-col justify-start space-y-2">
                          <div className="flex flex-row items-center space-x-2">
                            <FormLabel className="flex-none w-24">
                              입금할 금액
                            </FormLabel>
                            <FormControl>
                            <Input
                              type="text"
                              className="w-30 p-2 rounded"
                              placeholder="3000"
                              disabled={loading}
                              {...field}
                            />
                            </FormControl>
                            <FormMessage className="text-red-500"/>
                            <span className="ml-2">원</span>
                          </div>
                        </FormItem>
                      )}
                    />
                    <div className="mb-4">
                      <p className="text-yellow-500">주의사항</p>
                      <ul className="text-sm text-gray-400">
                        <li>송금자명은 한번 지정시 변경이 불가능 합니다.</li>
                        <li>친구에게 송금하시면 안됩니다.</li>
                        <li>
                          반드시 입금표시에 꼭 송금자명 맞춰서 송금해야합니다.
                        </li>
                        <li>
                          1시간동안 입금확인이 되지 않을 경우 취소처리 됩니다.
                        </li>
                        <li>
                          입금 신청을 잘못하신 경우 1시간후 다시 시도해주세요.
                        </li>
                      </ul>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                      >
                        충전하기
                      </Button>
                    </div>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            <div className="flex flex-row space-x-2">
              <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mb-2" onClick={() => handleNavigation('purchase')}>
                구매내역
              </Button>
              <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full" onClick={() => handleNavigation('charge')}>
                충전내역
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
