import { Metadata } from "next";
import StellePet from "./game.module";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Key from "./key.module";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "home - stellepet" }
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-20 justify-center items-center align-middle">
      <StellePet />
      <div className="flex flex-col md:flex-row gap-2 mt-24 bg-gray-200 dark:bg-gray-800 rounded-xl p-2 text-center">
        <p>Press <Key /> (or screen) to pat Stelle</p>
        <p> ✧ </p>
        <p>Hold <Key /> (or screen) to open <FontAwesomeIcon icon={faBars} /> Menu</p>
      </div>
    </main>
  );
}
