"use client";

import React from "react";
import { useThemeStore } from "@/stores/themeStore";
import { useEffect } from "react";
import Link from "next/link";
import { useLangStore } from "@/stores/langStore";
import LoaderComponent from "@/components/LoaderComponent";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { theme } = useThemeStore();
  const { lang } = useLangStore();
  
  useEffect(() => {    
  }, [theme, lang]);

  return (
    <div className={`vh-100 vw-100 d-flex flex-column align-items-center justify-content-center text-bg-${theme}`}>
      <Link href={'/'+lang} style={{ fontSize: '4rem' }}>
        <span className="text-primary">E</span>-
        <span className="text-secondary">Cantine</span>
      </Link>
      <div className="w-50 mt-3">
        <LoaderComponent counter={4000} callback={() => router.replace('/'+lang)} />
      </div>
    </div>
  );
}
