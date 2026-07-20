"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faDownload, faPencil, faRefresh, faUpload, faVolume, faVolumeMute } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getKey } from "../key.module";

export default function SettingsMenu() {
  const router = useRouter();
  const key = useRef<string | null>(null);
  const [ignoreKeyUp, setIgnoreKeyUp] = useState<boolean>(true);
  const [selection, setSelection] = useState<number>(0);
  const [muted, setMuted] = useState<boolean>(false);
  const ignoreUpRef = useRef<boolean>(ignoreKeyUp);
  const selRef = useRef<number>(selection);
  const muteRef = useRef<boolean>(muted);
  useEffect(() => { key.current = getKey(); }, []);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMuted(localStorage.getItem("muted") === "true"); }, [])
  useEffect(() => { selRef.current = selection; }, [selection]);
  useEffect(() => { ignoreUpRef.current = ignoreKeyUp }, [ignoreKeyUp]);
  useEffect(() => { muteRef.current = muted }, [muted]);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key !== key.current) return;
      if (!e.repeat) setIgnoreKeyUp(false);
      e.preventDefault();
      const timer = setTimeout(() => {
        switch (selRef.current) {
          case 0:
            router.push("/menu");
            break;
          case 1:
            if (muteRef.current) {
              setMuted(false);
              localStorage.setItem("muted", "false");
            } else {
              setMuted(true);
              localStorage.setItem("muted", "true");
            }
            setIgnoreKeyUp(true);
            break;
          case 2:
            router.push("/settings/change");
            break;
          case 3:
            const data = { pats: localStorage.getItem("pats") ?? "0", autoPetters: localStorage.getItem("autoPetters") ?? "0", catEars: localStorage.getItem("catEars") ?? "false" };
            const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `stellepet-export-${new Date().toISOString()}.json`);
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            URL.revokeObjectURL(url);
            break;
          case 4:
            router.push("/settings/import");
            break;
          case 5:
            localStorage.setItem("pats", "0");
            localStorage.setItem("autoPetters", "0");
            localStorage.setItem("catEars", "false");
            router.push("/");
            break;
          default:
            return;
        }
      }, 400)
      addEventListener("keyup", () => clearTimeout(timer), { once: true });
    }
    const up = (e: KeyboardEvent) => {
      if (e.key !== key.current) return;
      if (ignoreUpRef.current) {
        setIgnoreKeyUp(false);
        return;
      }
      e.preventDefault();
      if (selRef.current >= 5) {
        setSelection(0);
        return;
      }
      setSelection(selRef.current + 1);
    }
    addEventListener("keydown", down);
    addEventListener("keyup", up);
    return () => {
      removeEventListener("keydown", down);
      removeEventListener("keyup", up);
      setIgnoreKeyUp(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className={`flex flex-col p-4 gap-1 text-xl items-center rounded-xl border-2 ${selection === 0 ? "border-black dark:border-white" : "border-gray-200 dark:border-gray-800"}`}>
        <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
        <p>Back</p>
      </div>
      <div className={`flex flex-col p-4 gap-1 text-xl items-center rounded-xl border-2 ${selection === 1 ? "border-black dark:border-white" : "border-gray-200 dark:border-gray-800"}`}>
        <FontAwesomeIcon icon={muted ? faVolume : faVolumeMute} size="2xl" />
        <p>{muted ? "Unmute" : "Mute"}</p>
      </div>
      <div className={`flex flex-col p-4 gap-1 text-xl items-center rounded-xl border-2 ${selection === 2 ? "border-black dark:border-white" : "border-gray-200 dark:border-gray-800"}`}>
        <FontAwesomeIcon icon={faPencil} size="2xl" />
        <p>Change Key</p>
      </div>
      <div className={`flex flex-col p-4 gap-1 text-xl items-center rounded-xl border-2 ${selection === 3 ? "border-black dark:border-white" : "border-gray-200 dark:border-gray-800"}`}>
        <FontAwesomeIcon icon={faUpload} size="2xl" />
        <p>Export</p>
      </div>
      <div className={`flex flex-col p-4 gap-1 text-xl items-center rounded-xl border-2 ${selection === 4 ? "border-black dark:border-white" : "border-gray-200 dark:border-gray-800"}`}>
        <FontAwesomeIcon icon={faDownload} size="2xl" />
        <p>Import</p>
      </div>
      <div className={`flex flex-col p-4 gap-1 text-xl items-center rounded-xl border-2 ${selection === 5 ? "border-black dark:border-white" : "border-gray-200 dark:border-gray-800"}`}>
        <FontAwesomeIcon icon={faRefresh} size="2xl" />
        <p>Reset</p>
      </div>
    </div>
  );
}