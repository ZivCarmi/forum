import { Inter } from "next/font/google";

import Providers from "@/components/Providers";
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-neutral-300 dark:bg-neutral-800`}>
        <Providers>
          <Header />
          <main className="p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
