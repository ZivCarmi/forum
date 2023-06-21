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
      message,
      follow,
      topicId,
    }: { message: string; follow: boolean; topicId: string } =
      await request.json();
    const session = await getServerSession(authOptions);
    const parsedTopicId = parseInt(topicId);

    if (!session) {
      return NextResponse.json(
        { error: "In order to post a comment, please login" },
        { status: 401 }
      );
    }

    const topic = await prisma.topic.findFirst({
      where: {
        id: parsedTopicId,
      },
      select: {
        active: true,
        forumId: true,
        followers: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!topic?.active) {
      return NextResponse.json(
        { error: "Topic is close for comments" },
        { status: 401 }
      );
    }

    const parsedUserId = parseInt(session.user!.id);

    const follower = topic.followers.find(
      (follower) => follower.id === parsedUserId
    );
    const isFollowing = Boolean(follower);

    // NEED TO CHECK IF USER HAS ROLE PERMISSION

    const registerAsFollower = {
      followers: {
        connect: {
          id: parsedUserId,
        },
      },
    };
    const unregisterAsFollower = {
      followers: {
        disconnect: {
          id: parsedUserId,
        },
      },
    };

    const updatedTopic = await prisma.topic.update({
      where: {
        id: parsedTopicId,
      },
      data: {
        ...(follow && !isFollowing && registerAsFollower),
        ...(!follow && isFollowing && unregisterAsFollower),
        comments: {
          create: {
            content: sanitize(message.trim()),
            userId: parsedUserId,
          },
        },
      },
    });

    revalidatePath("/");

    return NextResponse.json({ updatedTopic });
  } catch (error: any) {
    console.log(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Could not post the comment" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: "Failed to post the comment" },
      { status: 500 }
    );
  }
}
