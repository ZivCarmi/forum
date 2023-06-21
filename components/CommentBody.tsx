"use client";

import { useState } from "react";
import { sanitize } from "isomorphic-dompurify";
import { useSession } from "next-auth/react";

import Date from "./Date";
import { CommentProp } from "./Comment";
import CommentForm from "@/app/topic/[id]/form";

const CommentBody = ({
  comment,
  isFollowing,
}: {
  comment: CommentProp;
  isFollowing: boolean;
}) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const { createdAt, updatedAt } = comment;
  const isEdited = createdAt.toISOString() !== updatedAt.toISOString();
  const { data: session } = useSession();

  const editHandler = () => {
    setIsEditMode(true);
  };

  return (
    <div className="grow py-7">
      <Date prefix="Posted" date={createdAt} className="mb-5" />
      {!isEditMode && (
        <>
          <div
            className="border-b border-neutral-200 dark:border-neutral-800 pb-4 mb-4"
            dangerouslySetInnerHTML={{ __html: sanitize(comment.content) }}
          />
          <div className="flex items-center gap-2">
            {session?.user?.id === comment.user.id.toString() && (
              <button onClick={editHandler}>Edit</button>
            )}
            {isEdited && <Date prefix="Last Edited" date={updatedAt} />}
          </div>
        </>
      )}
      {isEditMode && (
        <CommentForm
          isFollowing={isFollowing}
          method="PATCH"
          comment={comment.content}
        />
      )}
    </div>
  );
};
export default CommentBody;
