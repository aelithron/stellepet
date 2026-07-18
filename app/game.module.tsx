"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import stelle from "@/public/stelle.png";
import pet from "@/public/petpet.gif";

export default function StellePet() {
  const [pats, setPats] = useState<number | undefined>(undefined);
  const [isPatting, setIsPatting] = useState<boolean>(false);
  const clearLast = useRef<NodeJS.Timeout | undefined>(undefined);
  function addPat(e: KeyboardEvent) {
    if (e.code !== "Space") return;
    if (clearLast.current) clearTimeout(clearLast.current);
    setIsPatting(true);
    console.log(pats);
    setPats((prev) => (prev ?? 0) + 1);
    clearLast.current = setTimeout(() => setIsPatting(false), 400);
  }
  useEffect(() => {
    addEventListener("keydown", (e) => addPat(e));
    const storage = { pats: localStorage.getItem("pats") };
    if (storage.pats === null || isNaN(parseInt(storage.pats))) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPats(0);
    } else {
      setPats(parseInt(storage.pats));
    }
  }, []);
  if (pats === undefined) return (<h1 className="text-xl font-semibold">Loading...</h1>);
  return (
    <div className="flex flex-col gap-2 justify-center items-center align-middle">
      <p className="text-lg font-semibold mb-20">Pats: {pats}</p>
      {isPatting && <Image src={pet} alt="stelle pfp" height={214} width={224} loading="eager" className="absolute mb-16" />}
      <Image src={stelle} alt="stelle pfp" height={200} width={200} loading="eager" />
    </div>
  );
}