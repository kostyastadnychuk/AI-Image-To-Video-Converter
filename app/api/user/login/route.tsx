import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { signJwtAccessToken } from "@/lib/jwt";

interface RequestBody {
  email: string;
  password: string;
  role: Number;
}

export async function POST(request: NextRequest) {
  const body: RequestBody = await request.json();

  if (!body.email) 
  {
    return new NextResponse(JSON.stringify(null), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      email: body.email,
    },
  });

  if (!user) {
    return new NextResponse(JSON.stringify(null), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  if( Number(body.role) !== user.role)
  {
    return new NextResponse(JSON.stringify(null), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // 비밀번호 비교
  if (!user.password) {
    return new NextResponse(JSON.stringify(null), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const isMatch = await bcrypt.compare(body.password, user.password);
  if (!isMatch) {
    return new NextResponse(JSON.stringify(null), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const { password, token , stock , ...userWithoutPass } = user;
  const accessToken = signJwtAccessToken(userWithoutPass);
  const result = {
    ...userWithoutPass,
    accessToken,
  };

  const response = NextResponse.json(result);
  return response;
  
}
