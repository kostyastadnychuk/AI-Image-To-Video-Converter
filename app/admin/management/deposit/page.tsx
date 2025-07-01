"use client";
import React, { useEffect, useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface Wallet {
  id: number;
  wallet_id: number;
  username: string;
  amount: string;
  method?: string;
  accept_status?: boolean;
  created_at: string;
}

type SortKeys = keyof Wallet;
type SortConfig = {
  key: SortKeys;
  direction: "ascending" | "descending";
} | null;

export default function WalletTable() {
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [filteredWallets, setFilteredWallets] = useState<Wallet[]>([]);
  const [dialogType, setDialogType] = useState<string>("");
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const handleOpenDialog = (wallet: Wallet, type: string) => {
    setSelectedWallet(wallet);
    setDialogType(type);
  };

  const handleConfirm = async () => {
    if (dialogType === "approve") 
    {
      const response = await fetch("/api/admin/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletid: selectedWallet?.wallet_id,
          accepted: "approve"
        })
      });
      const data = await response.json();
      setWallets(data);
      setFilteredWallets(data);
    } else if (dialogType === "cancel") {
      const response = await fetch("/api/admin/deposit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          walletid: selectedWallet?.wallet_id,
          accepted: "cancel"
        })
      });
      const data = await response.json();
      setWallets(data);
      setFilteredWallets(data);
    }
    setSelectedWallet(null);
    setDialogType("");
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/admin/deposit", {
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
      setWallets(data);
      setFilteredWallets(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filteredData = wallets.filter(
      (wallet) =>
        wallet.username.toLowerCase().includes(lowercasedSearchTerm) ||
        wallet.amount.includes(lowercasedSearchTerm) ||
        wallet.method?.toLowerCase().includes(lowercasedSearchTerm) ||
        (wallet.accept_status ? "Accepted" : "Pending")
          .toLowerCase()
          .includes(lowercasedSearchTerm) ||
        new Date(wallet.created_at)
          .toLocaleString()
          .toLowerCase()
          .includes(lowercasedSearchTerm)
    );
    setFilteredWallets(filteredData);
  }, [searchTerm, wallets]);

  const sortedWallets = useMemo(() => {
    if (sortConfig !== null) {
      const sortedData = [...filteredWallets].sort((a, b) => {
        const aValue = a[sortConfig.key] ?? "";
        const bValue = b[sortConfig.key] ?? "";

        if (aValue < bValue) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
      return sortedData;
    }
    return filteredWallets;
  }, [filteredWallets, sortConfig]);

  const handleSort = (key: SortKeys) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: SortKeys) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <FaSort />;
    }
    if (sortConfig.direction === "ascending") {
      return <FaSortUp />;
    }
    return <FaSortDown />;
  };

  return (
    <div className="p-5">
      <div className="flex items-start justify-start">
        <Heading
          title={`입금신청수 (${sortedWallets.length})`}
          description="사용자들의 입금신청정보를 보여줍니다."
        />
      </div>
      <Separator className="mt-5 mb-5"/>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full md:max-w-sm"
        />
      </div>
      <ScrollArea className="h-[calc(90vh-220px)] rounded-md border">
        <Table>
          <TableCaption>입금신청 정보</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead
                onClick={() => handleSort("id")}
                className="cursor-pointer"
              >
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>번호</span> {getSortIcon("id")}
                </div>
              </TableHead>
              <TableHead
                onClick={() => handleSort("username")}
                className="cursor-pointer"
              >
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>사용자 이름</span> {getSortIcon("username")}
                </div>
              </TableHead>
              <TableHead
                onClick={() => handleSort("amount")}
                className="cursor-pointer"
              >
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>액수</span> {getSortIcon("amount")}
                </div>
              </TableHead>
              <TableHead
                onClick={() => handleSort("method")}
                className="cursor-pointer"
              >
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>입금방법</span> {getSortIcon("method")}
                </div>
              </TableHead>
              <TableHead
                onClick={() => handleSort("accept_status")}
                className="cursor-pointer"
              >
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>입금상태</span> {getSortIcon("accept_status")}
                </div>
              </TableHead>
              <TableHead
                onClick={() => handleSort("created_at")}
                className="cursor-pointer"
              >
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>신청시간 </span> {getSortIcon("created_at")}
                </div>
              </TableHead>
              <TableHead>관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedWallets.map((wallet) => (
              <TableRow key={wallet.id}>
                <TableCell>{wallet.id}</TableCell>
                <TableCell>{wallet.username}</TableCell>
                <TableCell>{wallet.amount}</TableCell>
                <TableCell>{wallet.method ?? "N/A"}</TableCell>
                <TableCell>
                  {wallet.accept_status ? "Accepted" : "Pending"}
                </TableCell>
                <TableCell>
                  {new Date(wallet.created_at).toLocaleString()}
                </TableCell>
                <TableCell className="space-x-5">
                  <Button onClick={() => handleOpenDialog(wallet, "approve")}>
                    입금승인
                  </Button>
                  <Button onClick={() => handleOpenDialog(wallet, "cancel")}>
                    입금취소
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {selectedWallet && (
          <Dialog
            open={!!selectedWallet}
            onOpenChange={() => setSelectedWallet(null)}
          >
            <DialogTrigger asChild>
              <Button style={{ display: "none" }}>Trigger</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>
                {dialogType === "approve" ? "입금승인" : "입금취소"}
              </DialogTitle>
              <DialogDescription>
                {dialogType === "approve"
                  ? "정말로 승인하겠습니까?"
                  : "정말로 취소하겠습니까?"}
              </DialogDescription>
              <DialogFooter>
                <Button onClick={handleConfirm}>확인</Button>
                <DialogClose asChild>
                  <Button>취소</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </ScrollArea>
    </div>
  );
}
