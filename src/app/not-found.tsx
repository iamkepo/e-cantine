"use client";
import { useRouter } from "next/navigation";
import { useThemeStore } from "../stores/themeStore";
import { useEffect } from "react";
import { translateElements, useLangStore } from "../stores/langStore";

export default function NotFound() {
  const { lang } = useLangStore();
  const { theme } = useThemeStore();
  const router = useRouter();
  
  useEffect(() => {    
    if (window.location.href == window.location.origin+"/") {
      router.push("/"+lang)
    }
    translateElements()
  }, [lang, router]);

  return (
    <div className='vh-100 vw-100 d-flex flex-column align-items-center justify-content-center'>
      <h1 className='text-primary mb-3' data-translate='NoMatch_title'></h1>

      <button 
        type="button" 
        className={`btn btn-${theme}`}
        onClick={() => router.push('/'+lang)}
        data-translate='NoMatch_btn'
      >
      </button>
    </div>
  );
}