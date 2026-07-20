"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import autoPet from "@/public/shop/auto_pet.gif";
import catEars from "@/public/shop/cat_ears.png";
import skirt from "@/public/shop/skirt.png";
import { getKey } from "../key.module";

export default function ShopMenu() {
  const router = useRouter();
  const key = useRef<string | null>(null);
  const [selection, setSelection] = useState<number>(0);
  const [pats, setPats] = useState<number | undefined>(undefined);
  const [autoPettersOwned, setAutoPettersOwned] = useState<number>(0);
  const [catEarsOwned, setCatEarsOwned] = useState<boolean>(false);
  const [skirtOwned, setSkirtOwned] = useState<boolean>(false);
  const selRef = useRef<number>(selection);
  const patsRef = useRef<number | undefined>(pats);
  const autoPetRef = useRef<number>(autoPettersOwned);
  const catEarsRef = useRef<boolean>(catEarsOwned);
  const skirtRef = useRef<boolean>(skirtOwned);
  const [alertBox, setAlertBox] = useState<string | undefined>(undefined);
  const [ignoreKeyUp, setIgnoreKeyUp] = useState<boolean>(true);
  const ignoreUpRef = useRef<boolean>(ignoreKeyUp);

  useEffect(() => { key.current = getKey(); }, []);
  useEffect(() => { selRef.current = selection; }, [selection]);
  useEffect(() => { autoPetRef.current = autoPettersOwned; }, [autoPettersOwned]);
  useEffect(() => { catEarsRef.current = catEarsOwned; }, [catEarsOwned]);
  useEffect(() => { skirtRef.current = skirtOwned }, [skirtOwned]);
  useEffect(() => { patsRef.current = pats; }, [pats]);
  useEffect(() => { ignoreUpRef.current = ignoreKeyUp }, [ignoreKeyUp]);
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
            const price = (200 + (autoPetRef.current * 150));
            if (!patsRef.current || patsRef.current < price) {
              setAlertBox(`You can't afford an Automatic Petter! (have ${patsRef.current ?? 0} pats, need ${price})`);
              setIgnoreKeyUp(true);
              setTimeout(() => setAlertBox(undefined), 2000);
              return;
            }
            setPats(patsRef.current - price);
            localStorage.setItem("pats", `${patsRef.current - price}`);
            setAutoPettersOwned(autoPetRef.current + 1);
            localStorage.setItem("autoPetters", `${autoPetRef.current + 1}`);
            setIgnoreKeyUp(true);
            break;
          case 2:
            if (catEarsRef.current) {
              setAlertBox("You already own Cat Ears!");
              setTimeout(() => setAlertBox(undefined), 2000);
              setIgnoreKeyUp(true);
              return;
            }
            if (!patsRef.current || patsRef.current < 1500) {
              setAlertBox(`You can't afford Cat Ears! (have ${patsRef.current ?? 0} pats, need 1500)`);
              setTimeout(() => setAlertBox(undefined), 2000);
              setIgnoreKeyUp(true);
              return;
            }
            setPats(patsRef.current - 1500);
            localStorage.setItem("pats", `${patsRef.current - 1500}`);
            setCatEarsOwned(true);
            localStorage.setItem("catEars", "true");
            setIgnoreKeyUp(true);
            break;
          case 3:
            if (skirtRef.current) {
              setAlertBox("You already own Skirt!");
              setTimeout(() => setAlertBox(undefined), 2000);
              setIgnoreKeyUp(true);
              return;
            }
            if (!patsRef.current || patsRef.current < 5000) {
              setAlertBox(`You can't afford Skirt! (have ${patsRef.current ?? 0} pats, need 5000)`);
              setTimeout(() => setAlertBox(undefined), 2000);
              setIgnoreKeyUp(true);
              return;
            }
            setPats(patsRef.current - 5000);
            localStorage.setItem("pats", `${patsRef.current - 5000}`);
            setSkirtOwned(true);
            localStorage.setItem("skirt", "true");
            setIgnoreKeyUp(true);
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
      if (selRef.current >= 3) {
        setSelection(0);
        return;
      }
      setSelection(selRef.current + 1);
    }
    const storage = { pats: localStorage.getItem("pats"), catEars: (localStorage.getItem("catEars") === "true"), autoPetters: localStorage.getItem("autoPetters"), skirt: (localStorage.getItem("skirt") === "true") };
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
    setSkirtOwned(storage.skirt);

    addEventListener("keydown", down);
    addEventListener("keyup", up);
    return () => {
      removeEventListener("keydown", down);
      removeEventListener("keyup", up);
      setIgnoreKeyUp(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (pats === undefined) return (<h1 className="text-xl font-semibold">Loading...</h1>);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-center text-xl font-semibold">Pats: {new Intl.NumberFormat().format(pats)}</h1>
      {alertBox && <p className="text-center border-red-500 border-2 p-2 rounded-xl">{alertBox}</p>}
      <div className="grid grid-cols-3 gap-4">
        <div className={`flex flex-col p-4 gap-1 text-xl items-center place-content-center h-full rounded-xl border-2 ${selection === 0 ? "border-black dark:border-white" : "border-gray-200 dark:border-gray-800"}`}>
          <FontAwesomeIcon icon={faArrowLeft} size="2xl" />
          <p>Back</p>
        </div>
        <div className={`flex flex-col p-4 gap-1 items-center place-content-center rounded-xl border-2 ${selection === 1 ? "border-black dark:border-white" : "border-gray-200 dark:border-gray-800"}`}>
          <Image src={autoPet} alt="Auto pet" loading="eager" height={70} width={70} />
          <p className="text-xl">Automatic Petter</p>
          <p className="flex gap-1">+1 Pat every {skirtOwned ? <p><s>5</s> 3</p> : "5"} seconds</p>
          <p>Cost: {200 + (autoPettersOwned * 150)} Pats</p>
          <div className="flex gap-1 items-center">
            <p>Owned: {autoPettersOwned}</p>
            <p className="text-sm">(can buy multiple)</p>
          </div>
        </div>
        <div className={`flex flex-col p-4 gap-1 items-center place-content-center rounded-xl border-2 ${selection === 2 ? "border-black dark:border-white" : "border-gray-200 dark:border-gray-800"}`}>
          <Image src={catEars} alt="Cat ears" loading="eager" height={70} width={70} />
          <p className="text-xl">Cat Ears</p>
          <p>25% chance to double a pat</p>
          <p>Cost: 1500 Pats</p>
          <p>Owned: {catEarsOwned ? "Yes" : "No"}</p>
        </div>
        <div className={`flex flex-col p-4 gap-1 items-center place-content-center rounded-xl border-2 ${selection === 3 ? "border-black dark:border-white" : "border-gray-200 dark:border-gray-800"}`}>
          <Image src={skirt} alt="Skirt" loading="eager" height={70} width={70} />
          <p className="text-xl">Skirt</p>
          <div className="flex flex-col items-center mb-1">
            <p>Speed Automatic Petters up</p>
            <p>to +1 Pat every 3 seconds</p>
          </div>
          <p>Cost: 5000 Pats</p>
          <p>Owned: {skirtOwned ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
}