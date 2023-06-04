"use client";

import Link from "next/link";
import { useContext, useState } from "react";

import ForumRow from "./ForumRow";
import { ForumContext } from "@/store/forums-context";
import { CategoryContext } from "@/store/category-context";

const CategoryList: React.FC<{
  categoryId: string;
  title?: string;
  expandable?: boolean;
}> = ({ categoryId, title, expandable = true }) => {
  const [isToggled, setIsToggled] = useState(true);
  const { forums } = useContext(ForumContext);
  const { categories } = useContext(CategoryContext);
  const category = categories.find((category) => categoryId === category.id);
  const relatedForums = forums.filter(
    (forum) => forum.categoryId === categoryId
  );

  return (
    <div className="bg-white dark:bg-neutral-900 rounded">
      <div className="flex items-center justify-between px-4 py-2">
        <h2>
          {title ? (
            title
          ) : (
            <Link href={`category/${categoryId}`}>{category?.title}</Link>
          )}
        </h2>
        {expandable && (
          <button
            type="button"
            onClick={() => setIsToggled((prevToggled) => !prevToggled)}
          >
            {isToggled ? (
              <svg
                className="w-8 h-8 stroke-2 text-slate-400 transition-colors duration-500 hover:text-slate-100"
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
              </svg>
            ) : (
              <svg
                className="w-8 h-8 stroke-2 text-slate-400 transition-colors duration-500 hover:text-slate-100"
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
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                ></path>
              </svg>
            )}
          </button>
        )}
      </div>
      {isToggled && (
        <ul>
          {relatedForums.map((forum) => (
            <ForumRow key={forum.id} forum={forum} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoryList;
