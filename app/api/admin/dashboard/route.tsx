import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface ResponseBody {
  totalIncome: number,
  totalSubscriptions: number,
  totalVideos: number,
  
}


export async function POST(req: NextRequest) {
  try {
    
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
