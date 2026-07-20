"use client";
import { getKey } from "@/app/key.module";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ChangeKey() {
  const router = useRouter();
  const [key, setKey] = useState<string | null>(null);
  const keyRef = useRef<string | null>(key);
  const [newKey, setNewKey] = useState<string | undefined>();
  const newKeyRef = useRef<string | undefined>(newKey);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setKey(getKey()); }, []);
  useEffect(() => { keyRef.current = key }, [key])
  useEffect(() => { newKeyRef.current = newKey }, [newKey]);
  useEffect(() => {
    function down(e: KeyboardEvent) {
      e.preventDefault();
      if (e.key === keyRef.current) {
        router.push("/settings");
        return;
      }
      if (!newKeyRef.current) {
        setNewKey(e.key);
        return;
      }
      if (e.key === newKeyRef.current) {
        localStorage.setItem("key", e.key);
        router.push("/settings");
        return;
      }
    }
    addEventListener("keydown", down);
    return () => { removeEventListener("keydown", down); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      {!newKey && <div className="flex flex-col gap-2 text-center">
        <p>Press the key you would like to change to!</p>
        <p>Alternatively, press <code>{key !== " " ? key : "Space"}</code> to go back.</p>
      </div>}
      {newKey && <div className="flex flex-col gap-2 text-center">
        <p>Are you sure you want to change your key from <code>{key !== " " ? key : "Space"}</code> to <code>{newKey !== " " ? newKey : "Space"}</code>?</p>
        <p>Press <code>{newKey !== " " ? newKey : "Space"}</code> again to confirm this change, or <code>{key !== " " ? key : "Space"}</code> to go back.</p>
      </div>}
    </div>
  );

}