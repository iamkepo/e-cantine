/* eslint-disable @typescript-eslint/no-explicit-any */
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { toggleTheme, useThemeStore } from "../stores/themeStore";
import { Link } from "react-router-dom";
import { changeLang, translateElements, useLangStore } from "../stores/langStore";
import { useAuthStore } from "../stores/useAuthStore";
import { useEffect } from "react";
import { capitalize } from "../helpers/functions";

const DashboardLayout: React.FC = () => {
  const { theme } = useThemeStore();
  const { lang } = useLangStore();
  const navigate = useNavigate();
  const params = useParams();
  const logout = useAuthStore((state: any) => state.logout);
  
  useEffect(() => {
    if (window.location.href == window.location.origin+"/") {
      navigate("/"+lang)
    }
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.classList = theme + '-theme';
    }
    translateElements()
  }, [theme, navigate, lang]);

  const handleChangeLang = (value: string) => {
    changeLang(value);
    window.location.replace(window.location.href.replace(`${params?.lang}`, value))
  };
  return (
    <div className="col-12 col-lg-11 p-3 mx-auto">
      <div className="row">
        <nav id="sidebar" className={`col-md-3 col-lg-2 d-md-block text-bg-${theme} sidebar`}>
          <div className="position-sticky pt-3">
            <button id="sidebarToggle" className="btn btn-outline-danger" onClick={() => navigate('/'+lang+'/client/category')}>
              <i className="bi bi-arrow-left"></i>
            </button>
            <ul className="nav flex-column">
              <li className="nav-item mb-3">
                <Link className="nav-link " to={'/'+lang+'/dashboard'}>
                  <i className="bi bi-house me-2"></i>
                  Dashboard
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
            <div>
              <button type="button" className="btn btn-danger" onClick={() => {logout(); navigate('/'+lang+'/client/category')}}>
                logout
              </button>
            </div>
          </div>
        </nav>

        <div className="col-md-9 ms-sm-auto col-lg-10 px-md-4 position-relative">
          <div className={`position-absolute top-0 end-0 mb-3 d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center`}>
            <div className="btn-group" role="group">
              <button type="button" className={`btn btn-${theme} border-1 border-secondary`} onClick={toggleTheme}>
                <i className={`bi bi-${theme === "dark" ? "moon" : "sun"} fs-6`}></i>
              </button>

              <button
                type="button"
                className={`btn btn-${theme} border-1 border-secondary`}
                onClick={()=> handleChangeLang(lang == 'r' ? 'en' : 'fr')}
              >
                {capitalize(params?.lang as string)}
              </button>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;