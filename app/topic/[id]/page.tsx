import { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import Comment from "@/components/Comment";
import Container from "@/components/Container";
import PageTitle from "@/components/PageTitle";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";
import NewComment from "./new-comment";
import getTopic from "@/lib/getTopic";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const forumData: Promise<{ title: string }> = getTopic(id);
  const forum = await forumData;

  return {
    title: forum.title,
  };
}

const Topic = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const data = await prisma.topic.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      followers: {
        select: {
          id: true,
        },
      },
      author: {
        select: {
          displayName: true,
        },
      },
      forum: {
        select: {
          title: true,
        },
      },
      comments: {
        select: {
          id: true,
          content: true,
          user: {
            select: {
              id: true,
              displayName: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });
  const session = await getServerSession(authOptions);
  const foundFollower = data?.followers.find(
    (follower: { id: number }) => follower.id.toString() === session?.user?.id
  );
  const isFollowing = Boolean(foundFollower);

  return (
    <Container>
      <div className="flat mb-6 p-8">
        <PageTitle className="border-b border-neutral-200 dark:border-neutral-800 pb-3 mb-3">
          {data?.title}
        </PageTitle>
        <div className="flex justify-between">
          <div>
            <div>
              By{" "}
              <Link href={`/profile/${data?.authorId}`}>
                {data?.author.displayName}
              </Link>
            </div>
            <div>
              In{" "}
              <Link href={`/forum/${data?.forumId}`}>{data?.forum.title}</Link>
            </div>
          </div>
          <div>
            <Button>Follow ({data?.followers.length})</Button>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {data?.comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            isFollowing={isFollowing}
          />
        ))}
        {data?.active && <NewComment topicId={id} isFollowing={isFollowing} />}
      </div>
    </Container>
  );
};

export default Topic;
