"use client";
import { useThemeStore } from "@/stores/themeStore";
import { useLangStore } from "@/stores/langStore";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import Link from "next/link";
import { dashboardNav } from "@/core/constants";

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { theme } = useThemeStore();
  const { lang } = useLangStore();
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuthStore();
  
  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role !== 'admin') {
        router.push('/'+lang+'/orders');
      }
    } else {
      router.push('/'+lang+'/login');
    }
  }, [theme, router, lang, isAuthenticated, user]);

  const routeMatch = (path: string): boolean => {
    return pathname.includes(path);
  };
  
  return (
    <div className="col-12 h-100 overflow-hidden">
      <div className="row h-100">
        <nav className="col-2 h-100 pe-0">
          <div className={`card text-bg-${theme} sticky-lg-top h-100 py-3 px-0 text-lg-start text-center overflow-scroll`}>
            <Link className='fs-3 ps-md-3 ps-0' href={'/'+lang}>
              <span className="text-primary">E</span>
              <span className="text-secondary d-none d-md-inline">-</span>
              <span className="text-secondary d-none d-md-inline text-break">Cantine</span>
            </Link>
            <ul className="nav flex-column mt-3">
              <li className="nav-item mb-3 ps-md-2 ps-0">
                <Link className={`btn btn-outline-${pathname === '/'+lang+'/dashboard' ? 'primary' : 'secondary border-0'}`} href={'/'+lang+'/dashboard'}>
                  <i className="bi bi-house"></i>
                  <small className="d-none d-md-inline-block ms-2 fw-bold text-break">Dashboard</small>
                </Link>
              </li>
              { dashboardNav.map((item, index) => (
                <li className="nav-item mb-3 ps-md-2 ps-0" key={index}>
                  <Link className={`btn btn-outline-${routeMatch(item.path) ? 'primary' : 'secondary border-0'}`} href={'/'+lang+item.path}>
                    <i className={`bi bi-${item.icon}`}></i>
                    <small className="d-none d-md-inline-block ms-2 fw-bold text-break">{item.name}</small>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="col h-100 ps-0">
          {children}
          <br /><br /><br /><br />
          <br /><br /><br /><br />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;