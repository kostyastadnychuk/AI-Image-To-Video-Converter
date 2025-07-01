import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface RequestBody {
  walletid: number;
  accepted: string;
}

export async function POST(req: NextRequest) {
  try {
    // Fetch all entries from notifypayment table

    let index:number = 1;
    const wallets = await prisma.wallet.findMany({
      where: {
        accept_status: {
          not: 0,
        },
      },
      include: {
        userwallet: {
          select: {
            username: true,
          },
        },
      },
    });

    const results = wallets.map((wallet) => ({
      id: index++,
      wallet_id: wallet.id,
      username: wallet.userwallet.username,
      amount: wallet.amount,
      method: wallet.method,
      accept_status: wallet.accept_status,
      created_at: wallet.created_at,
      accepted_at: wallet.accepted_at,
      updated_at: wallet.updated_at,
    }));

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
