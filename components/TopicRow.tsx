import Link from "next/link";
import { HiLockClosed } from "react-icons/hi";
import { TbPinnedFilled } from "react-icons/tb";
import { FaHotjar } from "react-icons/fa";
import { getServerSession } from "next-auth";

import type { TopicWithComments } from "./Topics";
import Date from "./Date";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditTopicDropdown from "./EditTopicDropdown";

const TopicRow = async ({ topic }: { topic: TopicWithComments }) => {
  const session = await getServerSession(authOptions);
  const { comments } = topic;
  const totalReplies = comments.length - 1;
  const replyStat = totalReplies > 0 && totalReplies;
  const replyLabel =
    totalReplies > 1 ? "replies" : totalReplies === 1 ? "reply" : "No replies";

  const lastComment = topic.comments.at(-1);
  const lastCommentedUser = await prisma.user.findFirst({
    where: {
      id: lastComment?.userId,
    },
    select: {
      id: true,
      displayName: true,
    },
  });

  return (
    <li className="p-4 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-[minmax(auto,_1fr)_minmax(auto,_100px)_minmax(auto,_300px)] gap-6">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          {!topic.active && (
            <HiLockClosed size="0.875rem" className="text-neutral-300" />
          )}
          {topic.pinned && (
            <div className="bg-neutral-700 rounded-full w-5 h-5 flex items-center justify-center">
              <TbPinnedFilled size="0.875rem" className="text-yellow-500" />
            </div>
          )}
          {topic.hot && (
            <div className="bg-neutral-700 rounded-full w-5 h-5 flex items-center justify-center">
              <FaHotjar size="0.875rem" className="text-yellow-500" />
            </div>
          )}
        </div>
        <h3>
          <Link href={`/topic/${topic.id}`} title={topic.title}>
            {topic.title}
          </Link>
        </h3>
      </div>
      <div className="self-center text-sm">
        {replyStat} {replyLabel}
      </div>
      <div className="flex items-center justify-between gap-4">
        <div className="text-sm">
          <Link href={`/profile/${lastCommentedUser?.id}`}>
            {lastCommentedUser?.displayName}
          </Link>
          <Date date={lastComment?.createdAt} />
        </div>
        {session?.user.role === "ADMIN" && (
          <EditTopicDropdown
            id={topic.id}
            forumId={topic.forumId}
            active={topic.active}
            pinned={topic.pinned}
          />
        )}
      </div>
    </li>
  );
};

export default TopicRow;
