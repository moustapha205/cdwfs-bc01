"use client";
import { useEffect, useRef } from "react";

export function TitreDeVue({ enfants }: { enfants: string }) {
  const ancre = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    ancre.current?.focus();
  }, []);

  return (
    <h1 ref={ancre} tabIndex={-1} className="text-2xl font-bold mb-4 outline-none">
      {enfants}
    </h1>
  );
}
