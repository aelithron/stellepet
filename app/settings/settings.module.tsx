"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SettingsMenu() {
  const router = useRouter();
  const [ignoreKeyUp, setIgnoreKeyUp] = useState<boolean>(true);
  const [selection, setSelection] = useState<number>(0);
  const ignoreUpRef = useRef<boolean>(ignoreKeyUp);
  const selRef = useRef<number>(selection);
  useEffect(() => { selRef.current = selection; }, [selection]);
  useEffect(() => { ignoreUpRef.current = ignoreKeyUp }, [ignoreKeyUp]);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      setIgnoreKeyUp(false);
      e.preventDefault();
      const timer = setTimeout(() => {
        switch (selRef.current) {
          case 0:
            router.push("/menu");
            break;
          case 1:
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
      if (e.code !== "Space") return;
      if (ignoreUpRef.current) {
        setIgnoreKeyUp(false);
        return;
      }
      e.preventDefault();
      if (selRef.current >= 1) {
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
        <FontAwesomeIcon icon={faRefresh} size="2xl" />
        <p>Reset</p>
      </div>   
    </div>
  );
}