"use client";
import { useThemeStore } from "@/stores/themeStore";
import { useLangStore } from "@/stores/langStore";
import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useThemeStore();
  const { lang } = useLangStore();
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  
  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === 'admin') {
        router.push('/'+lang+'/admin/dashboard');
      } else {
        router.push('/'+lang+'/orders');
      }
    }
  }, [theme, router, lang, isAuthenticated, user]);

  return (
    <div className="col-12 h-100 d-flex justify-content-center align-items-center">
      {children}
    </div>
  );
};

export default AuthLayout;

