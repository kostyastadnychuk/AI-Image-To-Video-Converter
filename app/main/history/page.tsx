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
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';


interface ChargeHistory {
  id: number;
  userid: number;
  amount: string;
  method: string;
  created_at: string;
}

interface PurchaseHistory {
  id: number;
  userid: number;
  item: string;
  amount: string;
  created_at: string;
}

interface Wallet {
  id: number;
  wallet_id: number;
  amount: string;
  method?: string;
  accept_status?: number;
  created_at: string;
  accepted_at: string;
  updated_at: string;
}

type SortKeys = keyof Wallet;
type SortConfig = {
  key: SortKeys;
  direction: "ascending" | "descending";
} | null;

const History = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  const [activeTab, setActiveTab] = useState<'purchase' | 'charge'>('charge');
  const [chargeHistory, setChargeHistory] = useState<ChargeHistory[]>([]);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseHistory[]>([]);

  useEffect(() => {
    const fetchChargeHistory = async () => {
      const response = await fetch("/api/user/history", {
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

    const fetchPurchaseHistory = async () => {
      //const response = await axios.get('/api/purchase-history');
      //setPurchaseHistory(response.data);
    };

    fetchChargeHistory();
    fetchPurchaseHistory();
  }, []);

  useEffect(() => {
    if (tab === 'purchase' || tab === 'charge') {
      setActiveTab(tab as 'purchase' | 'charge');
    }
  }, [tab]);

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

  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filteredData = wallets.filter(
      (wallet) =>
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
    <div className="p-4">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'purchase' | 'charge')}>
        <TabsList>
          <TabsTrigger value="purchase">구매내역</TabsTrigger>
          <TabsTrigger value="charge">충전내역</TabsTrigger>
        </TabsList>

        <TabsContent value="charge">
        <div className="p-5">
      <div className="flex items-start justify-start">
        <Heading
          title={`충전내역 (${sortedWallets.length})`}
          description=""
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
          <TableCaption>충전내역 정보</TableCaption>
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
              <TableHead
                onClick={() => handleSort("accepted_at")}
                className="cursor-pointer"
              >
                <div className="flex justify-between items-center font-bold text-lg">
                  <span>처리된 시간 </span> {getSortIcon("accepted_at")}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedWallets.map((wallet) => (
              <TableRow key={wallet.id}>
                <TableCell>{wallet.id}</TableCell>
                <TableCell>{wallet.amount}</TableCell>
                <TableCell>{wallet.method ?? "N/A"}</TableCell>
                <TableCell>
                {wallet.accept_status === 1 ? "접수됨" : wallet.accept_status === 2 ? "취소됨" : "처리중..."}
                </TableCell>
                <TableCell>
                  {new Date(wallet.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(wallet.accepted_at).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
        </TabsContent>

        <TabsContent value="purchase">
          <Table>
            <TableCaption>구매내역</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseHistory.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell>{purchase.id}</TableCell>
                  <TableCell>{purchase.userid}</TableCell>
                  <TableCell>{purchase.item}</TableCell>
                  <TableCell>{purchase.amount}</TableCell>
                  <TableCell>{new Date(purchase.created_at).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default History;
