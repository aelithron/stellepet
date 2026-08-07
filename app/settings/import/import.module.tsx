"use client";
import Key, { getKey } from "@/app/key.module";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef, useState } from "react";

export default function ImportSave() {
  const router = useRouter();
  const [ignoreKeyDown, setIgnoreKeyDown] = useState<boolean>(true);
  const ignoreDownRef = useRef<boolean>(ignoreKeyDown);
  const key = useRef<string | null>(null);
  function readFile(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (!e.target.files || e.target.files.length < 1) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target || !e.target.result) return;
      const res = JSON.parse(e.target.result.toString());
      if (!res || !res.pats || !res.autoPetters || !res.catEars) return;
      localStorage.setItem("pats", res.pats ?? "0");
      localStorage.setItem("allTimePats", res.allTimePats ?? "0");
      localStorage.setItem("autoPetters", res.autoPetters ?? "0");
      localStorage.setItem("catEars", res.catEars ?? "false");
      localStorage.setItem("skirt", res.skirt ?? "false");
      localStorage.setItem("kittens", res.kittens ?? "0");
      router.push("/");
    }
    reader.readAsText(e.target.files[0]);
  }
  useEffect(() => { key.current = getKey(); }, []);
  useEffect(() => { ignoreDownRef.current = ignoreKeyDown }, [ignoreKeyDown]);
  useEffect(() => {
    function down(e: KeyboardEvent) {
      if (e.key === key.current) {
        if (ignoreDownRef.current) {
          setIgnoreKeyDown(false);
          return;
        }
        if (!e.repeat) setIgnoreKeyDown(false);
        e.preventDefault();
        router.push("/settings");
        return;
      }
    }
    function touch() {
      const timer = setTimeout(() => router.push("/settings"), 400);
      addEventListener("touchend", () => clearTimeout(timer), { once: true });
    }
    setTimeout(() => setIgnoreKeyDown(false), 1000);
    addEventListener("keydown", down);
    addEventListener("touchstart", touch);
    return () => { 
      removeEventListener("keydown", down);
      removeEventListener("touchstart", touch);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col gap-2 text-center">
      <p>Upload a save file below! This will instantly import and send you back to the home page.</p>
      <p>Note that this will overwrite your existing save.</p>
      <p>You can also use <Key /> (or hold on a touchscreen) to go back to settings.</p>
      <input type="file" className="bg-gray-300 dark:bg-gray-800 p-2 rounded-xl file:bg-gray-400 dark:file:bg-gray-900 file:p-1 file:rounded-md" onChange={(e) => readFile(e)} />
    </div>
  );
}