"use client";
import Key, { getKey } from "@/app/key.module";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useRef } from "react";

export default function ImportSave() {
  const router = useRouter();
  const key = useRef<string | null>(null);
  function readFile(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (!e.target.files || e.target.files.length < 1) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target || !e.target.result) return;
      const res = JSON.parse(e.target.result.toString());
      if (!res || !res.pats || !res.autoPetters || !res.catEars) return;
      localStorage.setItem("pats", res.pats);
      localStorage.setItem("autoPetters", res.autoPetters);
      localStorage.setItem("catEars", res.catEars);
      router.push("/");
    }
    reader.readAsText(e.target.files[0]);
  }
  useEffect(() => { key.current = getKey(); }, []);
  useEffect(() => {
    function down(e: KeyboardEvent) {
      if (e.key === key.current) {
        e.preventDefault();
        router.push("/settings");
        return;
      }
    }
    addEventListener("keydown", down);
    return () => { removeEventListener("keydown", down); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex flex-col gap-2 text-center">
      <p>Upload a save file below! This will instantly import and send you back to the home page.</p>
      <p>Note that this will overwrite your existing save.</p>
      <p>You can also use <Key /> to go back to settings.</p>
      <input type="file" className="bg-gray-300 dark:bg-gray-800 p-2 rounded-xl" onChange={(e) => readFile(e)} />
    </div>
  );
}