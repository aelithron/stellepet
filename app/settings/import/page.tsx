import { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import ImportSave from "./import.module";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "import - settings" };
export default function Page() {
  return (
    <main className="flex flex-col min-h-screen p-8 md:p-20">
      <h1 className="text-center mb-6 text-3xl font-semibold"><FontAwesomeIcon icon={faGear} /> Settings - Import Save</h1>
      <ImportSave />
    </main>
  );
}