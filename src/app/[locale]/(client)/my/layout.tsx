"use client";
import React, { useEffect } from "react";
import { useThemeStore } from "@/stores/themeStore";
import { useRouter } from "next/navigation";

export default function MyLayout({children}: {children: React.ReactNode}) {
  const { theme } = useThemeStore();
  const router = useRouter();

  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.classList = theme + '-theme';
    }
  }, [theme]);

  return (
    <section className="col-12 h-100">
      <div className="btn-group position-fixed top-0 start-0 m-3 shadow" role="group" style={{ zIndex: '1000'}}>
        <button
          type="button"
          className={`btn btn-${theme} border-1 border-secondary d-block d-md-none`}
          onClick={()=> router.back()}
        >
          <i className="bi bi-arrow-left fs-6"></i>
          <span className='d-none d-md-inline-block ms-2'>Retour</span>
        </button>
      </div>
      <div className="col-12 h-100">
        {children}
      </div>
    </section>
  );
}
