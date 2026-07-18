import type { Metadata } from "next";
import { Nanum_Gothic } from "next/font/google";
import "./globals.css";

const nanumGothic = Nanum_Gothic({ subsets: ["latin"], weight: ["400"] });
export const metadata: Metadata = {
  title: { template: "%s - stellepet", default: "stellepet" },
  description: "a fun little clicker game where you give stelle headpats",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${nanumGothic.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
