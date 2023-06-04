"use client";

import { ThemeProvider } from "next-themes";

import CategoriesProvider from "@/store/category-context";
import ForumsProvider from "@/store/forums-context";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class">
      <CategoriesProvider>
        <ForumsProvider>{children}</ForumsProvider>
      </CategoriesProvider>
    </ThemeProvider>
  );
};

export default Providers;
