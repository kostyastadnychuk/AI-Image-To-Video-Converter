import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { signJwtAccessToken , verifyJwt } from "@/lib/jwt";

interface RequestBody {
  email: string;
  password: string;
  token: string;
}

export async function POST(request: NextRequest) 
{
    try
    {
        const body: RequestBody = await request.json();

        const decoded = verifyJwt(body.token);
        
        if (!decoded) 
        {
            return  NextResponse.json({ message: '입력하신 비밀번호 변경정보가 정확하지 않습니다.' }, { status: 401 });
        }

        const payload_email = decoded.email;

        if( payload_email !== body.email)
        {
            return  NextResponse.json({ message: '비밀번호 변경을 위한 이메일 정보가 정확하지 않습니다.' }, { status: 401 });
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        // 이메일을 기준으로 사용자의 비밀번호 업데이트
        const updatedUser = await prisma.user.update({
        where: {
            email: body.email,
        },
        data: {
            password: hashedPassword,
        },
        });
      
        const response = NextResponse.json({ message: '비밀번호가 변경되었습니다.' });
        return response;
        
    }
    catch
    {
        return NextResponse.json({ message: '비밀번호 변경중 오류가 발생하였습니다.' }, { status: 401 });
    }
 
}
