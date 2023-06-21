import type { Comment, Topic } from "@prisma/client";
import TopicRow from "./TopicRow";

export interface TopicWithComments extends Topic {
  comments: Comment[];
}

const Topics = ({ topics }: { topics: TopicWithComments[] }) => {
  return (
    <ul className="flat">
      {topics?.map((topic) => (
        <TopicRow key={topic.id} topic={topic} />
      ))}
    </ul>
  );
};

export default Topics;
