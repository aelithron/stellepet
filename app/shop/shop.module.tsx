"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ShopMenu() {
  const router = useRouter();
  const [selection, setSelection] = useState<number>(0);
  const selRef = useRef<number>(selection);
  useEffect(() => { selRef.current = selection; }, [selection]);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      e.preventDefault();
      const timer = setTimeout(() => {
        switch (selRef.current) {
          case 0:
            router.push("/menu");
            break;
          case 1:
            break;
          default:
            return;
        }
      }, 400)
      addEventListener("keyup", () => clearTimeout(timer), { once: true });
    }
    const up = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
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
        <FontAwesomeIcon icon={faQuestion} size="2xl" />
        <p>coming soon!</p>
      </div>   
    </div>
  );
}