"use client";

import { sanitize } from "isomorphic-dompurify";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaComments, FaComment } from "react-icons/fa";
import { useMemo } from "react";

import Date from "@/components/Date";
import { Button } from "@/components/ui/Button";

type FeedComment = {
  id: number;
  content: string;
  createdAt: Date;
  topic: {
    id: number;
    title: string;
    forum: {
      title: string;
      id: number;
    };
    _count: {
      comments: number;
    };
    author: {
      displayName: string;
    };
  };
};

type FeedTopic = {
  title: string;
  id: number;
  createdAt: Date;
  forum: {
    title: string;
    id: number;
  };
  comments: {
    content: string;
    topicInitiator: boolean;
  }[];
  _count: {
    comments: number;
  };
};

interface SortedFeedComment extends FeedComment {
  type: "comment";
}

interface SortedFeedTopic extends FeedTopic {
  type: "topic";
}

type FeedData = {
  comments: FeedComment[] | undefined;
  topics: FeedTopic[] | undefined;
};

const ProfileFeed = ({ data }: { data: FeedData }) => {
  const topics: SortedFeedTopic[] | undefined =
    data.topics?.map((topic) => ({
      type: "topic",
      ...topic,
    })) || [];

  const comments: SortedFeedComment[] | undefined =
    data.comments?.map((comment) => ({
      type: "comment",
      ...comment,
    })) || [];

  const feedData = [...topics, ...comments];

  const sortedFeed = useMemo(
    () =>
      feedData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
    [feedData]
  );

  return (
    <ul>
      {sortedFeed.map((item) => (
        <li
          key={item.type + item.id}
          className="flex gap-4 [&:not(:last-child)]:border-b border-neutral-300 dark:border-neutral-700 p-4"
        >
          {item.type === "comment" && <Comment {...item} />}
          {item.type === "topic" && <Topic {...item} />}
        </li>
      ))}
    </ul>
  );
};

const Comment: React.FC<SortedFeedComment> = (props) => {
  const { name } = useParams();
  const topicBy = props.topic.author.displayName;

  return (
    <>
      <div className="py-2">
        <div className="w-10 h-10 flex items-center justify-center self-start bg-neutral-200 dark:bg-neutral-800 rounded-full">
          <FaComment />
        </div>
      </div>
      <div>
        <h2 className="text-lg font-medium">
          <Link href={`/topic/${props.topic.id}`}>{props.topic.title}</Link>
        </h2>
        <p className="text-sm">
          {name} replied to{" "}
          <Button variant="link" asChild className="p-0">
            <Link href={`/profile/${topicBy}`}>{topicBy}</Link>
          </Button>
          's topic in{" "}
          <Button variant="link" asChild className="p-0">
            <Link href={`/forum/${props.topic.forum.id}`}>
              {props.topic.forum.title}
            </Link>
          </Button>
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: sanitize(props.content, { ALLOWED_TAGS: [] }),
          }}
          className="text-sm my-4 text-muted-foreground"
        />
        <div className="flex gap-6 text-sm text-neutral-600 dark:text-neutral-400">
          <Date date={props.createdAt} />
          {props.topic._count.comments} replies
        </div>
      </div>
    </>
  );
};

const Topic: React.FC<SortedFeedTopic> = (props) => {
  const { name } = useParams();

  return (
    <>
      <div className="py-2">
        <div className="w-10 h-10 flex items-center justify-center self-start bg-neutral-200 dark:bg-neutral-800 rounded-full">
          <FaComments />
        </div>
      </div>
      <div>
        <h2 className="text-lg font-medium">
          <Link href={`/topic/${props.id}`}>{props.title}</Link>
        </h2>
        <p className="text-sm">
          {name} posted a topic in{" "}
          <Button variant="link" asChild className="p-0">
            <Link href={`/forum/${props.forum.id}`}>{props.forum.title}</Link>
          </Button>
        </p>
        <div
          dangerouslySetInnerHTML={{
            __html: sanitize(props.comments[0].content, { ALLOWED_TAGS: [] }),
          }}
          className="text-sm my-4 text-muted-foreground"
        />
        <div className="flex gap-6 text-sm text-neutral-600 dark:text-neutral-400">
          <Date date={props.createdAt} />
          {props._count.comments} replies
        </div>
      </div>
    </>
  );
};

export default ProfileFeed;
