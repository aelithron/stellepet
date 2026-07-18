import { Metadata } from "next";
import StellePet from "./game.module";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "home - stellepet" }
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-20 justify-center items-center align-middle">
      <StellePet />
    </main>
  );
}
