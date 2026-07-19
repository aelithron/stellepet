"use client";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ChangeKey() {
  const router = useRouter();
  const [newKey, setNewKey] = useState<string | undefined>();
  const newKeyRef = useRef<string | undefined>(newKey);
  useEffect(() => { newKeyRef.current = newKey }, [newKey]);
  useEffect(() => {
    function down(e: KeyboardEvent) {
      e.preventDefault();
      if (e.code === "Space") {
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
        <p>Alternatively, press space to go back.</p>
      </div>}
      {newKey && <div className="flex flex-col gap-2 text-center">
        <p>Are you sure you want to change your key from space to <code>{newKey}</code>?</p>
        <p>Press <code>{newKey}</code> again to confirm this change, or space to go back.</p>
      </div>}
    </div>
  );

}