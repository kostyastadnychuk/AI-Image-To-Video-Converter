import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface RequestBody {
  walletid: number;
  accepted: string;
}

export async function POST(req: NextRequest) {
  try {
    // Fetch all entries from notifypayment table

    const body: RequestBody = await req.json();

    if (body.accepted === "approve") {
      const updatedWallet = await prisma.wallet.update({
        where: { id: body.walletid },
        data: {
          accept_status: 1,
          accepted_at: new Date(),
        },
        select: {
          userid: true,
          amount: true,
        }
      });

      const updatedUser = await prisma.user.update({
        where: { id: updatedWallet.userid },
        data: {
          stock: {
            increment: Number(updatedWallet.amount),
          },
        },
      });

      const deletedNotifyPayment = await prisma.notifypayment.delete({
        where: { wallet_id: body.walletid },
        });

    } else if (body.accepted === "cancel") {
      const updatedWallet = await prisma.wallet.update({
        where: { id: body.walletid },
        data: {
          accept_status: 2,
          accepted_at: new Date(),
        },
      });
      const deletedNotifyPayment = await prisma.notifypayment.delete({
        where: { wallet_id: body.walletid },
        });

    } else {
    }

    const notifyEntries = await prisma.notifypayment.findMany();
    let index: number = 1;
    
    // Loop through notifyEntries to get wallet_id and fetch corresponding Wallet entries
    const results = await Promise.all(
      notifyEntries.map(async (entry) => {
        const wallet = await prisma.wallet.findUnique({
          where: { id: entry.wallet_id },
          select: {
            id: true,
            userwallet: true,
            userid: true,
            amount: true,
            method: true,
            accept_status: true,
            created_at: true,
          },
        });

        const user = await prisma.user.findUnique({
          where: { id: entry.userid },
          select: {
            username: true,
          },
        });

        return {
          id: index++,
          wallet_id: entry.wallet_id,
          username: user?.username ?? "Unknown",
          amount: wallet?.amount,
          method: wallet?.method,
          accept_status: wallet?.accept_status,
          created_at: entry.created_at,
        };
      })
    );

    // Return the results in JSON format
    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
