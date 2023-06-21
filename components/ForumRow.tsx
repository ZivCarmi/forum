import Link from "next/link";

import { ForumsWithStats } from "./Forums";

const ForumRow: React.FC<{ forum: ForumsWithStats }> = ({ forum }) => {
  const { _count } = forum;
  const topicsStat = _count?.topics > 0 && _count?.topics;
  const topicsStatLabel =
    _count?.topics > 1
      ? "topics"
      : _count?.topics === 1
      ? "topic"
      : "No topics";

  return (
    <li className="p-4 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-[auto_minmax(auto,_1fr)_minmax(auto,_100px)_minmax(auto,_300px)] gap-6">
      <div className="py-2">
        <div className="w-10 h-10 flex items-center justify-center bg-neutral-200 dark:bg-neutral-800 rounded-full">
          <svg
            className="w-3/6 h-3/6 text-white dark:text-neutral-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            ></path>
          </svg>
        </div>
      </div>
      <div>
        <h3>
          <Link href={`/forum/${forum.id}`} className="font-medium">
            {forum.title}
          </Link>
        </h3>
        <ul className="list-['•'] pl-4">
          {forum.subForums.map((subForum) => (
            <li
              key={subForum.id}
              className="pl-1 marker:text-neutral-400 dark:marker:text-neutral-500"
            >
              <Link
                href={`/forum/${subForum.id}`}
                className="text-sm font-medium"
              >
                {subForum.title}
              </Link>
            </li>
          ))}
        </ul>
        <p className="text-sm mt-1 text-muted-foreground">
          {forum.description}
        </p>
      </div>
      <div className="self-center text-sm">
        {topicsStat} {topicsStatLabel}
      </div>
      <div>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
    </li>
  );
};

export default ForumRow;
