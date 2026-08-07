import { Metadata } from "next";
import NavigationMenu from "./navigator.module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Key from "../key.module";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "menu" };
export default function Page() {
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-20">
      <h1 className="text-center mb-6 text-3xl font-semibold"><FontAwesomeIcon icon={faBars} /> Menu</h1>
      <NavigationMenu />
      <div className="flex flex-col md:flex-row w-fit mx-auto gap-2 mt-6 bg-gray-200 dark:bg-gray-800 rounded-xl p-2 text-center">
        <p>Press <Key /> (or screen) to change selection</p>
        <p> ✧ </p>
        <p>Hold <Key /> (or screen) to select highlighted</p>
      </div>
    </main>
  );
}