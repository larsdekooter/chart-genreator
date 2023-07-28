import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chart Generator",
  description: "By Lars de Kooter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="overflow-x-hidden relative overflow-y-scroll dark"
    >
      <body
        className={`${inter.className}  overflow-x-hidden p-20 dark:bg-black duration-200`}
      >
        {children}
      </body>
    </html>
  );
}
