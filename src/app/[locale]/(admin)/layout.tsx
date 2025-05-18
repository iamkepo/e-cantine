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
        <nav className="col-2 h-100 pe-0">
          <div className={`card text-bg-${theme} sticky-lg-top h-100 py-3 px-0 text-lg-start text-center`}>
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
              <li className="nav-item mb-3 ps-md-2 ps-0">
                <Link className={`btn btn-outline-${routeMatch('/dashboard/articles') ? 'primary' : 'secondary border-0'}`} href={'/'+lang+'/dashboard/articles'}>
                  <i className="bi bi-list"></i>
                  <small className="d-none d-md-inline-block ms-2 fw-bold text-break">Articles</small>
                </Link>
              </li>
              <li className="nav-item mb-3 ps-md-2 ps-0">
                <Link className={`btn btn-outline-${routeMatch('/dashboard/types') ? 'primary' : 'secondary border-0'}`} href={'/'+lang+'/dashboard/types'}>
                  <i className="bi bi-list"></i>
                  <small className="d-none d-md-inline ms-2 fw-bold text-break">Types</small>
                </Link>
              </li>
              <li className="nav-item mb-3 ps-md-2 ps-0">
                <Link className={`btn btn-outline-${routeMatch('/dashboard/categories') ? 'primary' : 'secondary border-0'}`} href={'/'+lang+'/dashboard/categories'}>
                  <i className="bi bi-list"></i>
                  <small className="d-none d-md-inline-block ms-2 fw-bold text-break">Categories</small>
                </Link>
              </li>
              <li className="nav-item mb-3 ps-md-2 ps-0">
                <Link className={`btn btn-outline-${routeMatch('/dashboard/tags') ? 'primary' : 'secondary border-0'}`} href={'/'+lang+'/dashboard/tags'}>
                  <i className="bi bi-tag"></i>
                  <small className="d-none d-md-inline-block ms-2 fw-bold text-break">Tags</small>
                </Link>
              </li>
              <li className="nav-item mb-3 ps-md-2 ps-0">
                <Link className={`btn btn-outline-${routeMatch('/dashboard/orders') ? 'primary' : 'secondary border-0'}`} href={'/'+lang+'/dashboard/orders'}>
                  <i className="bi bi-file-earmark"></i>
                  <small className="d-none d-md-inline-block ms-2 fw-bold text-break">Commandes</small>
                </Link>
              </li>
              <li className="nav-item mb-3 ps-md-2 ps-0">
                <Link className={`btn btn-outline-${routeMatch('/dashboard/clients') ? 'primary' : 'secondary border-0'}`} href={'/'+lang+'/dashboard/clients'}>
                  <i className="bi bi-people"></i>
                  <small className="d-none d-md-inline-block ms-2 fw-bold text-break">Clients</small>
                </Link>
              </li>
              <li className="nav-item mb-3 ps-md-2 ps-0">
                <Link className={`btn btn-outline-${routeMatch('/dashboard/admins') ? 'primary' : 'secondary border-0'}`} href={'/'+lang+'/dashboard/admins'}>
                  <i className="bi bi-person-workspace"></i>
                  <small className="d-none d-md-inline-block ms-2 fw-bold text-break">Admins</small>
                </Link>
              </li>
              <li className="nav-item mb-3 ps-md-2 ps-0">
                <Link className={`btn btn-outline-${routeMatch('/dashboard/profile') ? 'primary' : 'secondary border-0'}`} href={'/'+lang+'/dashboard/profile'}>
                  <i className="bi bi-person"></i>
                  <small className="d-none d-md-inline-block ms-2 fw-bold text-break">Profile</small>
                </Link>
              </li>
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