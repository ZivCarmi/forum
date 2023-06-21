import { Suspense } from "react";
import Link from "next/link";
import { sanitize } from "isomorphic-dompurify";

import PageTitle from "@/components/PageTitle";
import Container from "@/components/Container";
import SkeletonCategories from "@/components/SkeletonCategories";
import ForumList from "@/components/ForumList";
import { prisma } from "@/lib/prisma";
import Aside from "@/components/Aside";
import Date from "@/components/Date";

export const dynamic = "force-dynamic";

export default async function Home() {
  const latestTopics = await prisma.topic.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
      author: {
        select: {
          displayName: true,
        },
      },
      _count: {
        select: {
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  const latestComments = await prisma.comment.findMany({
    select: {
      id: true,
      content: true,
      topic: {
        select: {
          id: true,
          title: true,
        },
      },
      createdAt: true,
      user: {
        select: {
          displayName: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return (
    <Container>
      <div className="grid grid-cols-[minmax(auto,_1fr)_minmax(250px,_300px)] gap-5">
        <section>
          <PageTitle className="mb-5">Forums</PageTitle>
          <div className="grid gap-5">
            <Suspense fallback={<SkeletonCategories />}>
              <ForumList />
            </Suspense>
          </div>
        </section>
        <div className="space-y-5">
          <Aside title="Latest topics">
            {latestTopics.map((topic) => (
              <li
                key={topic.id}
                className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-700 flex justify-between gap-4"
              >
                <div>
                  <Link
                    href={`/topic/${topic.id}`}
                    className="text-sm font-medium"
                  >
                    {topic.title}
                  </Link>
                  <div className="text-neutral-600 dark:text-neutral-400 text-xs">
                    <Link href={`/profile/${topic.author.displayName}`}>
                      {topic.author.displayName}
                    </Link>{" "}
                    &#8231;{" "}
                    <Link href={`/topic/${topic.id}`}>
                      <Date
                        className="inline"
                        prefix="Started"
                        date={topic.createdAt}
                      />
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="w-8 h-8 flex items-center justify-center rounded-full text-xs bg-neutral-100 dark:bg-neutral-900">
                    {topic._count.comments}
                  </div>
                </div>
              </li>
            ))}
          </Aside>
          <Aside title="Latest comments">
            {latestComments.map((comment) => (
              <li
                key={comment.id}
                className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-700 flex justify-between gap-4"
              >
                <div>
                  <Link
                    href={`/topic/${comment.topic.id}`}
                    className="text-sm font-medium"
                  >
                    {comment.topic.title}
                  </Link>
                  <div className="text-neutral-600 dark:text-neutral-400 text-xs">
                    By{" "}
                    <Link href={`/profile/${comment.user.displayName}`}>
                      {comment.user.displayName}
                    </Link>{" "}
                    &#8231;{" "}
                    <Link
                      href={`/topic/${comment.topic.id}//#comment-${comment.id}`}
                    >
                      <Date
                        className="inline"
                        prefix="Posted"
                        date={comment.createdAt}
                      />
                    </Link>
                  </div>
                  <Link
                    href={`/topic/${comment.topic.id}//#comment-${comment.id}`}
                    className="text-sm font-medium mt-2 block"
                    dangerouslySetInnerHTML={{
                      __html: sanitize(comment.content, { ALLOWED_TAGS: [] }),
                    }}
                  />
                </div>
              </li>
            ))}
          </Aside>
        </div>
      </div>
    </Container>
  );
}
