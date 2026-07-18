"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faGear, faShop } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function NavigationMenu() {
  const router = useRouter();
  const [selection, setSelection] = useState<"back" | "shop" | "settings">("back");
  const selRef = useRef<"back" | "shop" | "settings">(selection);
  useEffect(() => { selRef.current = selection; }, [selection]);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      e.preventDefault();
      const timer = setTimeout(() => {
        switch (selRef.current) {
          case "back":
            router.push("/");
            break;
          case "shop":
            router.push("/shop");
            break;
          case "settings":
            router.push("/settings");
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
      switch (selRef.current) {
        case "back":
          setSelection("shop");
          break;
        case "shop":
          setSelection("settings");
          break;
        case "settings":
          setSelection("back");
          break;
        default:
          setSelection("back");
      }
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
      <div className={`flex flex-col p-4 gap-1 text-xl items-center rounded-xl border-2 ${selection === "back" ? "border-black dark:border-white" : "border-gray-200 dark:border-gray-800"}`}>
        <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
        <p>Back</p>
      </div>
      <div className={`flex flex-col p-4 gap-1 text-xl items-center rounded-xl border-2 ${selection === "shop" ? "border-black dark:border-white" : "border-gray-200 dark:border-gray-800"}`}>
        <FontAwesomeIcon icon={faShop} size="2xl" />
        <p>Shop</p>
      </div>
      <div className={`flex flex-col p-4 gap-1 text-xl items-center rounded-xl border-2 ${selection === "settings" ? "border-black dark:border-white" : "border-gray-200 dark:border-gray-800"}`}>
        <FontAwesomeIcon icon={faGear} size="2xl" />
        <p>Settings</p>
      </div>
    </div>
  );
}