"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

import Header from "./Header";

const ThemeButton = dynamic(() => import("./ThemeButton").then((mod) => mod), {
  ssr: false,
});

const excludedPages = ["/register", "/login"];

const LayoutProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const requiredLayout = !excludedPages.includes(pathname);

  return (
    <>
      {requiredLayout && <Header />}
      <main className={`${requiredLayout ? "p-5" : ""}`}>{children}</main>
      <ThemeButton />
    </>
  );
};

export default LayoutProvider;
