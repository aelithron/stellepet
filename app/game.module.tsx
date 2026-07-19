"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import stelle from "@/public/stelle.png";
import pet from "@/public/petpet.gif";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faShop } from "@fortawesome/free-solid-svg-icons";
import autoPet from "@/public/shop/auto_pet.gif";
import catEars from "@/public/shop/cat_ears.png";
import { getKey } from "./key.module";

export default function StellePet() {
  const router = useRouter();
  const key = useRef<string | null>(null);
  const [pats, setPats] = useState<number | undefined>(undefined);
  const [isPatting, setIsPatting] = useState<boolean>(false);
  const [catEarsOwned, setCatEarsOwned] = useState<boolean>(false);
  const [autoPettersOwned, setAutoPettersOwned] = useState<number>(0);
  const [catEarsWorked, setCatEarsWorked] = useState<boolean>(false);
  const [autoPettersWorked, setAutoPettersWorked] = useState<boolean>(false);
  const clearLast = useRef<NodeJS.Timeout | undefined>(undefined);
  const clearAutoPetter = useRef<NodeJS.Timeout | undefined>(undefined);
  const catEarsOwnedRef = useRef<boolean>(catEarsOwned);
  const autoPettersOwnedRef = useRef<number>(autoPettersOwned);
  function addPat() {
    if (isPatting) return;
    if (clearLast.current) clearTimeout(clearLast.current);
    setIsPatting(true);
    let add = 1;
    if (catEarsOwnedRef.current && Math.random() <= 0.25) {
      add = 2;
      setCatEarsWorked(true);
      setTimeout(() => setCatEarsWorked(false), 1500);
    }
    setPats((prev) => (prev ?? 0) + add);
    clearLast.current = setTimeout(() => setIsPatting(false), 400);
  }
  useEffect(() => {
    if (!pats) return;
    localStorage.setItem("pats", pats.toString());
  }, [pats]);
  useEffect(() => { key.current = getKey(); }, []);
  useEffect(() => { catEarsOwnedRef.current = catEarsOwned }, [catEarsOwned]);
  useEffect(() => { autoPettersOwnedRef.current = autoPettersOwned }, [autoPettersOwned]);
  useEffect(() => {
    const storage = { pats: localStorage.getItem("pats"), catEars: (localStorage.getItem("catEars") === "true"), autoPetters: localStorage.getItem("autoPetters") };
    const down = (e: KeyboardEvent) => {
      if (e.key !== key.current) return;
      e.preventDefault();
      const timer = setTimeout(() => router.push("/menu"), 400)
      addEventListener("keyup", () => clearTimeout(timer), { once: true });
    }
    const up = (e: KeyboardEvent) => {
      if (e.key !== key.current) return;
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
    if (storage.autoPetters === null || isNaN(parseInt(storage.autoPetters))) {
      setAutoPettersOwned(0);
    } else {
      setAutoPettersOwned(parseInt(storage.autoPetters));
    }
    setCatEarsOwned(storage.catEars);
    clearAutoPetter.current = setInterval(() => {
      if (autoPettersOwnedRef.current === 0) return;
      setPats((cur) => (cur ?? 0) + autoPettersOwnedRef.current);
      setAutoPettersWorked(true);
      setTimeout(() => setAutoPettersWorked(false), 1500);
    }, 5000);
    return () => {
      if (clearAutoPetter.current) clearInterval(clearAutoPetter.current);
      removeEventListener("keydown", down);
      removeEventListener("keyup", up);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (pats === undefined) return (<h1 className="text-xl font-semibold">Loading...</h1>);
  return (
    <div className="flex flex-col gap-2 justify-center items-center align-middle">
      <p className="text-lg font-semibold mb-24">Pats: {new Intl.NumberFormat().format(pats)}</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col md:col-span-2 gap-2 justify-center items-center align-middle">
          {isPatting && <Image src={pet} alt="stelle pfp" height={214} width={224} loading="eager" className="absolute mb-32 z-10" />}
          {catEarsOwned && <Image src={catEars} alt="Cat ears" loading="eager" height={200} width={200} className="absolute mb-25 z-5" />}
          <Image src={stelle} alt="stelle pfp" height={200} width={200} loading="eager" />
        </div>
        <div className="bg-gray-200 dark:bg-gray-800 p-2 rounded-xl flex flex-col gap-2 text-center">
          <h1 className="text-xl font-semibold">Upgrades</h1>
          <div className="flex gap-2 items-center">
            <Image src={autoPet} alt="Auto petter" loading="eager" height={70} width={70} />
            <div className={`flex flex-col text-left ${autoPettersWorked ? "text-green-600 dark:text-green-300" : ""}`}>
              <h2 className="text-lg">Auto Petter</h2>
              <p>Owned: {autoPettersOwned}</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Image src={catEars} alt="Cat ears" loading="eager" height={70} width={70} />
            <div className={`flex flex-col text-left ${catEarsWorked ? "text-green-600 dark:text-green-300" : ""}`}>
              <h2 className="text-lg">Cat Ears</h2>
              <p>Owned: {catEarsOwned ? "Yes" : "No"}</p>
            </div>
          </div>
          <div className="text-balance"><p>Get upgrades from the</p> <p className="inline-block"><FontAwesomeIcon icon={faShop} /> Shop</p> in the <p className="inline-block"><FontAwesomeIcon icon={faBars} /> Menu</p>!</div>
        </div>
      </div>
    </div>
  );
}