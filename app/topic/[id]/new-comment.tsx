import { getServerSession } from "next-auth";

import NewCommentForm from "./create-form";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";

const NewComment = async ({
  topicId,
  isFollowing,
}: {
  topicId: string;
  isFollowing: boolean;
}) => {
  const session = await getServerSession(authOptions);

  return (
    <div className="flat p-8">
      <div className="text-4xl font-medium text-neutral-300 mb-6">
        Post a comment
      </div>
      {session ? (
        <NewCommentForm isFollowing={isFollowing} />
      ) : (
        <div>
          In order to post a comment, please{" "}
          <Link
            href={`/login?callbackUrl=${process.env.NEXT_PUBLIC_URL}/topic/${topicId}`}
          >
            login
          </Link>
        </div>
      )}
    </div>
  );
};

export default NewComment;
