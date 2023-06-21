"use client";

import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

import LayoutProvider from "./Layout";

const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <LayoutProvider>{children}</LayoutProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
