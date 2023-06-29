import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { sanitize } from "isomorphic-dompurify";
import { revalidatePath } from "next/cache";

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      message,
      follow,
      forumId,
    }: { title: string; message: string; follow: boolean; forumId: string } =
      await request.json();
    const session = await getServerSession(authOptions);
    const castedForumId = parseInt(forumId);

    if (!session) {
      return NextResponse.json(
        { error: "In order to create new topic, please login" },
        { status: 401 }
      );
    }

    const forum = await prisma.forum.findFirst({
      where: {
        id: castedForumId,
      },
    });

    if (!forum?.allowNewTopics) {
      return NextResponse.json(
        { error: "New topics are not allowed for the forum" },
        { status: 401 }
      );
    }

    const parsedUserId = parseInt(session.user!.id);

    // NEED TO CHECK IF USER HAS ROLE PERMISSION

    const topic = await prisma.topic.create({
      data: {
        title: title.trim(),
        forumId: castedForumId,
        authorId: parsedUserId,
        ...(follow && {
          followers: {
            connect: {
              id: parsedUserId,
            },
          },
        }),
        comments: {
          create: {
            userId: parsedUserId,
            topicInitiator: true,
            content: sanitize(message.trim()),
          },
        },
      },
    });

    revalidatePath("/");

    return NextResponse.json({
      topic: {
        data: topic,
        id: topic.id,
      },
    });
  } catch (error: any) {
    console.log(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Could not create new topic" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to create new topic" },
      { status: 500 }
    );
  }
}
