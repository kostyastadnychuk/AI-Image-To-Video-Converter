import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getToken } from 'next-auth/jwt';

interface RequestBody {
  walletid: number;
  accepted: string;
}

const env_secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  try {
    // Fetch all entries from notifypayment table

    if (!env_secret) 
    {
        return NextResponse.json({ error: 'Server error: secret not defined' }, { status: 500 });
    }
    
    const token = await getToken({ req, secret: env_secret});

    if (token) 
    {
        // Validate input
        const user_id = Number(token.id);
        let index:number = 1;
        const wallets = await prisma.wallet.findMany({
          where: {
            userid:user_id
          }
        });
    
        const results = wallets.map((wallet) => ({
          id: index++,
          wallet_id: wallet.id,
          amount: wallet.amount,
          method: wallet.method,
          accept_status: wallet.accept_status,
          created_at: wallet.created_at,
          accepted_at: wallet.accepted_at,
          updated_at: wallet.updated_at,
        }));
    
        // Return the results in JSON format
        return NextResponse.json(results);
        
    }
    else
    {
        return new NextResponse(
            JSON.stringify({ error: 'Unauthorized: No token provided' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
            );
    } 

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
