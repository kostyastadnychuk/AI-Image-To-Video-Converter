import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";

interface RequestBody {
  name: string;
  email: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    const user = await prisma.user.create({
      data: {
        username: body.name,
        email: body.email,
        password: await bcrypt.hash(body.password, 10),
        role: 2,
        stock: 100,
        created_at: new Date(), 
      },
    });
    const { id, password, role, stock, created_at, ...result } = user;
    return new Response(JSON.stringify(result));
  } 
  catch (error) 
  {
    if (error instanceof Prisma.PrismaClientKnownRequestError)
    {
      if (error.code === "P2002") 
      {
        console.error("중복된 이메일입니다.");
        return new Response(JSON.stringify({ error: 'email is duplicated.' }), { status: 400 });
        // 사용자에게 중복된 이메일임을 알리는 로직 추가
      }
    } 
    else if (error instanceof Error)
    {
      console.error(error.message);
      return new Response(JSON.stringify({ error: 'An unexpected error occurred' }), { status: 500 });
    } else {
      console.error('Unknown error', error);
      return new Response(JSON.stringify({ error: 'Unknown error' }), { status: 500 });
    }
  }
}
