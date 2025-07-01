// pages/api/charge.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { getToken } from 'next-auth/jwt';

const env_secret = process.env.NEXTAUTH_SECRET;

interface RequestBody {
    amount: string;
    method: string;
  }

export async function POST(req: NextRequest) {
  
    if (!env_secret) 
    {
        return NextResponse.json({ error: 'Server error: secret not defined' }, { status: 500 });
    }

    const token = await getToken({ req, secret: env_secret});
    
    if (token) 
    {

        const userid = Number(token.id);
        if (!userid) {
          return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }
        
        try {
          
            const result = await prisma.user.findFirst({
                where: {
                  id: userid,
                },
                select: {
                    stock: true,
                }
              });
            
          return NextResponse.json(result);;
        } catch (error) {
          console.error(error);
          return NextResponse.json({ error: 'Error creating wallet entry' }, { status: 500 });
        }
        
    }
    else
    {
        return new NextResponse(
            JSON.stringify({ error: 'Unauthorized: No token provided' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
          );
    } 

    
}

export function GET() {
  return NextResponse.json({ error: 'Method GET Not Allowed' }, { status: 405 });
}

export function PUT() {
  return NextResponse.json({ error: 'Method PUT Not Allowed' }, { status: 405 });
}

export function DELETE() {
  return NextResponse.json({ error: 'Method DELETE Not Allowed' }, { status: 405 });
}


