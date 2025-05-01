"use client";
import { useThemeStore } from "@/stores/themeStore";
import { useLangStore } from "@/stores/langStore";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import Link from "next/link";

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
      } else {
        router.push('/'+lang+'/dashboard');
      }
    } else {
      router.push('/'+lang+'/login');
    }
  }, [theme, router, lang, isAuthenticated, user]);

  const routeMatch = (path: string): boolean => {
    return pathname.includes(path);
  };
  
  return (
    <div className="col-12 h-100">
      <div className="row h-100">
        <nav className={`col-md-2 h-100`}>
          <div className={`card text-bg-${theme} sticky-lg-top h-100 p-3`}>
            <Link className='fs-2' href={'/'+lang}>
              <span className="text-primary">E</span>-
              <span className="text-secondary">Cantine</span>
            </Link>
            <ul className="nav flex-column mt-3">
              <li className="nav-item mb-3">
                <Link className={`${pathname === '/'+lang+'/dashboard' ? 'btn btn-outline-primary' : 'nav-link text-secondary px-0'}`} href={'/'+lang+'/dashboard'}>
                  <i className="bi bi-house"></i>
                  <span className="d-none d-md-inline-block ms-2 fw-bold">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link className={`${routeMatch('/dashboard/plats') ? 'btn btn-outline-primary' : 'nav-link text-secondary px-0'}`} href={'/'+lang+'/dashboard/plats'}>
                  <i className="bi bi-list"></i>
                  <span className="d-none d-md-inline-block ms-2 fw-bold">Plats</span>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link className={`${routeMatch('/dashboard/tags') ? 'btn btn-outline-primary' : 'nav-link text-secondary px-0'}`} href={'/'+lang+'/dashboard/tags'}>
                  <i className="bi bi-tag"></i>
                  <span className="d-none d-md-inline-block ms-2 fw-bold">Tags</span>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link className={`${routeMatch('/dashboard/orders') ? 'btn btn-outline-primary' : 'nav-link text-secondary px-0'}`} href={'/'+lang+'/dashboard/orders'}>
                  <i className="bi bi-file-earmark"></i>
                  <span className="d-none d-md-inline-block ms-2 fw-bold">Commandes</span>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link className={`${routeMatch('/dashboard/clients') ? 'btn btn-outline-primary' : 'nav-link text-secondary px-0'}`} href={'/'+lang+'/dashboard/clients'}>
                  <i className="bi bi-people"></i>
                  <span className="d-none d-md-inline-block ms-2 fw-bold">Clients</span>
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link className={`${routeMatch('/dashboard/profile') ? 'btn btn-outline-primary' : 'nav-link text-secondary px-0'}`} href={'/'+lang+'/dashboard/profile'}>
                  <i className="bi bi-person"></i>
                  <span className="d-none d-md-inline-block ms-2 fw-bold">Profile</span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="col-md-10 pe-4 mt-5">
          {children}
          <br /><br /><br /><br />
          <br /><br /><br /><br />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;