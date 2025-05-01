"use client";
import React from "react";
import { useThemeStore } from "@/stores/themeStore";
import { useEffect } from "react";
import Link from "next/link";
import { useLangStore } from "@/stores/langStore";

export default function Page() {
  const { theme } = useThemeStore();
  const { lang } = useLangStore();
  
  useEffect(() => {    
  }, [theme, lang]);

  return (
    <div className='vh-100 vw-100 d-flex flex-column align-items-center justify-content-center'>
      <Link href={'/'+lang} style={{ fontSize: '4rem' }}>
        <span className="text-primary">E</span>-
        <span className="text-secondary">Cantine</span>
      </Link>
    </div>
  );
}
