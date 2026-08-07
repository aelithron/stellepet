import { Metadata } from "next";
import SettingsMenu from "./settings.module";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Key from "../key.module";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "settings" };
export default function Page() {
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-20">
      <h1 className="text-center mb-6 text-3xl font-semibold"><FontAwesomeIcon icon={faGear} /> Settings</h1>
      <SettingsMenu />
      <div className="flex flex-col md:flex-row text-center w-fit mx-auto gap-2 mt-6 bg-gray-200 dark:bg-gray-800 rounded-xl p-2">
        <p>Press <Key /> (or screen) to change selection</p>
        <p> ✧ </p>
        <p>Hold <Key /> (or screen) to select highlighted</p>
      </div>
    </main>
  );
}