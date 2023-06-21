import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Props = {
  id: string;
};

export async function GET(req: Request, context: { params: Props }) {
  try {
    const { id } = context.params;

    const res = await prisma.topic.findFirst({
      where: {
        id: parseInt(id),
      },
      select: {
        title: true,
      },
    });

    return NextResponse.json(res);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
