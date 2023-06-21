"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/Button";

const ActionBar = ({
  openForTopics,
}: {
  openForTopics: boolean | undefined;
}) => {
  const pathname = usePathname();

  return (
    <div className="flex mb-6">
      {openForTopics && (
        <Button size="lg" asChild className="ml-auto bg-yellow-400">
          <Link href={`${pathname}/new-topic`}>Start new topic</Link>
        </Button>
      )}
    </div>
  );
};

export default ActionBar;
