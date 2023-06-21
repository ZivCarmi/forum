import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { displayName, email, password } = await req.json();
    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        displayName,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      user: {
        email: user.email,
      },
    });
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const { target }: any = error.meta;
      let message = "";

      target.map((field: string) => {
        if (error.code === "P2002") {
          if (field === "displayName") {
            message = "Display name is in use by another member.";
          }

          if (field === "email") {
            message = "Email is already in use.";
          }
        }
      });

      return NextResponse.json({ error: message }, { status: 500 });
    }

    throw error;
  }
}
