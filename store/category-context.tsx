"use client";

import { createContext, useState } from "react";
import Category from "@/types/category";

type CategoryContextObj = {
  categories: Category[];
};

export const CategoryContext = createContext<CategoryContextObj>({
  categories: [],
});

const CategoriesProvider = ({ children }: { children: React.ReactNode }) => {
  const [categories, setCategories] = useState([
    {
      id: "1",
      title: "Category 1",
    },
    {
      id: "2",
      title: "Category 2",
    },
    {
      id: "3",
      title: "Category 3",
    },
  ]);

  const contextValue: CategoryContextObj = {
    categories: categories,
  };

  return (
    <CategoryContext.Provider value={contextValue}>
      {children}
    </CategoryContext.Provider>
  );
};
export default CategoriesProvider;
