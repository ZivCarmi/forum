"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

import { cn } from "@/lib/utils";
import Forums, { ForumsWithStats } from "./Forums";

export interface CategoryProps {
  id: number | string;
  title: string;
  forums: ForumsWithStats[] | undefined;
  titleAsLink?: boolean;
  expandable?: boolean;
  className?: string;
}

const CategoryList = ({
  id,
  title,
  forums,
  titleAsLink = true,
  expandable = true,
  className,
}: CategoryProps) => {
  const [isToggled, setIsToggled] = useState(true);

  return (
    <motion.div
      className={cn("flat", className)}
      initial={{ opacity: 0.85 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.15 }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="text-lg font-semibold">
          {titleAsLink ? <Link href={`category/${id}`}>{title}</Link> : title}
        </h2>
        {expandable && (
          <button
            type="button"
            onClick={() => setIsToggled((prevToggled) => !prevToggled)}
          >
            <motion.svg
              className="w-8 h-8 stroke-2 text-slate-400 transition-colors duration-500 hover:text-neutral-500 dark:hover:text-neutral-300"
              animate={{ rotate: !isToggled ? 90 : 0 }}
              transition={{
                duration: 0.15,
              }}
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
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              ></path>
            </motion.svg>
          </button>
        )}
      </div>
      {isToggled && <Forums forums={forums} />}
    </motion.div>
  );
};

export default CategoryList;
