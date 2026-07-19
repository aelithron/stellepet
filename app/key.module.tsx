"use client";
import { useEffect, useState } from "react";

export default function Key() {
  const [key, setKey] = useState<string | null>(null);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setKey(getKey()), []);
  return (key !== " " ? key : "Space");
}
export function getKey(): string {
  const key = localStorage.getItem("key");
  if (!key) {
    localStorage.setItem("key", " ");
    return " ";
  }
  return key;
}