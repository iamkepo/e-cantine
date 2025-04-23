import { Outlet } from "react-router-dom";
import { useThemeStore } from "../stores/themeStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLangStore } from "../stores/langStore";

const DashboardLayout: React.FC = () => {
  const { theme } = useThemeStore();
  const { lang } = useLangStore();
  
  useEffect(() => {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const body = document.body;

    const handleSidebarToggle = () => {
      sidebar?.classList.toggle('sidebar-hidden');
    };

    const handleBodyClick = (event: MouseEvent) => {
      if (
        window.innerWidth <= 767.98 &&
        sidebar &&
        sidebarToggle &&
        !sidebar.contains(event.target as Node) &&
        !sidebarToggle.contains(event.target as Node)
      ) {
        sidebar.classList.add('sidebar-hidden');
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 767.98 && sidebar) {
        sidebar.classList.remove('sidebar-hidden');
      }
    };

    const handleNavLinkClick = (event: Event) => {
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => link.classList.remove('active'));
      (event.currentTarget as HTMLElement).classList.add('active');
    };

    sidebarToggle?.addEventListener('click', handleSidebarToggle);
    body.addEventListener('click', handleBodyClick);
    window.addEventListener('resize', handleResize);

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavLinkClick);
    });

    return () => {
      sidebarToggle?.removeEventListener('click', handleSidebarToggle);
      body.removeEventListener('click', handleBodyClick);
      window.removeEventListener('resize', handleResize);
      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavLinkClick);
      });
    };
  }, []);

  
  return (
    <div className="col-12 p-3">
      <div className="row">
        <nav id="sidebar" className={`col-md-3 col-lg-2 d-md-block text-bg-${theme} sidebar`}>
          <div className="position-sticky pt-3">
            <ul className="nav flex-column">
              <li className="nav-item mb-3">
                <Link className="nav-link active" to={'/'+lang+'/client/category'}>
                  <i className="bi bi-arrow-left me-2"></i>
                  Retour
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link className="nav-link " to={'/'+lang+'/dashboard/orders'}>
                  <i className="bi bi-file-earmark me-2"></i>
                  My orders
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link className="nav-link " to={'/'+lang+'/dashboard/plan'}>
                  <i className="bi bi-people me-2"></i>
                  My plan
                </Link>
              </li>
              <li className="nav-item mb-3">
                <Link className="nav-link " to={'/'+lang+'/dashboard/history'}>
                  <i className="bi bi-graph-up me-2"></i>
                  History
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Dashboard</h1>
            <button id="sidebarToggle" className="btn btn-primary">
              <i className="bi bi-list"></i> Toggle Sidebar
            </button>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;