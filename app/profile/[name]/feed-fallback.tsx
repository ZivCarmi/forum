"use client";

import { useParams } from "next/navigation";

const FeedFallback = () => {
  const { name } = useParams();

  return (
    <div className="p-10 text-lg text-center text-muted">
      {name} has no recent activity to show
    </div>
  );
};
export default FeedFallback;
