import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

interface RequestBody {
  name: string;
  email: string;
  password: string;
}
const env_secret = process.env.NEXTAUTH_SECRET;

export async function POST(req: NextRequest) {
  try {

    if (!env_secret) {
      return NextResponse.json(
        { error: "Server error: secret not defined" },
        { status: 500 }
      );
    }

    const token = await getToken({ req, secret: env_secret });

    if (token) {
      const userid = Number(token.id);
      const body: RequestBody = await req.json();
      const user = await prisma.user.update({
        where: { id: userid },
        data: {
          username: body.name,
          email: body.email,
          password: await bcrypt.hash(body.password, 10),
        },
      });
      const { id, password, role, stock, created_at, ...result } = user;
      return new Response(JSON.stringify(result));
    } else {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized: No token provided" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.error("중복된 이메일입니다.");
        return new Response(JSON.stringify({ error: "email is duplicated." }), {
          status: 400,
        });
        // 사용자에게 중복된 이메일임을 알리는 로직 추가
      }
    } else if (error instanceof Error) {
      console.error(error.message);
      return new Response(
        JSON.stringify({ error: "An unexpected error occurred" }),
        { status: 500 }
      );
    } else {
      console.error("Unknown error", error);
      return new Response(JSON.stringify({ error: "Unknown error" }), {
        status: 500,
      });
    }
  }
}
