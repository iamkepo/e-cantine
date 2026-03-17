"use client";
import { useThemeStore } from "@/stores/themeStore";
import { useLangStore } from "@/stores/langStore";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useThemeStore();
  const { lang } = useLangStore();
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  
  useEffect(() => {
    if (isAuthenticated) {
      if (user?.scope === 'admin') {
        router.push('/'+lang+'/dashboard');
      } else {
        router.push('/'+lang);
      }
    }
  }, [theme, router, lang, isAuthenticated, user]);

  return (
    <div className="col-12 h-100 d-flex justify-content-center align-items-center">
      <Link href={'/'+lang} className={`btn btn-${theme} position-absolute top-0 start-0 m-3`}>
        <i className="bi bi-arrow-left"></i>
        <span className="ms-2 d-none d-md-inline-block">Retour</span>
      </Link>
      {children}
    </div>
  );
};

export default AuthLayout;

