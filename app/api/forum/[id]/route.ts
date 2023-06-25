import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

type Props = {
  id: string;
};

export async function GET(req: Request, context: { params: Props }) {
  try {
    const { id } = context.params;

    const res = await prisma.forum.findFirst({
      where: {
        id: parseInt(id),
      },
      select: {
        title: true,
        description: true,
      },
    });

    return NextResponse.json(res);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: Request, context: { params: Props }) {
  try {
    const session = await getServerSession(authOptions);
    const { id } = context.params;
    const payload = await req.json();
    const updateData: any = {};

    if (session?.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Not an admin!" }, { status: 401 });
    }

    for (const key in payload) {
      updateData[key] = payload[key];
    }

    await prisma.forum.update({
      where: {
        id: parseInt(id),
      },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
