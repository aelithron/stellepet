import { Metadata } from "next";
import NavigationMenu from "./navigator.module";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "menu" };
export default function Page() {
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-20">
      <NavigationMenu />
    </main>
  );
}