/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useMemo } from "react";
import { toggleTheme, useThemeStore } from "@/stores/themeStore";
import { translateElements, useLangStore, changeLang } from "@/stores/langStore";
import { capitalize } from "@/helpers/functions";
import { useParams, useRouter, usePathname } from "next/navigation";
import ModalComponent from "@/components/ModalComponent";
import ToastComponent from "@/components/ToastComponent";
import NextTopLoader from "nextjs-toploader";
import AuthRepository from "@/frontend/repositories/auth.repository";
import { useAuthStore, setUser } from "@/stores/useAuthStore";

export default function LocaleLayout({children}: {children: React.ReactNode}) {
  const { theme } = useThemeStore();
  const { lang } = useLangStore();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();
  const repository = useMemo(() => new AuthRepository(), []);


  useEffect(() => {
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.classList = theme + '-theme';
    }

    translateElements()
  }, [theme, lang]);

  const handleChangeLang = (value: string) => {
    changeLang(value);
    router.replace(pathname.replace(`${params?.locale}`, value))
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    repository.fetchCurrentUser().then((response: any) => {
      console.log(response.data);
      setUser(response.data);
    }).catch((error: any) => {
      console.log(error);
    });
    
    
  }, [repository, isAuthenticated]);

  return (
    <section className="container-fluid vh-100 p-0">
      <div className="btn-group position-fixed top-0 end-0 m-3 shadow" role="group" style={{ zIndex: '10000'}}>
        <button type="button" className={`btn btn-${theme} border-1 border-secondary`} onClick={toggleTheme}>
          <i className={`bi bi-${theme === "dark" ? "moon" : "sun"} fs-6`}></i>
        </button>

        <button
          type="button"
          className={`btn btn-${theme} border-1 border-secondary`}
          onClick={()=> handleChangeLang(lang == 'en' ? 'fr' : 'en')}
        >
          {capitalize(params?.locale as string)}
        </button>
      </div>
      <div className="col-12 h-100">
        <NextTopLoader 
          color="var(--bs-primary)"           
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          showSpinner={false}
          easing="ease"
          speed={300}
        />
        {children}
      </div>
      <ModalComponent />
      <ToastComponent />
    </section>
  );
}
