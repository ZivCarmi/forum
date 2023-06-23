import { motion } from "framer-motion";

import type { Forum } from "@prisma/client";
import ForumRow from "./ForumRow";

export interface ForumsWithStats extends Forum {
  subForums: {
    id: number;
    title: string;
  }[];
  _count: {
    topics: number;
  };
}

const Forums = ({ forums }: { forums: ForumsWithStats[] | undefined }) => {
  console.log(forums);

  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.6,
      }}
    >
      {forums?.map((forum) => (
        <ForumRow key={forum.id} forum={forum} />
      ))}
    </motion.ul>
  );
};

export default Forums;
