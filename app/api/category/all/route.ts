import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const categories = await prisma.category.findMany({
      include: {
        forums: {
          include: {
            subForums: {
              select: {
                id: true,
                title: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(categories);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
