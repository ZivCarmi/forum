"use client";

import { createContext, useState } from "react";
import Forum from "@/types/forum";

type ForumContextObj = {
  forums: Forum[];
};

export const ForumContext = createContext<ForumContextObj>({
  forums: [],
});

const ForumsProvider = ({ children }: { children: React.ReactNode }) => {
  const [forums, setForums] = useState([
    {
      id: "1",
      title: "Forum 1",
      description: "This is the first forum description",
      categoryId: "2",
    },
    {
      id: "2",
      title: "Forum 2",
      description: "This is the second forum description",
      categoryId: "1",
    },
    {
      id: "3",
      title: "Forum 3",
      description: "This is the third forum description",
      categoryId: "3",
    },
    {
      id: "4",
      title: "Forum 4",
      description: "This is the first forum description",
      categoryId: "1",
    },
    {
      id: "5",
      title: "Forum 5",
      description: "This is the second forum description",
      categoryId: "2",
    },
    {
      id: "6",
      title: "Forum 6",
      description: "This is the third forum description",
      categoryId: "1",
    },
    {
      id: "7",
      title: "Forum 7",
      description: "This is the first forum description",
      categoryId: "3",
    },
    {
      id: "8",
      title: "Forum 8",
      description: "This is the second forum description",
      categoryId: "3",
    },
    {
      id: "9",
      title: "Forum 9",
      description: "This is the third forum description",
      categoryId: "2",
    },
  ]);

  const contextValue: ForumContextObj = {
    forums: forums,
  };

  return (
    <ForumContext.Provider value={contextValue}>
      {children}
    </ForumContext.Provider>
  );
};
export default ForumsProvider;
