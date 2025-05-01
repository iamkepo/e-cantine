"use client";

import { useThemeStore } from "@/stores/themeStore";
import { useEffect } from "react";
import Link from "next/link";

export default function NotFound() {
  const { theme } = useThemeStore();
  
  useEffect(() => {    
  }, [theme]);

  return (
    <div className='vh-100 vw-100 d-flex flex-column align-items-center justify-content-center'>
      <h1 className='text-primary mb-3'>404</h1>

      <Link 
        className={`btn btn-${theme}`}
        href={'/'}
      >
        Accueil
      </Link>
    </div>
  );
}