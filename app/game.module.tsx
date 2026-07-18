"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import stelle from "@/public/stelle.png";
import pet from "@/public/petpet.gif";
import { useRouter } from "next/navigation";

export default function StellePet() {
  const router = useRouter();
  const [pats, setPats] = useState<number | undefined>(undefined);
  const [isPatting, setIsPatting] = useState<boolean>(false);
  const clearLast = useRef<NodeJS.Timeout | undefined>(undefined);
  function addPat() {
    if (isPatting) return;
    if (clearLast.current) clearTimeout(clearLast.current);
    setIsPatting(true);
    setPats((prev) => (prev ?? 0) + 1);
    clearLast.current = setTimeout(() => setIsPatting(false), 400);
  }
  useEffect(() => {
    if (!pats) return;
    localStorage.setItem("pats", pats.toString())
  }, [pats]);
  useEffect(() => {
    const storage = { pats: localStorage.getItem("pats") };
    const down = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      e.preventDefault();
      const timer = setTimeout(() => router.push("/menu"), 400)
      addEventListener("keyup", () => clearTimeout(timer), { once: true });
    }
    const up = (e: KeyboardEvent) => {
      if (e.code !== "Space") return;
      addPat();
      e.preventDefault();
    }
    addEventListener("keydown", down);
    addEventListener("keyup", up);
    if (storage.pats === null || isNaN(parseInt(storage.pats))) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPats(0);
    } else {
      setPats(parseInt(storage.pats));
    }
    return () => {
      removeEventListener("keydown", down);
      removeEventListener("keyup", up);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (pats === undefined) return (<h1 className="text-xl font-semibold">Loading...</h1>);
  return (
    <div className="flex flex-col gap-2 justify-center items-center align-middle">
      <p className="text-lg font-semibold mb-24">Pats: {pats}</p>
      {isPatting && <Image src={pet} alt="stelle pfp" height={214} width={224} loading="eager" className="absolute mb-16" />}
      <Image src={stelle} alt="stelle pfp" height={200} width={200} loading="eager" />
    </div>
  );
}