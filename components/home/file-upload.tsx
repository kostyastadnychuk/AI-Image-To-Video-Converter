"use client";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";
import { Trash } from "lucide-react";
import Image from "next/image";
import { UploadFileResponse } from "uploadthing/client";
import { IMG_MAX_LIMIT } from "./product-form";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { MouseEvent, ReactNode, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface ImageUploadProps {
  onChange?: any;
  onRemove: (value: UploadFileResponse[]) => void;
  value: UploadFileResponse[];
}

interface ClickBlockerProps {
  children: ReactNode;
}

const ClickBlocker: React.FC<ClickBlockerProps> = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!session) {
      event.preventDefault();
      event.stopPropagation();
      router.push("/login");
    }
  };

  return <div onClick={handleClick}>{children}</div>;
};

export default function FileUpload({
  onChange,
  onRemove,
  value,
}: ImageUploadProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const preventDragEvents = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDeleteFile = (key: string) => {
    const files = value;
    let filteredFiles = files.filter((item) => item.key !== key);
    onRemove(filteredFiles);
  };

  const onUpdateFile = async (newFiles: UploadFileResponse[]) => {
    onChange([...value, ...newFiles]);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const handleLogin = () => {
    // 로그인 페이지로 이동
    router.push("/login");
  };
  const onHandleClick = () => {
    if (!session) {
      setIsDialogOpen(true);
    }
  };
  return (
    <div>
      {!!value.length &&
        value?.map((item) => (
          <div className="mt-4 flex items-center justify-center gap-4 bg-gray-100 rounded-md mx-2 border-2 border-blue-500 border-dashed">
            <div
              key={item.key}
              className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
            >
              <div className="absolute right-2 top-2 z-10">
                <Button
                  type="button"
                  onClick={() => onDeleteFile(item.key)}
                  variant="destructive"
                  size="sm"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <Image
                  fill
                  className="object-cover"
                  alt="Image"
                  src={item.fileUrl || ""}
                />
              </div>
            </div>
          </div>
        ))}
      <div className="cursor-pointer" onClick={onHandleClick}>
        <div
          style={{
            pointerEvents: session ? "auto" : "none",
            opacity: session ? 1 : 0.5,
          }}
        >
          {value.length < IMG_MAX_LIMIT && (
            <UploadDropzone<OurFileRouter>
              className="ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300 py-2 dark:bg-zinc-800 rounded-md mx-2 border-2 border-blue-500 border-dashed"
              endpoint="imageUploader"
              config={{ mode: "auto" }}
              content={{
                label: "파일을 선택하거나 드래그 앤 드롭하세요",
                allowedContent({ isUploading }) {
                  if (isUploading) {
                    return (
                      <p className="mt-2 animate-pulse text-sm text-slate-400">
                        이미지를 업로드 중입니다...
                      </p>
                    );
                  }
                  return <p className="mt-2 text-sm text-slate-400"></p>;
                },
              }}
              onClientUploadComplete={(res) => {
                // Do something with the response
                const data: UploadFileResponse[] | undefined = res;
                if (data) {
                  onUpdateFile(data);
                }
              }}
              onUploadError={(error: Error) => {
                toast({
                  title: "Error",
                  variant: "destructive",
                  description: error.message,
                });
              }}
              onUploadBegin={() => {}}
            />
          )}
        </div>
      </div>
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="flex flex-col items-center justify-center text-center">
          <AlertDialogHeader>
            <VisuallyHidden>
              <AlertDialogTitle className="flex justify-center items-center font-bold text-red-500">
                알림
              </AlertDialogTitle>
            </VisuallyHidden>
            <AlertDialogDescription className="flex justify-center items-center text-gray-900">
              로그인을 해야 이미지를 업로드 할 수 있습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center space-x-4 mt-4">
            <AlertDialogAction
              onClick={handleLogin}
              className="flex-1 text-center py-2 px-4 border rounded-md"
            >
              로그인
            </AlertDialogAction>
            <AlertDialogAction
              onClick={closeDialog}
              className="flex-1 text-center py-2 px-4 border rounded-md"
            >
              취 소
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
