import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/mailer";
import { signJwtAccessToken } from "@/lib/jwt";

interface RequestBody {
  email: string;
}

export async function POST(request: NextRequest) {

  try
  {
    const body: RequestBody = await request.json();
    console.log(body);
    console.log(body.email);
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
  
    if (!user) {
      return NextResponse.json({error: "User does not exist"}, {status: 400})
    }
  
    const { password, token , role , stock , ...userWithoutPass } = user;
    const newtoken = await signJwtAccessToken(userWithoutPass, {expiresIn: "1h"})
    const subject = "비밀번호 변경";
    //await sendEmail(body.email, subject, { domsn: process.env.DOMAIN, token });
    const resetLink = process.env.NEXTAUTH_URL + '/reset-password?token=' + newtoken;
    const username = user.username ?? '';
    const recipientEmail = body.email;

    sendEmail(recipientEmail, subject, { resetLink, username })
    .then(() => console.log('Password reset email sent successfully'))
    .catch((error) => console.error('Failed to send password reset email', error));

    return NextResponse.json({ message: "비밀번호 변경 이메일이 성공적으로 전송되였습니다. 귀하의 이메일을 확인하시고 비밀번호를 재설정 하세요." });
    
  }
  catch(error: any)
  {
    return NextResponse.json({error: error.message}, {status: 500})
  }
  
}
