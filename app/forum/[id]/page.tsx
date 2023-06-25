import { Suspense } from "react";
import { Metadata } from "next";

import CategoryList from "@/components/CategoryList";
import SkeletonTopics from "@/components/SkeletonTopics";
import Container from "@/components/Container";
import Topics from "@/components/Topics";
import ActionBar from "./actions";
import { prisma } from "@/lib/prisma";
import getForum from "@/lib/getForum";
import Description from "./forum-description";
import ForumTitle from "./ForumTitle";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const id = params.id;

  // fetch data
  const forumData: Promise<{ title: string; description: string | null }> =
    getForum(id);
  const forum = await forumData;

  return {
    title: forum.title,
    description: forum.description,
  };
}

export const dynamic = "force-dynamic";

const Forum = async ({ params }: Props) => {
  const { id } = params;
  const data = await prisma.forum.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      subForums: {
        include: {
          subForums: true,
          _count: {
            select: {
              topics: true,
            },
          },
        },
      },
      topics: {
        orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
        include: {
          comments: true,
        },
      },
    },
  });

  return (
    <Container>
      <div className="mb-6">
        <ForumTitle title={data!.title} />
        {data?.description && <Description content={data.description} />}
      </div>
      {!!data?.subForums.length && (
        <CategoryList
          id={id}
          title="Subforums"
          forums={data?.subForums}
          titleAsLink={false}
          className="mb-6"
        />
      )}
      <ActionBar openForTopics={data?.allowNewTopics} />
      <Suspense fallback={<SkeletonTopics />}>
        {!!data?.topics.length ? (
          <Topics topics={data?.topics} />
        ) : (
          <div className="flat h-64 flex items-center justify-center text-neutral-500 text-3xl">
            No topics available
          </div>
        )}
      </Suspense>
    </Container>
  );
};

export default Forum;
