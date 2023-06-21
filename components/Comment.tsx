import type { Comment } from "@prisma/client";
import Link from "next/link";

import CommentBody from "./CommentBody";

export type CommentProp = {
  id: number;
  content: string;
  user: {
    id: number;
    displayName: string;
  };
  createdAt: Date;
  updatedAt: Date;
};

const Comment = async ({
  comment,
  isFollowing,
}: {
  comment: CommentProp;
  isFollowing: boolean;
}) => {
  return (
    <div className="flex flat px-8 gap-8" id={`comment-${comment.id}`}>
      <div className="py-6">
        <Link
          href={`/profile/${comment.user.id}`}
          className="text-lg font-semibold"
        >
          {comment.user.displayName}
        </Link>
        <div>{}</div>
      </div>
      <CommentBody comment={comment} isFollowing={isFollowing} />
    </div>
  );
};

export default Comment;
